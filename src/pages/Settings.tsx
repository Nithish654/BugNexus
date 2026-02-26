import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Key, 
  Moon, 
  Sun,
  Monitor,
  Check,
  Save,
  Trash2,
  AlertCircle
} from 'lucide-react';
import Layout from '../components/Layout';
import { cn } from '../utils/cn';
import { historyService } from '../services/historyService';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Configuration', icon: Key },
    { id: 'data', label: 'Data Management', icon: Shield },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const handleClearHistory = () => {
    historyService.clearHistory();
    setShowDeleteConfirm(false);
  };

  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          <p className="text-zinc-500">Manage your account preferences and application settings.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs Sidebar */}
          <aside className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                  activeTab === tab.id 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Tab Content */}
          <main className="flex-1">
            <div className="bg-zinc-900/50 border border-border rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-500/20">
                        DU
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Demo User</h3>
                        <p className="text-zinc-500 text-sm">Pro Plan Member</p>
                        <button className="mt-2 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                          Change Avatar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Full Name</label>
                        <input 
                          type="text" 
                          defaultValue="Demo User"
                          className="w-full bg-zinc-800/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue="demo@bugnexus.ai"
                          className="w-full bg-zinc-800/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'appearance' && (
                  <motion.div
                    key="appearance"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Theme Preference</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-zinc-800/30 hover:bg-zinc-800/50 transition-all">
                          <Sun className="w-6 h-6 text-zinc-500" />
                          <span className="text-xs font-bold">Light</span>
                        </button>
                        <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-500/5 transition-all">
                          <Moon className="w-6 h-6 text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-500">Dark</span>
                        </button>
                        <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-zinc-800/30 hover:bg-zinc-800/50 transition-all">
                          <Monitor className="w-6 h-6 text-zinc-500" />
                          <span className="text-xs font-bold">System</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Accent Color</h3>
                      <div className="flex gap-4">
                        {['emerald', 'blue', 'purple', 'rose', 'amber'].map((color) => (
                          <button 
                            key={color}
                            className={cn(
                              "w-8 h-8 rounded-full border-2 border-transparent transition-all",
                              color === 'emerald' && "bg-emerald-500 border-white/20 scale-110",
                              color === 'blue' && "bg-blue-500",
                              color === 'purple' && "bg-purple-500",
                              color === 'rose' && "bg-rose-500",
                              color === 'amber' && "bg-amber-500"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'api' && (
                  <motion.div
                    key="api"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-4">
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-amber-500">API Access</h4>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                          Your API keys grant full access to your account. Keep them secure and never share them in public repositories.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Public API Key</label>
                        <div className="flex gap-2">
                          <input 
                            type="password" 
                            readOnly
                            value="bn_live_51MvX8S..."
                            className="flex-1 bg-zinc-800/50 border border-border rounded-xl px-4 py-2.5 outline-none font-mono text-xs"
                          />
                          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold transition-colors border border-border">
                            Copy
                          </button>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                        Regenerate API Key
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'data' && (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-red-500">Danger Zone</h3>
                      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm">Clear Audit History</h4>
                            <p className="text-xs text-zinc-500 mt-1">Permanently delete all your previous test reports.</p>
                          </div>
                          <button 
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-red-500/20"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="pt-4 border-t border-red-500/10 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm">Delete Account</h4>
                            <p className="text-xs text-zinc-500 mt-1">This action is irreversible and will delete all data.</p>
                          </div>
                          <button className="px-4 py-2 bg-zinc-800 hover:bg-red-500 rounded-xl text-xs font-bold transition-all border border-border">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 pt-8 border-t border-border flex justify-end gap-4">
                <button className="px-6 py-2.5 text-sm font-bold text-zinc-500 hover:text-zinc-300 transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 min-w-[140px] justify-center"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-zinc-900 border border-border rounded-3xl p-8 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-6">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Are you sure?</h3>
              <p className="text-zinc-500 text-center mb-8">
                This will permanently delete all your audit history. This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClearHistory}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-500/20"
                >
                  Yes, Clear All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function AnimatePresence({ children, mode }: { children: React.ReactNode, mode?: "wait" | "popLayout" | "sync" }) {
  const { AnimatePresence: AP } = require('motion/react');
  return <AP mode={mode}>{children}</AP>;
}
