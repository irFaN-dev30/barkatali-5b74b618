import { Phone, MessageCircle, Globe, Facebook } from "lucide-react";
import type { SiteData } from "@/lib/data";

export function ContactSection({ data }: { data: SiteData }) {
  const wa = data.contact.whatsapp.replace(/[^0-9]/g, "").replace(/^0/, "");

  return (
    <section id="contact" className="hero-gradient">
      <div className="section-container">
        <div className="text-center">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch for appointments and inquiries</p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          <a
            href={`https://wa.me/880${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">WhatsApp</div>
              <div className="font-semibold text-foreground">{data.contact.whatsapp}</div>
            </div>
          </a>

          <a
            href="tel:+8801784052339"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="font-semibold text-foreground">01784-052339</div>
            </div>
          </a>

          <a
            href={`https://${data.contact.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Website</div>
              <div className="font-semibold text-foreground">{data.contact.website}</div>
            </div>
          </a>

          <a
            href={`https://${data.contact.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Facebook className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Facebook</div>
              <div className="font-semibold text-foreground">Popular Diagnostic Khulna</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ data }: { data: SiteData }) {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {data.doctor.name}. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {data.doctor.title} | BMDC: {data.doctor.bmdc}
        </p>
      </div>
    </footer>
  );
}
