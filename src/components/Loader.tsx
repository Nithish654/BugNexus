import { motion } from 'motion/react';

interface LoaderProps {
  status: string;
}

export default function Loader({ status }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20 mb-6">
        <motion.div
          className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg font-medium text-zinc-300"
      >
        {status}
      </motion.p>
      <p className="text-sm text-zinc-500 mt-2">This may take up to 30 seconds</p>
    </div>
  );
}
