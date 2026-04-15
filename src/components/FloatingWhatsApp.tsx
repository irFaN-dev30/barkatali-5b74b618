import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp({ phone }: { phone: string }) {
  const wa = phone.replace(/[^0-9]/g, "").replace(/^0/, "");
  return (
    <a
      href={`https://wa.me/880${wa}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
