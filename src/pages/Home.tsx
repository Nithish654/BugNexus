import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Zap, Search, CheckCircle, Github, ArrowRight, Globe, Code, Cpu, Sparkles, Star } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: "Functional Testing",
    description: "AI-powered analysis of your website's core functionality and user flows using advanced neural agents."
  },
  {
    icon: <Search className="w-6 h-6 text-cyan-400" />,
    title: "Broken Link Detection",
    description: "Automatically identify and report dead links and 404 errors across your entire site structure."
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Instant QA Reports",
    description: "Get professional, structured QA reports in seconds, complete with business impact and recommendations."
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-400" />,
    title: "Lighthouse Integration",
    description: "Full performance, SEO, accessibility, and best practices audit integrated directly into every report."
  },
  {
    icon: <Code className="w-6 h-6 text-rose-400" />,
    title: "Code Quality",
    description: "Analysis of meta tags, form structures, and button accessibility to ensure enterprise-grade standards."
  },
  {
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    title: "Neural Crawling",
    description: "Our agents navigate your site like real users, identifying friction points and usability bottlenecks."
  }
];

const steps = [
  { number: "01", title: "Enter URL", description: "Provide the link to the website you want to test. No setup required." },
  { number: "02", title: "AI Crawls", description: "Our AI agents navigate and analyze your site structure in real-time." },
  { number: "03", title: "Get Report", description: "Receive a detailed QA report with actionable insights and health scores." }
];

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 selection:bg-emerald-500/30"
    >
      {/* Navigation */}
      <nav className="border-b border-border/50 py-4 px-6 md:px-12 flex justify-between items-center glass sticky top-0 z-50 backdrop-blur-xl bg-background/80">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="font-black text-2xl tracking-tighter">BugNexus <span className="text-emerald-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-black uppercase tracking-widest text-zinc-500">
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Process</a>
          <Link to="/select-type" className="text-white bg-emerald-500 px-6 py-2.5 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-border mb-8 shadow-2xl">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Next-Gen QA Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
              Automated QA <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Testing in Seconds</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Stop manually clicking through pages. Enter a URL and let our neural agents generate 
              enterprise-grade functional test reports for your web applications instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/select-type" className="w-full sm:w-auto px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-lg transition-all shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-3 group active:scale-95">
                Start Testing Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-lg border border-border hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                See How it Works
              </a>
            </div>

            {/* Social Proof / Stats */}
            <div className="mt-24 pt-12 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Audit Speed', val: '< 60s' },
                { label: 'Accuracy', val: '99.9%' },
                { label: 'Issues Found', val: '1M+' },
                { label: 'Active Users', val: '10k+' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.val}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 border-y border-border/50 bg-zinc-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Simple 3-Step Process</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">From URL to professional QA report in under a minute. No configuration required.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="relative p-10 rounded-3xl border border-border bg-zinc-900/50 backdrop-blur-sm group hover:border-emerald-500/50 transition-all duration-500"
              >
                <span className="text-7xl font-black text-emerald-500/5 absolute top-4 right-8 font-mono group-hover:text-emerald-500/10 transition-colors">
                  {step.number}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{step.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Enterprise Features</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">Everything you need to ensure your web applications are production-ready.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="flex flex-col items-start gap-6 p-8 rounded-3xl border border-border/50 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-border flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-emerald-500 to-cyan-600 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full -ml-32 -mb-32" />
          
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Ready to ship <br />bug-free code?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of developers who trust BugNexus AI for their automated QA needs.
          </p>
          <Link to="/select-type" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-emerald-600 rounded-2xl font-black text-xl hover:bg-zinc-100 transition-all shadow-xl active:scale-95">
            Get Started for Free
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-20 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-6 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Zap className="text-white w-5 h-5 fill-current" />
                </div>
                <span className="font-black text-xl tracking-tighter">BugNexus AI</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                The world's most advanced AI-powered QA testing platform for modern web applications.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/Nithish654" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/nithish-v-j-551741250" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all">
                  <Star className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300">Product</h4>
                <ul className="space-y-3 text-sm font-medium text-zinc-500">
                  <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Process</a></li>
                  <li><Link to="/select-type" className="hover:text-emerald-400 transition-colors">Launch App</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300">Company</h4>
                <ul className="space-y-3 text-sm font-medium text-zinc-500">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300">Legal</h4>
                <ul className="space-y-3 text-sm font-medium text-zinc-500">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">
              © 2026 BugNexus AI. Developed by Nithish V J.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-600 font-bold uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
