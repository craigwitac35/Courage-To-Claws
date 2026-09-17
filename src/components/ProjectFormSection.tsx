import { ProjectForm } from "./ProjectForm";

export function ProjectFormSection({ embedded = true }: { embedded?: boolean }) {
  return (
    <section className="section section--warm" id="project-form" aria-labelledby="pform-title" style={{ scrollMarginTop: "var(--header-h)" }}>
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Get a quote</p>
          <h2 id="pform-title" className="h-xl">
            Tell Us About Your Project
          </h2>
          <p className="lead" style={{ marginTop: "1rem" }}>
            Have a project in mind? Tell us what you're looking to build, fix, or improve and we'll get in touch.
          </p>
        </div>
        <ProjectForm embedded={embedded} />
      </div>
    </section>
  );
}
