import { Link } from "react-router-dom";

// TODO: replace the SVG mark with the real logo file, e.g.
// <img src="/logo.svg" alt="Courage To Claws" className="logo__img" />
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Courage To Claws home">
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="8" fill="#5B2A86" />
        <path d="M14 44 L32 18 L50 44" fill="none" stroke="#E1B640" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 44 L32 32 L40 44" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__text">
        Courage To Claws
        <small>Veteran-Owned Contractor</small>
      </span>
    </Link>
  );
}
