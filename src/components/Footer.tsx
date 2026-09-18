import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-black">
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #2563EB, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/logos/aivora-logo.png"
                alt="AIVORA"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  const fb = el.nextSibling as HTMLElement | null;
                  if (fb) (fb as HTMLElement).style.display = 'block';
                }}
              />
              <span style={{ display: 'none' }} className="font-display font-bold text-2xl gradient-text">AIVORA</span>
            </div>
            <p className="text-white/40 text-sm mb-2 tracking-widest uppercase font-medium">
              Learn • Create • Connect
            </p>
            <p className="text-white/30 text-sm mt-4 leading-relaxed">
              A student-driven community at BVRIT Hyderabad, where technology, creativity and
              collaboration come together.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Events', to: '/events' },
                { label: 'About', action: () => scrollTo('about') },
                { label: 'Contact', action: () => scrollTo('contact') },
              ].map((item) =>
                item.to ? (
                  <li key={item.label}>
                    <Link to={item.to} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label}>
                    <button onClick={item.action} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                      {item.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social + College */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Connect</h4>
            <div className="flex items-center gap-3 mb-6">
              {[
                {
                  icon: <Instagram size={18} />,
                  href: 'https://www.instagram.com/bvrith_aimlclub/',
                  label: 'Instagram',
                  external: true,
                },
                {
                  icon: <Linkedin size={18} />,
                  href: 'https://www.linkedin.com/in/aivora-aiml-4bab15437/',
                  label: 'LinkedIn',
                  external: true,
                },
                {
                  icon: <Mail size={18} />,
                  href: 'mailto:aivorabvrith@gmail.com',
                  label: 'Email',
                  external: false,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,58,237,0.5)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,58,237,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href="https://bvrithyderabad.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              <ExternalLink size={12} />
              BVRIT Hyderabad College of Engineering for Women
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-sm">
            © {year} AIVORA. All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs">
            BVRIT Hyderabad College of Engineering for Women
          </p>
        </div>
      </div>
    </footer>
  );
}
