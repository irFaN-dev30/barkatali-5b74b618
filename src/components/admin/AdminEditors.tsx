import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import type { SiteData, Chamber, GalleryItem } from "@/lib/data";
import { useState } from "react";

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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShow((s) => !s);
          }}
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
  const add = () => onChange([...items, ""]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) => {
    const copy = [...items];
    copy[i] = v;
    onChange(copy);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className="admin-input" value={item} onChange={(e) => update(i, e.target.value)} placeholder={`${label} ${i + 1}`} />
          <button onClick={() => remove(i)} className="shrink-0 rounded-lg p-2 text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={add} className="btn-secondary text-sm py-2 px-3">
        <Plus className="h-4 w-4" /> Add {label}
      </button>
    </div>
  );
}

/* ── Gallery Editor ── */
export function GalleryEditor({ items, onChange }: { items: GalleryItem[]; onChange: (v: GalleryItem[]) => void }) {
  const add = () => onChange([...items, { id: Date.now().toString(), imageUrl: "", caption: "" }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, partial: Partial<GalleryItem>) => {
    const copy = [...items];
    copy[i] = { ...copy[i], ...partial };
    onChange(copy);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">Add gallery images with captions. Paste any image URL.</p>
      {items.map((item, i) => (
        <div key={item.id} className="glass-card p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-foreground">Image {i + 1}</h3>
            <button onClick={() => remove(i)} className="text-destructive hover:bg-destructive/10 rounded-lg p-1.5">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <ImageField label="Image URL" value={item.imageUrl} onChange={(v) => update(i, { imageUrl: v })} />
          <Field label="Caption" value={item.caption} onChange={(v) => update(i, { caption: v })} placeholder="A short caption..." />
        </div>
      ))}
      <button onClick={add} className="btn-secondary text-sm py-2 px-3">
        <Plus className="h-4 w-4" /> Add Image
      </button>
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

  const addChamber = () => {
    onChange([...chambers, { id: Date.now().toString(), name: "", address: "", schedule: [""], phones: [""], mapQuery: "" }]);
  };

  const remove = (i: number) => onChange(chambers.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-8">
      {chambers.map((c, i) => (
        <div key={c.id} className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">Chamber {i + 1}</h3>
            <button onClick={() => remove(i)} className="text-destructive hover:bg-destructive/10 rounded-lg p-1.5">
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
      <button onClick={addChamber} className="btn-secondary text-sm py-2 px-3">
        <Plus className="h-4 w-4" /> Add Chamber
      </button>
    </div>
  );
}

/* ── Contact Editor (multi WhatsApp + multi Phone) ── */
export function ContactEditor({ contact, onChange }: { contact: SiteData["contact"]; onChange: (v: SiteData["contact"]) => void }) {
  const updateList = (key: "whatsappNumbers" | "phoneNumbers", list: string[]) => onChange({ ...contact, [key]: list });

  const NumberList = ({ label, list, listKey }: { label: string; list: string[]; listKey: "whatsappNumbers" | "phoneNumbers" }) => (
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
              updateList(listKey, copy);
            }}
            placeholder="e.g. 01712-050951"
          />
          <button
            onClick={() => updateList(listKey, list.filter((_, idx) => idx !== i))}
            className="shrink-0 rounded-lg p-2 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button onClick={() => updateList(listKey, [...list, ""])} className="btn-secondary text-sm py-2 px-3">
        <Plus className="h-4 w-4" /> Add Number
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <NumberList label="WhatsApp Numbers" list={contact.whatsappNumbers} listKey="whatsappNumbers" />
      <NumberList label="Phone Numbers" list={contact.phoneNumbers} listKey="phoneNumbers" />
      <Field label="Website" value={contact.website} onChange={(v) => onChange({ ...contact, website: v })} />
      <Field label="Facebook" value={contact.facebook} onChange={(v) => onChange({ ...contact, facebook: v })} />
    </div>
  );
}

/* ── Settings Editor ── */
export function SettingsEditor({ settings, onChange }: { settings: SiteData["settings"]; onChange: (v: SiteData["settings"]) => void }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handlePasswordChange = () => {
    setPwMsg(null);
    if (currentPw !== settings.adminPassword) {
      setPwMsg({ type: "error", text: "Current password is incorrect" });
      return;
    }
    if (newPw.length < 4) {
      setPwMsg({ type: "error", text: "New password must be at least 4 characters" });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ type: "error", text: "Passwords do not match" });
      return;
    }
    onChange({ ...settings, adminPassword: newPw });
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setPwMsg({ type: "success", text: "Password changed! Click Save to apply." });
  };

  return (
    <div className="space-y-8">
      {/* Site Settings */}
      <div className="space-y-4">
        <h3 className="font-bold text-foreground text-lg">Site Settings</h3>
        <Field label="Site Title" value={settings.siteTitle} onChange={(v) => onChange({ ...settings, siteTitle: v })} />
        <ImageField label="Logo URL" value={settings.logo} onChange={(v) => onChange({ ...settings, logo: v })} />
      </div>

      {/* Password Change */}
      <div className="glass-card p-5 space-y-4">
        <h3 className="font-bold text-foreground text-lg">Change Admin Password</h3>
        <PasswordField label="Current Password" value={currentPw} onChange={setCurrentPw} />
        <PasswordField label="New Password" value={newPw} onChange={setNewPw} />
        <PasswordField label="Confirm New Password" value={confirmPw} onChange={setConfirmPw} />
        {pwMsg && (
          <p className={`text-sm ${pwMsg.type === "error" ? "text-destructive" : "text-success"}`}>{pwMsg.text}</p>
        )}
        <button onClick={handlePasswordChange} className="btn-primary text-sm py-2 px-4">
          Change Password
        </button>
      </div>
    </div>
  );
}
