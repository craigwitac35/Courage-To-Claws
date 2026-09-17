import { values } from "../data/company";
import { Icon } from "./Icons";

export function Values() {
  return (
    <section className="section section--tight section--grid" aria-labelledby="values-title">
      <div className="container">
        <div className="values-intro reveal">
          <h2 id="values-title">What we stand for</h2>
          <span>Four words that run through every job.</span>
        </div>
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
