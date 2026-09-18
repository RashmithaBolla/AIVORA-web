import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, LogOut, Edit2, Trash2, Eye, EyeOff,
  CheckCircle, Clock, Search, LayoutDashboard,
} from 'lucide-react';
import { useAdminEvents, signOut } from '../../hooks/useEvents';
import type { Event, EventInsert } from '../../types/event';
import { CATEGORY_LABELS, formatDate, isUpcoming } from '../../types/event';
import EventForm from './EventForm';
import DeleteConfirm from './DeleteConfirm';

interface AdminDashboardProps {
  onLogout: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  technical: '#60A5FA',
  non_technical: '#A78BFA',
  cultural: '#22D3EE',
};

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { events, loading, createEvent, updateEvent, deleteEvent, togglePublish } = useAdminEvents();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const handleCreate = async (data: EventInsert) => {
    await createEvent(data);
    setShowForm(false);
    showToast('Event created successfully!');
  };

  const handleUpdate = async (data: EventInsert) => {
    if (!editingEvent) return;
    await updateEvent(editingEvent.id, data);
    setEditingEvent(null);
    showToast('Event updated successfully!');
  };

  const handleDelete = async () => {
    if (!deletingEvent) return;
    await deleteEvent(deletingEvent.id);
    setDeletingEvent(null);
    showToast('Event deleted.');
  };

  const handleTogglePublish = async (event: Event) => {
    await togglePublish(event.id, !event.is_published);
    showToast(event.is_published ? 'Event unpublished.' : 'Event published!');
  };

  // Filtered events for display
  const filtered = events.filter((e) => {
    const matchesCat = filterCat === 'all' || e.category === filterCat;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const published = events.filter((e) => e.is_published).length;
  const upcoming = events.filter(isUpcoming).length;
  const drafts = events.filter((e) => !e.is_published).length;

  return (
    <div className="min-h-screen bg-black">
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[500] px-5 py-3 rounded-xl text-white text-sm font-medium flex items-center gap-2"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 0 20px rgba(16,185,129,0.1)', backdropFilter: 'blur(12px)' }}
        >
          <CheckCircle size={16} className="text-emerald-400" />
          {toast}
        </motion.div>
      )}

      {/* Sidebar + main layout */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className="hidden md:flex flex-col w-64 fixed top-0 left-0 h-full border-r border-white/5"
          style={{ background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(20px)' }}
        >
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}>
                <LayoutDashboard size={17} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-white">AIVORA Admin</p>
                <p className="text-white/30 text-xs">Event Management</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <div className="px-3 py-2 rounded-lg flex items-center gap-3 text-sm font-medium text-white"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <LayoutDashboard size={16} className="text-purple-400" />
              Events
            </div>
          </nav>

          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'}
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 md:ml-64 min-h-screen">
          {/* Top bar */}
          <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-white/5"
            style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)' }}>
            <h1 className="font-display font-bold text-xl text-white">Events</h1>
            <div className="flex items-center gap-3">
              {/* Mobile logout */}
              <button
                onClick={handleLogout}
                className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 hover:text-white text-xs transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <LogOut size={14} />
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Event</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Events', value: events.length, icon: <LayoutDashboard size={18} />, color: '#7C3AED' },
                { label: 'Published', value: published, icon: <Eye size={18} />, color: '#10B981' },
                { label: 'Upcoming', value: upcoming, icon: <Clock size={18} />, color: '#2563EB' },
                { label: 'Drafts', value: drafts, icon: <EyeOff size={18} />, color: '#6B7280' },
              ].map((s) => (
                <div key={s.label}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: s.color }}>
                    {s.icon}
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/40">{s.label}</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events…"
                  className="input-dark pl-9 text-sm py-2.5"
                />
              </div>
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="input-dark text-sm py-2.5 w-full sm:w-44"
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="non_technical">Non-Technical</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>

            {/* Events table */}
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl animate-pulse"
                    style={{ background: 'rgba(255,255,255,0.04)' }} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-white/30 text-lg">No events found.</p>
                <button onClick={() => setShowForm(true)} className="btn-primary mt-4 text-sm px-5 py-2.5 flex items-center gap-2">
                  <Plus size={14} /> Create First Event
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,58,237,0.2)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'}
                  >
                    {/* Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Poster thumbnail */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.06)' }}>
                        {event.poster_url ? (
                          <img src={event.poster_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">
                            {event.category === 'technical' ? '⚡' : event.category === 'non_technical' ? '🎯' : '🎨'}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white font-semibold text-sm truncate">{event.title}</p>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline"
                            style={{
                              color: CATEGORY_COLORS[event.category],
                              background: `${CATEGORY_COLORS[event.category]}15`,
                              border: `1px solid ${CATEGORY_COLORS[event.category]}30`,
                            }}
                          >
                            {CATEGORY_LABELS[event.category]}
                          </span>
                        </div>
                        <p className="text-white/35 text-xs mt-0.5">
                          {formatDate(event.event_date)} • {event.venue}
                        </p>
                      </div>
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
                      {/* Published pill */}
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={event.is_published
                          ? { color: '#34D399', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }
                          : { color: '#9CA3AF', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
                        }
                      >
                        {event.is_published ? 'Published' : 'Draft'}
                      </span>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        {/* Publish toggle */}
                        <button
                          onClick={() => handleTogglePublish(event)}
                          title={event.is_published ? 'Unpublish' : 'Publish'}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                          style={{ background: 'rgba(255,255,255,0.05)', color: event.is_published ? '#34D399' : '#6B7280' }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'}
                          onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'}
                        >
                          {event.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => setEditingEvent(event)}
                          title="Edit"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200"
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = '#A78BFA'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}
                        >
                          <Edit2 size={14} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeletingEvent(event)}
                          title="Delete"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 transition-colors duration-200"
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.1)'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create form */}
      {showForm && (
        <EventForm
          mode="create"
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit form */}
      {editingEvent && (
        <EventForm
          mode="edit"
          initial={editingEvent}
          onSubmit={handleUpdate}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      {/* Delete confirm */}
      {deletingEvent && (
        <DeleteConfirm
          eventTitle={deletingEvent.title}
          onConfirm={handleDelete}
          onCancel={() => setDeletingEvent(null)}
        />
      )}
    </div>
  );
}
