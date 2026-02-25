import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  ShoppingCart, 
  BookOpen, 
  GraduationCap, 
  Newspaper, 
  Users,
  ChevronRight,
  Zap
} from 'lucide-react';
import { WebsiteType } from '../types';

const categories: { id: WebsiteType; name: string; icon: React.ReactNode; description: string }[] = [
  { 
    id: 'portfolio', 
    name: 'Personal / Portfolio', 
    icon: <User className="w-6 h-6" />, 
    description: 'Showcase sites, resumes, and creative portfolios.' 
  },
  { 
    id: 'business', 
    name: 'Business Websites', 
    icon: <Briefcase className="w-6 h-6" />, 
    description: 'Corporate sites, service providers, and agency pages.' 
  },
  { 
    id: 'ecommerce', 
    name: 'E-commerce Websites', 
    icon: <ShoppingCart className="w-6 h-6" />, 
    description: 'Online stores, marketplaces, and product catalogs.' 
  },
  { 
    id: 'blog', 
    name: 'Blog Websites', 
    icon: <BookOpen className="w-6 h-6" />, 
    description: 'Content-heavy sites, journals, and publications.' 
  },
  { 
    id: 'educational', 
    name: 'Educational Websites', 
    icon: <GraduationCap className="w-6 h-6" />, 
    description: 'Learning platforms, schools, and online courses.' 
  },
  { 
    id: 'news', 
    name: 'News Websites', 
    icon: <Newspaper className="w-6 h-6" />, 
    description: 'Dynamic news portals, magazines, and media sites.' 
  },
  { 
    id: 'saas', 
    name: 'SaaS / Web Apps', 
    icon: <Zap className="w-6 h-6" />, 
    description: 'Software platforms, dashboards, and complex web applications.' 
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
      className="min-h-screen bg-background flex flex-col"
    >
      <nav className="border-b border-border py-4 px-8 flex items-center justify-between glass sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight">BugNexus <span className="text-emerald-500">AI</span></span>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">What Type of Website Do You Want to Test?</h1>
          <p className="text-zinc-400">Select a category to help our AI focus on the right functional areas.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(category.id)}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left flex items-start gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                {category.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">{category.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{category.description}</p>
              </div>
              <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-emerald-500" />
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
