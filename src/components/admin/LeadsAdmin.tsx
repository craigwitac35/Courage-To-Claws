import { useEffect, useState } from "react";
import { listLeads, setLeadStatus, signedLeadPhotos, type Lead } from "../../lib/admin";
import { projectTypes, contactMethods } from "../../data/projectTypes";

const label = (list: { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? id;
const statuses: Lead["status"][] = ["new", "contacted", "closed"];

export function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");

  useEffect(() => {
    listLeads()
      .then(setLeads)
      .catch((e) => setError(e instanceof Error ? e.message : "Couldn't load requests."))
      .finally(() => setLoading(false));
  }, []);

  const change = async (lead: Lead, status: Lead["status"]) => {
    try {
      await setLeadStatus(lead.id, status);
      setLeads((l) => l.map((x) => (x.id === lead.id ? { ...x, status } : x)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    }
  };

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by status">
        {(["all", ...statuses] as const).map((s) => (
          <button key={s} type="button" aria-pressed={filter === s} onClick={() => setFilter(s)}>
            {s === "all" ? `All (${leads.length})` : `${s[0].toUpperCase() + s.slice(1)} (${leads.filter((l) => l.status === s).length})`}
          </button>
        ))}
      </div>
      {error && (
        <div className="pform__error" role="alert">
          {error}
        </div>
      )}
      {loading ? (
        <div className="empty">Loading…</div>
      ) : visible.length === 0 ? (
        <div className="empty">No project requests here yet.</div>
      ) : (
        <div className="admin__list">
          {visible.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onStatus={(s) => change(lead, s)} />
          ))}
        </div>
      )}
    </>
  );
}

function LeadCard({ lead, onStatus }: { lead: Lead; onStatus: (s: Lead["status"]) => void }) {
  const [photos, setPhotos] = useState<string[] | null>(null);
  const when = new Date(lead.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="admin__card">
      <div className="admin__top" style={{ marginBottom: "0.75rem" }}>
        <div>
          <h3 style={{ fontSize: "1.4rem" }}>
            {lead.name} · {label(projectTypes, lead.project_type)}
          </h3>
          <div className="admin-item__meta" style={{ margin: "0.2rem 0 0" }}>
            <span className={`badge ${lead.status === "new" ? "badge--new" : ""}`}>{lead.status}</span>
            <span>{when}</span>
          </div>
        </div>
        <div className="chips">
          {statuses.map((s) => (
            <button key={s} type="button" className="chip" aria-checked={lead.status === s} role="radio" onClick={() => onStatus(s)}>
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <dl className="lead">
        <div className="lead__row"><dt>Phone</dt><dd><a href={`tel:${lead.phone}`}>{lead.phone}</a></dd></div>
        <div className="lead__row"><dt>Email</dt><dd><a href={`mailto:${lead.email}`}>{lead.email}</a></dd></div>
        <div className="lead__row"><dt>Prefers</dt><dd>{label(contactMethods, lead.preferred_contact)}</dd></div>
        <div className="lead__row"><dt>Location</dt><dd>{lead.location}</dd></div>
        <div className="lead__row"><dt>Details</dt><dd>{lead.description || "None added"}</dd></div>
        <div className="lead__row">
          <dt>Photos</dt>
          <dd>
            {lead.photo_urls.length === 0 ? (
              "None"
            ) : photos ? (
              <div className="lead__photos">
                {photos.map((u, i) => (
                  <a key={u} href={u} target="_blank" rel="noreferrer">
                    <img src={u} alt={`Customer photo ${i + 1}`} />
                  </a>
                ))}
              </div>
            ) : (
              <button className="btn btn--secondary btn--sm" onClick={() => signedLeadPhotos(lead.photo_urls).then(setPhotos)}>
                Show {lead.photo_urls.length} photo{lead.photo_urls.length === 1 ? "" : "s"}
              </button>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
