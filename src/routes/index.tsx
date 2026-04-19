import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import {
  AboutSection,
  QualificationsSection,
  MembershipSection,
  ExperienceSection,
  ServicesSection,
  GallerySection,
} from "@/components/Sections";
import { ChambersSection } from "@/components/ChambersSection";
import { ContactSection, Footer } from "@/components/ContactSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { useSiteData } from "@/hooks/use-site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Child Specialist in Khulna | Dr. Barkot Ali - Top Pediatrician Bangladesh" },
      {
        name: "description",
        content:
          "Professor Dr. Md. Barkot Ali (MBBS, DCH, FCPS, MRCPCH) – Best Child Specialist in Khulna & top pediatrician in Bangladesh. Expert newborn, child & adolescent care. Book appointment today.",
      },
      {
        name: "keywords",
        content: "Best Child Specialist in Khulna, Dr Barkat Ali, Dr Barkot Ali, Top Pediatrician in Bangladesh, Child Doctor Khulna, Pediatrician Khulna, Newborn Care Khulna, Baby Doctor Khulna, Shishu Doctor Khulna, Khulna Child Hospital, Adolescent Health Specialist Bangladesh",
      },
      { property: "og:title", content: "Best Child Specialist in Khulna | Dr. Barkot Ali" },
      {
        property: "og:description",
        content: "Top Pediatrician in Bangladesh – Professor Dr. Md. Barkot Ali. Leading Newborn, Child & Adolescent Health Specialist in Khulna. Book your appointment today.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://barkatali.lovable.app/" },
      {
        property: "og:image",
        content: "https://i.postimg.cc/1t0zmKb1/Generated-Image-April-18-2026-2-14AM-2.png",
      },
      { property: "og:image:alt", content: "Professor Dr. Md. Barkot Ali - Best Child Specialist in Khulna" },
      {
        name: "twitter:image",
        content: "https://i.postimg.cc/1t0zmKb1/Generated-Image-April-18-2026-2-14AM-2.png",
      },
      { name: "twitter:title", content: "Best Child Specialist in Khulna | Dr. Barkot Ali" },
      { name: "twitter:description", content: "Top Pediatrician in Bangladesh – Book appointment with Professor Dr. Md. Barkot Ali." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://barkatali.lovable.app/" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data } = useSiteData();

  const primaryPhone = data.contact.phoneNumbers?.[0] || data.contact.whatsappNumbers?.[0] || "+8801784052339";
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Physician", "MedicalBusiness"],
    "@id": "https://barkatali.lovable.app/#physician",
    name: data.doctor.name,
    alternateName: ["Dr. Barkat Ali", "Professor Barkot Ali", "Dr Md Barkot Ali"],
    description: data.doctor.intro,
    medicalSpecialty: "Pediatrics",
    image: data.doctor.imageUrl,
    logo: data.settings.logo,
    url: "https://barkatali.lovable.app/",
    telephone: primaryPhone,
    priceRange: "৳৳",
    areaServed: { "@type": "City", name: "Khulna" },
    knowsAbout: ["Pediatrics", "Newborn Care", "Child Health", "Adolescent Health", "Vaccination"],
    address: data.chambers.map((c) => ({
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: "Khulna",
      addressRegion: "Khulna Division",
      addressCountry: "BD",
    })),
    sameAs: [data.contact.facebook, data.contact.website].filter(Boolean),
  };

  const floatingWa = data.contact.whatsappNumbers?.[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <HeroSection data={data} />
        <AboutSection data={data} />
        <QualificationsSection data={data} />
        <MembershipSection data={data} />
        <ExperienceSection data={data} />
        <ServicesSection data={data} />
        <GallerySection data={data} />
        <ChambersSection data={data} />
        <ContactSection data={data} />
      </main>
      <Footer data={data} />
      <FloatingWhatsApp phone={floatingWa} />
    </>
  );
}
