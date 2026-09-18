import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteConfirmProps {
  eventTitle: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function DeleteConfirm({ eventTitle, onConfirm, onCancel }: DeleteConfirmProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onCancel()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md rounded-2xl p-6"
          style={{ background: 'rgba(10,10,20,0.98)', border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 0 40px rgba(239,68,68,0.1)' }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">Delete Event?</h3>
            <p className="text-white/50 text-sm mb-1">You're about to permanently delete:</p>
            <p className="text-white font-semibold mb-5 px-4">"{eventTitle}"</p>
            <p className="text-white/30 text-xs mb-6">This action cannot be undone.</p>

            <div className="flex gap-3 w-full">
              <button
                onClick={onCancel}
                className="btn-outline flex-1 py-2.5 text-sm"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #DC2626, #B91C1C)' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 15px rgba(239,68,68,0.3)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : null}
                {loading ? 'Deleting…' : 'Delete Event'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
