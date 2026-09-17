import { whyUs } from "../data/company";
import { Icon } from "./Icons";

export function WhyUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container why reveal">
        <div className="why__lead">
          <p className="eyebrow">Why Courage To Claws</p>
          <h2 id="why-title">A higher standard of work</h2>
          <p>Not a sales pitch. Just how the company runs.</p>
        </div>
        <div className="why-grid">
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
