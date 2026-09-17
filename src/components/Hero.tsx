import { Link } from "react-router-dom";
import { company } from "../data/company";
import { QuoteLink } from "./QuoteLink";
import { Icon } from "./Icons";

// The hero photo carries the logo, headline, and service line baked in.
// The <h1> stays in the markup (visually hidden) so search engines and
// screen readers still get the page's headline.
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg">
        <picture>
          <source media="(max-width: 700px)" type="image/webp" srcSet="/hero-mobile.webp" />
          <source media="(max-width: 700px)" srcSet="/hero-mobile.jpg" />
          <source type="image/webp" srcSet="/hero-desktop.webp" />
          <img
            src="/hero-desktop.jpg"
            alt={`Courage To Claws. ${company.heroHeadline.join(" ")} ${company.heroServiceLine.join(", ")}.`}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div className="hero__shade" />
      <div className="container">
        <div className="hero__content">
          <h1 id="hero-title" className="sr-only">
            {company.heroHeadline.join(" ")}
          </h1>
          <div className="hero__actions">
            <QuoteLink className="btn btn--primary" arrow>
              Get a Quote
            </QuoteLink>
            <Link to="/our-work" className="btn btn--ghost-light">
              View Our Work <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
