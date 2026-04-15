import { Phone, MessageCircle, Globe, Facebook } from "lucide-react";
import type { SiteData } from "@/lib/data";

const WA_LINK = "https://wa.me/8801712050951?text=Hello%20Dr.%20Barkat%20Ali%2C%20I%20would%20like%20to%20book%20an%20appointment.";

export function ContactSection({ data }: { data: SiteData }) {
  return (
    <section id="contact" className="hero-gradient">
      <div className="section-container">
        <div className="text-center">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch for appointments and inquiries</p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-success/10 text-success transition-transform group-hover:scale-110">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">WhatsApp</div>
              <div className="font-bold text-foreground">01712-050951</div>
            </div>
          </a>

          <a
            href="tel:+8801784052339"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Phone</div>
              <div className="font-bold text-foreground">01784-052339</div>
            </div>
          </a>

          <a
            href={`https://${data.contact.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Website</div>
              <div className="font-bold text-foreground">{data.contact.website}</div>
            </div>
          </a>

          <a
            href={`https://${data.contact.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Facebook className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Facebook</div>
              <div className="font-bold text-foreground">Popular Diagnostic Khulna</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ data }: { data: SiteData }) {
  return (
    <footer className="border-t border-border bg-card/30 py-10">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          © {new Date().getFullYear()} {data.doctor.name}. All rights reserved.
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground/60">
          {data.doctor.title} | BMDC: {data.doctor.bmdc}
        </p>
      </div>
    </footer>
  );
}
