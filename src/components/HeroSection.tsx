import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import type { SiteData } from "@/lib/data";

export function HeroSection({ data }: { data: SiteData }) {
  return (
    <section id="home" className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="section-container relative z-10 flex flex-col items-center gap-12 pt-24 lg:flex-row lg:gap-16">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            BMDC Reg: {data.doctor.bmdc}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {data.doctor.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-primary">
            {data.doctor.title}
          </p>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            {data.doctor.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="tel:+8801784052339" className="btn-primary">
              <Phone className="h-5 w-5" /> Book Appointment
            </a>
            <a
              href={`https://wa.me/880${data.contact.whatsapp.replace(/[^0-9]/g, "").replace(/^0/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />
            <img
              src={data.doctor.imageUrl}
              alt="Dr Barkat Ali Child Specialist Khulna"
              className="relative h-72 w-72 rounded-3xl object-cover shadow-2xl sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
