import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Mail, MessageSquare, Video, Calendar, Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { ResponsiveLine } from '@nivo/line';

const Product = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [chartProgress, setChartProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setChartProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 30);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      title: 'Proactive Insights',
      subtitle: 'Let your data speak to you',
      description: 'Set up custom Daily Summaries and Email Notifications that proactively analyze your data and highlight critical anomalies, trends, and key drivers.',
      image: 'proactive',
      icons: [
        { Icon: Mail, color: '#EA4335' },
        { Icon: MessageSquare, color: '#34A853' },
        { Icon: Video, color: '#4285F4' },
        { Icon: Calendar, color: '#FBBC04' }
      ]
    },
    {
      title: 'Freely explore your data',
      subtitle: 'The Data Navigator',
      description: 'The Data Navigator empowers every team member to explore data with ease. View key metrics, drill down into details, and uncover the "why" behind changes, all with complete accuracy.',
      image: 'navigator',
      showTable: true
    },
    {
      title: 'High question comprehension and flexibility',
      subtitle: 'AI Data Engineer',
      description: 'Set up your data once to get reliable answers every time. Our schema configuration incorporates your data definition, metric calculations and business context to ensure consistent and meaningful insights.',
      image: 'configuration',
      showForms: true
    },
    {
      title: 'Executes thousands of queries and statistical tests in milliseconds',
      subtitle: 'Zero hallucinations',
      description: "datomly's unique architecture overcomes the limitations of traditional Generative AI, delivering rapid, trustworthy analytics with zero hallucinations.",
      image: 'queries',
      showScatter: true
    }
  ];

  // Chart data for revenue trends
  const revenueData = [
    {
      id: "Revenue",
      data: [
        { x: "Jul 1", y: 82 },
        { x: "Jul 8", y: 75 },
        { x: "Jul 15", y: 88 },
        { x: "Jul 22", y: 95 },
        { x: "Jul 29", y: 92 },
        { x: "Aug 5", y: 85 },
        { x: "Aug 12", y: 78 },
        { x: "Aug 19", y: 88 },
        { x: "Aug 26", y: 98 },
        { x: "Sep 2", y: 85 },
        { x: "Sep 9", y: 72 },
        { x: "Sep 16", y: 68 },
        { x: "Sep 23", y: 62 },
        { x: "Sep 30", y: 58 }
      ]
    }
  ];

  // Scatter plot data
  const scatterData = Array.from({ length: 120 }, (_, i) => ({
    x: Math.random() * 2500 + 500,
    y: Math.random() * 50 + 30 + (i * 0.15)
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section with "BI is outdated" */}
      <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
            backgroundSize: '3rem 3rem',
          }}
        ></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-semibold mb-8 fade-in-up">
    <Sparkles className="w-4 h-4" />
    <span>Product</span>
  </div>

  <h1 className="text-5xl font-extrabold sm:text-6xl md:text-7xl text-white leading-[1.1] fade-in-up mb-8">
    Your data. <span className="text-purple-400">Infinitely smarter.</span>
  </h1>

  <p className="mt-8 max-w-3xl mx-auto text-xl leading-relaxed text-gray-300 fade-in-up">
    datomly is an advanced AI platform that learns from any kind of data — Excel, CSV, PDF, databases, or text — and gives you instant, intelligent answers. 
    It’s like having your own private ChatGPT trained on your data, ready to uncover insights, visualize patterns, and drive smarter decisions — all without code.
  </p>

  <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400 fade-in-up">
    Upload your data → Ask anything → Get instant, human-like insights.
  </p>
