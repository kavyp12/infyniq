import React, { useState } from 'react';
import { Sparkles, Mail, CheckCircle, ArrowRight, Users, Zap, Lock } from 'lucide-react';

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Early Access',
      description: 'Be among the first to experience AI-powered data analysis'
    },
    {
      icon: Zap,
      title: 'Priority Onboarding',
      description: 'Get dedicated support to set up your data infrastructure'
    },
    {
      icon: Users,
      title: 'Founding Member Benefits',
      description: 'Exclusive pricing and features for early adopters'
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
        
        .product-sans {
          font-family: 'Product Sans', sans-serif;
        }
        
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Navbar */}
      <nav className="bg-black sticky top-0 z-50 product-sans">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-1.5">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img 
                  src="/datomly logo.png" 
                  alt="Datomly Logo" 
                  className="w-8 h-8 object-contain" 
                />
              </div>
              <span className="text-[30px] font-semibold text-white leading-none">
                datomly
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 product-sans">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                <Lock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6">
                Join the <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Future</span> of Data Analytics
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We're launching soon! Be the first to experience AI-powered analytics that learns from your data. Join our exclusive waitlist and get early access.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900">2,500+</div>
                  <div className="text-sm text-gray-600">On the waitlist</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Data sources supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">50ms</div>
                  <div className="text-sm text-gray-600">Average response time</div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              {!isSubmitted ? (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Join Waitlist</h2>
                      <p className="text-sm text-gray-600">Get notified when we launch</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors text-gray-900"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors text-gray-900"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors text-gray-900"
                        placeholder="Your Company"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !name || !email}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-full hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Joining...</span>
                        </>
                      ) : (
                        <>
                          <span>Join Waitlist</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-6 text-center">
                    By joining, you agree to receive updates about datomly. Unsubscribe anytime.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 sm:p-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 float-animation">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    You're on the list!
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    Thank you for joining our waitlist, <strong>{name}</strong>! We've sent a confirmation to <strong>{email}</strong>.
                  </p>
                  
                  <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-gray-900 mb-2">What happens next?</h3>
                    <ul className="text-sm text-gray-700 space-y-2 text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">1.</span>
                        <span>You'll receive updates as we approach launch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">2.</span>
                        <span>Get early access invitation before public release</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">3.</span>
                        <span>Exclusive founder pricing and premium features</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/"
                    className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                  >
                    <span>Back to Home</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white product-sans py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <a href="/" className="inline-flex items-center gap-1.5 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <img 
                src="/datomly logo.png" 
                alt="Datomly Logo" 
                className="w-8 h-8 object-contain" 
              />
            </div>
            <span className="text-[30px] font-semibold text-white leading-none">
              datomly
            </span>
          </a>
          <p className="text-gray-400 text-sm">
            © 2025 datomly. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default WaitlistPage;