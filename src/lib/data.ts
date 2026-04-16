// Firebase-ready data abstraction layer
// Replace getData/setData internals with Firestore calls later

export interface DoctorInfo {
  name: string;
  title: string;
  bmdc: string;
  intro: string;
  imageUrl: string;
}

export interface Chamber {
  id: string;
  name: string;
  address: string;
  schedule: string[];
  phones: string[];
  hotline?: string;
  website?: string;
  facebook?: string;
  mapQuery: string;
}

export interface ContactInfo {
  whatsapp: string;
  website: string;
  facebook: string;
}

export interface SiteSettings {
  siteTitle: string;
  logo: string;
  adminPassword: string;
}

export interface SiteData {
  doctor: DoctorInfo;
  qualifications: string[];
  experience: string[];
  services: string[];
  chambers: Chamber[];
  contact: ContactInfo;
  settings: SiteSettings;
}

const DEFAULT_DATA: SiteData = {
  doctor: {
    name: "Professor Dr. Md. Barkot Ali",
    title: "Newborn, Child & Adolescent Health Specialist",
    bmdc: "A-25803",
    intro: "With decades of experience in pediatric care, Professor Dr. Md. Barkot Ali is one of the most trusted child health specialists in Khulna. He provides compassionate, evidence-based care for newborns, children, and adolescents.",
    imageUrl: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
  },
  qualifications: [
    "MBBS (Dhaka)",
    "DCH",
    "FCPS (India)",
    "FRCPCH (UK)",
  ],
  experience: [
    "Former Child Specialist – Bangladesh Navy Hospital (CMH Khulna)",
    "Former Head of Pediatrics – GMC",
    "Professor & Head of Pediatrics – MSMC",
  ],
  services: [
    "Newborn Care",
    "Child & Adolescent Treatment",
    "Vaccination & Immunization",
    "Fever & Infection Treatment",
    "Growth Monitoring",
    "Nutrition Advice",
  ],
  chambers: [
    {
      id: "1",
      name: "Khadija Villa",
      address: "Holding No-20, Ward No-5, KDA Market Road (Rishipara), Daulatpur, Khulna",
      schedule: [
        "Daily 5 PM – 9 PM",
        "Monday Closed",
        "Friday 9 AM – 12 PM",
      ],
      phones: ["01784-052339", "01972-050951"],
      mapQuery: "Khadija Villa Daulatpur Khulna",
    },
    {
      id: "2",
      name: "Popular Diagnostic Centre Ltd. (Khulna)",
      address: "House #37, KDA Avenue, Moylapota-Sheikhpara",
      schedule: [
        "Tuesday, Wednesday, Thursday",
        "10 AM – 1 PM",
      ],
      phones: [],
      hotline: "09666787821",
      website: "www.populardiagnostic.com",
      facebook: "facebook.com/populardiagnostickhulna",
      mapQuery: "Popular Diagnostic Centre Khulna",
    },
  ],
  contact: {
    whatsapp: "01712-050951",
    website: "www.populardiagnostic.com",
    facebook: "facebook.com/populardiagnostickhulna",
  },
  settings: {
    siteTitle: "Dr. Barkot Ali - Child Specialist Khulna",
    logo: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
    adminPassword: "Barkot Ali",
  },
};

const STORAGE_KEY = "drbarkat_site_data";

// Abstraction functions — swap localStorage for Firestore later
export function getData(): SiteData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new fields
      return { ...DEFAULT_DATA, ...parsed, settings: { ...DEFAULT_DATA.settings, ...parsed.settings } };
    }
  } catch {
    // ignore
  }
  return DEFAULT_DATA;
}

export function setData(data: SiteData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("siteDataUpdated", { detail: data }));
}

export function resetData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("siteDataUpdated", { detail: DEFAULT_DATA }));
}

export function getDefaultData(): SiteData {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}
