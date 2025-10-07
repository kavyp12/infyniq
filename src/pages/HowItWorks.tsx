// HowItWorks.tsx
import React from 'react';
import {
  Database,
  Network,
  Cpu,
  BrainCircuit,
  Code,
  LayoutDashboard,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  MessageSquare,
} from 'lucide-react';

// --- Main Component ---

const HowItWorks = () => {
  // Data for the simple top flow diagram (kept for completeness)
  const topFlowSteps = [
    { icon: <Database />, label: 'Data connection' },
    { icon: <Network />, label: 'Schema' },
    { icon: <Cpu />, label: 'Compute engine' },
    { icon: <BrainCircuit />, label: 'Embedding model' },
    { icon: <Code />, label: 'Analytics engine' },
    { icon: <LayoutDashboard />, label: 'Databoard' },
  ];

  return (
    // Applied product-sans to use Product Sans, as defined in the style block below
    <section className="bg-black text-white product-sans">
      
      {/* Inject Product Sans font CSS. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
  
        .product-sans {
          font-family: 'Product Sans', sans-serif;
        }
      `}</style>
      
      {/* Top Section - Simple Flow (kept as is) */}
      <div className="py-20 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            How does it work?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-400 mb-16">
            We have built Proprietary Technology required to run an AI Agent on Large Data
          </p>

          <div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-2 md:gap-x-4 mb-20">
            {topFlowSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <div className="absolute inset-0 bg-purple-600 rounded-full blur-md opacity-40"></div>
                    <div className="relative text-purple-300">{step.icon}</div>
                  </div>
                  <span>{step.label}</span>
                </div>
                {index < topFlowSteps.length - 1 && (
                  <ArrowRight className="text-gray-700 mx-2" size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILED ARCHITECTURE DIAGRAM - COMPACTED WITH LARGE FONTS */}
      {/* Reduced max-width and padding for tighter layout */}
      <div className="min-h-screen bg-black text-white p-4 sm:p-8">
        <div className="max-w-[1250px] mx-auto"> 
          <div className="relative">
            {/* Top Row - Tighter gap-4 and use of w-full/n for width control */}
            <div className="flex items-end justify-between gap-4 mb-10"> 
              
              {/* Infyniq AI Analyst */}
              <div className="w-[18%] min-w-[180px]"> 
                <div className="bg-slate-900 bg-opacity-60 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                  <h2 className="text-xl font-bold text-white text-center leading-tight mb-0.5">
                    Infyniq AI<br />Analyst
                  </h2>
                  <p className="text-purple-400 text-center text-sm font-semibold">
                    Chat with your AI Analyst
                  </p>
                </div>
              </div>

              {/* Bidirectional Arrow */}
              <div className="flex flex-col items-center gap-0.5 mb-2"> 
                <ArrowRight className="text-gray-600" size={20} />
                <ArrowLeft className="text-gray-600" size={20} />
              </div>

              {/* Data Connection */}
              <div className="w-[20%] min-w-[150px] mb-2"> 
                <div className="text-center mb-1">
                  <p className="text-gray-600 text-xs leading-tight">Embeddings</p>
                  <p className="text-gray-700 text-xs leading-tight">(Semantic Query)</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight mb-0.5">
                    Data<br />Connection
                  </h2>
                  <p className="text-sm">
                    <span className="text-purple-500 font-semibold">Incremental</span>{' '}
                    <span className="text-gray-400">Data Sync</span>
                  </p>
                </div>
              </div>

              {/* Arrow to Schema */}
              <div className="mb-2">
                <ArrowRight className="text-gray-600" size={20} />
              </div>

              {/* Schema */}
              <div className="w-[18%] min-w-[140px] mb-2">
                <h2 className="text-xl font-bold text-white leading-tight mb-0.5">Schema</h2>
                <p className="text-sm leading-tight">
                  <span className="text-purple-500 font-semibold">Accurate</span>{' '}
                  <span className="text-gray-400">Questions</span>
                </p>
                <p className="text-gray-400 text-sm leading-tight">Interpretation</p>
              </div>

              {/* Arrow to ETL */}
              <div className="mb-2">
                <ArrowRight className="text-gray-600" size={20} />
              </div>

              {/* ETL */}
              <div className="w-[12%] min-w-[100px] mb-2">
                <h2 className="text-xl font-bold text-white leading-tight mb-0.5">ETL</h2>
                <p className="text-sm">
                  <span className="text-purple-500 font-semibold">Fixed</span>{' '}
                  <span className="text-gray-400">ETL Cost</span>
                </p>
              </div>
            </div>

            {/* Separator / Vertical Arrows - Reduced height for compactness */}
            <div className='h-8'></div> 

            {/* Bottom Section - Tighter gap-4 and adjusted widths */}
            <div className="flex items-center justify-between gap-4"> 
              
              {/* Chat Interface - Reduced padding and text sizes (relative to the large titles) */}
              <div className="w-[22%] min-w-[220px]"> 
                <div className="bg-slate-900 bg-opacity-60 border border-slate-700 rounded-xl p-3">
                  {/* User Question */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-[10px]">👤</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-snug">
                      What are the main factors driving the surge in our Sales Revenue this week?
                    </p>
                  </div>

                  {/* AI Response - Text set to text-xs, inner list to text-[10px] */}
                  <div className="bg-slate-950 rounded-lg p-2 mb-2">
                    <div className="flex items-start gap-1">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center">
                        <MessageSquare size={12} className="text-white" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-gray-300 text-xs leading-snug">
                          Sales revenue is down to a{' '}
                          <span className="text-purple-400 font-semibold">92.7%</span> which is drop of{' '}
                          <span className="text-red-400 font-semibold">$344k</span> compared to last week...
                        </p>
                        <div className="space-y-0.5 pl-1">
                          <p className="text-[10px] text-gray-400">
                            • Users from East Asia had a{' '}
                            <span className="text-purple-400">17%</span> drop...
                          </p>
                          <p className="text-[10px] text-gray-400">
                            • European users had a drop to{' '}
                            <span className="text-purple-400">21.8%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chart Preview */}
                  <div className="bg-slate-950 rounded-md p-2 mb-2">
                    <div className="h-10 flex items-end justify-between gap-0.5">
                      {[45, 55, 65, 50, 70, 60, 75, 65, 80, 70, 85].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Tell me"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-gray-400 placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Execute Plan Flow - Tighter spacing, smaller arrows, text-xs */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-center">
                  <ArrowRight className="text-gray-600 mb-0.5" size={20} />
                  <p className="text-gray-600 text-xs leading-tight">Execute Plan</p>
                  <p className="text-gray-700 text-xs leading-tight">(Data Query)</p>
                </div>
                <ArrowDown className="text-gray-600" size={20} />
                <div className="text-center">
                  <p className="text-gray-600 text-xs leading-tight mb-0.5">Data</p>
                  <p className="text-gray-700 text-xs leading-tight">Response</p>
                  <ArrowLeft className="text-gray-600 mt-0.5" size={20} />
                </div>
              </div>

              {/* Proprietary Analytics Engine - Reduced width/padding, titles text-xl, content text-base/sm */}
              <div className="w-[30%] min-w-[280px]">
                <div className="bg-slate-900 bg-opacity-60 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <h2 className="text-xl font-bold text-white mb-4 leading-tight">
                    Proprietary<br />Analytics Engine
                  </h2>

                  {/* Graph Visualization - Size reduced slightly */}
                  <div className="mb-4">
                    <svg width="90" height="60" viewBox="0 0 110 80" className="mx-auto">
                      {/* Grid Lines */}
                      <line x1="15" y1="10" x2="15" y2="65" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="15" y1="65" x2="100" y2="65" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                      {/* Curve */}
                      <path 
                        d="M 15 65 Q 35 55, 50 40 T 85 25" 
                        fill="none" 
                        stroke="#a855f7" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Start point */}
                      <circle cx="15" cy="65" r="2.5" fill="#a855f7" />
                    </svg>
                  </div>

                  {/* Text Content - Increased size */}
                  <div className="space-y-0.5 text-left w-full max-w-xs">
                    <p className="text-white font-semibold text-base">Data API</p>
                    <p className="text-gray-400 text-sm">Rigorous Data Analysis with</p>
                    <p className="text-base">
                      <span className="text-purple-500 font-bold">No</span>{' '}
                      <span className="text-gray-400">Hallucinations</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Query Flow - Tighter spacing, text-xs */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-center">
                  <p className="text-purple-400 text-xs font-semibold leading-tight">Tens of</p>
                  <p className="text-purple-400 text-xs font-semibold leading-tight">Thousands</p>
                  <p className="text-purple-400 text-xs font-semibold mb-0.5 leading-tight">of Queries</p>
                </div>
                <ArrowRight className="text-gray-600" size={20} />
                <div className="text-center mt-1">
                  <ArrowLeft className="text-gray-600 mb-0.5" size={20} />
                  <p className="text-gray-600 text-xs leading-tight">Data</p>
                </div>
              </div>

              {/* Proprietary Compute Engine - Reduced width/padding, titles text-xl, content text-base/sm */}
              <div className="w-[20%] min-w-[200px]">
                <div className="bg-slate-900 bg-opacity-60 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-white leading-tight">
                      Proprietary<br />Compute Engine
                    </h2>
                    <div className="bg-slate-950 rounded-md p-1.5">
                      <Cpu className="text-purple-400" size={24} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm font-semibold leading-tight">Instant Data Analysis:</p>
                    <div className="flex items-start gap-1">
                      <span className="text-purple-400 font-bold text-base leading-none">&gt;600x</span>
                      <span className="text-gray-300 text-sm leading-none">faster query speed</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-purple-400 font-bold text-base leading-none">&gt;4,600x</span>
                      <span className="text-gray-300 text-sm leading-none">cheaper compute cost</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-purple-500 font-bold text-base leading-none">No</span>
                      <span className="text-gray-300 text-sm leading-none">Compute Costs per Query</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;