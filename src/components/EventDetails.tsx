import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Clock, ExternalLink, User, Phone, AlertCircle, CheckCircle, ZoomIn } from 'lucide-react';
import type { Event } from '../types/event';
import { CATEGORY_LABELS, formatDate, formatTime, isUpcoming } from '../types/event';

interface EventDetailsProps {
  event: Event | null;
  onClose: () => void;
}

const CATEGORY_ACCENT: Record<string, string> = {
  technical: '#2563EB',
  non_technical: '#7C3AED',
  cultural: '#22D3EE',
};

export default function EventDetails({ event, onClose }: EventDetailsProps) {
  const [lightbox, setLightbox] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = event ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [event]);

  // Reset lightbox when event changes
  useEffect(() => {
    setLightbox(false);
  }, [event]);

  // Escape key handling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (lightbox) { setLightbox(false); return; }
      onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, lightbox]);

  const upcoming = event ? isUpcoming(event) : false;
  const accent = event ? CATEGORY_ACCENT[event.category] : '#7C3AED';

  return (
    <>
      {/* ── Event Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {event && !lightbox && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && onClose()}
            >
              <div
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
                style={{
                  background: 'rgba(10,10,20,0.97)',
                  border: `1px solid ${accent}40`,
                  boxShadow: `0 0 60px ${accent}20, 0 30px 80px rgba(0,0,0,0.6)`,
                }}
              >
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <X size={18} />
                </button>

                {/* Poster */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl bg-black/40">
                  {event.poster_url ? (
                    <div
                      className="relative w-full h-full group cursor-zoom-in"
                      onClick={() => setLightbox(true)}
                    >
                      <img
                        src={event.poster_url}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Zoom hint overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: 'rgba(0,0,0,0.4)' }}
                      >
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold"
                          style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.25)' }}
                        >
                          <ZoomIn size={14} />
                          View Full Image
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${accent}15, rgba(0,0,0,0.6))` }}
                    >
                      <span className="text-6xl opacity-60">
                        {event.category === 'technical' ? '⚡' : event.category === 'non_technical' ? '🎯' : '🎨'}
                      </span>
                    </div>
                  )}
                  {/* Bottom gradient fade */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,20,1) 0%, transparent 50%)' }}
                  />
                </div>

                {/* Content */}
                <div className="px-6 pb-8 -mt-8 relative">
                  {/* Category + Status */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: `${accent}15`, border: `1px solid ${accent}40`, color: accent }}
                    >
                      {CATEGORY_LABELS[event.category]}
                    </span>
                    {!upcoming && (
                      <span
                        className="flex items-center gap-1.5 text-xs text-white/40 px-3 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        <CheckCircle size={12} />
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-display font-bold text-3xl text-white mb-5 leading-snug">
                    {event.title}
                  </h2>

                  {/* Meta grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: <Calendar size={15} />, label: 'Date', value: formatDate(event.event_date), color: '#60A5FA' },
                      { icon: <Clock size={15} />, label: 'Time', value: `${formatTime(event.start_time)} – ${formatTime(event.end_time)}`, color: '#22D3EE' },
                      { icon: <MapPin size={15} />, label: 'Venue', value: event.venue, color: '#A78BFA' },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl p-3"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="flex items-center gap-1.5 mb-1" style={{ color: m.color }}>
                          {m.icon}
                          <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{m.label}</span>
                        </div>
                        <p className="text-white/80 text-sm font-medium">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <Section title="About This Event">
                    <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                      {event.full_description || event.short_description}
                    </p>
                  </Section>

                  {/* Rules */}
                  {event.rules && (
                    <Section title="Rules & Instructions" icon={<AlertCircle size={14} className="text-yellow-400" />}>
                      <pre className="text-white/55 text-sm leading-relaxed whitespace-pre-wrap font-sans">{event.rules}</pre>
                    </Section>
                  )}

                  {/* Eligibility */}
                  {event.eligibility && (
                    <Section title="Eligibility">
                      <p className="text-white/60 text-sm leading-relaxed">{event.eligibility}</p>
                    </Section>
                  )}

                  {/* Registration deadline */}
                  {event.registration_deadline && (
                    <div className="mb-5 px-4 py-3 rounded-xl flex items-center gap-3"
                      style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}>
                      <Calendar size={16} className="text-yellow-400 flex-shrink-0" />
                      <div>
                        <p className="text-yellow-400/80 text-xs uppercase tracking-wider font-semibold">Registration Deadline</p>
                        <p className="text-white/70 text-sm font-medium">{formatDate(event.registration_deadline)}</p>
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  {(event.contact_name_1 || event.contact_phone_1 || event.contact_name_2 || event.contact_phone_2) && (
                    <Section title="Contact">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(event.contact_name_1 || event.contact_phone_1) && (
                          <div className="rounded-xl p-3 space-y-1.5"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <p className="text-white/30 text-xs uppercase tracking-wider font-semibold mb-2">Contact 1</p>
                            {event.contact_name_1 && (
                              <div className="flex items-center gap-2 text-white/60 text-sm">
                                <User size={13} className="text-purple-400 flex-shrink-0" />
                                {event.contact_name_1}
                              </div>
                            )}
                            {event.contact_phone_1 && (
                              <div className="flex items-center gap-2 text-white/60 text-sm">
                                <Phone size={13} className="text-cyan-400 flex-shrink-0" />
                                <a href={`tel:${event.contact_phone_1}`} className="hover:text-white transition-colors">
                                  {event.contact_phone_1}
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                        {(event.contact_name_2 || event.contact_phone_2) && (
                          <div className="rounded-xl p-3 space-y-1.5"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <p className="text-white/30 text-xs uppercase tracking-wider font-semibold mb-2">Contact 2</p>
                            {event.contact_name_2 && (
                              <div className="flex items-center gap-2 text-white/60 text-sm">
                                <User size={13} className="text-purple-400 flex-shrink-0" />
                                {event.contact_name_2}
                              </div>
                            )}
                            {event.contact_phone_2 && (
                              <div className="flex items-center gap-2 text-white/60 text-sm">
                                <Phone size={13} className="text-cyan-400 flex-shrink-0" />
                                <a href={`tel:${event.contact_phone_2}`} className="hover:text-white transition-colors">
                                  {event.contact_phone_2}
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Section>
                  )}

                  {/* CTA */}
                  <div className="mt-6">
                    {upcoming && event.registration_link ? (
                      <a
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-bold text-white transition-all duration-200"
                        style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(124,58,237,0.5)';
                          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                          (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
                        }}
                      >
                        Register Now
                        <ExternalLink size={16} />
                      </a>
                    ) : !upcoming ? (
                      <div className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold text-white/30"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <CheckCircle size={16} />
                        This event has concluded
                      </div>
                    ) : (
                      <div className="w-full py-4 rounded-xl text-sm font-semibold text-white/30 text-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        Registration link coming soon
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Lightbox — rendered fully outside modal ──────────── */}
      <AnimatePresence>
        {lightbox && event?.poster_url && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 cursor-zoom-out"
            style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(10px)' }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <X size={20} />
            </button>

            {/* Full image — stops click propagation so only backdrop click closes */}
            <motion.img
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              src={event.poster_url}
              alt={event.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] w-auto h-auto rounded-2xl object-contain select-none"
              style={{ boxShadow: '0 0 80px rgba(124,58,237,0.25), 0 40px 80px rgba(0,0,0,0.6)' }}
            />

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/25 text-xs whitespace-nowrap">
              Click outside image or press Esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  );
}
