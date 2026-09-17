import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { projectTypes, timelines, contactMethods, formSteps, type StepId } from "../data/projectTypes";
import { submitQuote, validatePhoto, MAX_PHOTOS, type QuoteFormData } from "../lib/submitQuote";
import { Icon } from "./Icons";
import { company } from "../data/company";

type Errors = Partial<Record<keyof QuoteFormData, string>>;

const initial: QuoteFormData = {
  projectType: "",
  location: "",
  timeline: "",
  description: "",
  photos: [],
  name: "",
  phone: "",
  email: "",
  preferredContact: "",
};

export function ProjectForm({ embedded = true }: { embedded?: boolean }) {
  const [step, setStep] = useState<StepId>("type");
  const [data, setData] = useState<QuoteFormData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const stepIndex = formSteps.findIndex((s) => s.id === step);
  const set = <K extends keyof QuoteFormData>(k: K, v: QuoteFormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const goTo = (id: StepId) => {
    setStep(id);
    if (embedded) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: (topRef.current?.offsetTop ?? 0) - 90, behavior: "smooth" });
  };

  const validate = (id: StepId): boolean => {
    const e: Errors = {};
    if (id === "type" && !data.projectType) e.projectType = "Choose the type of project so we know where to start.";
    if (id === "details") {
      if (!data.location.trim()) e.location = "Enter the city or address where the work will happen.";
      if (!data.timeline) e.timeline = "Pick the timeline that's closest to what you're thinking.";
    }
    if (id === "contact") {
      if (!data.name.trim()) e.name = "Enter your name.";
      if (!/^[\d\s().+-]{7,}$/.test(data.phone.trim())) e.phone = "Enter a phone number we can reach you at.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Enter a valid email address.";
      if (!data.preferredContact) e.preferredContact = "Tell us how you'd like us to reach you.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    goTo(formSteps[stepIndex + 1].id);
  };
  const back = () => goTo(formSteps[stepIndex - 1].id);

  const submit = async () => {
    setStatus("sending");
    setErrorMsg("");
    const res = await submitQuote(data);
    if (res.ok) {
      setStatus("done");
      goTo("review");
    } else {
      setStatus("error");
      setErrorMsg(res.message);
    }
  };

  if (status === "done") {
    return (
      <div className="pform" ref={topRef}>
        <div className="pform__done" role="status">
          <Icon name="check" />
          <h3>Project details sent</h3>
          <p>Thanks for reaching out. We've received your project information and will be in touch.</p>
          <p style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
            Need to talk sooner? Call or text <a href={company.phoneHref}>{company.phone}</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pform" ref={topRef}>
      <FormProgress current={step} />

      <div className="pform__step" key={step}>
        {step === "type" && <ProjectTypeStep value={data.projectType} onChange={(v) => set("projectType", v)} error={errors.projectType} />}
        {step === "details" && <DetailsStep data={data} set={set} errors={errors} />}
        {step === "contact" && <ContactStep data={data} set={set} errors={errors} />}
        {step === "review" && <ReviewStep data={data} goTo={goTo} />}
      </div>

      {status === "error" && (
        <div className="pform__error" role="alert">
          {errorMsg}
        </div>
      )}

      <div className="pform__nav">
        {stepIndex > 0 && (
          <button type="button" className="btn btn--secondary" onClick={back} disabled={status === "sending"}>
            Back
          </button>
        )}
        {step !== "review" ? (
          <button type="button" className="btn btn--primary" onClick={next}>
            Next <Icon name="arrow" />
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={submit} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Project Details"}
            {status !== "sending" && <Icon name="arrow" />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- progress ---------------- */

function FormProgress({ current }: { current: StepId }) {
  const idx = formSteps.findIndex((s) => s.id === current);
  return (
    <ol className="pform__progress" aria-label="Form progress">
      {formSteps.map((s, i) => (
        <li key={s.id} data-state={i < idx ? "done" : i === idx ? "current" : "todo"} aria-current={i === idx ? "step" : undefined}>
          <span>Step {i + 1}</span>
          {s.label}
        </li>
      ))}
    </ol>
  );
}

/* ---------------- step 1 ---------------- */

function ProjectTypeStep({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <>
      <h3>What are you looking to have done?</h3>
      <p className="pform__hint">Pick the closest match. You can add details on the next step.</p>
      <div className="type-grid" role="radiogroup" aria-label="Project type" aria-describedby={error ? "type-error" : undefined}>
        {projectTypes.map((t) => (
          <button key={t.id} type="button" role="radio" aria-checked={value === t.id} className="type-card" onClick={() => onChange(t.id)}>
            <Icon name={t.icon} />
            {t.label}
          </button>
        ))}
      </div>
      {error && (
        <p id="type-error" className="field__error" style={{ marginTop: "0.75rem" }}>
          {error}
        </p>
      )}
    </>
  );
}

/* ---------------- step 2 ---------------- */

function DetailsStep({ data, set, errors }: { data: QuoteFormData; set: <K extends keyof QuoteFormData>(k: K, v: QuoteFormData[K]) => void; errors: Errors }) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.max(120, ta.scrollHeight)}px`;
  }, [data.description]);

  return (
    <>
      <h3>Tell us about the project</h3>
      <p className="pform__hint">A few basics so we can understand the job before we reach out.</p>

      <div className={`field${errors.location ? " field--error" : ""}`}>
        <label htmlFor="location">Project location</label>
        <input
          id="location"
          type="text"
          autoComplete="address-level2"
          placeholder="City or address"
          value={data.location}
          onChange={(e) => set("location", e.target.value)}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={errors.location ? "location-error" : undefined}
        />
        {errors.location && (
          <span id="location-error" className="field__error">
            {errors.location}
          </span>
        )}
      </div>

      <div className={`field${errors.timeline ? " field--error" : ""}`}>
        <span className="sr-only" id="timeline-label">
          Desired timeline
        </span>
        <label aria-hidden="true">Desired timeline</label>
        <div className="chips" role="radiogroup" aria-labelledby="timeline-label">
          {timelines.map((t) => (
            <button key={t.id} type="button" role="radio" aria-checked={data.timeline === t.id} className="chip" onClick={() => set("timeline", t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        {errors.timeline && <span className="field__error">{errors.timeline}</span>}
      </div>

      <div className="field">
        <label htmlFor="description">
          Tell us more about your project <span className="opt">Optional</span>
        </label>
        <span className="help">What are you looking to build, fix, or improve? Include any details that would help us understand the job.</span>
        <textarea id="description" ref={taRef} rows={4} value={data.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="photos">
          Photos <span className="opt">Optional, up to {MAX_PHOTOS}</span>
        </label>
        <PhotoUploader files={data.photos} onChange={(f) => set("photos", f)} />
      </div>
    </>
  );
}

function PhotoUploader({ files, onChange }: { files: File[]; onChange: (f: File[]) => void }) {
  const [msg, setMsg] = useState("");
  const previews = useMemo(() => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);

  const add = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const problems: string[] = [];
    const ok: File[] = [];
    for (const f of incoming) {
      const err = validatePhoto(f);
      if (err) problems.push(err);
      else ok.push(f);
    }
    const merged = [...files, ...ok].slice(0, MAX_PHOTOS);
    if (files.length + ok.length > MAX_PHOTOS) problems.push(`Only the first ${MAX_PHOTOS} photos were kept.`);
    setMsg(problems.join(" "));
    onChange(merged);
  };

  return (
    <div className="uploader">
      <input id="photos" type="file" accept="image/*" multiple onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
      <label htmlFor="photos" className="uploader__btn">
        <Icon name="camera" /> Add photos
      </label>
      <p>Take a photo or choose from your gallery. JPG, PNG, or HEIC.</p>
      {msg && (
        <p className="field__error" role="status">
          {msg}
        </p>
      )}
      {previews.length > 0 && (
        <ul className="thumbs">
          {previews.map((p, i) => (
            <li className="thumb" key={p.url}>
              <img src={p.url} alt={`Photo ${i + 1}: ${p.file.name}`} />
              <button type="button" aria-label={`Remove photo ${i + 1}`} onClick={() => onChange(files.filter((_, j) => j !== i))}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------- step 3 ---------------- */

function ContactStep({ data, set, errors }: { data: QuoteFormData; set: <K extends keyof QuoteFormData>(k: K, v: QuoteFormData[K]) => void; errors: Errors }) {
  const field = (id: keyof QuoteFormData, label: string, type: string, autoComplete: string, placeholder?: string) => (
    <div className={`field${errors[id] ? " field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
        value={data[id] as string}
        onChange={(e) => set(id, e.target.value as never)}
        aria-invalid={Boolean(errors[id])}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
      />
      {errors[id] && (
        <span id={`${id}-error`} className="field__error">
          {errors[id]}
        </span>
      )}
    </div>
  );

  return (
    <>
      <h3>How can we reach you?</h3>
      <p className="pform__hint">We'll only use this to follow up about your project.</p>
      {field("name", "Name", "text", "name")}
      <div className="field-row">
        {field("phone", "Phone", "tel", "tel", "(320) 555-0100")}
        {field("email", "Email", "email", "email", "you@example.com")}
      </div>
      <div className={`field${errors.preferredContact ? " field--error" : ""}`}>
        <span className="sr-only" id="contact-label">
          Preferred contact method
        </span>
        <label aria-hidden="true">Preferred contact method</label>
        <div className="chips" role="radiogroup" aria-labelledby="contact-label">
          {contactMethods.map((m) => (
            <button key={m.id} type="button" role="radio" aria-checked={data.preferredContact === m.id} className="chip" onClick={() => set("preferredContact", m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        {errors.preferredContact && <span className="field__error">{errors.preferredContact}</span>}
      </div>
    </>
  );
}

/* ---------------- step 4 ---------------- */

function ReviewStep({ data, goTo }: { data: QuoteFormData; goTo: (s: StepId) => void }) {
  const label = (list: { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? "";
  const previews = useMemo(() => data.photos.map((f) => URL.createObjectURL(f)), [data.photos]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  const rows: { k: string; v: ReactNode; step: StepId }[] = [
    { k: "Project type", v: label(projectTypes, data.projectType), step: "type" },
    { k: "Location", v: data.location, step: "details" },
    { k: "Timeline", v: label(timelines, data.timeline), step: "details" },
    { k: "Description", v: data.description || "None added", step: "details" },
    {
      k: "Photos",
      v: previews.length ? (
        <div className="review__thumbs">
          {previews.map((u, i) => (
            <img key={u} src={u} alt={`Photo ${i + 1}`} />
          ))}
        </div>
      ) : (
        "None added"
      ),
      step: "details",
    },
    { k: "Name", v: data.name, step: "contact" },
    { k: "Phone", v: data.phone, step: "contact" },
    { k: "Email", v: data.email, step: "contact" },
    { k: "Reach you by", v: label(contactMethods, data.preferredContact), step: "contact" },
  ];

  return (
    <>
      <h3>Review and send</h3>
      <p className="pform__hint">Check that everything looks right. You can edit any section.</p>
      <dl className="review">
        {rows.map((r) => (
          <div className="review__row" key={r.k}>
            <dt>{r.k}</dt>
            <dd>{r.v}</dd>
            <button type="button" onClick={() => goTo(r.step)}>
              Edit
            </button>
          </div>
        ))}
      </dl>
    </>
  );
}
