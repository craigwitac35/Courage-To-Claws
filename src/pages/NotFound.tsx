import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";
import { Icon } from "../components/Icons";

export function NotFound() {
  useSeo("Page not found", "That page doesn't exist.");
  return (
    <section className="notfound container">
      <p className="eyebrow">404</p>
      <h1>That page isn't here.</h1>
      <p>The link may be old or mistyped. Head back to the homepage or tell us about your project.</p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="btn btn--secondary">
          Back to home
        </Link>
        <Link to="/contact#project-form" className="btn btn--primary">
          Get a Quote <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
