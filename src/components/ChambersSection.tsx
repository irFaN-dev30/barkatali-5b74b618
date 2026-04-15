import { motion } from "framer-motion";
import { MapPin, Clock, Phone as PhoneIcon, Globe, ExternalLink } from "lucide-react";
import type { SiteData } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
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
            className="glass-card overflow-hidden"
          >
            {/* Map */}
            <div className="h-48 w-full bg-muted">
              <iframe
                title={`Map of ${chamber.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(chamber.mapQuery)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground">{chamber.name}</h3>

              <div className="mt-4 space-y-3 text-sm">
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
                    <div className="flex flex-wrap gap-2">
                      {chamber.phones.map((p) => (
                        <a key={p} href={`tel:+880${p.replace(/[^0-9]/g, "").replace(/^0/, "")}`} className="text-primary hover:underline">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {chamber.hotline && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <PhoneIcon className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`tel:${chamber.hotline}`} className="text-primary hover:underline">
                      Hotline: {chamber.hotline}
                    </a>
                  </div>
                )}

                {chamber.website && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Globe className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`https://${chamber.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {chamber.website} <ExternalLink className="inline h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
