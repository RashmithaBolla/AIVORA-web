import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Loader2, AlertCircle } from 'lucide-react';
import type { Event, EventInsert } from '../../types/event';
import { uploadPoster } from '../../hooks/useEvents';

interface EventFormProps {
  initial?: Partial<Event>;
  onSubmit: (data: EventInsert) => Promise<void>;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const EMPTY: EventInsert = {
  title: '',
  category: 'technical',
  poster_url: null,
  venue: '',
  event_date: '',
  start_time: '',
  end_time: '',
  short_description: '',
  full_description: '',
  rules: '',
  eligibility: '',
  registration_link: '',
  registration_deadline: null,
  contact_name_1: '',
  contact_phone_1: '',
  contact_name_2: '',
  contact_phone_2: '',
  is_published: false,
};

export default function EventForm({ initial, onSubmit, onCancel, mode }: EventFormProps) {
  const [form, setForm] = useState<EventInsert>({ ...EMPTY, ...initial });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [posterPreview, setPosterPreview] = useState<string | null>(initial?.poster_url ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof EventInsert, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5 MB.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const url = await uploadPoster(file);
      set('poster_url', url);
      setPosterPreview(url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(`Poster upload failed: ${msg}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload: EventInsert = {
        ...form,
        rules: form.rules || null,
        eligibility: form.eligibility || null,
        registration_link: form.registration_link || null,
        registration_deadline: form.registration_deadline || null,
        contact_name_1: form.contact_name_1 || null,
        contact_phone_1: form.contact_phone_1 || null,
        contact_name_2: form.contact_name_2 || null,
        contact_phone_2: form.contact_phone_2 || null,
      };
      await onSubmit(payload);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const InputLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">{children}</label>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 pt-8"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl mb-8"
        style={{ background: 'rgba(8,8,16,0.98)', border: '1px solid rgba(124,58,237,0.25)', boxShadow: '0 30px 80px rgba(0,0,0,0.7)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5">
          <h2 className="font-display font-bold text-xl text-white">
            {mode === 'create' ? 'Create New Event' : 'Edit Event'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl flex items-center gap-3 text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5' }}>
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Poster upload */}
          <div>
            <InputLabel>Event Poster</InputLabel>
            <div className="flex gap-4 items-start">
              {posterPreview ? (
                <div className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={posterPreview} alt="Poster preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { set('poster_url', null); setPosterPreview(null); }}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white/70 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : null}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 h-24 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px dashed rgba(255,255,255,0.12)' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,58,237,0.5)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)'}
              >
                {uploading ? (
                  <Loader2 size={20} className="text-purple-400 animate-spin" />
                ) : (
                  <Upload size={20} className="text-white/30" />
                )}
                <span className="text-white/30 text-xs">
                  {uploading ? 'Uploading…' : 'Click to upload poster (max 5 MB)'}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Title + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <InputLabel>Event Name *</InputLabel>
              <input
                type="text"
                required
                className="input-dark"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. CodeSprint 2026"
              />
            </div>
            <div>
              <InputLabel>Category *</InputLabel>
              <select
                required
                className="input-dark"
                value={form.category}
                onChange={(e) => set('category', e.target.value as EventInsert['category'])}
              >
                <option value="technical">Technical</option>
                <option value="non_technical">Non-Technical</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>
          </div>

          {/* Venue */}
          <div>
            <InputLabel>Venue *</InputLabel>
            <input
              type="text"
              required
              className="input-dark"
              value={form.venue}
              onChange={(e) => set('venue', e.target.value)}
              placeholder="e.g. BVRIT Hyderabad — Seminar Hall"
            />
          </div>

          {/* Date + Times */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <InputLabel>Date *</InputLabel>
              <input
                type="date"
                required
                className="input-dark"
                value={form.event_date}
                onChange={(e) => set('event_date', e.target.value)}
              />
            </div>
            <div>
              <InputLabel>Start Time *</InputLabel>
              <input
                type="time"
                required
                className="input-dark"
                value={form.start_time}
                onChange={(e) => set('start_time', e.target.value)}
              />
            </div>
            <div>
              <InputLabel>End Time *</InputLabel>
              <input
                type="time"
                required
                className="input-dark"
                value={form.end_time}
                onChange={(e) => set('end_time', e.target.value)}
              />
            </div>
          </div>

          {/* Short description */}
          <div>
            <InputLabel>Short Description * (2–3 lines)</InputLabel>
            <textarea
              required
              rows={2}
              className="input-dark resize-none"
              value={form.short_description}
              onChange={(e) => set('short_description', e.target.value)}
              placeholder="Brief description shown on event cards…"
            />
          </div>

          {/* Full description */}
          <div>
            <InputLabel>Full Description *</InputLabel>
            <textarea
              required
              rows={4}
              className="input-dark resize-none"
              value={form.full_description}
              onChange={(e) => set('full_description', e.target.value)}
              placeholder="Detailed description shown on event details page…"
            />
          </div>

          {/* Rules */}
          <div>
            <InputLabel>Rules / Instructions</InputLabel>
            <textarea
              rows={3}
              className="input-dark resize-none"
              value={form.rules ?? ''}
              onChange={(e) => set('rules', e.target.value)}
              placeholder="One rule per line…"
            />
          </div>

          {/* Eligibility */}
          <div>
            <InputLabel>Eligibility</InputLabel>
            <input
              type="text"
              className="input-dark"
              value={form.eligibility ?? ''}
              onChange={(e) => set('eligibility', e.target.value)}
              placeholder="e.g. All BVRIT students, Teams of 2–4"
            />
          </div>

          {/* Registration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <InputLabel>Registration Link</InputLabel>
              <input
                type="url"
                className="input-dark"
                value={form.registration_link ?? ''}
                onChange={(e) => set('registration_link', e.target.value)}
                placeholder="https://forms.google.com/..."
              />
            </div>
            <div>
              <InputLabel>Registration Deadline</InputLabel>
              <input
                type="date"
                className="input-dark"
                value={form.registration_deadline ?? ''}
                onChange={(e) => set('registration_deadline', e.target.value || null)}
              />
            </div>
          </div>

          {/* Contact 1 */}
          <div>
            <InputLabel>Contact 1</InputLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                className="input-dark"
                value={form.contact_name_1 ?? ''}
                onChange={(e) => set('contact_name_1', e.target.value)}
                placeholder="Name"
              />
              <input
                type="tel"
                className="input-dark"
                value={form.contact_phone_1 ?? ''}
                onChange={(e) => set('contact_phone_1', e.target.value)}
                placeholder="Phone (e.g. +91 98765 43210)"
              />
            </div>
          </div>

          {/* Contact 2 */}
          <div>
            <InputLabel>Contact 2 (optional)</InputLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                className="input-dark"
                value={form.contact_name_2 ?? ''}
                onChange={(e) => set('contact_name_2', e.target.value)}
                placeholder="Name"
              />
              <input
                type="tel"
                className="input-dark"
                value={form.contact_phone_2 ?? ''}
                onChange={(e) => set('contact_phone_2', e.target.value)}
                placeholder="Phone (e.g. +91 98765 43210)"
              />
            </div>
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => set('is_published', !form.is_published)}
              className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0`}
              style={{
                background: form.is_published ? 'linear-gradient(135deg, #7C3AED, #2563EB)' : 'rgba(255,255,255,0.1)',
                boxShadow: form.is_published ? '0 0 10px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
                style={{ left: form.is_published ? '22px' : '2px' }}
              />
            </button>
            <div>
              <p className="text-white text-sm font-medium">
                {form.is_published ? 'Published' : 'Draft'}
              </p>
              <p className="text-white/30 text-xs">
                {form.is_published ? 'Visible to all students on the website.' : 'Only visible to admins. Not shown publicly.'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline px-6 py-2.5 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <><Loader2 size={14} className="animate-spin" /> Saving…</>
              ) : mode === 'create' ? (
                'Create Event'
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
