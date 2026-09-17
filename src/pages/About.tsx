import { PageHero } from "../components/PageHero";
import { Placeholder } from "../components/Placeholder";
import { CTASection } from "../components/CTASection";
import { values, company } from "../data/company";
import { Icon } from "../components/Icons";
import { useSeo } from "../lib/useSeo";

export function About() {
  useSeo("About", "Courage To Claws is a veteran-owned general contractor founded by Army veteran and Purple Heart recipient Troy Risdal.");
  return (
    <>
      <PageHero eyebrow="About" title="More than a construction company" lead="Veteran-owned, hands-on, and built around the idea that how you work matters as much as what you build." />

      <section className="section">
        <div className="container about">
          <div className="about__media">
            <img src="/troy-color.jpg" alt="Troy Risdal" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="about__body">
            <h2 className="h-lg">Where the name comes from</h2>
            <p style={{ marginTop: "1rem" }}>
              <strong>Courage</strong> is for everyone who had the courage to raise their right hand, join the military, and
              serve their country.
            </p>
            <p>
              <strong>Claws</strong> is for the determination it takes to claw your way through injuries, hardships, setbacks,
              and whatever other battles life puts in front of you.
            </p>
            <p>
              Together, they describe how this company approaches every job: show up, do the hard thing, and keep moving
              forward until it's done right.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container about about--flip">
          <div className="about__media">
            <Placeholder label="Crew at work" />
          </div>
          <div className="about__body">
            <p className="eyebrow">Ownership</p>
            <h2 className="h-lg">{company.owner}</h2>
            <div className="about__owner">
              <div>
                <strong>Army veteran</strong>
                <span>Purple Heart recipient. Owner and operator.</span>
              </div>
            </div>
            <p>
              Troy founded Courage To Claws as a veteran-owned company with a clear purpose: build quality work for
              customers and create real opportunities for veterans. He leads from the jobsite, not from an office, and
              brings the same discipline and sense of purpose he learned in service to every project.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
              Placeholder copy. This section will be updated with Troy's own words.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we stand for</p>
            <h2 className="h-xl">Courage. Resilience. Discipline. <em>Purpose.</em></h2>
          </div>
          <div className="values">
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

      <section className="section section--gray">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Our mission</p>
            <h2 className="h-lg">Built on service. Built for the community.</h2>
            <p className="lead" style={{ marginTop: "1rem" }}>
              Courage To Claws brings the same discipline and work ethic learned in service to every job, and works
              to deliver work the community can count on. As the crew grows, you'll meet them here.
            </p>
          </div>
          {/* Future crew/team section goes here. */}
        </div>
      </section>

      <CTASection />
    </>
  );
}
