// hero.tsx
import React, { useState, useEffect } from 'react';
import { Send, TrendingUp, BarChart3, Users, DollarSign, Share2, ThumbsUp, ThumbsDown, Sparkles, Brain } from 'lucide-react';
import { ResponsiveLine } from '@nivo/line';

const Hero = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [chartProgress, setChartProgress] = useState(0);

  const chatSequence = [
    {
      type: 'user',
      text: 'Show me revenue trends across all channels for Q3',
      delay: 1000
    },
    {
      type: 'ai',
      text: 'Analyzing revenue data across 15 channels...',
      delay: 1500,
      showMiniStats: true
    },
    {
      type: 'ai-chart',
      delay: 2000,
      chartType: 'revenue'
    },
    {
      type: 'ai',
      text: 'Your total revenue for Q3 was $1,598,639.30. The trend shows a 15.4% decline in September, primarily driven by the Display channel on Firefox (-23%) and reduced conversions in Social Media channels (-18%).',
      delay: 2500,
      showInsights: true
    }
  ];

  useEffect(() => {
    if (currentStep < chatSequence.length) {
      const currentMessage = chatSequence[currentStep];
      
      const timer = setTimeout(() => {
        if (currentMessage.type === 'ai' || currentMessage.type === 'ai-chart') {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, currentMessage]);
            setIsTyping(false);
            if (currentMessage.type === 'ai-chart') {
              animateChart();
            }
            setCurrentStep(prev => prev + 1);
          }, 1200);
        } else {
          setMessages(prev => [...prev, currentMessage]);
          setCurrentStep(prev => prev + 1);
        }
      }, currentMessage.delay);

      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentStep(0);
        setChartProgress(0);
      }, 10000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, chatSequence]);

  const animateChart = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setChartProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 30);
  };

  // Nivo chart data
  const nivoChartData = [
    {
      id: "Revenue",
      data: [
        { x: "Apr 29", y: 88 },
        { x: "May 6", y: 72 },
        { x: "May 13", y: 65 },
        { x: "May 20", y: 78 },
        { x: "May 27", y: 58 },
        { x: "Jun 3", y: 92 },
        { x: "Jun 10", y: 75 },
        { x: "Jun 17", y: 68 },
        { x: "Jun 24", y: 85 },
        { x: "Jul 1", y: 95 },
        { x: "Jul 8", y: 78 },
        { x: "Jul 15", y: 72 },
        { x: "Jul 22", y: 65 },
        { x: "Jul 29", y: 58 },
      ]
    }
  ];

  const insights = [
    { icon: TrendingUp, label: 'Top Channel', value: 'Organic Search +32%', color: 'text-green-600' },
    { icon: Users, label: 'Total Users', value: '2.4M visitors', color: 'text-blue-600' },
    { icon: DollarSign, label: 'Avg. Revenue', value: '$533K/month', color: 'text-purple-600' }
  ];

  const suggestions = [
    "Which channels had the highest growth?",
    "Compare performance vs last quarter",
    "Show conversion funnel breakdown",
    "Predict next month's revenue"
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');

        html, body, * {
          font-family: 'Product Sans', sans-serif !important;
        }

        .product-sans {
          font-family: 'Product Sans', sans-serif;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        .slide-in-right {
          animation: slideInRight 0.5s ease-out;
        }
        @keyframes typing {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .typing-dot {
          animation: typing 1.4s infinite;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
    
      <section className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900 product-sans">
        
        {/* --- MODIFICATION HERE --- */}
        {/* Changed py-16 sm:py-20 to pt-8 pb-16 sm:pt-12 sm:pb-20 to reduce top padding */}
        <div className="mx-auto max-w-[1600px] px-6 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:flex lg:items-center lg:gap-20">
          
          {/* Left Column: Text Content & CTA */}
          <div className="w-full lg:w-[42%] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Analytics</span>
            </div>
            
            <h1 className="text-5xl font-extrabold sm:text-6xl md:text-7xl leading-[1.1]">
              datomly — an advanced <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">AI platform</span> that can learn from any kind of data
            </h1>

            {/* Shortened paragraph */}
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-gray-600 sm:mx-auto lg:mx-0">
              It’s like having your own private ChatGPT trained on your information. Just upload your data, ask a question, and datomly gives accurate, human-like insights in seconds.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="#"
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                <Brain className="w-5 h-5" />
                <span>Schedule a Demo</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:border-indigo-600 hover:text-indigo-600"
              >
                <span>Watch Video</span>
              </a>
            </div>

            {/* Stats section removed */}
          
          </div>

         {/* Right Column: Classic Animated Chat Interface */}
          <div className="mt-12 w-full lg:mt-0 lg:w-[58%] lg:pl-8">
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 text-white border-b border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">datomly AI Assistant</div>
                      <div className="text-xs text-slate-300 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <span>Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="p-6 space-y-5 min-h-[480px] max-h-[580px] overflow-y-auto bg-gray-50">
                
                {/* Initial Welcome State */}
                {messages.length === 0 && (
                  <div className="text-center py-12 fade-in-up">
                    <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Ask me anything about your data
                    </h3>
                    <p className="text-sm text-gray-600 mb-8 max-w-md mx-auto">
                      I can analyze trends, find insights, and answer complex questions
                    </p>
                    
                    {/* Mini Preview Cards */}
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
                        <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                        <div className="text-xs font-bold text-gray-800">Revenue</div>
                        <div className="text-xs text-gray-500 mt-0.5">+15.3%</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
                        <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-xs font-bold text-gray-800">Users</div>
                        <div className="text-xs text-gray-500 mt-0.5">2.4M</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
                        <BarChart3 className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                        <div className="text-xs font-bold text-gray-800">Channels</div>
                        <div className="text-xs text-gray-500 mt-0.5">15 Active</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Render Messages */}
                {messages.map((message, index) => (
                  <div key={index}>
                    {message.type === 'user' && (
                      <div className="flex justify-end fade-in-up">
                        <div className="max-w-[70%] bg-slate-700 text-white rounded-xl px-4 py-3 shadow-md">
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                      </div>
                    )}
                    
                    {message.type === 'ai' && (
                      <div className="flex justify-start fade-in-up">
                        <div className="max-w-[85%]">
                          <div className="bg-white border border-gray-300 rounded-xl px-5 py-4 shadow-md">
                            <p className="text-sm text-gray-800 leading-relaxed">{message.text}</p>
                            
                            {/* Mini Stats */}
                            {message.showMiniStats && (
                              <div className="mt-3 flex items-center gap-2">
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse"></div>
                                  <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                  <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                </div>
                                <span className="text-xs text-gray-500">Scanning 15 data sources...</span>
                              </div>
                            )}
                            
                            {/* Insights Cards */}
                            {message.showInsights && (
                              <div className="mt-4 grid grid-cols-3 gap-2.5">
                                {insights.map((insight, i) => (
                                  <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-300 slide-in-right" style={{animationDelay: `${i * 0.1}s`}}>
                                    <insight.icon className={`w-4 h-4 ${insight.color} mb-1.5`} />
                                    <div className="text-xs font-bold text-gray-800">{insight.label}</div>
                                    <div className="text-xs text-gray-600 mt-0.5">{insight.value}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          {message.showInsights && (
                            <div className="mt-2 flex items-center gap-2 px-1">
                              <button className="p-1.5 hover:bg-gray-200 rounded-lg transition">
                                <ThumbsUp className="w-3.5 h-3.5 text-gray-600" />
                              </button>
                              <button className="p-1.5 hover:bg-gray-200 rounded-lg transition">
                                <ThumbsDown className="w-3.5 h-3.5 text-gray-600" />
                              </button>
                              <button className="p-1.5 hover:bg-gray-200 rounded-lg transition">
                                <Share2 className="w-3.5 h-3.5 text-gray-600" />
                              </button>
                              <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Chart Message with Nivo */}
                    {message.type === 'ai-chart' && (
                      <div className="flex justify-start fade-in-up">
                        <div className="w-full bg-white border border-gray-300 rounded-xl p-6 shadow-md">
                          <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-gray-900">Revenue Analysis Q3</h4>
                                <p className="text-xs text-gray-600">April - July 2024</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                                <span className="text-gray-700">Revenue trend</span>
                              </span>
                            </div>
                          </div>
                          
                          {/* Nivo Line Chart */}
                          <div className="h-64" style={{ opacity: chartProgress / 100 }}>
                            <ResponsiveLine
                              data={nivoChartData}
                              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                              xScale={{ type: 'point' }}
                              yScale={{ 
                                type: 'linear', 
                                min: 0, 
                                max: 100, 
                                stacked: false, 
                                reverse: false 
                              }}
                              curve="monotoneX"
                              axisTop={null}
                              axisRight={null}
                              axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: -45,
                                legend: '',
                                legendOffset: 36,
                                legendPosition: 'middle'
                              }}
                              axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Revenue ($M)',
                                legendOffset: -50,
                                legendPosition: 'middle',
                                format: v => `${v}m`
                              }}
                              colors={['#3b82f6']}
                              pointSize={8}
                              pointColor={{ from: 'color' }}
                              pointBorderWidth={2}
                              pointBorderColor={{ from: 'seriesColor' }}
                              pointLabelYOffset={-12}
                              enableArea={true}
                              areaOpacity={0.1}
                              useMesh={true}
                              enableGridX={false}
                              enableGridY={true}
                              gridYValues={5}
                              theme={{
                                axis: {
                                  ticks: {
                                    text: {
                                      fontSize: 11,
                                      fill: '#6b7280'
                                    }
                                  },
                                  legend: {
                                    text: {
                                      fontSize: 12,
                                      fill: '#374151',
                                      fontWeight: 600
                                    }
                                  }
                                },
                                grid: {
                                  line: {
                                    stroke: '#e5e7eb',
                                    strokeWidth: 1
                                  }
                                }
                              }}
                            />
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-6">
                              <div>
                                <span className="text-gray-600">Total</span>
                                <span className="ml-2 font-bold text-gray-900">$1.59M</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Avg</span>
                                <span className="ml-2 font-bold text-gray-900">$533K</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-red-600">
                              <TrendingUp className="w-3.5 h-3.5 rotate-180" />
                              <span className="font-bold">-15.4%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start fade-in-up">
                    <div className="bg-white border border-gray-300 rounded-xl px-5 py-4 shadow-md">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full typing-dot"></div>
                        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full typing-dot"></div>
                        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1]?.showInsights && (
                <div className="px-6 pb-4 bg-white border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-600 mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggested questions:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="text-left text-xs text-gray-700 p-2.5 rounded-lg border border-gray-300 hover:border-slate-600 hover:bg-gray-50 transition-all hover:shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center gap-3 bg-white rounded-full border-2 border-gray-300 px-4 py-3 focus-within:border-slate-600 transition-all">
                  <input
                    type="text"
                    placeholder="Ask anything about your data..."
                    className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-400"
                    disabled
                  />
                  <button className="bg-slate-700 text-white rounded-full p-2 hover:bg-slate-800 hover:shadow-lg transition-all hover:scale-105">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* Second Section */}
      <section className="relative bg-white py-20 sm:py-24 product-sans">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
            backgroundSize: '1.5rem 1.5rem',
            opacity: 0.4
          }}
        ></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-20 grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl leading-tight">
                datomly is <span style={{color: '#D858A5'}}>not</span>
                <br/>
                Another SQL Wrapper
              </h2>
            </div>
            <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
              <p>
                datomly's AI Analysts doesn't just translate text into a simple SQL query. It develops a plan, executes that plan by making meaningful comparisons and deep dives into the data, and curates the results— transforming a question into meaningful, actionable analysis.
              </p>
              <p className="font-semibold text-slate-700">
                The result: Trusted analysis that goes deeper into the most important insights in your data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;