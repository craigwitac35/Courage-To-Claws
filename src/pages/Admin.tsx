import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { sendMagicLink, signOut } from "../lib/admin";
import { GalleryAdmin } from "../components/admin/GalleryAdmin";
import { LeadsAdmin } from "../components/admin/LeadsAdmin";
import { useSeo } from "../lib/useSeo";

type Tab = "photos" | "requests";

export function Admin() {
  useSeo("Admin", "Courage To Claws admin");
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("photos");

  // keep search engines out even if the URL leaks
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <section className="admin">
        <div className="container admin__login admin__card">
          <h1>Admin</h1>
          <p>Supabase isn't configured for this build, so the admin area is unavailable.</p>
        </div>
      </section>
    );
  }

  if (!ready) return <section className="admin" />;
  if (!session) return <Login />;

  return (
    <section className="admin">
      <div className="container">
        <div className="admin__top">
          <h1>Courage To Claws admin</h1>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <span className="admin__note">{session.user.email}</span>
            <button className="btn btn--secondary btn--sm" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
        <div className="admin__tabs" role="tablist">
          <button role="tab" aria-selected={tab === "photos"} onClick={() => setTab("photos")}>
            Photos
          </button>
          <button role="tab" aria-selected={tab === "requests"} onClick={() => setTab("requests")}>
            Project requests
          </button>
        </div>
        {tab === "photos" ? <GalleryAdmin /> : <LeadsAdmin />}
      </div>
    </section>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setState("sending");
    try {
      await sendMagicLink(email.trim());
      setState("sent");
    } catch (e) {
      setState("error");
      setMsg(e instanceof Error ? e.message : "Couldn't send the link.");
    }
  };

  return (
    <section className="admin">
      <div className="container">
        <div className="admin__login admin__card">
          <h1>Sign in</h1>
          {state === "sent" ? (
            <p role="status">
              Check your email for a sign-in link. Tap it on this device and you'll land back here, logged in.
            </p>
          ) : (
            <>
              <p>Enter your email and we'll send a one-tap sign-in link. No password.</p>
              <div className="field">
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                />
              </div>
              {state === "error" && (
                <p className="field__error" role="alert">
                  {msg}
                </p>
              )}
              <button className="btn btn--primary btn--block" onClick={submit} disabled={state === "sending" || !email}>
                {state === "sending" ? "Sending…" : "Send sign-in link"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
