import { Plus, Trash2, Eye, EyeOff, Upload, Loader2, KeyRound } from "lucide-react";
import type { SiteData, Chamber, GalleryItem } from "@/lib/data";
import { useState, useRef } from "react";
import { uploadGalleryImage, deleteGalleryImage } from "@/lib/gallery-upload";
import { supabase } from "@/integrations/supabase/client";

/* ── Shared Field ── */
function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input className="admin-input mt-1" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

/* ── Password Field with Eye Toggle ── */
export function PasswordField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative mt-1">
        <input
          className="admin-input pr-11"
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShow((s) => !s); }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors z-10"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

/* ── Image Field with Preview ── */
function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2 mt-1">
        <input className="admin-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Paste image URL..." />
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="shrink-0 rounded-xl p-2.5 text-primary hover:bg-primary/10 transition-colors"
          title="Preview"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
      {showPreview && value && (
        <div className="mt-3 glass-card p-3 inline-block">
          <img src={value} alt="Preview" className="h-32 w-32 rounded-xl object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
      )}
    </div>
  );
}

/* ── Doctor Editor ── */
export function DoctorEditor({ data, onChange }: { data: SiteData["doctor"]; onChange: (d: SiteData["doctor"]) => void }) {
  const update = (key: keyof SiteData["doctor"], value: string) => onChange({ ...data, [key]: value });
  return (
    <div className="space-y-4">
      <Field label="Full Name" value={data.name} onChange={(v) => update("name", v)} />
      <Field label="Title" value={data.title} onChange={(v) => update("title", v)} />
      <Field label="BMDC Registration" value={data.bmdc} onChange={(v) => update("bmdc", v)} />
      <ImageField label="Profile Image URL" value={data.imageUrl} onChange={(v) => update("imageUrl", v)} />
      <div>
        <label className="text-sm font-medium text-foreground">Introduction</label>
        <textarea
          className="admin-input mt-1 min-h-[100px] resize-y"
          value={data.intro}
          onChange={(e) => update("intro", e.target.value)}
        />
      </div>
    </div>
  );
}

/* ── List Editor ── */
export function ListEditor({ items, onChange, label }: { items: string[]; onChange: (v: string[]) => void; label: string }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="admin-input"
            value={item}
            onChange={(e) => {
              const copy = [...items];
              copy[i] = e.target.value;
              onChange(copy);
            }}
            placeholder={`${label} ${i + 1}`}
          />
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="shrink-0 rounded-lg p-2 text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} className="btn-secondary text-sm py-2 px-3">
        <Plus className="h-4 w-4" /> Add {label}
      </button>
    </div>
  );
}

