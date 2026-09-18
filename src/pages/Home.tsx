import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Zap, Users, Lightbulb, Trophy, Cpu, Mail, Instagram, Linkedin } from 'lucide-react';
import Hero from '../components/Hero';
import EventGrid from '../components/EventGrid';
import EventDetails from '../components/EventDetails';
import { useEvents } from '../hooks/useEvents';
import type { Event } from '../types/event';

// Fade-in wrapper
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <FadeIn>
        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block"
          style={{ color: '#A78BFA', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
          {label}
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-3 mb-4">{title}</h2>
        {subtitle && <p className="text-white/40 text-lg max-w-xl mx-auto">{subtitle}</p>}
      </FadeIn>
    </div>
  );
}

// ─── Events Preview ───────────────────────────────────────────────────────────
function EventsPreview() {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Show up to 6 upcoming events
  const upcoming = events.filter(e => {
    const d = new Date(e.event_date);
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }).slice(0, 6);

  return (
    <section id="events-preview" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="What's On"
          title="Upcoming Events"
          subtitle="Competitions, workshops and events crafted for curious minds."
        />

        <EventGrid events={upcoming} loading={loading} onEventClick={setSelectedEvent}
          emptyMessage="No upcoming events right now. New events coming soon!" />

        {!loading && events.length > 0 && (
          <FadeIn className="flex justify-center mt-12">
            <Link
              to="/events"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-200"
              style={{ border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.08)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,58,237,0.15)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,58,237,0.7)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(124,58,237,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,58,237,0.08)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,58,237,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              View All Events
              <ArrowRight size={18} />
            </Link>
          </FadeIn>
        )}

        <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: 'LEARN',
      desc: 'Explore new technologies, skills and ideas through workshops, talks and hands-on sessions.',
      color: '#2563EB',
    },
    {
      icon: <Cpu size={24} />,
      title: 'CREATE',
      desc: 'Build projects, participate in competitions and turn ideas into reality with your team.',
      color: '#7C3AED',
    },
    {
      icon: <Users size={24} />,
      title: 'CONNECT',
      desc: 'Collaborate with students, mentors and innovators who share your passion for technology.',
      color: '#22D3EE',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-96 h-96 top-0 left-1/4" style={{ background: 'rgba(124,58,237,0.05)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          label="About Us"
          title="About AIVORA"
        />

        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-white/50 text-lg leading-relaxed">
            AIVORA is a student-driven community at <span className="text-white/70">BVRIT Hyderabad College of Engineering for Women</span>,
            focused on learning, creating and connecting through technology, creativity and collaboration.
            We organise events across technical, non-technical and cultural domains — bringing students together
            to explore, compete and grow.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <div
                className="rounded-2xl p-7 text-center group transition-all duration-300 h-full"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${f.color}50`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${f.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3 tracking-wider">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why AIVORA Section ───────────────────────────────────────────────────────
function WhyAivora() {
  const reasons = [
    {
      icon: <Zap size={22} />,
      title: 'Workshops',
      desc: 'Learn from practical sessions, industry experts and guided hands-on projects.',
      color: '#F59E0B',
    },
    {
      icon: <Trophy size={22} />,
      title: 'Competitions',
      desc: 'Challenge yourself in technical, creative and cultural competitions with real prizes.',
      color: '#7C3AED',
    },
    {
      icon: <Users size={22} />,
      title: 'Community',
      desc: 'Connect and collaborate with like-minded students and build lasting friendships.',
      color: '#22D3EE',
    },
    {
      icon: <Lightbulb size={22} />,
      title: 'Innovation',
      desc: 'Turn your ideas into projects and real-world solutions with team support.',
      color: '#10B981',
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Why Join"
          title="Why AIVORA?"
          subtitle="More than a club — a launchpad for your ideas."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.08}>
              <div
                className="rounded-2xl p-6 group transition-all duration-300 h-full"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${r.color}50`;
                  (e.currentTarget as HTMLDivElement).style.background = `${r.color}06`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${r.color}15`, border: `1px solid ${r.color}30`, color: r.color }}
                >
                  {r.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{r.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeading label="Get In Touch" title="Contact AIVORA" />

        <FadeIn>
          <div
            className="rounded-2xl p-10"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="mb-2">
              <span className="font-display font-bold text-2xl gradient-text">AIVORA</span>
            </div>
            <p className="text-white/40 text-sm mb-1">BVRIT Hyderabad College of Engineering for Women</p>
            <p className="text-white/30 text-xs mb-8">Bachupally, Hyderabad — 500090</p>

            <div className="flex flex-col items-center gap-4">
              <a
                href="mailto:aivorabvrith@gmail.com"
                className="flex items-center gap-3 px-6 py-3 rounded-xl text-sm transition-all duration-200 w-full sm:w-auto justify-center"
                style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: '#60A5FA' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,99,235,0.2)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,99,235,0.1)'}
              >
                <Mail size={16} />
                aivorabvrith@gmail.com
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/bvrith_aimlclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,58,237,0.4)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <Instagram size={15} />
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/in/aivora-aiml-4bab15437/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(37,99,235,0.4)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <EventsPreview />
      <About />
      <WhyAivora />
      <Contact />
    </>
  );
}
