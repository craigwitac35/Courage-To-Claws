import { Link } from "react-router-dom";
import { company } from "../data/company";
import { QuoteLink } from "./QuoteLink";
import { Icon } from "./Icons";

export function Hero() {
  const [line1, line2] = company.heroHeadline;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg">
        <picture>
          <source media="(max-width: 700px)" type="image/webp" srcSet="/hero-mobile.webp" />
          <source media="(max-width: 700px)" srcSet="/hero-mobile.jpg" />
          <source type="image/webp" srcSet="/hero-desktop.webp" />
          <img
            src="/hero-desktop.jpg"
            alt="Courage To Claws roofing crew installing shingles on a residential home at golden hour"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div className="hero__shade" />
      <div className="container">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            <span>{line1}</span>
            <span>
              <em>{line2}</em>
            </span>
          </h1>
          <div className="hero__divider" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.4 5.8 21l1.6-7L2 9.3l7.1-.7L12 2z" />
            </svg>
          </div>
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
              View Our Work <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
