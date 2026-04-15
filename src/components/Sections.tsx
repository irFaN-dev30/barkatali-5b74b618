import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Heart, Stethoscope, ShieldCheck, Baby, Thermometer, TrendingUp, Apple, MessageCircle } from "lucide-react";
import type { SiteData } from "@/lib/data";

const WA_LINK = "https://wa.me/8801712050951?text=Hello%20Dr.%20Barkat%20Ali%2C%20I%20would%20like%20to%20book%20an%20appointment.";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }),
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Newborn Care": <Baby className="h-6 w-6" />,
  "Child & Adolescent Treatment": <Stethoscope className="h-6 w-6" />,
  "Vaccination & Immunization": <ShieldCheck className="h-6 w-6" />,
  "Fever & Infection Treatment": <Thermometer className="h-6 w-6" />,
  "Growth Monitoring": <TrendingUp className="h-6 w-6" />,
  "Nutrition Advice": <Apple className="h-6 w-6" />,
};

export function AboutSection({ data }: { data: SiteData }) {
  return (
    <section id="about" className="section-container">
      <div className="text-center">
        <h2 className="section-title">About the Doctor</h2>
        <p className="section-subtitle">Dedicated to the health and well-being of every child</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card mx-auto max-w-3xl p-8 sm:p-10"
      >
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/15 to-transparent blur-lg" />
            <img
              src={data.doctor.imageUrl}
              alt="Dr Barkat Ali Child Specialist Khulna"
              className="relative h-32 w-32 rounded-2xl object-cover shadow-lg ring-1 ring-primary/10"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{data.doctor.name}</h3>
            <p className="text-primary font-semibold mt-1">{data.doctor.title}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{data.doctor.intro}</p>
            <p className="mt-3 text-sm text-muted-foreground/70 font-medium">BMDC Registration: {data.doctor.bmdc}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function QualificationsSection({ data }: { data: SiteData }) {
  return (
    <section id="qualifications" className="hero-gradient">
      <div className="section-container">
        <div className="text-center">
          <h2 className="section-title">Qualifications</h2>
          <p className="section-subtitle">Academic excellence from renowned institutions</p>
        </div>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {data.qualifications.map((q, i) => (
            <motion.div
              key={q}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold text-foreground">{q}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection({ data }: { data: SiteData }) {
  return (
    <section className="section-container">
      <div className="text-center">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">A distinguished career in pediatric medicine</p>
      </div>
      <div className="mx-auto max-w-3xl space-y-4">
        {data.experience.map((exp, i) => (
          <motion.div
            key={exp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card flex items-center gap-4 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-foreground font-medium">{exp}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection({ data }: { data: SiteData }) {
  return (
    <section id="services" className="hero-gradient">
      <div className="section-container">
        <div className="text-center">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">Comprehensive pediatric care for your child</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service, i) => (
            <motion.div
              key={service}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card p-7 text-center transition-all hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-transform group-hover:scale-110">
                {SERVICE_ICONS[service] || <Heart className="h-6 w-6" />}
              </div>
              <h3 className="font-bold text-foreground">{service}</h3>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="h-5 w-5" /> Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}
