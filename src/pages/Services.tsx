import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Placeholder } from "../components/Placeholder";
import { CTASection } from "../components/CTASection";
import { QuoteLink } from "../components/QuoteLink";
import { services } from "../data/services";
import { useSeo } from "../lib/useSeo";

// Each service block has an id matching its slug so it can later become its
// own SEO page (/services/:slug) without changing the data layer.
export function Services() {
  useSeo("Services", "New construction, roofing, decks, additions, kitchen and bathroom remodeling, and general contracting from Courage To Claws.");
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="From concept to completion"
        lead="From new construction to kitchens, bathrooms, additions, decks, roofing, and everything in between, Courage To Claws takes on projects from concept through completion."
      />
      <section className="section">
        <div className="container">
          {services.map((s) => (
            <article className="service-block" id={s.slug} key={s.slug} style={{ scrollMarginTop: "var(--header-h)" }}>
              <div className="service-block__media">
                <Placeholder label={s.imageLabel} />
              </div>
              <div>
                <h2>{s.title}</h2>
                <p>{s.long}</p>
                <QuoteLink className="btn btn--secondary btn--sm" arrow>
                  Get a Quote
                </QuoteLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