/* ── Gallery Editor (file upload to Supabase Storage) ── */
export function GalleryEditor({ items, onChange }: { items: GalleryItem[]; onChange: (v: GalleryItem[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");
    try {
      const newItems: GalleryItem[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          setUploadError(`${file.name}: not an image`);
          continue;
        }
        if (file.size > 10 * 1024 * 1024) {
          setUploadError(`${file.name}: larger than 10 MB`);
          continue;
        }
        const { publicUrl, path } = await uploadGalleryImage(file);
        newItems.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          imageUrl: publicUrl,
          caption: "",
          storagePath: path,
        });
      }
      if (newItems.length) onChange([...items, ...newItems]);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const remove = async (i: number) => {
    const item = items[i];
    if (item.storagePath) await deleteGalleryImage(item.storagePath).catch(() => {});
    onChange(items.filter((_, idx) => idx !== i));
  };

  const updateCaption = (i: number, caption: string) => {
    const copy = [...items];
    copy[i] = { ...copy[i], caption };
    onChange(copy);
  };

  return (
    <div className="space-y-5">
      <div className="glass-card p-5 text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="gallery-upload"
        />
        <label
          htmlFor="gallery-upload"
          className={`btn-primary inline-flex cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading..." : "Upload Images"}
        </label>
        <p className="text-xs text-muted-foreground mt-3">JPG, PNG, WEBP up to 10 MB each. You can select multiple.</p>
        {uploadError && <p className="text-sm text-destructive mt-2">{uploadError}</p>}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center">No images yet — upload some above.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={item.id} className="glass-card p-3 space-y-3">
              <div className="relative">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-40 object-cover rounded-lg" />
                <button
                  onClick={() => remove(i)}
                  className="absolute top-2 right-2 rounded-full bg-destructive/90 text-destructive-foreground p-1.5 hover:bg-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <input
                className="admin-input text-sm"
                value={item.caption}
                onChange={(e) => updateCaption(i, e.target.value)}
                placeholder="Caption (optional)"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Chambers Editor ── */
export function ChambersEditor({ chambers, onChange }: { chambers: Chamber[]; onChange: (v: Chamber[]) => void }) {
  const update = (i: number, partial: Partial<Chamber>) => {
    const copy = [...chambers];
    copy[i] = { ...copy[i], ...partial };
    onChange(copy);
  };

  return (
    <div className="space-y-8">
      {chambers.map((c, i) => (
        <div key={c.id} className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">Chamber {i + 1}</h3>
            <button onClick={() => onChange(chambers.filter((_, idx) => idx !== i))} className="text-destructive hover:bg-destructive/10 rounded-lg p-1.5">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Field label="Name" value={c.name} onChange={(v) => update(i, { name: v })} />
          <Field label="Address" value={c.address} onChange={(v) => update(i, { address: v })} />
          <Field label="Map Search Query" value={c.mapQuery} onChange={(v) => update(i, { mapQuery: v })} />
          <Field label="Hotline" value={c.hotline ?? ""} onChange={(v) => update(i, { hotline: v || undefined })} />
          <Field label="Website" value={c.website ?? ""} onChange={(v) => update(i, { website: v || undefined })} />
          <Field label="Facebook" value={c.facebook ?? ""} onChange={(v) => update(i, { facebook: v || undefined })} />
          <div>
            <label className="text-sm font-medium text-foreground">Schedule (one per line)</label>
            <textarea
              className="admin-input mt-1 min-h-[80px]"
              value={c.schedule.join("\n")}
              onChange={(e) => update(i, { schedule: e.target.value.split("\n") })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Phones (one per line)</label>
            <textarea
              className="admin-input mt-1 min-h-[60px]"
              value={c.phones.join("\n")}
              onChange={(e) => update(i, { phones: e.target.value.split("\n").filter(Boolean) })}
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => onChange([...chambers, { id: Date.now().toString(), name: "", address: "", schedule: [""], phones: [""], mapQuery: "" }])}
        className="btn-secondary text-sm py-2 px-3"
      >
        <Plus className="h-4 w-4" /> Add Chamber
      </button>
    </div>
  );
}

/* ── Number List ── */
function NumberList({ label, list, onChange }: { label: string; list: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {list.map((num, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="admin-input"
            value={num}
            onChange={(e) => {
              const copy = [...list];
              copy[i] = e.target.value;
              onChange(copy);
            }}
            placeholder="e.g. 01712-050951"
          />
          <button
            type="button"
            onClick={() => onChange(list.filter((_, idx) => idx !== i))}
            className="shrink-0 rounded-lg p-2 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...list, ""])} className="btn-secondary text-sm py-2 px-3">
        <Plus className="h-4 w-4" /> Add Number
      </button>
    </div>
  );
}

/* ── Contact Editor ── */
export function ContactEditor({ contact, onChange }: { contact: SiteData["contact"]; onChange: (v: SiteData["contact"]) => void }) {
  return (
    <div className="space-y-6">
      <NumberList
        label="WhatsApp Numbers"
        list={contact.whatsappNumbers}
        onChange={(list) => onChange({ ...contact, whatsappNumbers: list })}
      />
      <NumberList
        label="Phone Numbers"
        list={contact.phoneNumbers}
        onChange={(list) => onChange({ ...contact, phoneNumbers: list })}
      />
      <Field label="Website" value={contact.website} onChange={(v) => onChange({ ...contact, website: v })} />
      <Field label="Facebook" value={contact.facebook} onChange={(v) => onChange({ ...contact, facebook: v })} />
    </div>
  );
}

/* ── Settings Editor (site title + logo + change account password) ── */
export function SettingsEditor({ settings, onChange }: { settings: SiteData["settings"]; onChange: (v: SiteData["settings"]) => void }) {
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const handlePasswordChange = async () => {
    setPwMsg(null);
    if (newPw.length < 6) {
      setPwMsg({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ type: "error", text: "Passwords do not match" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setBusy(false);
    if (error) {
      setPwMsg({ type: "error", text: error.message });
    } else {
      setNewPw("");
      setConfirmPw("");
      setPwMsg({ type: "success", text: "Password updated successfully." });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-bold text-foreground text-lg">Site Settings</h3>
        <Field label="Site Title" value={settings.siteTitle} onChange={(v) => onChange({ ...settings, siteTitle: v })} />
        <ImageField label="Logo URL" value={settings.logo} onChange={(v) => onChange({ ...settings, logo: v })} />
      </div>

      <div className="glass-card p-5 space-y-4">
        <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
          <KeyRound className="h-5 w-5" /> Change Account Password
        </h3>
        <p className="text-xs text-muted-foreground">Updates your Supabase Auth password.</p>
        <PasswordField label="New Password" value={newPw} onChange={setNewPw} />
        <PasswordField label="Confirm New Password" value={confirmPw} onChange={setConfirmPw} />
        {pwMsg && (
          <p className={`text-sm ${pwMsg.type === "error" ? "text-destructive" : "text-success"}`}>{pwMsg.text}</p>
        )}
        <button onClick={handlePasswordChange} disabled={busy} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}
        </button>
      </div>
    </div>
  );
}
