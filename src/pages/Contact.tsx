import { PageHero } from "../components/PageHero";
import { ProjectFormSection } from "../components/ProjectFormSection";
import { Icon } from "../components/Icons";
import { company } from "../data/company";
import { useSeo } from "../lib/useSeo";

export function Contact() {
  useSeo("Contact", "Call, text, email, or send project details to Courage To Claws, a veteran-owned general contractor.");
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's Talk About Your Project" lead="Call, text, email, or send your project details below. Whichever is easiest for you.">
        <ul className="contact-list">
          <li>
            <Icon name="phone" />
            <div>
              <strong>Call</strong>
              <a href={company.phoneHref}>{company.phone}</a>
            </div>
          </li>
          <li>
            <Icon name="text" />
            <div>
              <strong>Text</strong>
              <a href={company.smsHref}>{company.phone}</a>
            </div>
          </li>
          <li>
            <Icon name="mail" />
            <div>
              <strong>Email</strong>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </li>
          <li>
            <Icon name="pin" />
            <div>
              <strong>Service area</strong>
              <span style={{ color: "var(--slate)" }}>{company.serviceAreaPlaceholder}</span>
            </div>
          </li>
        </ul>
      </PageHero>
      <ProjectFormSection embedded={false} />
    </>
  );
}
