// Supabase Edge Function: email Troy when a new quote request is inserted.
// Triggered by a Database Webhook on public.quote_requests (INSERT).
//
// Secrets to set (Project Settings > Edge Functions > Secrets):
//   RESEND_API_KEY   - from resend.com
//   NOTIFY_TO        - Troy's email address
//   NOTIFY_FROM      - a verified sender, e.g. "Courage To Claws <leads@yourdomain.com>"
//   WEBHOOK_SECRET   - any long random string (e.g. `openssl rand -hex 32`)
//
// Deploy: supabase functions deploy notify-quote --no-verify-jwt
// (Database webhooks carry no user JWT, so JWT verification must stay off.
//  The shared secret below is what stops anyone else from invoking this URL.)
//
// Webhook config (Database > Webhooks): add HTTP header
//   x-webhook-secret: <the same WEBHOOK_SECRET value>

import { createClient } from "npm:@supabase/supabase-js@2";

type Row = {
  id: string;
  project_type: string;
  location: string;
  description: string | null;
  photo_urls: string[];
  name: string;
  phone: string;
  email: string;
  preferred_contact: string;
  created_at: string;
};

const labels: Record<string, string> = {
  new_construction: "New Construction",
  roofing: "Roofing",
  deck: "Deck",
  addition: "Addition",
  kitchen_remodel: "Kitchen Remodel",
  bathroom_remodel: "Bathroom Remodel",
  general_remodel: "General Remodel",
  repair: "Repair",
  other: "Other",
  asap: "As soon as possible",
  "1_3_months": "Within 1 to 3 months",
  call: "Call",
  text: "Text",
  email: "Email",
};
const label = (v: string) => labels[v] ?? v;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

Deno.serve(async (req) => {
  const secret = Deno.env.get("WEBHOOK_SECRET");
  if (!secret || req.headers.get("x-webhook-secret") !== secret) {
    return new Response("unauthorized", { status: 401 });
  }
  try {
    const payload = await req.json();
    const row: Row = payload.record ?? payload;

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Signed links so Troy can open private photos for 7 days without logging in.
    const photoLinks: string[] = [];
    for (const path of row.photo_urls ?? []) {
      const { data } = await supabase.storage.from("quote-photos").createSignedUrl(path, 60 * 60 * 24 * 7);
      if (data?.signedUrl) photoLinks.push(data.signedUrl);
    }

    const lines = [
      ["Name", row.name],
      ["Phone", row.phone],
      ["Email", row.email],
      ["Prefers", label(row.preferred_contact)],
      ["Project", label(row.project_type)],
      ["Location", row.location],
      ["Details", row.description || "(none)"],
    ];

    const html = `
      <h2 style="font-family:sans-serif">New project request: ${esc(label(row.project_type))}</h2>
      <table style="font-family:sans-serif;border-collapse:collapse">
        ${lines.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666"><b>${k}</b></td><td style="padding:6px 0">${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}
      </table>
      ${photoLinks.length ? `<p style="font-family:sans-serif"><b>Photos (${photoLinks.length}):</b><br>${photoLinks.map((u, i) => `<a href="${u}">Photo ${i + 1}</a>`).join("<br>")}</p>` : ""}
      <p style="font-family:sans-serif;color:#888;font-size:12px">Sent ${new Date(row.created_at).toLocaleString("en-US", { timeZone: "America/Chicago" })} via couragetoclaws website</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: Deno.env.get("NOTIFY_FROM"),
        to: [Deno.env.get("NOTIFY_TO")],
        reply_to: row.email,
        subject: `New project request: ${label(row.project_type)} in ${row.location} (${row.name})`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Resend error", await res.text());
      return new Response("email failed", { status: 500 });
    }
    return new Response("ok");
  } catch (e) {
    console.error(e);
    return new Response("error", { status: 500 });
  }
});
