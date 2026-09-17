import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Icon } from "./Icons";

// On the homepage: smooth-scroll to the embedded form.
// Anywhere else: go to the full form page.
export function QuoteLink({ className, children, onClick, arrow = false }: { className?: string; children: ReactNode; onClick?: () => void; arrow?: boolean }) {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <a
        href="#project-form"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("project-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
          onClick?.();
        }}
      >
        {children}
        {arrow && <Icon name="arrow" />}
      </a>
    );
  }
  return (
    <Link to="/contact#project-form" className={className} onClick={onClick}>
      {children}
      {arrow && <Icon name="arrow" />}
    </Link>
  );
}
