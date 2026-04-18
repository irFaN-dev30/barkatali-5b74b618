import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSiteData } from "@/hooks/use-site-data";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { supabase } from "@/integrations/supabase/client";
import type { SiteData } from "@/lib/data";
import {
  User, GraduationCap, Briefcase, Heart, MapPin, Phone, Settings,
  Save, LogOut, ChevronLeft, Menu, X, Check, Award, Image as ImageIcon, Loader2
} from "lucide-react";
import {
  DoctorEditor, ListEditor, ChambersEditor, ContactEditor, SettingsEditor,
  GalleryEditor, PasswordField
} from "@/components/admin/AdminEditors";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel - Dr. Barkot Ali" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center hero-gradient">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <LoginScreen />;
  if (!isAdmin) return <NotAdminScreen email={user.email ?? ""} />;
  return <AdminDashboard />;
}

function LoginScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (err) {
          setError(err.message);
        } else {
          setInfo("Account created. You are now signed in. Ask the site owner to grant admin role if you can't access the panel.");
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) setError(err.message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center hero-gradient px-4">
      <div className="glass-card w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <img
            src="https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png"
            alt="Dr Barkot Ali"
            className="mx-auto h-16 w-16 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-bold text-foreground">
            {mode === "login" ? "Admin Login" : "Create Account"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to manage your site" : "Sign up — owner will grant admin access"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              required
              className="admin-input mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <PasswordField label="Password" value={password} onChange={setPassword} placeholder="••••••••" />
          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-success">{info}</p>}
          <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-50">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setInfo(""); }}
            className="text-sm text-primary hover:underline"
          >
            {mode === "login" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="inline h-3 w-3" /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotAdminScreen({ email }: { email: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center hero-gradient px-4">
      <div className="glass-card w-full max-w-md p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Not Authorized</h2>
        <p className="text-sm text-muted-foreground">
          You are signed in as <strong>{email}</strong>, but you don't have admin access.
        </p>
        <p className="text-xs text-muted-foreground">
          The site owner can grant admin access via Lovable Cloud → Database → user_roles table.
        </p>
        <button onClick={() => supabase.auth.signOut()} className="btn-secondary w-full justify-center">
          Sign Out
        </button>
      </div>
    </div>
  );
}

type SectionKey = "doctor" | "qualifications" | "memberships" | "experience" | "services" | "gallery" | "chambers" | "contact" | "settings";

const SECTIONS: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "doctor", label: "Doctor Info", icon: <User className="h-4 w-4" /> },
  { key: "qualifications", label: "Qualifications", icon: <GraduationCap className="h-4 w-4" /> },
  { key: "memberships", label: "Membership", icon: <Award className="h-4 w-4" /> },
  { key: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { key: "services", label: "Services", icon: <Heart className="h-4 w-4" /> },
  { key: "gallery", label: "Gallery", icon: <ImageIcon className="h-4 w-4" /> },
  { key: "chambers", label: "Chambers", icon: <MapPin className="h-4 w-4" /> },
  { key: "contact", label: "Contact", icon: <Phone className="h-4 w-4" /> },
  { key: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

function AdminDashboard() {
  const { data, updateData, loading } = useSiteData();
  const [active, setActive] = useState<SectionKey>("doctor");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [draft, setDraft] = useState<SiteData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = draft ?? data;

  const setField = <K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    setDraft({ ...current, [key]: value });
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    setSaveError("");
    try {
      await updateData(draft);
      setDraft(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-sidebar-border p-4">
            <img src={current.settings.logo} alt="Logo" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <div className="text-sm font-bold text-sidebar-foreground">Admin Panel</div>
              <div className="text-xs text-muted-foreground">Dr. Barkot Ali</div>
            </div>
            <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => { setActive(s.key); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === s.key ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-sidebar-border p-3 space-y-2">
            <Link to="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
              <ChevronLeft className="h-4 w-4" /> Back to Website
            </Link>
            <button onClick={() => supabase.auth.signOut()} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">
              {SECTIONS.find((s) => s.key === active)?.label}
            </h1>
            {draft && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 font-medium">Unsaved</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={save}
              disabled={!draft || saving}
              className="btn-primary text-sm py-2 px-3 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
          </div>
        </header>

        {saveError && (
          <div className="mx-4 sm:mx-6 mt-4 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
            {saveError}
          </div>
        )}

        <div className="p-4 sm:p-6 max-w-4xl">
          {active === "doctor" && <DoctorEditor data={current.doctor} onChange={(d) => setField("doctor", d)} />}
          {active === "qualifications" && <ListEditor items={current.qualifications} onChange={(v) => setField("qualifications", v)} label="Qualification" />}
          {active === "memberships" && <ListEditor items={current.memberships} onChange={(v) => setField("memberships", v)} label="Membership" />}
          {active === "experience" && <ListEditor items={current.experience} onChange={(v) => setField("experience", v)} label="Experience" />}
          {active === "services" && <ListEditor items={current.services} onChange={(v) => setField("services", v)} label="Service" />}
          {active === "gallery" && <GalleryEditor items={current.gallery} onChange={(v) => setField("gallery", v)} />}
          {active === "chambers" && <ChambersEditor chambers={current.chambers} onChange={(v) => setField("chambers", v)} />}
          {active === "contact" && <ContactEditor contact={current.contact} onChange={(v) => setField("contact", v)} />}
          {active === "settings" && <SettingsEditor settings={current.settings} onChange={(v) => setField("settings", v)} />}
        </div>
      </div>
    </div>
  );
}
