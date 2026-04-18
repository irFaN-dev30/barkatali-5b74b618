import { MessageCircle, Phone } from "lucide-react";
import { cleanDigits } from "@/lib/contact-utils";

export function FloatingWhatsApp({
  whatsapp,
  phone,
}: {
  whatsapp?: string;
  phone?: string;
}) {
  // Priority: WhatsApp → Phone → hide
  if (whatsapp) {
    const digits = cleanDigits(whatsapp);
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
  if (phone) {
    const digits = cleanDigits(phone);
    if (!digits) return null;
    return (
      <a
        href={`tel:+880${digits}`}
        className="floating-whatsapp"
        aria-label="Call doctor"
      >
        <Phone className="h-6 w-6" />
      </a>
    );
  }
  return null;
}

