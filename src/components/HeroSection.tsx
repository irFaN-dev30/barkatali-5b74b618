import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Award } from "lucide-react";
import type { SiteData } from "@/lib/data";

const WA_NUMBER = "8801712050951";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hello%20Dr.%20Barkot%20Ali%2C%20I%20would%20like%20to%20book%20an%20appointment.`;

export function HeroSection({ data }: { data: SiteData }) {
  return (
    <section id="home" className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/[0.05] blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <div className="section-container relative z-10 flex flex-col items-center gap-14 pt-24 lg:flex-row lg:gap-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary mb-8 border border-primary/15"
          >
            <Award className="h-3.5 w-3.5" />
            BMDC Reg: {data.doctor.bmdc}
          </motion.div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            {data.doctor.name}
          </h1>
          <p className="mt-5 text-lg font-semibold text-primary/80 sm:text-xl">
            {data.doctor.title}
          </p>
          <p className="mt-6 max-w-lg text-muted-foreground leading-relaxed text-[0.95rem]">
            {data.doctor.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-5 w-5" /> Book Appointment
            </a>
            <a href="/#chambers" className="btn-secondary">
              View Chambers <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 to-primary/5 blur-2xl" />
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent" />
            <img
              src={data.doctor.imageUrl}
              alt="Dr Barkot Ali Child Specialist Khulna"
              className="relative h-72 w-72 rounded-[2rem] object-cover shadow-2xl ring-1 ring-primary/10 sm:h-80 sm:w-80 lg:h-[400px] lg:w-[400px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
