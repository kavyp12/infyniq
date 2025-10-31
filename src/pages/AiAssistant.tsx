import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Bot,
  User,
  ServerCrash,
  ChevronDown,
  Code,
  Database,
  BarChart,
  History,
  Star,
  Download,
  Clock,
  Sparkles,
  TrendingUp,
  PieChart,
  Activity,
  Grid,
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: number;
  type: 'user' | 'ai' | 'error' | 'summary';
  content: string;
  sql?: string;
  table?: {
    columns: string[];
    rows: any[][];
  };
  chartData?: any;
  selectedTable?: string;
  executionTime?: number;
}

interface QueryHistory {
  id: number;
  question: string;
  sql_query: string;
  execution_time: number;
  row_count: number;
  is_favorite: boolean;
  created_at: string;
}

interface SuggestedQuestion {
  question: string;
  category: string;
  usage_count?: number;
}

const AiAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasDatabase, setHasDatabase] = useState(false);
  const [databaseName, setDatabaseName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const checkDatabaseConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/check-session', {
          credentials: 'include',
        });
        const data = await response.json();

        if (!data.has_database) {
          setHasDatabase(false);
          setMessages([
            {
              id: Date.now(),
              type: 'error',
              content:
                "⚠️ **No database connected!**\n\nPlease create a new database from the sidebar to get started.",
            },
          ]);
        } else {
          setHasDatabase(true);
          setDatabaseName(data.database);
          setMessages([
            {
              id: Date.now(),
              type: 'ai',
              content: `Hello! I'm your AI Data Analyst connected to database: **${data.database}**.\n\nAsk me anything about your data. You can start by asking for a \`summary\`.`,
            },
          ]);

          loadQueryHistory();
          loadSuggestedQuestions();
        }
      } catch (error) {
        setHasDatabase(false);
        setMessages([
          {
            id: Date.now(),
            type: 'error',
            content:
              "❌ **Cannot connect to the backend server.**\n\nMake sure the Flask server is running on http://localhost:5000",
          },
        ]);
      }
    };

    checkDatabaseConnection();
  }, []);

  const loadQueryHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/query-history?limit=20', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setQueryHistory(data.history);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const loadSuggestedQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suggested-questions', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setSuggestedQuestions(data.suggestions);
      }
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    }
  };

  const toggleFavorite = async (queryId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/query-history/${queryId}/favorite`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setQueryHistory((prev) =>
          prev.map((q) => (q.id === queryId ? { ...q, is_favorite: data.is_favorite } : q))
        );
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const useSuggestedQuestion = (question: string) => {
    setInput(question);
    setShowSuggestions(false);
  };

  const useHistoryQuestion = (question: string) => {
    setInput(question);
    setShowHistory(false);
  };

  const exportToCSV = (columns: string[], rows: any[][], filename: string = 'query_results.csv') => {
    fetch('http://localhost:5000/api/export-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ columns, rows, filename }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Export failed:', error));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.error('Request timed out after 10 minutes');
      }, 600000);

      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ question: input }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const executionTime = (Date.now() - startTime) / 1000;

      if (data.success === false || data.type === 'error') {
        const errorMessage: Message = {
          id: Date.now() + 1,
          type: 'error',
          content: data.result || 'An error occurred while processing your request.',
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }

      let aiMessage: Message;

      if (
        data.type === 'summary' ||
        data.type === 'schema_status' ||
        data.type === 'cache_refresh' ||
        data.type === 'connection_test'
      ) {
        aiMessage = {
          id: Date.now() + 1,
          type: 'summary',
          content: data.result,
          executionTime,
        };
      } else if (data.type === 'single_table' && data.result) {
        aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.result.insights || 'Here is the data I found.',
          sql: data.result.query_result?.sql,
          table: data.result.query_result
            ? {
                columns: data.result.query_result.columns || [],
                rows: data.result.query_result.rows || [],
              }
            : undefined,
          chartData: data.result.chart_data || null,
          selectedTable: data.result.selected_table,
          executionTime: data.result.query_result?.execution_time || executionTime,
        };
      } else if (data.type === 'multi_table' && data.result) {
        aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.result.insights || 'Here is the combined analysis from multiple tables.',
          chartData: data.result.chart_data || null,
          executionTime: data.result.execution_time || executionTime,
        };
      } else {
        aiMessage = {
          id: Date.now() + 1,
          type: 'error',
          content: 'Received unexpected response format from server.',
        };
      }

      setMessages((prev) => [...prev, aiMessage]);
      loadQueryHistory();
    } catch (error) {
      console.error('API Error:', error);

      let errorContent = 'Failed to connect to the AI backend.';

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorContent =
            'The query took too long to process (timed out after 10 minutes). Your database might be very large. Try asking a simpler question like "summary" first.';
        } else if (error.message.includes('Failed to fetch')) {
          errorContent =
            'Cannot connect to the backend server. Make sure the Flask server is running on http://localhost:5000';
        } else {
          errorContent = error.message;
        }
      }

      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'error',
        content: errorContent,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 flex flex-col h-full rounded-2xl border border-gray-300 shadow-xl product-sans">
      <header className="border-b border-gray-300 p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-900">Datomly AI Assistant</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-all"
          >
            <History className="w-4 h-4" />
            History
          </button>
          <p className="text-sm text-gray-600">
            {hasDatabase ? `Connected to: ${databaseName}` : 'No database connected'}
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {showSuggestions && suggestedQuestions.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-indigo-900">Suggested Questions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.slice(0, 6).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => useSuggestedQuestion(suggestion.question)}
                  className="text-left px-4 py-3 bg-white hover:bg-indigo-100 border border-indigo-200 rounded-lg text-sm text-gray-700 hover:text-indigo-900 transition-all"
                >
                  {suggestion.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {showHistory && (
          <div className="bg-white border border-gray-300 rounded-xl p-5 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Queries
              </h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            {queryHistory.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No query history yet</p>
            ) : (
              <div className="space-y-2">
                {queryHistory.map((query) => (
                  <div
                    key={query.id}
                    className="group border border-gray-200 rounded-lg p-3 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => useHistoryQuestion(query.question)}
                        className="flex-1 text-left text-sm text-gray-700 group-hover:text-indigo-900"
                      >
                        {query.question}
                      </button>
                      <button onClick={() => toggleFavorite(query.id)} className="flex-shrink-0 p-1">
                        <Star
                          className={`w-4 h-4 ${
                            query.is_favorite
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-400 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {query.execution_time?.toFixed(2)}s
                      </span>
                      <span>{query.row_count} rows</span>
                      <span>{new Date(query.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onExport={exportToCSV} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white border-t border-gray-300 rounded-b-2xl">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-white rounded-full border-2 border-gray-300 px-4 py-3 focus-within:border-indigo-600 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={hasDatabase ? 'Ask anything about your data...' : 'Connect to a database first...'}
              className="flex-1 w-full outline-none text-md bg-transparent text-gray-900 placeholder:text-gray-500"
              disabled={isLoading || !hasDatabase}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
              disabled={isLoading || !hasDatabase}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

// --- Child Components ---

const MessageBubble = ({ message, onExport }: { message: Message; onExport: (columns: string[], rows: any[][], filename: string) => void }) => {
  if (message.type === 'user') return <UserMessage message={message} />;
  if (message.type === 'error') return <ErrorMessage message={message} />;
  if (message.type === 'summary') return <SummaryMessage message={message} />;
  return <AiMessage message={message} onExport={onExport} />;
};

const UserMessage = ({ message }: { message: Message }) => (
  <div className="flex justify-end">
    <div className="max-w-2xl flex items-start gap-3">
      <div className="bg-slate-700 rounded-xl px-5 py-3 shadow-md">
        <p className="text-md text-white leading-relaxed">{message.content}</p>
      </div>
      <User className="w-8 h-8 p-1.5 bg-slate-700 text-white rounded-full flex-shrink-0 mt-1" />
    </div>
  </div>
);

const ErrorMessage = ({ message }: { message: Message }) => (
  <div className="flex justify-start">
    <div className="max-w-3xl flex items-start gap-3">
      <ServerCrash className="w-8 h-8 p-1.5 bg-red-600 text-white rounded-full flex-shrink-0 mt-1" />
      <div className="bg-red-100 border border-red-300 rounded-xl px-5 py-3 shadow-md">
        <h3 className="font-bold text-red-700 mb-1">An Error Occurred</h3>
        <div className="prose prose-p:text-md prose-p:leading-relaxed text-red-800">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  </div>
);

const SummaryMessage = ({ message }: { message: Message }) => (
  <div className="flex justify-start">
    <div className="max-w-4xl w-full flex items-start gap-3">
      <Bot className="w-8 h-8 p-1.5 bg-gray-600 text-white rounded-full flex-shrink-0 mt-1" />
      <div className="bg-white border border-gray-300 rounded-xl shadow-md w-full">
        <div className="px-5 py-4">
          {message.executionTime && (
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                <Clock className="w-3 h-3" />
                {message.executionTime.toFixed(2)}s
              </span>
            </div>
          )}
          <div className="prose prose-p:text-md prose-p:leading-relaxed text-gray-800">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AiMessage = ({ message, onExport }: { message: Message; onExport: (columns: string[], rows: any[][], filename: string) => void }) => {
  const [localChartType, setLocalChartType] = useState<string | null>(null);

  const hasTableData = message.table && message.table.rows.length > 0;

  const hasChartData = React.useMemo(() => {
    if (!message.chartData) return false;
    if (!message.chartData.data) return false;
    if (!Array.isArray(message.chartData.data)) return false;
    if (message.chartData.data.length === 0) return false;

    const chartType = message.chartData.type;

    if (chartType === 'line' || chartType === 'area') {
      return message.chartData.data.every((series: any) =>
        series.data && Array.isArray(series.data) && series.data.length >= 2
      );
    }

    if (chartType === 'bar' || chartType === 'pie') {
      return message.chartData.data.length >= 2;
    }

    if (chartType === 'scatter') {
      return message.chartData.data.every((series: any) =>
        series.data && Array.isArray(series.data) && series.data.length >= 2
      );
    }

    if (chartType === 'heatmap') {
      return (
        message.chartData.data.length > 0 &&
        message.chartData.data[0].data &&
        message.chartData.data[0].data.length > 0
      );
    }

    return true;
  }, [message.chartData]);

  const currentChartType = localChartType || message.chartData?.type || 'bar';

  const getAvailableChartTypes = () => {
    if (!message.chartData) return [];

    const types = ['bar'];

    if (message.chartData.type === 'line' || message.chartData.data[0]?.data) {
      types.push('line', 'area');
    }

    if (message.chartData.data.length <= 10 && message.chartData.type !== 'scatter') {
      types.push('pie');
    }

    if (message.chartData.type === 'scatter') {
      types.push('scatter');
    }

    if (message.chartData.type === 'heatmap') {
      types.push('heatmap');
    }

    return types;
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart className="w-3 h-3" />;
      case 'line':
        return <TrendingUp className="w-3 h-3" />;
      case 'area':
        return <Activity className="w-3 h-3" />;
      case 'pie':
        return <PieChart className="w-3 h-3" />;
      case 'scatter':
        return <Grid className="w-3 h-3" />;
      case 'heatmap':
        return <Grid className="w-3 h-3" />;
      default:
        return <BarChart className="w-3 h-3" />;
    }
  };

  const hasSql = !!message.sql;

  return (
    <div className="flex justify-start">
      <div className="max-w-4xl w-full flex items-start gap-3">
        <Bot className="w-8 h-8 p-1.5 bg-indigo-600 text-white rounded-full flex-shrink-0 mt-1" />
        <div className="bg-white border border-gray-300 rounded-xl shadow-md w-full">
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {message.executionTime && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <Clock className="w-3 h-3" />
                    {message.executionTime.toFixed(2)}s
                  </span>
                )}
                {hasTableData && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    <Database className="w-3 h-3" />
                    {message.table!.rows.length} rows
                  </span>
                )}
              </div>
              {hasTableData && (
                <button
                  onClick={() =>
                    onExport(message.table!.columns, message.table!.rows, `query_${Date.now()}.csv`)
                  }
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              )}
            </div>

            <div className="prose prose-p:text-md prose-p:leading-relaxed text-gray-800">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>

          {hasChartData && (
            <div className="bg-white p-4 border-t border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <BarChart className="w-4 h-4" /> Visualization
                </h3>
                <div className="flex gap-2">
                  {getAvailableChartTypes().map((type) => (
                    <button
                      key={type}
                      onClick={() => setLocalChartType(type)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                        currentChartType === type
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {getChartIcon(type)}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-96 w-full">
                <ChartRenderer chartData={message.chartData} chartType={currentChartType} />
              </div>
            </div>
          )}

          {(hasSql || hasTableData) && <CollapsibleDetails message={message} />}
        </div>
      </div>
    </div>
  );
};

// UNIVERSAL CHART RENDERER
const ChartRenderer = ({ chartData, chartType }: { chartData: any; chartType: string }) => {
  const commonTheme = {
    axis: {
      ticks: { text: { fill: '#333', fontSize: 11 } },
      legend: { text: { fill: '#333', fontSize: 12, fontWeight: 600 } },
    },
    grid: { line: { stroke: '#e5e7eb', strokeWidth: 1 } },
    tooltip: {
      container: {
        background: '#fff',
        color: '#333',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
    legends: { text: { fill: '#333', fontSize: 11 } },
  };

  try {
    // ===== PIE CHART WITH ENHANCED VALIDATION =====
    if (chartType === 'pie') {
      // Strict validation
      const validData = chartData.data.filter((item: any) => 
        item && 
        typeof item.value === 'number' && 
        item.value > 0 &&
        item.id &&
        item.label
      );
      
      if (validData.length < 2) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <PieChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 font-semibold">Insufficient data for pie chart</p>
              <p className="text-gray-500 text-sm mt-2">Need at least 2 valid data points with positive values</p>
              <p className="text-gray-400 text-xs mt-1">Found: {validData.length} valid points</p>
            </div>
          </div>
        );
      }

      if (validData.length > 10) {
        console.warn(`Too many pie slices (${validData.length}), limiting to top 10`);
        validData.sort((a: any, b: any) => b.value - a.value);
        validData.splice(10);
      }

      console.log(`✅ Rendering pie chart with ${validData.length} slices`);

      return (
        <ResponsivePie
          data={validData}
          margin={{ top: 40, right: 140, bottom: 80, left: 140 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: 'nivo' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#ffffff"
          arcLabel={(d) => {
            // Calculate percentage of total
            const total = validData.reduce((sum: number, item: any) => sum + item.value, 0);
            const percentage = ((d.value / total) * 100).toFixed(1);
            return `${percentage}%`;
          }}
          arcLinkLabel={(d) => String(d.label)}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 4,
              itemWidth: 100,
              itemHeight: 20,
              itemTextColor: '#333',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                    itemOpacity: 1
                  }
                }
              ]
            },
          ]}
          theme={commonTheme}
          animate={true}
          motionConfig="gentle"
        />
      );
    }

    // BAR CHART
    if (chartType === 'bar') {
      const isHorizontal = chartData.layout === 'horizontal' || chartData.data.length > 8;

      return (
        <ResponsiveBar
          data={chartData.data}
          keys={chartData.keys || ['value']}
          indexBy={chartData.indexBy || 'category'}
          margin={{
            top: 20,
            right: 20,
            bottom: isHorizontal ? 60 : 100,
            left: isHorizontal ? 120 : 60,
          }}
          padding={0.3}
          layout={isHorizontal ? 'horizontal' : 'vertical'}
          valueScale={{ type: 'linear' }}
          colors={{ scheme: 'nivo' }}
          borderRadius={4}
          axisBottom={
            isHorizontal
              ? {
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Value',
                  legendPosition: 'middle',
                  legendOffset: 40,
                }
              : {
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: '',
                  legendPosition: 'middle',
                  legendOffset: 60,
                }
          }
          axisLeft={
            isHorizontal
              ? {
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }
              : {
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Value',
                  legendPosition: 'middle',
                  legendOffset: -50,
                }
          }
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#fff"
          animate={true}
          motionConfig="gentle"
          theme={commonTheme}
        />
      );
    }

    // LINE CHART
    if (chartType === 'line') {
      return (
        <ResponsiveLine
          data={chartData.data}
          margin={{ top: 50, right: 130, bottom: 80, left: 70 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
          curve="catmullRom"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: chartData.xLabel || 'X Axis',
            legendOffset: 60,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: chartData.yLabel || 'Value',
            legendOffset: -55,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'category10' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          enableSlices="x"
          legends={
            chartData.data.length > 1
              ? [
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 100,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                        }
                      }
                    ]
                  },
                ]
              : []
          }
          theme={commonTheme}
          animate={true}
          motionConfig="gentle"
        />
      );
    }

    // AREA CHART
    if (chartType === 'area') {
      return (
        <ResponsiveLine
          data={chartData.data}
          margin={{ top: 50, right: 130, bottom: 80, left: 70 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true }}
          curve="catmullRom"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: chartData.xLabel || 'X Axis',
            legendOffset: 60,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: chartData.yLabel || 'Value',
            legendOffset: -55,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'category10' }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enableArea={true}
          areaOpacity={0.7}
          useMesh={true}
          legends={
            chartData.data.length > 1
              ? [
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 100,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                  },
                ]
              : []
          }
          theme={commonTheme}
          animate={true}
          motionConfig="gentle"
        />
      );
    }

    // SCATTER PLOT
    if (chartType === 'scatter') {
      return (
        <ResponsiveScatterPlot
          data={chartData.data}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          colors={{ scheme: 'category10' }}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: chartData.xLabel || 'X Axis',
            legendPosition: 'middle',
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: chartData.yLabel || 'Y Axis',
            legendPosition: 'middle',
            legendOffset: -60,
          }}
          legends={
            chartData.data.length > 1
              ? [
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    symbolSize: 12,
                    symbolShape: 'circle',
                  },
                ]
              : []
          }
          theme={commonTheme}
          animate={true}
          motionConfig="gentle"
        />
      );
    }

    // HEATMAP
    if (chartType === 'heatmap') {
      return (
        <ResponsiveHeatMap
          data={chartData.data}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat=">-.2s"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: '',
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: chartData.indexBy || 'Y Axis',
            legendPosition: 'middle',
            legendOffset: -72,
          }}
          colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.5,
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: 'bottom',
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: 'row',
              tickPosition: 'after',
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              title: 'Value →',
              titleAlign: 'start',
              titleOffset: 4,
            },
          ]}
          theme={commonTheme}
          animate={true}
          motionConfig="gentle"
        />
      );
    }

    // FALLBACK
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BarChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Unsupported chart type: {chartType}</p>
          <p className="text-gray-500 text-sm mt-2">Available types: bar, line, pie, area, scatter, heatmap</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Chart rendering error:', error);
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <ServerCrash className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <p className="text-red-600 font-semibold">Failed to render chart</p>
          <p className="text-gray-500 text-sm mt-2">{String(error)}</p>
        </div>
      </div>
    );
  }
};

