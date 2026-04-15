import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Heart, Stethoscope, ShieldCheck, Baby, Thermometer, TrendingUp, Apple } from "lucide-react";
import type { SiteData } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
      <div className="glass-card mx-auto max-w-3xl p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <img
            src={data.doctor.imageUrl}
            alt="Dr Barkat Ali Child Specialist Khulna"
            className="h-28 w-28 rounded-2xl object-cover shadow-lg"
          />
          <div>
            <h3 className="text-xl font-bold text-foreground">{data.doctor.name}</h3>
            <p className="text-primary font-medium">{data.doctor.title}</p>
            <p className="mt-3 text-muted-foreground leading-relaxed">{data.doctor.intro}</p>
            <p className="mt-2 text-sm text-muted-foreground">BMDC Registration: {data.doctor.bmdc}</p>
          </div>
        </div>
      </div>
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
              className="glass-card flex items-center gap-4 p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-semibold text-foreground">{q}</span>
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
            className="glass-card flex items-center gap-4 p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-foreground">{exp}</span>
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
              className="glass-card p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {SERVICE_ICONS[service] || <Heart className="h-6 w-6" />}
              </div>
              <h3 className="font-semibold text-foreground">{service}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
