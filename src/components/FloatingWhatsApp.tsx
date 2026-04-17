import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp({ phone }: { phone?: string }) {
  if (!phone) return null;
  const digits = phone.replace(/[^0-9]/g, "").replace(/^0/, "");
  if (!digits) return null;
  return (
    <a
      href={`https://wa.me/880${digits}?text=Hello%20Dr.%20Barkot%20Ali%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
