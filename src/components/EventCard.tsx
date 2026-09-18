import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, ExternalLink, CheckCircle } from 'lucide-react';
import type { Event } from '../types/event';
import { CATEGORY_LABELS, formatDate, formatTime, isUpcoming } from '../types/event';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  index?: number;
}

const CATEGORY_ACCENT: Record<string, string> = {
  technical: 'rgba(37,99,235,0.6)',
  non_technical: 'rgba(124,58,237,0.6)',
  cultural: 'rgba(34,211,238,0.5)',
};

const CATEGORY_BG: Record<string, string> = {
  technical: 'rgba(37,99,235,0.08)',
  non_technical: 'rgba(124,58,237,0.08)',
  cultural: 'rgba(34,211,238,0.06)',
};

const CATEGORY_LABEL_COLOR: Record<string, string> = {
  technical: '#60A5FA',
  non_technical: '#A78BFA',
  cultural: '#22D3EE',
};

export default function EventCard({ event, onClick, index = 0 }: EventCardProps) {
  const upcoming = isUpcoming(event);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onClick(event)}
      className="cursor-pointer group relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = CATEGORY_ACCENT[event.category];
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${CATEGORY_BG[event.category]}, 0 20px 40px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Poster */}
      <div className="relative h-48 overflow-hidden bg-black/40">
        {event.poster_url ? (
          <img
            src={event.poster_url}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder poster */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${CATEGORY_BG[event.category]} 0%, rgba(0,0,0,0.5) 100%)`,
            }}
          >
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: CATEGORY_BG[event.category], border: `1px solid ${CATEGORY_ACCENT[event.category]}30` }}
              >
                <span className="text-2xl">
                  {event.category === 'technical' ? '⚡' : event.category === 'non_technical' ? '🎯' : '🎨'}
                </span>
              </div>
              <p className="text-white/30 text-xs uppercase tracking-wider">Event Poster</p>
            </div>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: `${CATEGORY_BG[event.category]}`,
              border: `1px solid ${CATEGORY_ACCENT[event.category]}50`,
              color: CATEGORY_LABEL_COLOR[event.category],
              backdropFilter: 'blur(8px)',
            }}
          >
            {CATEGORY_LABELS[event.category]}
          </span>
        </div>

        {/* Past overlay */}
        {!upcoming && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white/70"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <CheckCircle size={12} />
              Event Completed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-lg text-white leading-snug mb-3 group-hover:text-white transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-white/50 text-sm">
            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-purple-400" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Calendar size={14} className="flex-shrink-0 text-blue-400" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Clock size={14} className="flex-shrink-0 text-cyan-400" />
            <span>{formatTime(event.start_time)} – {formatTime(event.end_time)}</span>
          </div>
        </div>

        <p className="text-white/35 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
          {event.short_description}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          {upcoming && event.registration_link ? (
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(124,58,237,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
              }}
            >
              Register Now
              <ExternalLink size={14} />
            </a>
          ) : upcoming ? (
            <button
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white/40 text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'default' }}
            >
              View Details
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-white/30"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <CheckCircle size={14} />
              Completed
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
