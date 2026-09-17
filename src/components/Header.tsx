import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { QuoteLink } from "./QuoteLink";
import { company } from "../data/company";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/our-work", label: "Our Work" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="container header__inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <QuoteLink className="btn btn--primary btn--sm header__cta">Get a Quote</QuoteLink>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          <QuoteLink className="btn btn--primary btn--block" onClick={() => setOpen(false)}>
            Get a Quote
          </QuoteLink>
          <p className="mobile-menu__phone">
            Prefer to talk? <a href={company.phoneHref}>{company.phone}</a>
          </p>
        </nav>
      )}
    </>
  );
}
