import { whyUs } from "../data/company";
import { Icon } from "./Icons";

export function WhyUs() {
  return (
    <section className="section section--dark" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Why Courage To Claws</p>
          <h2 id="why-title" className="h-xl">
            A Higher Standard Of Work
          </h2>
        </div>
        <div className="why-grid reveal">
          {whyUs.map((w) => (
            <div className="why-item" key={w.title}>
              <div className="why-item__icon">
                <Icon name={w.icon} />
              </div>
              <div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
