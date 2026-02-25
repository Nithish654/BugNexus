import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SelectType from './pages/SelectType';
import Dashboard from './pages/Dashboard';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const basename = import.meta.env.MODE === 'production' ? '/BugNexus' : '';
  
  return (
    <Router basename={basename}>
      <div className="min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/select-type" element={<SelectType />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
