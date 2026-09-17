import { useEffect, useMemo, useState } from "react";
import { galleryCategories } from "../../data/galleryCategories";
import {
  listGalleryAdmin,
  uploadGalleryPhotos,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  type AdminGalleryItem,
} from "../../lib/admin";
import { validatePhoto, MAX_PHOTOS } from "../../lib/submitQuote";
import { Icon } from "../Icons";

export function GalleryAdmin() {
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<AdminGalleryItem | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await listGalleryAdmin());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load projects.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const toggle = async (item: AdminGalleryItem, key: "published" | "featured") => {
    try {
      await updateGalleryItem(item.id, { [key]: !item[key] });
      setItems((list) => list.map((i) => (i.id === item.id ? { ...i, [key]: !item[key] } : i)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    }
  };

  const remove = async (item: AdminGalleryItem) => {
    if (!window.confirm(`Delete "${item.title}" and its ${item.image_urls.length} photo(s)? This can't be undone.`)) return;
    try {
      await deleteGalleryItem(item);
      setItems((list) => list.filter((i) => i.id !== item.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    }
  };

  if (mode === "new" || (mode === "edit" && editing)) {
    return (
      <ProjectEditor
        item={mode === "edit" ? editing : null}
        onDone={() => {
          setMode("list");
          setEditing(null);
          load();
        }}
        onCancel={() => {
          setMode("list");
          setEditing(null);
        }}
      />
    );
  }

  const cat = (id: string) => galleryCategories.find((c) => c.id === id)?.label ?? id;

  return (
    <>
      <div className="admin__top">
        <p className="admin__note">
          {items.length} project{items.length === 1 ? "" : "s"} · {items.filter((i) => i.published).length} live
        </p>
        <button className="btn btn--primary" onClick={() => setMode("new")}>
          Add project <Icon name="arrow" />
        </button>
      </div>
      {error && (
        <div className="pform__error" role="alert">
          {error}
        </div>
      )}
      {loading ? (
        <div className="empty">Loading…</div>
      ) : items.length === 0 ? (
        <div className="empty">No projects yet. Tap "Add project" to upload your first batch of photos.</div>
      ) : (
        <div className="admin__list">
          {items.map((item) => (
            <div className="admin-item" key={item.id}>
              {item.image_urls[0] ? <img className="admin-item__thumb" src={item.image_urls[0]} alt="" /> : <div className="admin-item__thumb" />}
              <div>
                <h3>{item.title}</h3>
                <div className="admin-item__meta">
                  <span className="badge">{cat(item.category)}</span>
                  <span className={`badge ${item.published ? "badge--live" : "badge--draft"}`}>{item.published ? "Live" : "Draft"}</span>
                  {item.featured && <span className="badge badge--featured">On homepage</span>}
                  <span>{item.image_urls.length} photo{item.image_urls.length === 1 ? "" : "s"}</span>
                </div>
                <div className="admin-item__actions">
                  <button className="btn btn--primary btn--sm" onClick={() => toggle(item, "published")}>
                    {item.published ? "Unpublish" : "Publish"}
                  </button>
                  <button className="btn btn--secondary btn--sm" onClick={() => toggle(item, "featured")}>
                    {item.featured ? "Remove from homepage" : "Feature on homepage"}
                  </button>
                  <button
                    className="btn btn--secondary btn--sm"
                    onClick={() => {
                      setEditing(item);
                      setMode("edit");
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn--secondary btn--sm btn--danger" onClick={() => remove(item)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------- editor ---------------- */

function ProjectEditor({ item, onDone, onCancel }: { item: AdminGalleryItem | null; onDone: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [featured, setFeatured] = useState(item?.featured ?? false);
  const [existing, setExisting] = useState<string[]>(item?.image_urls ?? []);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<[number, number] | null>(null);
  const [error, setError] = useState("");

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const problems: string[] = [];
    const ok: File[] = [];
    for (const f of Array.from(list)) {
      const err = validatePhoto(f);
      if (err) problems.push(err);
      else ok.push(f);
    }
    setFiles((prev) => [...prev, ...ok].slice(0, MAX_PHOTOS * 3));
    setError(problems.join(" "));
  };

  const move = (list: string[], i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return list;
    const copy = [...list];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    return copy;
  };

  const save = async (publish: boolean) => {
    if (!title.trim() || !category) {
      setError("Give it a title and pick a category.");
      return;
    }
    if (existing.length + files.length === 0) {
      setError("Add at least one photo.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const uploaded = files.length ? await uploadGalleryPhotos(files, (d, t) => setProgress([d, t])) : [];
      const image_urls = [...existing, ...uploaded];
      const payload = { title: title.trim(), category, description: description.trim() || null, featured, image_urls, published: publish };
      if (item) await updateGalleryItem(item.id, payload);
      else await createGalleryItem(payload);
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <div className="admin__card">
      <h2 className="h-md" style={{ marginBottom: "1rem" }}>
        {item ? "Edit project" : "Add project"}
      </h2>

      <div className="field">
        <label>Category</label>
        <div className="chips" role="radiogroup" aria-label="Category">
          {galleryCategories.map((c) => (
            <button key={c.id} type="button" role="radio" aria-checked={category === c.id} className="chip" onClick={() => setCategory(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="g-title">Title</label>
        <input id="g-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Two-level cedar deck, Sartell" />
      </div>

      <div className="field">
        <label htmlFor="g-desc">
          Description <span className="opt">Optional</span>
        </label>
        <textarea id="g-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="g-photos">Photos</label>
        <span className="help">Pick as many as you want from your camera roll. They're resized automatically. First photo is the cover.</span>
        <div className="uploader">
          <input id="g-photos" type="file" accept="image/*" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          <label htmlFor="g-photos" className="uploader__btn">
            <Icon name="camera" /> Add photos
          </label>
        </div>
      </div>

      {existing.length > 0 && (
        <div className="field">
          <label>Current photos</label>
          <div className="reorder">
            {existing.map((u, i) => (
              <div className="reorder__item" key={u}>
                <img src={u} alt="" />
                <div className="reorder__btns">
                  <button type="button" aria-label="Move earlier" onClick={() => setExisting((l) => move(l, i, -1))}>←</button>
                  <button type="button" aria-label="Remove" onClick={() => setExisting((l) => l.filter((_, j) => j !== i))}>×</button>
                  <button type="button" aria-label="Move later" onClick={() => setExisting((l) => move(l, i, 1))}>→</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="field">
          <label>New photos to upload ({files.length})</label>
          <ul className="thumbs">
            {previews.map((u, i) => (
              <li className="thumb" key={u}>
                <img src={u} alt={files[i].name} />
                <button type="button" aria-label="Remove" onClick={() => setFiles((l) => l.filter((_, j) => j !== i))}>×</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="field">
        <label>
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} style={{ width: "auto", minHeight: 0, marginRight: "0.5rem" }} />
          Feature on homepage
        </label>
      </div>

      {error && (
        <div className="pform__error" role="alert">
          {error}
        </div>
      )}
      {progress && (
        <div className="admin__progress" aria-label="Upload progress">
          <span style={{ width: `${(progress[0] / progress[1]) * 100}%` }} />
        </div>
      )}

      <div className="pform__nav">
        <button className="btn btn--secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="btn btn--secondary" onClick={() => save(false)} disabled={busy}>
            Save as draft
          </button>
          <button className="btn btn--primary" onClick={() => save(true)} disabled={busy}>
            {busy ? "Saving…" : item?.published ? "Save & keep live" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
