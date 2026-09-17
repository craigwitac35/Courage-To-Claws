import { Link } from "react-router-dom";

// Real logo assets live in /public. `dark` swaps in the white wordmark for dark backgrounds.
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="logo" aria-label="Courage To Claws home">
      <img className="logo__mark" src="/logo-mark.png" alt="" width="557" height="600" />
      <img className="logo__word" src={dark ? "/wordmark-white.png" : "/wordmark.png"} alt="Courage To Claws" width="800" height="230" />
    </Link>
  );
}
