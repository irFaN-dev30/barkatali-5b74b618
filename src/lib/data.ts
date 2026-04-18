// Site data types — backed by Supabase `site_content` table.

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
  whatsappNumbers: string[];
  phoneNumbers: string[];
  website: string;
  facebook: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  /** Storage path inside the `gallery` bucket — used to delete the file when removed. */
  storagePath?: string;
}

export interface SiteSettings {
  siteTitle: string;
  logo: string;
}

export interface SiteData {
  doctor: DoctorInfo;
  qualifications: string[];
  memberships: string[];
  experience: string[];
  services: string[];
  chambers: Chamber[];
  gallery: GalleryItem[];
  contact: ContactInfo;
  settings: SiteSettings;
}

export const DEFAULT_DATA: SiteData = {
  doctor: {
    name: "Professor Dr. Md. Barkot Ali",
    title: "Newborn, Child & Adolescent Health Specialist",
    bmdc: "A-25803",
    intro: "With decades of experience in pediatric care, Professor Dr. Md. Barkot Ali is one of the most trusted child health specialists in Khulna.",
    imageUrl: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
  },
  qualifications: [],
  memberships: [],
  experience: [],
  services: [],
  chambers: [],
  gallery: [],
  contact: {
    whatsappNumbers: [],
    phoneNumbers: [],
    website: "",
    facebook: "",
  },
  settings: {
    siteTitle: "Dr. Barkot Ali - Child Specialist Khulna",
    logo: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
  },
};

export function getDefaultData(): SiteData {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

/** Merge whatever shape comes from the database with safe defaults so the UI never crashes. */
export function normalizeData(raw: unknown): SiteData {
  const r = (raw || {}) as Partial<SiteData>;
  return {
    doctor: { ...DEFAULT_DATA.doctor, ...(r.doctor || {}) },
    qualifications: Array.isArray(r.qualifications) ? r.qualifications : [],
    memberships: Array.isArray(r.memberships) ? r.memberships : [],
    experience: Array.isArray(r.experience) ? r.experience : [],
    services: Array.isArray(r.services) ? r.services : [],
    chambers: Array.isArray(r.chambers) ? r.chambers : [],
    gallery: Array.isArray(r.gallery) ? r.gallery : [],
    contact: { ...DEFAULT_DATA.contact, ...(r.contact || {}) },
    settings: { ...DEFAULT_DATA.settings, ...(r.settings || {}) },
  };
}