</div>

      </section>

      {/* Q&A Section */}
      <section className="bg-black py-20 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold text-white mb-4 slide-in-left">
              Q&A at Your Fingertips
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed slide-in-left">
              Know what you're looking for? Simply ask datomly in natural language and receive analyst-grade answers in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Proactive Insights */}
      <section className="relative bg-black py-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:flex lg:items-center lg:gap-16">
          
          {/* Left: Dashboard Preview (Resized) */}
          <div className="w-full lg:w-[40%] slide-in-left">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">datomly</div>
                    <div className="text-xs text-purple-100">Detailed Breakdown</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {sections[0].icons.map((item, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md float-animation"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <item.Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-gray-50">
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-600 mb-2">Detailed Breakdown:</div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>The earnings from Outliers categories have declined by <span className="font-bold text-red-600">$680.94</span>, moving from $31,171.21 to $30,490.27. This is a decrease of <span className="font-bold">2.2%</span>.</span>
                    </li>
                  </ul>
                </div>

                {/* Mini Stats */}
                <div className="flex items-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-gray-200 rounded text-gray-700 font-medium">100% stack</span>
                  <span className="px-2 py-1 bg-gray-200 rounded text-gray-700 font-medium">Relative stack</span>
                  <span className="px-2 py-1 bg-indigo-600 text-white rounded font-medium">Bar chart</span>
                  <span className="px-2 py-1 bg-gray-200 rounded text-gray-700 font-medium">line chart</span>
                </div>

                {/* Chart with Nivo */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm" style={{ opacity: chartProgress / 100 }}>
                  <div className="h-64">
                    <ResponsiveLine
                      data={revenueData}
                      margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
                      xScale={{ type: 'point' }}
                      yScale={{ type: 'linear', min: 0, max: 100 }}
                      curve="monotoneX"
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: '',
                        legendOffset: 36
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: -40
                      }}
                      colors={['#8b5cf6']}
                      pointSize={6}
                      pointColor={{ from: 'color' }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: 'seriesColor' }}
                      enableArea={true}
                      areaOpacity={0.1}
                      useMesh={true}
                      enableGridX={false}
                      theme={{
                        axis: {
                          ticks: {
                            text: { fontSize: 10, fill: '#6b7280' }
                          }
                        },
                        grid: {
                          line: { stroke: '#e5e7eb', strokeWidth: 1 }
                        }
                      }}
                    />
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs border-t pt-3">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-red-600 font-bold">▼ Decreased</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 font-bold">▲ Increased</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tooltip */}
                <div className="mt-4 bg-slate-800 text-white rounded-lg px-4 py-3 text-xs inline-block shadow-lg">
                  <div className="font-bold">Nov 22, Wednesday</div>
                  <div className="mt-1">● 5.88.4k</div>
                  <div className="text-red-400">Change: <span className="font-bold">+55.9%</span></div>
                  <div className="text-gray-400">% change: <span className="font-bold">+17%</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content (Resized) */}
          <div className="w-full lg:w-[60%] mt-12 lg:mt-0 slide-in-right">
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
              {sections[0].title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {sections[0].description}
            </p>
            <div className="flex gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-lg font-semibold text-white mb-2">Automated Daily Reports</div>
                <p className="text-gray-400">Get comprehensive insights delivered to your inbox every morning</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-lg font-semibold text-white mb-2">Anomaly Detection</div>
                <p className="text-gray-400">Instantly spot unusual patterns and outliers in your data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Data Navigator */}
      <section className="relative bg-black py-24 border-t border-slate-800">
        <div className="mx-auto max-w-[1600px] px-6 lg:flex lg:items-center lg:gap-16">
          
          {/* Left: Text Content (Resized) */}
          <div className="w-full lg:w-[60%] slide-in-left">
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
              {sections[1].title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {sections[1].description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300">Interactive drill-downs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300">Multi-dimensional analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300">Real-time trend identification</span>
              </div>
            </div>
          </div>

          {/* Right: Table Preview (Resized) */}
          <div className="w-full lg:w-[40%] mt-12 lg:mt-0 slide-in-right">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              
              {/* Header Tabs */}
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center gap-6 text-sm">
                  <button className="font-semibold text-gray-900 border-b-2 border-indigo-600 pb-2">IMPACT #1</button>
                  <button className="font-medium text-gray-500 hover:text-gray-700">VALUE</button>
                  <button className="font-medium text-gray-500 hover:text-gray-700">CHANGE</button>
                  <button className="font-medium text-gray-500 hover:text-gray-700">EVENTS</button>
                  <button className="font-medium text-gray-500 hover:text-gray-700">DRILLLINE</button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-sm font-bold text-gray-900 mb-1">Revenue <span className="text-green-600">+16.41%</span></div>
                  <div className="text-xs text-gray-600">$1.56m <span className="text-green-600">+$1.16m</span> 16</div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-bold text-gray-700 mb-2">Browser: Chrome <span className="text-red-600">+18.67%</span></div>
                  <div className="h-40 mb-4">
                    <ResponsiveLine
                      data={[{
                        id: "trend",
                        data: [
                          { x: "Jul 1", y: 45 },
                          { x: "Jul 8", y: 52 },
                          { x: "Jul 15", y: 65 },
                          { x: "Jul 22", y: 75 },
                          { x: "Jul 29", y: 85 },
                          { x: "Aug 5", y: 82 },
                          { x: "Aug 12", y: 78 }
                        ]
                      }]}
                      margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                      xScale={{ type: 'point' }}
                      yScale={{ type: 'linear', min: 0, max: 100 }}
                      curve="natural"
                      colors={['#f59e0b']}
                      pointSize={0}
                      enableArea={true}
                      areaOpacity={0.2}
                      useMesh={true}
                      enableGridX={false}
                      axisBottom={{
                        tickSize: 0,
                        tickPadding: 8,
                        tickRotation: 0
                      }}
                      axisLeft={{
                        tickSize: 0,
                        tickPadding: 8
                      }}
                      theme={{
                        axis: {
                          ticks: {
                            text: { fontSize: 9, fill: '#9ca3af' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-y border-gray-200">
                      <tr>
                        <th className="text-left py-2 px-3 font-semibold text-gray-700">Key Drivers</th>
                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Related metrics</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-3 font-medium text-gray-900">United States (US)</td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-green-600 font-bold">+ $2.32m</span>
                          <span className="text-gray-500 ml-2">$8.66m</span>
                          <span className="text-green-600 ml-2">+ $1.12m</span>
                          <span className="text-gray-500 ml-2">16</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-medium text-gray-900">Mexico (MX)</td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-green-600 font-bold">+ $2.89m</span>
                          <span className="text-gray-500 ml-2">$2.89m</span>
                          <span className="text-green-600 ml-2">+ $2.89m</span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-3 text-gray-500">Social Engagement Type: Not Socially Engaged</td>
                        <td className="py-3 px-3 text-right text-gray-400">+$1.32k +$1.33k +$1.18k</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-3 text-gray-500">Time On Site Bucket: 901+ seconds</td>
                        <td className="py-3 px-3 text-right text-gray-400">+$2.41k +$1.53k +$7.89k</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-medium text-gray-900">Country: United States (US)</td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-gray-500">$5.78k</span>
                          <span className="text-green-600 ml-2">+$629k</span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-3 text-gray-500">Traffic Domain source (Including direct traffic)</td>
                        <td className="py-3 px-3 text-right text-gray-400">+$1.10k +$880k</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Question Comprehension */}
      <section className="relative bg-black py-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:flex lg:items-center lg:gap-16">
          
          {/* Left: Forms Preview (Resized) */}
          <div className="w-full lg:w-[40%] slide-in-left">
            <div className="space-y-4">
              
              {/* Getting Started Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Getting Started with<br/>AI Data Engineer</h3>
                <div className="text-xs text-gray-600 mb-6">
                  Our AI onboarding assistants are guiding you with information to customize your deployment.
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-800 mb-2">Analysis Goals</div>
                    <div className="text-xs text-gray-600 mb-2">What are the important analysis goals for you and your team?</div>
                    <textarea 
                      className="w-full border border-gray-300 rounded-lg p-3 text-xs resize-none" 
                      rows={3}
                      placeholder="Analyze success relative to improve engagement strategies, segment..."
                      disabled
                    ></textarea>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-gray-800 mb-2">Company Description</div>
                    <div className="text-xs text-gray-600 mb-2">Provide a brief description of your company and its operations.</div>
                    <textarea 
                      className="w-full border border-gray-300 rounded-lg p-3 text-xs resize-none" 
                      rows={2}
                      placeholder="We run a small company specializing in furniture sales. We sell products, offering a wide range of products from various brands."
                      disabled
                    ></textarea>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-gray-800 mb-2">Data Type</div>
                    <div className="text-xs text-gray-600 mb-2">What type of data do you primarily work with?</div>
                    <textarea 
                      className="w-full border border-gray-300 rounded-lg p-3 text-xs resize-none" 
                      rows={2}
                      placeholder="Transactional 'sale' for sales data, customer 'data' for demographic information, product 'data' for inventory details."
                      disabled
                    ></textarea>                  
                  </div>
                  
                  <button className="w-full bg-indigo-600 text-white rounded-lg py-3 text-sm font-semibold hover:bg-indigo-700 transition">
                    Submit
                  </button>
                  
                  <button className="w-full text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    Need help? Contact us
                  </button>
                </div>
              </div>

              {/* Results Panel -- UPDATED CODE HERE */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Results</h3>
                  <button className="text-xs text-indigo-600 font-medium">+ Add dimension</button>
                </div>
                <div className="text-xs text-gray-600 mb-4">Breakdown: Dimensions and Metrics</div>
                
                <div className="space-y-2">
                  {[
                    { name: 'Country', type: 'Categorical' },
                    { name: 'Product Category', type: 'Categorical' },
                    { name: 'Avg. Order Value', type: 'Continuous' },
                    { name: 'Units Sold', type: 'Discrete' },
                    { name: 'Transaction Date', type: 'Date' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-800 font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Processing</h3>
                <div className="text-xs text-gray-600 mb-4">The system processes the information.</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Ads Revenue per User</span>
                    <span className="text-gray-900 font-bold">$</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Sales</span>
                    <span className="text-gray-900 font-bold">$</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Number of Transactions</span>
                    <span className="text-gray-900 font-bold">$</span>
                  </div>
                </div>
                <button className="mt-6 text-indigo-600 text-xs font-medium hover:text-indigo-700">
                  Need help? Contact us
                </button>
              </div>
            </div>
          </div>

          {/* Right: Text Content (Resized) */}
          <div className="w-full lg:w-[60%] mt-12 lg:mt-0 slide-in-right">
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
              {sections[2].title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {sections[2].description}
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white mb-2">Intelligent Schema Mapping</div>
                  <p className="text-gray-400">Automatically understands your data structure and relationships</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white mb-2">Business Context Aware</div>
                  <p className="text-gray-400">Incorporates your specific business rules and definitions</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white mb-2">Consistent Results</div>
                  <p className="text-gray-400">Same question always yields the same accurate answer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Statistical Analysis */}
      <section className="relative bg-black py-24 border-t border-slate-800">
        <div className="mx-auto max-w-[1600px] px-6 lg:flex lg:items-center lg:gap-16">
          
          {/* Left: Text Content (Resized) */}
          <div className="w-full lg:w-[60%] slide-in-left">
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
              {sections[3].title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {sections[3].description}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-300">Lightning-fast query execution</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-gray-300">Advanced statistical modeling</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-gray-300">100% accurate, no hallucinations</span>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition group"
            >
              <span className="border-b border-purple-400 group-hover:border-purple-300">Learn more about datomly's architecture</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="mt-8">
              <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
                Schedule a Demo
              </button>
            </div>
          </div>

          {/* Right: Analysis Preview (Resized) */}
          <div className="w-full lg:w-[40%] mt-12 lg:mt-0 slide-in-right">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Summary:</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6 space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p>
                    • The analysis was conducted to understand the relationship between <span className="font-semibold">Revenue</span> and <span className="font-semibold">Transactions</span> from <span className="font-semibold">2016-08-01 to 2017-07-29</span>.
                  </p>
                  <p>
                    • The correlation coefficient between these metrics is <span className="font-bold text-indigo-600">0.647</span>, indicating a <span className="font-semibold">moderate to strong positive correlation</span>.
                  </p>
                  <p>
                    • The p-value for the correlation is <span className="font-bold text-green-600">0.0</span>, suggesting that the correlation is <span className="font-semibold">statistically significant</span>.
                  </p>
                  <p>
                    • However, the p-value for Granger causality from Transactions to Revenue is <span className="font-bold">0.514</span>, indicating <span className="font-semibold">no significant causal relationship</span> in that direction.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">Detailed Breakdown:</h4>
                  
                  {/* Stats Table */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-2 font-semibold text-gray-700">Metric</th>
                          <th className="text-right py-2 font-semibold text-gray-700">Total Value</th>
                          <th className="text-right py-2 font-semibold text-gray-700">Average Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-3 font-medium text-gray-900">Revenue</td>
                          <td className="py-3 text-right text-gray-700">1,518,098,700</td>
                          <td className="py-3 text-right text-gray-700">4,182,084.9</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-gray-900">Transactions</td>
                          <td className="py-3 text-right text-gray-700">11,986</td>
                          <td className="py-3 text-right text-gray-700">33.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Scatter Plot */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="h-64">
                      <div className="relative w-full h-full">
                        <svg width="100%" height="100%" viewBox="0 0 400 250">
                          {/* Grid lines */}
                          <line x1="40" y1="20" x2="40" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                          <line x1="40" y1="220" x2="380" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                          
                          {/* Y-axis labels */}
                          <text x="30" y="25" fontSize="10" fill="#6b7280" textAnchor="end">90</text>
                          <text x="30" y="70" fontSize="10" fill="#6b7280" textAnchor="end">80</text>
                          <text x="30" y="120" fontSize="10" fill="#6b7280" textAnchor="end">70</text>
                          <text x="30" y="170" fontSize="10" fill="#6b7280" textAnchor="end">60</text>
                          <text x="30" y="220" fontSize="10" fill="#6b7280" textAnchor="end">50</text>
                          
                          {/* X-axis labels */}
                          <text x="60" y="235" fontSize="10" fill="#6b7280" textAnchor="middle">500</text>
                          <text x="140" y="235" fontSize="10" fill="#6b7280" textAnchor="middle">1000</text>
                          <text x="220" y="235" fontSize="10" fill="#6b7280" textAnchor="middle">1500</text>
                          <text x="300" y="235" fontSize="10" fill="#6b7280" textAnchor="middle">2000</text>
                          <text x="380" y="235" fontSize="10" fill="#6b7280" textAnchor="middle">2500</text>
                          
                          {/* Scatter points */}
                          {scatterData.map((point, i) => {
                            const x = 40 + (point.x / 2500) * 340;
                            const y = 220 - ((point.y - 30) / 60) * 200;
                            return (
                              <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="2.5"
                                fill="#6366f1"
                                opacity="0.6"
                              />
                            );
                          })}
                          
                          {/* Trend line */}
                          <line 
                            x1="50" 
                            y1="180" 
                            x2="370" 
                            y2="60" 
                            stroke="#8b5cf6" 
                            strokeWidth="2" 
                            strokeDasharray="4,4"
                            opacity="0.7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-xs text-gray-600">
                        <span className="font-semibold">Correlation: 0.647</span> | Statistically significant (p = 0.0)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Product;