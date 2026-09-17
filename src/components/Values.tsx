import { values } from "../data/company";
import { Icon } from "./Icons";

export function Values() {
  return (
    <section className="section section--tight" aria-labelledby="values-title">
      <div className="container">
        <h2 id="values-title" className="sr-only">
          Our values
        </h2>
        <div className="values reveal">
          {values.map((v) => (
            <div className="value" key={v.id}>
              <Icon name={v.icon} className="value__icon" />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
