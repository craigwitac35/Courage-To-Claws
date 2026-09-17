import { Link } from "react-router-dom";
import type { Service } from "../data/services";
import { Placeholder } from "./Placeholder";
import { Icon } from "./Icons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to={`/services#${service.slug}`} className="service-card">
      <div className="service-card__media">
        <Placeholder label={service.imageLabel} />
      </div>
      <div className="service-card__body">
        <h3>{service.title}</h3>
        <p>{service.short}</p>
        <span className="service-card__link">
          Learn more <Icon name="arrow" />
        </span>
      </div>
    </Link>
  );
}
