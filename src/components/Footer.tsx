import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { company } from "../data/company";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Logo />
            <p className="footer__tag">{company.tagline}</p>
            <p style={{ marginTop: "1rem", maxWidth: "26rem" }}>
              A veteran-owned general contractor handling new construction, remodeling, roofing, decks, and additions.
            </p>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/our-work">Our Work</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={company.phoneHref}>{company.phone}</a></li>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><Link to="/contact#project-form">Request a quote</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <span>Veteran-Owned</span>
        </div>
      </div>
    </footer>
  );
}
