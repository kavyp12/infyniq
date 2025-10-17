// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Bot, User, ServerCrash, ChevronDown, Code, Database, BarChart } from 'lucide-react';
// import { ResponsiveBar } from '@nivo/bar';
// import { ResponsiveLine } from '@nivo/line';
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// interface Message {
//   id: number;
//   type: 'user' | 'ai' | 'error' | 'summary';
//   content: string;
//   sql?: string;
//   table?: {
//     columns: string[];
//     rows: any[][];
//   };
//   chartData?: any;
//   selectedTable?: string;
// }

// const AiAssistant = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isLoading]);

//   useEffect(() => {
//     setMessages([
//       {
//         id: Date.now(),
//         type: 'ai',
//         content: "Hello! I'm your AI Data Analyst. Ask me anything about your connected database. You can start by asking for a `summary`.",
//       },
//     ]);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: Date.now(),
//       type: 'user',
//       content: input,
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/query', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ question: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       let aiMessage: Message;

//       // Handle different response types
//       if (data.type === 'summary' || data.type === 'schema_status' || 
//           data.type === 'cache_refresh' || data.type === 'connection_test') {
//         aiMessage = {
//           id: Date.now() + 1,
//           type: 'summary',
//           content: data.result,
//         };
//       } else if (data.type === 'single_table' && data.result) {
//         // FIXED: Properly handle single table response
//         aiMessage = {
//           id: Date.now() + 1,
//           type: 'ai',
//           content: data.result.insights || 'Here is the data I found.',
//           sql: data.result.query_result?.sql,
//           table: data.result.query_result ? {
//             columns: data.result.query_result.columns || [],
//             rows: data.result.query_result.rows || [],
//           } : undefined,
//           chartData: data.result.chart_data || null, // FIXED: Handle null properly
//           selectedTable: data.result.selected_table,
//         };
//       } else if (data.type === 'multi_table' && data.result) {
//         // FIXED: Handle multi-table properly
//         aiMessage = {
//           id: Date.now() + 1,
//           type: 'ai',
//           content: data.result.insights || 'Here is the combined analysis from multiple tables.',
//           chartData: data.result.chart_data || null, // FIXED: Handle null properly
//         };
//       } else {
//         throw new Error(data.result || 'An unknown error occurred.');
//       }
      
//       setMessages((prev) => [...prev, aiMessage]);

//     } catch (error) {
//       console.error("API Error:", error);
//       const errorMessage: Message = {
//         id: Date.now() + 1,
//         type: 'error',
//         content: error instanceof Error ? error.message : "Failed to connect to the AI backend.",
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white flex flex-col h-screen">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
//         .product-sans { font-family: 'Product Sans', sans-serif; }
//       `}</style>
      
//       <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 flex items-center gap-3">
//         <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
//           <Bot className="w-6 h-6 text-purple-400" />
//         </div>
//         <div>
//           <h1 className="text-lg font-bold">Infyniq AI Assistant</h1>
//           <p className="text-sm text-gray-400">Your personal MySQL data analyst</p>
//         </div>
//       </header>

//       <main className="flex-1 overflow-y-auto p-6 space-y-6">
//         {messages.map((msg) => (
//           <MessageBubble key={msg.id} message={msg} />
//         ))}
//         {isLoading && <TypingIndicator />}
//         <div ref={messagesEndRef} />
//       </main>

//       <footer className="p-4 bg-gray-900 border-t border-gray-700">
//         <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
//           <div className="flex items-center gap-3 bg-gray-800 rounded-full border-2 border-gray-700 px-4 py-3 focus-within:border-purple-600 transition-all">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask anything about your data..."
//               className="flex-1 w-full outline-none text-md bg-transparent placeholder:text-gray-500"
//               disabled={isLoading}
//             />
//             <button
//               type="submit"
//               className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
//               disabled={isLoading}
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
//         </form>
//       </footer>
//     </div>
//   );
// };