const CollapsibleDetails = ({ message }: { message: Message }) => (
  <details className="w-full">
    <summary className="cursor-pointer text-sm font-semibold text-gray-600 p-3 border-t border-gray-300 flex items-center justify-between hover:bg-gray-100">
      <span>Show Technical Details</span>
      <ChevronDown className="w-5 h-5" />
    </summary>
    <div className="p-4 border-t border-gray-300 bg-gray-50/50">
      {message.sql && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Code className="w-4 h-4" /> SQL Query
          </h4>
          <SyntaxHighlighter language="sql" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
            {message.sql}
          </SyntaxHighlighter>
        </div>
      )}
      {message.table && message.table.rows.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Database className="w-4 h-4" /> Data ({message.table.rows.length} rows)
          </h4>
          <div className="overflow-x-auto max-h-80 border border-gray-300 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {message.table.columns.map((col) => (
                    <th key={col} className="p-2 text-left font-semibold text-gray-700">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {message.table.rows.slice(0, 100).map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    {row.map((cell, j) => (
                      <td key={j} className="p-2 whitespace-nowrap text-gray-800">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </details>
);

const TypingIndicator = () => {
  const [dots, setDots] = useState('');
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-start">
      <div className="max-w-3xl flex items-start gap-3">
        <Bot className="w-8 h-8 p-1.5 bg-indigo-600 text-white rounded-full flex-shrink-0 mt-1 animate-pulse" />
        <div className="bg-white border border-gray-300 rounded-xl px-5 py-4 shadow-md">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1.5 items-center">
              <span className="text-gray-600">Analyzing your data{dots}</span>
            </div>
            <p className="text-xs text-gray-500">
              {elapsed < 30
                ? 'First query may take 30-60 seconds as AI analyzes your database structure'
                : elapsed < 90
                ? `Still processing... (${elapsed}s elapsed)`
                : 'This is taking longer than expected. Complex analysis in progress...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;