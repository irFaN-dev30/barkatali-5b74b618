import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/use-site-data";
import { resetData, getData, type SiteData } from "@/lib/data";
import {
  User, GraduationCap, Briefcase, Heart, MapPin, Phone, Settings,
  Save, RotateCcw, LogOut, Sun, Moon, ChevronLeft, Menu, X, Check,
  Award, Image as ImageIcon
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
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentData = getData();
    const adminPw = currentData.settings?.adminPassword || "Barkot Ali";
    if (username === "admin" && password === adminPw) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setError("Invalid credentials");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center hero-gradient px-4">
        <div className="glass-card w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <img
              src="https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png"
              alt="Dr Barkot Ali Child Specialist Khulna"
              className="mx-auto h-16 w-16 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold text-foreground">Admin Login</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Username</label>
              <input className="admin-input mt-1" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            </div>
            <PasswordField label="Password" value={password} onChange={setPassword} placeholder="Password" />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" className="btn-primary w-full justify-center">Sign In</button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary hover:underline">
              <ChevronLeft className="inline h-3 w-3" /> Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => { setAuthenticated(false); sessionStorage.removeItem("admin_auth"); }} />;
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

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data, updateData } = useSiteData();
  const [active, setActive] = useState<SectionKey>("doctor");
  const [saved, setSaved] = useState(false);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const save = () => {
    updateData({ ...data });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all data to defaults?")) {
      resetData();
      window.location.reload();
    }
  };

  const updateField = <K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    updateData({ ...data, [key]: value });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-sidebar-border p-4">
            <img src={data.settings.logo} alt="Dr Barkot Ali" className="h-9 w-9 rounded-full object-cover" />
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
            <button onClick={() => setDark(!dark)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <Link to="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
              <ChevronLeft className="h-4 w-4" /> Back to Website
            </Link>
            <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
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
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="btn-secondary text-sm py-2 px-3">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button onClick={save} className="btn-primary text-sm py-2 px-3">
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6 max-w-4xl">
          {active === "doctor" && <DoctorEditor data={data.doctor} onChange={(d) => updateField("doctor", d)} />}
          {active === "qualifications" && <ListEditor items={data.qualifications} onChange={(v) => updateField("qualifications", v)} label="Qualification" />}
          {active === "memberships" && <ListEditor items={data.memberships} onChange={(v) => updateField("memberships", v)} label="Membership" />}
          {active === "experience" && <ListEditor items={data.experience} onChange={(v) => updateField("experience", v)} label="Experience" />}
          {active === "services" && <ListEditor items={data.services} onChange={(v) => updateField("services", v)} label="Service" />}
          {active === "gallery" && <GalleryEditor items={data.gallery} onChange={(v) => updateField("gallery", v)} />}
          {active === "chambers" && <ChambersEditor chambers={data.chambers} onChange={(v) => updateField("chambers", v)} />}
          {active === "contact" && <ContactEditor contact={data.contact} onChange={(v) => updateField("contact", v)} />}
          {active === "settings" && <SettingsEditor settings={data.settings} onChange={(v) => updateField("settings", v)} />}
        </div>
      </div>
    </div>
  );
}
