// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { 
//   Upload, 
//   Zap, 
//   MessageSquare, 
//   TrendingUp, 
//   Lock, 
//   Layers, 
//   Rocket, 
//   ArrowRight,
//   Database,
//   FileSpreadsheet,
//   FileText,
//   Sparkles
// } from "lucide-react";
// import heroDashboard from "@/assets/hero-dashboard.png";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         {/* Animated gradient background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
        
//         {/* Floating particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <motion.div
//             className="absolute top-20 left-[10%] w-2 h-2 bg-primary/30 rounded-full"
//             animate={{ y: [0, -30, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <motion.div
//             className="absolute top-40 right-[15%] w-3 h-3 bg-secondary/30 rounded-full"
//             animate={{ y: [0, -40, 0] }}
//             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//           />
//           <motion.div
//             className="absolute bottom-40 left-[20%] w-2 h-2 bg-accent/30 rounded-full"
//             animate={{ y: [0, -25, 0] }}
//             transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//           />
//         </div>

//         <div className="relative container mx-auto px-4 py-24 md:py-32">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-5xl mx-auto"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 mb-8 shadow-soft"
//             >
//               <Sparkles className="w-4 h-4 text-primary" />
//               <span className="text-sm font-medium text-foreground">AI-Powered Data Intelligence</span>
//             </motion.div>

//             <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//               Your Data.{" "}
//               <span className="gradient-text">Your Answers.</span>
//               <br />
//               Instantly.
//             </h1>

//             <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
//               Upload any dataset and let DataGPT turn it into instant, intelligent insights.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Button variant="hero" size="lg" className="group">
//                 Try DataGPT
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button variant="hero-outline" size="lg">
//                 Watch Demo
//               </Button>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="mt-20"
//             >
//               <img
//                 src={heroDashboard}
//                 alt="DataGPT Dashboard Interface"
//                 className="rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] mx-auto hover-lift w-full max-w-5xl"
//               />
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-24 md:py-32 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Get started in four simple steps
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//             {[
//               {
//                 icon: Upload,
//                 step: "01",
//                 title: "Upload your data",
//                 description: "CSV, Excel, PDF, text, or connect your database"
//               },
//               {
//                 icon: Zap,
//                 step: "02",
//                 title: "AI learns instantly",
//                 description: "Our AI understands your data structure and context"
//               },
//               {
//                 icon: MessageSquare,
//                 step: "03",
//                 title: "Ask any question",
//                 description: "Natural language queries, no SQL required"
//               },
//               {
//                 icon: TrendingUp,
//                 step: "04",
//                 title: "Get actionable insights",
//                 description: "Clear answers with visualizations and recommendations"
//               }
//             ].map((step, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="glass-card rounded-2xl p-8 hover-lift group"
//               >
//                 <div className="flex items-start justify-between mb-6">
//                   <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-soft group-hover:shadow-medium transition-all">
//                     <step.icon className="w-7 h-7" />
//                   </div>
//                   <span className="text-5xl font-bold text-muted-foreground/20 group-hover:text-primary/30 transition-colors">
//                     {step.step}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">{step.title}</h3>
//                 <p className="text-muted-foreground leading-relaxed">{step.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Live Demo Section */}
//       <section className="py-24 md:py-32">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">See It In Action</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Ask questions in plain English, get instant answers
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto glass-card rounded-3xl p-8 shadow-medium"
//           >
//             <div className="space-y-6">
//               {/* User Message */}
//               <div className="flex justify-end">
//                 <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl rounded-tr-sm px-6 py-4 max-w-md shadow-soft">
//                   <p className="font-medium">What was our best product last quarter?</p>
//                 </div>
//               </div>

