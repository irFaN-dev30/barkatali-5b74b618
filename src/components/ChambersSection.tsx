import { motion } from "framer-motion";
import { MapPin, Clock, Phone as PhoneIcon, Globe, ExternalLink, MessageCircle } from "lucide-react";
import type { SiteData } from "@/lib/data";

const WA_LINK = "https://wa.me/8801712050951?text=Hello%20Dr.%20Barkat%20Ali%2C%20I%20would%20like%20to%20book%20an%20appointment.";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }),
};

export function ChambersSection({ data }: { data: SiteData }) {
  return (
    <section id="chambers" className="section-container">
      <div className="text-center">
        <h2 className="section-title">Chambers & Schedule</h2>
        <p className="section-subtitle">Visit us at any of our convenient locations</p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        {data.chambers.map((chamber, i) => (
          <motion.div
            key={chamber.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card overflow-hidden group"
          >
            {/* Map */}
            <div className="h-48 w-full bg-muted/50 overflow-hidden">
              <iframe
                title={`Map of ${chamber.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(chamber.mapQuery)}&output=embed`}
                className="h-full w-full border-0 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-7">
              <h3 className="text-lg font-bold text-foreground">{chamber.name}</h3>

              <div className="mt-5 space-y-3.5 text-sm">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{chamber.address}</span>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    {chamber.schedule.map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                  </div>
                </div>

                {chamber.phones.length > 0 && (
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {chamber.phones.map((p) => (
                        <a key={p} href={`tel:+880${p.replace(/[^0-9]/g, "").replace(/^0/, "")}`} className="text-primary font-medium hover:underline">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {chamber.hotline && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <PhoneIcon className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`tel:${chamber.hotline}`} className="text-primary font-medium hover:underline">
                      Hotline: {chamber.hotline}
                    </a>
                  </div>
                )}

                {chamber.website && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Globe className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`https://${chamber.website}`} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                      {chamber.website} <ExternalLink className="inline h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Appointment CTA */}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6 w-full justify-center text-sm py-3">
                <MessageCircle className="h-4 w-4" /> Book Appointment
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
