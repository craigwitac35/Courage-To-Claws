import { Link } from "react-router-dom";
import { company } from "../data/company";
import { QuoteLink } from "./QuoteLink";
import { Icon } from "./Icons";

// Drop the real hero photo at public/hero.jpg (and public/hero-mobile.jpg for a
// mobile crop) and set HERO_IMAGE = true. Until then a placeholder scene renders.
const HERO_IMAGE = false;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg">
        {HERO_IMAGE ? (
          <picture>
            <source media="(max-width: 700px)" srcSet="/hero-mobile.jpg" />
            <img src="/hero.jpg" alt="Roofer installing shingles on a residential home in warm afternoon light" fetchPriority="high" />
          </picture>
        ) : (
          <HeroScene />
        )}
      </div>
      <div className="hero__shade" />
      <div className="container">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            {company.heroHeadline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero__support">{company.heroSupport}</p>
          <ul className="hero__services" aria-label="Services">
            {company.heroServiceLine.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="hero__actions">
            <QuoteLink className="btn btn--primary" arrow>
              Get a Quote
            </QuoteLink>
            <Link to="/our-work" className="btn btn--ghost-light">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
      <div className="hero__badge">
        <Icon name="flag" className="hero__badge-icon" />
        Veteran-Owned &amp; Operated
      </div>
    </section>
  );
}

// Placeholder scene: sky, subtle flag stripes in the atmosphere, a residential
// roofline, and a worker silhouette facing away. Purely a stand-in for photography.
function HeroScene() {
  return (
    <div className="hero__scene" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bfd8ec" />
            <stop offset="0.55" stopColor="#f2efe6" />
            <stop offset="1" stopColor="#d6c4a3" />
          </linearGradient>
          <radialGradient id="sun" cx="0.78" cy="0.28" r="0.45">
            <stop offset="0" stopColor="#fff3c9" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fff3c9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a4a3c" />
            <stop offset="1" stopColor="#3b2f26" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sky)" />
        <rect width="1600" height="900" fill="url(#sun)" />
        {/* subtle flag stripes drifting in the sky */}
        <g opacity="0.07">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="700" y={90 + i * 46} width="900" height="22" fill={i % 2 ? "#ffffff" : "#8a1c2b"} transform="skewX(-12)" />
          ))}
        </g>
        {/* neighboring house, background */}
        <g opacity="0.55">
          <polygon points="60,620 260,470 460,620" fill="#8c7c6b" />
          <rect x="90" y="620" width="340" height="200" fill="#c9bfb0" />
        </g>
        {/* main house */}
        <rect x="560" y="520" width="900" height="380" fill="#e8e2d6" />
        <rect x="560" y="520" width="900" height="16" fill="#cbbfae" />
        <polygon points="520,540 1010,300 1500,540" fill="url(#roof)" />
        <polygon points="560,540 1010,320 1460,540" fill="#6b5a4a" />
        {/* shingle courses */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <polygon key={i} points={`${560 + i * 40},${540 - i * 20} ${1010},${320 + i * 6} ${1460 - i * 40},${540 - i * 20}`} fill="none" stroke="#4d3f33" strokeWidth="2" opacity="0.5" />
        ))}
        {/* dormer */}
        <rect x="700" y="420" width="120" height="120" fill="#e8e2d6" />
        <polygon points="690,424 760,370 830,424" fill="#4d3f33" />
        <rect x="735" y="450" width="50" height="70" fill="#8fa9bd" />
        {/* windows / door */}
        {[620, 780, 1180, 1340].map((x) => (
          <rect key={x} x={x} y="600" width="90" height="120" fill="#8fa9bd" stroke="#f7f4ee" strokeWidth="6" />
        ))}
        <rect x="960" y="640" width="100" height="260" fill="#5b2a86" opacity="0.9" />
        {/* worker silhouette, facing away, on the ridge */}
        <g fill="#2b241f">
          <circle cx="1010" cy="284" r="18" />
          <path d="M990 302 h40 l10 62 h-60 z" />
          <path d="M992 360 l-8 40 h16 l6 -40 z M1040 360 l8 40 h-16 l-6 -40 z" />
          <path d="M1030 315 l30 -8 l3 8 l-30 10 z" />
        </g>
        <rect x="1058" y="300" width="4" height="60" fill="#2b241f" />
        {/* ground */}
        <rect x="0" y="880" width="1600" height="20" fill="#8a9d6e" />
      </svg>
    </div>
  );
}
