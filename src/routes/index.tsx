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
      { title: "Dr. Barkot Ali - Child Specialist Khulna | Pediatrician" },
      {
        name: "description",
        content:
          "Professor Dr. Md. Barkot Ali – Leading Newborn, Child & Adolescent Health Specialist in Khulna. MBBS, DCH, FCPS, FRCPCH. Book appointment now.",
      },
      {
        name: "keywords",
        content: "Child Specialist Khulna, Pediatrician Khulna, Dr Barkot Ali, Newborn Care Khulna, Baby Doctor Khulna",
      },
      { property: "og:title", content: "Dr. Barkot Ali - Child Specialist Khulna" },
      {
        property: "og:description",
        content: "Leading Newborn, Child & Adolescent Health Specialist in Khulna. Book your appointment today.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data } = useSiteData();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: data.doctor.name,
    description: data.doctor.intro,
    medicalSpecialty: "Pediatrics",
    image: data.doctor.imageUrl,
    telephone: "+8801784052339",
    address: data.chambers.map((c) => ({
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: "Khulna",
      addressCountry: "BD",
    })),
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
