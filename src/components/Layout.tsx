import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: location.pathname === '/dashboard' },
    { icon: History, label: 'History', path: '/history', active: location.pathname === '/history' },
    { icon: Settings, label: 'Settings', path: '/settings', active: location.pathname === '/settings' },
  ];

  const handleLogout = () => {
    // For now, just redirect to home as there's no real auth
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-zinc-900/50 hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-lg tracking-tight">BugNexus <span className="text-emerald-500">AI</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                item.active 
                  ? "bg-emerald-500/10 text-emerald-400 font-medium shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active && "text-emerald-400")} />
              {item.label}
              {item.active && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight">BugNexus <span className="text-emerald-500">AI</span></span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-zinc-900 border-r border-border z-[70] lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Zap className="text-white w-5 h-5 fill-current" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">BugNexus <span className="text-emerald-500">AI</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all",
                      item.active 
                        ? "bg-emerald-500/10 text-emerald-400 font-medium" 
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    <ChevronRight className="ml-auto w-4 h-4 opacity-50" />
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-border">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-16 lg:pt-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
