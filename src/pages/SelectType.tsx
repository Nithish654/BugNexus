import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  ShoppingBag, 
  BookOpen, 
  Newspaper, 
  Layers, 
  ChevronRight,
  Zap,
  Star,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { WebsiteType } from '../types';

const categories: { id: WebsiteType; name: string; icon: any; description: string; color: string }[] = [
  { 
    id: 'saas', 
    name: 'SaaS / Web Apps', 
    icon: Layers, 
    description: 'Complex dashboards, user flows, and interactive components.',
    color: 'from-emerald-500 to-cyan-500'
  },
  { 
    id: 'ecommerce', 
    name: 'E-commerce', 
    icon: ShoppingBag, 
    description: 'Product listings, cart functionality, and checkout processes.',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'business', 
    name: 'Business Websites', 
    icon: Briefcase, 
    description: 'Corporate sites, service providers, and agency pages.',
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    id: 'portfolio', 
    name: 'Personal / Portfolio', 
    icon: User, 
    description: 'Showcase sites, resumes, and creative portfolios.',
    color: 'from-rose-500 to-pink-500'
  },
  { 
    id: 'educational', 
    name: 'Educational Websites', 
    icon: GraduationCap, 
    description: 'Learning platforms, schools, and online courses.',
    color: 'from-violet-500 to-purple-500'
  },
  { 
    id: 'news', 
    name: 'News Websites', 
    icon: Newspaper, 
    description: 'Dynamic news portals, magazines, and media sites.',
    color: 'from-emerald-400 to-teal-500'
  },
  { 
    id: 'blog', 
    name: 'Blog Websites', 
    icon: BookOpen, 
    description: 'Content-heavy sites, journals, and publications.',
    color: 'from-zinc-500 to-zinc-700'
  }
];

export default function SelectType() {
  const navigate = useNavigate();

  const handleSelect = (type: WebsiteType) => {
    navigate(`/dashboard?type=${type}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl w-full">
        <header className="text-center mb-16">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm font-black uppercase tracking-widest mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">
              <Zap className="w-3 h-3 fill-current" />
              Step 1: Configuration
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">What are we testing?</h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Select the category that best fits your website. Our AI agents will adjust their 
              testing heuristics based on your choice.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(category.id)}
              className="group relative flex flex-col items-start p-8 bg-zinc-900/50 border border-border rounded-[2rem] text-left transition-all hover:border-emerald-500/50 hover:bg-zinc-900 shadow-xl overflow-hidden"
            >
              {/* Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <category.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-emerald-400 transition-colors">{category.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium mb-8 flex-1">
                {category.description}
              </p>
              
              <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Select Category
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.button>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
            <Star className="w-3 h-3 text-emerald-500" />
            Specialized Neural Heuristics for each category
            <Star className="w-3 h-3 text-emerald-500" />
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
