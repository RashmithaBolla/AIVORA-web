import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import EventCard from './EventCard';
import type { Event } from '../types/event';

interface EventGridProps {
  events: Event[];
  loading?: boolean;
  emptyMessage?: string;
  onEventClick: (event: Event) => void;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="h-48 bg-white/5 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/5 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-white/5 rounded animate-pulse w-1/2" />
        <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
        <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
        <div className="h-4 bg-white/5 rounded animate-pulse w-5/6" />
        <div className="h-10 bg-white/5 rounded-lg animate-pulse mt-4" />
      </div>
    </div>
  );
}

export default function EventGrid({ events, loading, emptyMessage, onEventClick }: EventGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!events.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
        >
          <Calendar size={28} className="text-purple-400" />
        </div>
        <p className="text-white/40 text-lg font-medium">
          {emptyMessage ?? 'No events available yet.'}
        </p>
        <p className="text-white/20 text-sm mt-2">Stay tuned for upcoming events!</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={events.map((e) => e.id).join('-')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} onClick={onEventClick} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
