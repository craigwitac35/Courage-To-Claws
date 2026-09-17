import { company } from "../data/company";
import { QuoteLink } from "./QuoteLink";
import { Icon } from "./Icons";

export function CTASection() {
  return (
    <section className="cta-band section section--tight" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <div>
          <h2 id="cta-title">Ready To Start Your Project?</h2>
          <p>Tell us what you're working on and let's take the next step.</p>
        </div>
        <div className="cta-band__actions">
          <QuoteLink className="btn btn--light" arrow>
            Get a Quote
          </QuoteLink>
          <a href={company.phoneHref} className="btn btn--ghost-light">
            <Icon name="phone" /> Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