//               {/* AI Response */}
//               <div className="flex justify-start">
//                 <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-6 py-4 max-w-md shadow-soft">
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
//                       <Sparkles className="w-4 h-4 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-foreground mb-2">
//                         Product A was your best performer with <span className="text-primary font-bold">27% revenue growth</span>.
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         It generated $2.4M in Q4, outperforming Product B by 15%.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Typing indicator */}
//               <div className="flex justify-start">
//                 <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-6 py-4">
//                   <div className="flex gap-2">
//                     <motion.div
//                       className="w-2 h-2 bg-muted-foreground/40 rounded-full"
//                       animate={{ scale: [1, 1.2, 1] }}
//                       transition={{ duration: 1, repeat: Infinity, delay: 0 }}
//                     />
//                     <motion.div
//                       className="w-2 h-2 bg-muted-foreground/40 rounded-full"
//                       animate={{ scale: [1, 1.2, 1] }}
//                       transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
//                     />
//                     <motion.div
//                       className="w-2 h-2 bg-muted-foreground/40 rounded-full"
//                       animate={{ scale: [1, 1.2, 1] }}
//                       transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Key Features Section */}
//       <section className="py-24 md:py-32 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Why teams love DataGPT</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Everything you need to turn data into decisions
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
//             {[
//               {
//                 icon: Zap,
//                 title: "Instant Learning",
//                 description: "Understands any data format instantly — CSV, Excel, PDFs, databases, and more. No setup, no configuration.",
//                 gradient: "from-primary to-accent"
//               },
//               {
//                 icon: Layers,
//                 title: "Flexible Integration",
//                 description: "Works seamlessly with your existing tools and workflows. Connect databases, upload files, or use our API.",
//                 gradient: "from-secondary to-primary"
//               },
//               {
//                 icon: Lock,
//                 title: "Private & Secure",
//                 description: "Your data stays yours. Enterprise-grade encryption, zero data retention, and full compliance.",
//                 gradient: "from-accent to-secondary"
//               },
//               {
//                 icon: Rocket,
//                 title: "Scalable Intelligence",
//                 description: "From startups to enterprises, DataGPT scales with your needs. Handle millions of records effortlessly.",
//                 gradient: "from-primary to-secondary"
//               }
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="glass-card rounded-3xl p-8 hover-lift group"
//               >
//                 <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-soft group-hover:shadow-medium transition-all`}>
//                   <feature.icon className="w-8 h-8" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
//                 <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-24 md:py-32">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by teams worldwide</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Join thousands of data-driven teams
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {[
//               {
//                 quote: "DataGPT feels like having a data scientist who never sleeps. It's transformed how our team makes decisions.",
//                 author: "Priya Sharma",
//                 role: "Analytics Lead @ FlowTech",
//                 avatar: "PS"
//               },
//               {
//                 quote: "We cut our data analysis time by 80%. The insights are instant and incredibly accurate.",
//                 author: "Marcus Chen",
//                 role: "CTO @ DataStream",
//                 avatar: "MC"
//               },
//               {
//                 quote: "Finally, a tool that speaks human. No more waiting for SQL queries or struggling with complex dashboards.",
//                 author: "Sarah Johnson",
//                 role: "VP Operations @ Nexus",
//                 avatar: "SJ"
//               }
//             ].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="glass-card rounded-3xl p-8 hover-lift"
//               >
//                 <p className="text-lg text-foreground mb-6 leading-relaxed italic">
//                   "{testimonial.quote}"
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-soft">
//                     {testimonial.avatar}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-foreground">{testimonial.author}</p>
//                     <p className="text-sm text-muted-foreground">{testimonial.role}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 md:py-32 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
//         <div className="container mx-auto px-4 relative">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h2 className="text-5xl md:text-6xl font-bold mb-6">
//               Start transforming your data{" "}
//               <span className="gradient-text">today</span>
//             </h2>
//             <p className="text-xl md:text-2xl text-muted-foreground mb-12">
//               DataGPT makes data intelligence effortless.
//             </p>
//             <Button variant="hero" size="lg" className="text-lg group shadow-[0_10px_40px_-10px_rgba(56,189,248,0.5)]">
//               Get Started Free
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-border bg-white/50 backdrop-blur-sm">
//         <div className="container mx-auto px-4 py-12">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
//                 <Database className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl font-bold gradient-text">DataGPT</span>
//             </div>

//             <nav className="flex gap-8">
//               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
//               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API</a>
//               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Docs</a>
//               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
//             </nav>

//             <div className="flex gap-4">
//               <a href="#" className="w-10 h-10 rounded-full bg-muted hover:bg-muted-foreground/10 flex items-center justify-center transition-colors">
//                 <span className="sr-only">Twitter</span>
//                 <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                 </svg>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-muted hover:bg-muted-foreground/10 flex items-center justify-center transition-colors">
//                 <span className="sr-only">LinkedIn</span>
//                 <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                 </svg>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-muted hover:bg-muted-foreground/10 flex items-center justify-center transition-colors">
//                 <span className="sr-only">GitHub</span>
//                 <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
//                   <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
//             © 2025 DataGPT. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;