// const MessageBubble = ({ message }: { message: Message }) => {
//   if (message.type === 'user') return <UserMessage message={message} />;
//   if (message.type === 'error') return <ErrorMessage message={message} />;
//   if (message.type === 'summary') return <SummaryMessage message={message} />;
//   return <AiMessage message={message} />;
// };

// const UserMessage = ({ message }: { message: Message }) => (
//   <div className="flex justify-end">
//     <div className="max-w-2xl flex items-start gap-3">
//       <div className="bg-slate-700 rounded-xl px-5 py-3 shadow-md">
//         <p className="text-md text-white leading-relaxed">{message.content}</p>
//       </div>
//       <User className="w-8 h-8 p-1.5 bg-slate-700 text-white rounded-full flex-shrink-0 mt-1" />
//     </div>
//   </div>
// );

// const ErrorMessage = ({ message }: { message: Message }) => (
//   <div className="flex justify-start">
//     <div className="max-w-3xl flex items-start gap-3">
//       <ServerCrash className="w-8 h-8 p-1.5 bg-red-800 text-white rounded-full flex-shrink-0 mt-1" />
//       <div className="bg-red-900/50 border border-red-700 rounded-xl px-5 py-3 shadow-md">
//         <h3 className="font-bold text-red-400 mb-1">An Error Occurred</h3>
//         <p className="text-md text-red-200 leading-relaxed">{message.content}</p>
//       </div>
//     </div>
//   </div>
// );

// const SummaryMessage = ({ message }: { message: Message }) => (
//   <div className="flex justify-start">
//     <div className="max-w-4xl w-full flex items-start gap-3">
//       <Bot className="w-8 h-8 p-1.5 bg-gray-600 text-white rounded-full flex-shrink-0 mt-1" />
//       <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md w-full">
//         <div className="px-5 py-4">
//           <div className="prose prose-invert prose-p:text-md prose-p:leading-relaxed text-gray-200">
//             <ReactMarkdown>{message.content}</ReactMarkdown>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const AiMessage = ({ message }: { message: Message }) => {
//   const hasTableData = message.table && message.table.rows.length > 0;
//   const hasChartData = message.chartData && message.chartData.data && message.chartData.data.length > 0;
//   const hasSql = !!message.sql;

//   return (
//     <div className="flex justify-start">
//       <div className="max-w-4xl w-full flex items-start gap-3">
//         <Bot className="w-8 h-8 p-1.5 bg-purple-600 text-white rounded-full flex-shrink-0 mt-1" />
//         <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md w-full">
//           <div className="px-5 py-4">
//             <div className="prose prose-invert prose-p:text-md prose-p:leading-relaxed text-gray-200">
//               <ReactMarkdown>{message.content}</ReactMarkdown>
//             </div>
//           </div>

