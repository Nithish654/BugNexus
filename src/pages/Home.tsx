import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Zap, Search, CheckCircle, Github, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: "Functional Testing",
    description: "AI-powered analysis of your website's core functionality and user flows."
  },
  {
    icon: <Search className="w-6 h-6 text-cyan-400" />,
    title: "Broken Link Detection",
    description: "Automatically identify and report dead links across your entire site."
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Instant Reports",
    description: "Get structured QA reports in seconds, not hours or days."
  }
];

const steps = [
  { number: "01", title: "Enter URL", description: "Provide the link to the website you want to test." },
  { number: "02", title: "AI Crawls", description: "Our AI agents navigate and analyze your site structure." },
  { number: "03", title: "Get Report", description: "Receive a detailed QA report with actionable insights." }
];

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1"
    >
      {/* Navigation */}
      <nav className="border-b border-border py-4 px-6 flex justify-between items-center glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight">BugNexus <span className="text-emerald-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <Link to="/select-type" className="text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Automated AI Website <br />
              <span className="gradient-text">Testing in Seconds</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop manually clicking through pages. Enter a URL and get instant, 
              AI-generated functional test reports for your web applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/select-type" className="btn-primary flex items-center gap-2 group">
                Start Testing Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-white/5 transition-colors">
                See How it Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 border-y border-border bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple 3-Step Process</h2>
            <p className="text-zinc-400">From URL to QA report in under a minute.</p>
          </div>
          
          <div className="grid md:grid-row-3 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative p-8 rounded-2xl border border-border bg-card/50">
                <span className="text-4xl font-bold text-emerald-500/20 absolute top-4 right-6 font-mono">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-border flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-emerald-500 w-5 h-5" />
            <span className="font-bold">BugNexus AI</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="https://www.linkedin.com/in/nithish-v-j-551741250" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
            <a href="https://github.com/Nithish654" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
          
          <p className="text-xs text-zinc-600">
            © 2026 BugNexus AI. Developed by Nithish V J.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
