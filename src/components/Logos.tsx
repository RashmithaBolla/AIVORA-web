// Logo components — drop the image files into public/logos/ and they auto-display.
// aivora-logo.png  → AIVORA logo with "Learn. Create. Connect."
// bvrit-logo.png   → BVRIT Hyderabad college logo

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function AivoraLogo({ className = '', style }: LogoProps) {
  return (
    <img
      src="/logos/aivora-logo.png"
      alt="AIVORA – Learn. Create. Connect."
      className={className}
      style={style}
      onError={(e) => {
        // Fallback: gradient text if image not yet added
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = 'none';
        const fallback = el.nextSibling as HTMLElement | null;
        if (fallback) fallback.style.display = 'flex';
      }}
    />
  );
}

export function AivoraLogoWithFallback({ className = '', style }: LogoProps) {
  return (
    <span className="inline-flex items-center">
      <img
        src="/logos/aivora-logo.png"
        alt="AIVORA"
        className={className}
        style={style}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = 'none';
          const fb = document.createElement('span');
          fb.style.cssText = 'font-family: "Space Grotesk", sans-serif; font-weight: 800; font-size: inherit; background: linear-gradient(135deg,#7C3AED,#2563EB,#22D3EE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;';
          fb.textContent = 'AIVORA';
          el.parentNode?.insertBefore(fb, el.nextSibling);
        }}
      />
    </span>
  );
}

export function BvritLogo({ className = '', style }: LogoProps) {
  return (
    <img
      src="/logos/bvrit-logo.png"
      alt="BVRIT Hyderabad College of Engineering for Women"
      className={className}
      style={style}
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = 'none';
        const fb = document.createElement('span');
        fb.style.cssText = 'display:inline-flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:4px 8px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.7);';
        fb.textContent = 'BVRIT';
        el.parentNode?.insertBefore(fb, el.nextSibling);
      }}
    />
  );
}