//           {hasChartData && (
//             <div className="bg-gray-900/50 p-4 border-t border-gray-700">
//               <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
//                 <BarChart className="w-4 h-4" /> Visualization
//               </h3>
//               <div className="h-96 w-full">
//                 {message.chartData.type === 'bar' && (
//                   <ResponsiveBar
//                     data={message.chartData.data}
//                     keys={message.chartData.keys}
//                     indexBy={message.chartData.indexBy}
//                     margin={{ top: 20, right: 20, bottom: 100, left: 60 }}
//                     padding={0.3}
//                     colors={{ scheme: 'purple_blue' }}
//                     axisBottom={{
//                       tickSize: 5, tickPadding: 5, tickRotation: -45,
//                       legendPosition: 'middle', legendOffset: 80,
//                     }}
//                     axisLeft={{
//                       tickSize: 5, tickPadding: 5, tickRotation: 0,
//                       legend: 'Value', legendPosition: 'middle', legendOffset: -50
//                     }}
//                     animate={true}
//                     theme={{
//                       axis: { ticks: { text: { fill: '#ddd' } }, legend: { text: { fill: '#ddd' } } },
//                       grid: { line: { stroke: '#444' } },
//                       tooltip: { container: { background: '#222', color: '#fff' } }
//                     }}
//                   />
//                 )}
//                 {message.chartData.type === 'line' && (
//                   <ResponsiveLine
//                     data={message.chartData.data}
//                     margin={{ top: 50, right: 120, bottom: 80, left: 60 }}
//                     xScale={{ type: 'point' }}
//                     yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
//                     axisBottom={{
//                       tickSize: 5, tickPadding: 5, tickRotation: -45,
//                       legend: 'Time', legendOffset: 60, legendPosition: 'middle'
//                     }}
//                     axisLeft={{
//                       tickSize: 5, tickPadding: 5, tickRotation: 0,
//                       legend: 'Value', legendOffset: -50, legendPosition: 'middle'
//                     }}
//                     colors={{ scheme: 'category10' }}
//                     pointSize={8}
//                     pointBorderWidth={2}
//                     pointBorderColor={{ from: 'serieColor' }}
//                     useMesh={true}
//                     legends={[
//                       {
//                         anchor: 'right',
//                         direction: 'column',
//                         translateX: 120,
//                         itemWidth: 100,
//                         itemHeight: 20,
//                         symbolSize: 12,
//                         symbolShape: 'circle'
//                       }
//                     ]}
//                     theme={{
//                       axis: { ticks: { text: { fill: '#ddd' } }, legend: { text: { fill: '#ddd' } } },
//                       grid: { line: { stroke: '#444' } },
//                       tooltip: { container: { background: '#222', color: '#fff' } },
//                       legends: { text: { fill: '#ddd' } }
//                     }}
//                   />
//                 )}
//               </div>
//             </div>
//           )}

//           {(hasSql || hasTableData) && <CollapsibleDetails message={message} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CollapsibleDetails = ({ message }: { message: Message }) => (
//   <details className="w-full">
//     <summary className="cursor-pointer text-sm font-semibold text-gray-400 p-3 border-t border-gray-700 flex items-center justify-between hover:bg-gray-700/50">
//       <span>Show Technical Details</span>
//       <ChevronDown className="w-5 h-5" />
//     </summary>
//     <div className="p-4 border-t border-gray-700 bg-gray-900/50">
//       {message.sql && (
//         <div className="mb-4">
//           <h4 className="font-semibold text-gray-300 mb-2 flex items-center gap-2">
//             <Code className="w-4 h-4" /> SQL Query
//           </h4>
//           <SyntaxHighlighter language="sql" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
//             {message.sql}
//           </SyntaxHighlighter>
//         </div>
//       )}
//       {message.table && message.table.rows.length > 0 && (
//         <div>
//           <h4 className="font-semibold text-gray-300 mb-2 flex items-center gap-2">
//             <Database className="w-4 h-4" /> Data ({message.table.rows.length} rows)
//           </h4>
//           <div className="overflow-x-auto max-h-80 border border-gray-700 rounded-lg">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-700 sticky top-0">
//                 <tr>
//                   {message.table.columns.map(col => (
//                     <th key={col} className="p-2 text-left">{col}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {message.table.rows.slice(0, 100).map((row, i) => (
//                   <tr key={i} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
//                     {row.map((cell, j) => (
//                       <td key={j} className="p-2 whitespace-nowrap">{String(cell)}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   </details>
// );

// const TypingIndicator = () => (
//   <div className="flex justify-start">
//     <div className="max-w-3xl flex items-start gap-3">
//       <Bot className="w-8 h-8 p-1.5 bg-purple-600 text-white rounded-full flex-shrink-0 mt-1" />
//       <div className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 shadow-md">
//         <div className="flex gap-1.5 items-center">
//           <span className="text-gray-400">Thinking</span>
//           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
//           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
//           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default AiAssistant;