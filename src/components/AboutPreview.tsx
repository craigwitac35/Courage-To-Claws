import { Link } from "react-router-dom";
import { Placeholder } from "./Placeholder";
import { Icon } from "./Icons";
import { company } from "../data/company";

export function AboutPreview() {
  return (
    <section className="section section--warm" aria-labelledby="about-title">
      <div className="container about reveal">
        <div className="about__media">
          <Placeholder label="Troy and crew on a jobsite" tone="dark" />
        </div>
        <div className="about__body">
          <p className="eyebrow">Who we are</p>
          <h2 id="about-title" className="h-xl">
            Built On Service.
            <br />
            Driven By Purpose.
          </h2>
          <p style={{ marginTop: "1.25rem" }}>
            Courage To Claws was built on service, resilience, and the determination to keep moving forward. Founded as a
            veteran-owned company with a commitment to hiring veterans, the name represents both the courage it takes to
            raise your right hand and serve your country, and the strength to claw your way through injuries, hardships,
            and the battles life can bring.
          </p>
          <div className="about__owner">
            <div>
              <strong>{company.owner}</strong>
              <span>Owner. Army veteran. Purple Heart recipient.</span>
            </div>
          </div>
          <p>
            Troy brings that same discipline, determination, and sense of purpose to every project, and he's on the job
            with the crew, not behind a desk.
          </p>
          <Link to="/about" className="btn btn--secondary" style={{ marginTop: "0.5rem" }}>
            About Courage To Claws <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
