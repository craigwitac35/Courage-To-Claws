import { Link } from "react-router-dom";
import { services } from "../data/services";
import { ServiceCard } from "./ServiceCard";
import { Icon } from "./Icons";

export function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="section" aria-labelledby="services-title" id="services">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Our services</p>
          <h2 id="services-title" className="h-xl">
            From Concept To Completion
          </h2>
          <p className="lead" style={{ marginTop: "1rem" }}>
            From new construction to kitchens, bathrooms, additions, decks, roofing, and everything in between, Courage
            To Claws takes on projects from concept through completion.
          </p>
        </div>
        <div className="services-grid services-grid--swipe reveal">
          {list.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        {limit && (
          <div style={{ marginTop: "2rem" }}>
            <Link to="/services" className="btn btn--secondary">
              All Services <Icon name="arrow" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
