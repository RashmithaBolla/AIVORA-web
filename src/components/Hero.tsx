import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

// ─── Particle Canvas ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
      color: string;
    }

    const COLORS = ['#7C3AED', '#2563EB', '#22D3EE', '#9F67FF'];
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    interface Node { x: number; y: number; }
    const nodes: Node[] = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,0.3)';
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(37,99,235,0.06)';
        ctx.lineWidth = 1;
        ctx.moveTo(node.x - 40, node.y);
        ctx.lineTo(node.x + 40, node.y);
        ctx.moveTo(node.x, node.y - 40);
        ctx.lineTo(node.x, node.y + 40);
        ctx.stroke();
      });

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}

// ─── Intro Overlay ────────────────────────────────────────────────────────────
function IntroOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <ParticleCanvas />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-96 h-96 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'rgba(124,58,237,0.12)' }} />
        <div className="orb w-80 h-80 bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
          style={{ background: 'rgba(37,99,235,0.12)' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* AIVORA logo image with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          {/* Glow pulse ring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.3, 0.8, 0.4] }}
            transition={{ duration: 2.2, delay: 0.8 }}
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(37,99,235,0.3) 50%, transparent 70%)',
              transform: 'scale(1.8)',
            }}
          />

          {/* Actual AIVORA logo */}
          <img
            src="/logos/aivora-logo.png"
            alt="AIVORA"
            className="relative z-10 w-56 h-auto object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.6))' }}
            onError={(e) => {
              // Fallback SVG if image not found
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
              const fb = el.nextSibling as HTMLElement | null;
              if (fb) fb.style.display = 'block';
            }}
          />

          {/* SVG fallback (hidden by default) */}
          <div style={{ display: 'none' }} className="relative z-10">
            <svg viewBox="0 0 200 160" className="w-56 h-auto">
              <defs>
                <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
              <polygon points="100,10 160,120 135,120 100,50 65,120 40,120" fill="url(#g1)" />
              <line x1="58" y1="93" x2="142" y2="93" stroke="#22D3EE" strokeWidth="3" />
              {/* Sweep arc */}
              <path d="M 148 28 Q 175 10 165 70" stroke="#22D3EE" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="165" cy="70" r="3" fill="#22D3EE" />
              {/* Text */}
              <text x="100" y="148" textAnchor="middle" fontSize="22" fontWeight="800" fontFamily="Space Grotesk, sans-serif" fill="url(#g1)" letterSpacing="6">AIVORA</text>
            </svg>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="text-white/50 text-sm uppercase font-medium"
        >
          LEARN • CREATE • CONNECT
        </motion.p>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="w-56 h-0.5 rounded-full overflow-hidden bg-white/10"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.0, duration: 1.1, ease: 'easeInOut' }}
            className="h-full origin-left"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #2563EB, #22D3EE)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introComplete && <IntroOverlay onDone={() => setIntroComplete(true)} />}
      </AnimatePresence>

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-16">
        <ParticleCanvas />

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb w-[600px] h-[600px] -top-32 -left-32"
            style={{ background: 'rgba(124,58,237,0.07)' }} />
          <div className="orb w-[500px] h-[500px] -bottom-32 -right-32"
            style={{ background: 'rgba(37,99,235,0.07)' }} />
          <div className="orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'rgba(34,211,238,0.04)' }} />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        >


          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: introComplete ? 1 : 0, scale: introComplete ? 1 : 0.85, y: introComplete ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            className="mb-6 relative"
          >
            <img
              src="/logos/aivora-logo.png"
              alt="AIVORA – Learn. Create. Connect."
              className="w-72 md:w-96 h-auto object-contain mx-auto"
              style={{ filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.4))' }}
              onError={(e) => {
                // Fallback: show AIVORA text
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                const fb = el.nextSibling as HTMLElement | null;
                if (fb) fb.style.display = 'block';
              }}
            />
            {/* Text fallback */}
            <div style={{ display: 'none' }}>
              <h1 className="font-display font-bold text-7xl md:text-8xl tracking-tight gradient-text text-glow-purple">
                AIVORA
              </h1>
              <p className="text-white/50 text-xl tracking-[0.3em] uppercase mt-2">
                Learn • Create • Connect
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 20 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          >
            A student-driven community where technology, creativity and collaboration come together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link to="/events" className="btn-primary text-base px-8 py-3.5 font-semibold">
              Explore Events
            </Link>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline text-base px-8 py-3.5 font-semibold"
            >
              About AIVORA
            </button>
          </motion.div>



        </motion.div>

        {/* Scroll arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity: introComplete ? 0.4 : 0,
            y: [0, 6, 0],
          }}
          transition={{
            opacity: { delay: 1.3, duration: 0.5 },
            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={() => document.getElementById('events-preview')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:opacity-80 transition-opacity z-10"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </motion.button>
      </section>
    </>
  );
}
