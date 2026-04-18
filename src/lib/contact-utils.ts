import type { SiteData } from "@/lib/data";

export function cleanDigits(num: string): string {
  return (num || "").replace(/[^0-9]/g, "").replace(/^0/, "");
}

export function toWaLink(num: string): string {
  const digits = cleanDigits(num);
  return `https://wa.me/880${digits}?text=Hello%20Dr.%20Barkot%20Ali%2C%20I%20would%20like%20to%20book%20an%20appointment.`;
}

export function toTelLink(num: string): string {
  const digits = cleanDigits(num);
  return `tel:+880${digits}`;
}

/**
 * Returns the best appointment link from site data.
 * Priority: WhatsApp number → Phone number → null
 */
export function getAppointmentLink(data: SiteData): { href: string; type: "whatsapp" | "phone" } | null {
  const wa = data.contact?.whatsappNumbers?.find(Boolean);
  if (wa) return { href: toWaLink(wa), type: "whatsapp" };
  const ph = data.contact?.phoneNumbers?.find(Boolean);
  if (ph) return { href: toTelLink(ph), type: "phone" };
  return null;
}
