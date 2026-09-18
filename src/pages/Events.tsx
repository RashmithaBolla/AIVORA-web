import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import EventGrid from '../components/EventGrid';
import EventDetails from '../components/EventDetails';
import { useEvents } from '../hooks/useEvents';
import type { Event, EventCategory } from '../types/event';
import { isUpcoming } from '../types/event';

type FilterCategory = EventCategory | 'all';

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { events, loading } = useEvents();

  // Filter locally so transitions are instant
  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesCat = activeCategory === 'all' || e.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q
        || e.title.toLowerCase().includes(q)
        || e.venue.toLowerCase().includes(q)
        || e.short_description.toLowerCase().includes(q)
        || e.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [events, activeCategory, searchQuery]);

  const upcomingEvents = filtered.filter(isUpcoming);
  const pastEvents = filtered.filter((e) => !isUpcoming(e));

  // Category counts
  const counts = useMemo(() => {
    const all = events;
    return {
      all: all.length,
      technical: all.filter((e) => e.category === 'technical').length,
      non_technical: all.filter((e) => e.category === 'non_technical').length,
      cultural: all.filter((e) => e.category === 'cultural').length,
    };
  }, [events]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block"
            style={{ color: '#A78BFA', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
            All Events
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white mt-3 mb-4">
            AIVORA Events
          </h1>
          <p className="text-white/40 text-lg max-w-xl">
            Explore technical, non-technical and cultural events organised by AIVORA.
          </p>
        </motion.div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-5"
        >
          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by name, venue, category..."
              className="w-full pl-11 pr-10 py-3 rounded-xl text-white text-sm transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'rgba(124,58,237,0.5)';
                (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px rgba(124,58,237,0.1)';
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.target as HTMLInputElement).style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} counts={counts} />
        </motion.div>
      </div>

      {/* Events content */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Upcoming */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <h2 className="font-display font-bold text-2xl text-white">Upcoming Events</h2>
            {!loading && (
              <span className="text-sm text-white/30 ml-1">
                ({upcomingEvents.length})
              </span>
            )}
          </motion.div>

          <EventGrid
            events={upcomingEvents}
            loading={loading}
            onEventClick={setSelectedEvent}
            emptyMessage={
              searchQuery
                ? `No upcoming events match "${searchQuery}".`
                : activeCategory !== 'all'
                ? 'No upcoming events in this category yet.'
                : 'New events are coming soon. Stay tuned!'
            }
          />
        </section>

        {/* Past */}
        {!loading && (pastEvents.length > 0 || searchQuery.trim()) && (
          <section>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <h2 className="font-display font-bold text-2xl text-white/60">Past Events</h2>
              <span className="text-sm text-white/20 ml-1">({pastEvents.length})</span>
            </motion.div>

            <EventGrid
              events={pastEvents}
              loading={false}
              onEventClick={setSelectedEvent}
              emptyMessage={
                searchQuery.trim()
                  ? `No past events match "${searchQuery}".`
                  : 'No past events found.'
              }
            />
          </section>
        )}
      </div>

      <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
