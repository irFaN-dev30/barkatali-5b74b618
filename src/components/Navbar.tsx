import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/8801712050951?text=Hello%20Dr.%20Barkat%20Ali%2C%20I%20would%20like%20to%20book%20an%20appointment.";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Qualifications", href: "/#qualifications" },
  { label: "Services", href: "/#services" },
  { label: "Chambers", href: "/#chambers" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card rounded-none border-x-0 border-t-0"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6">
        <a href="/#home" className="flex items-center gap-3">
          <img
            src="https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png"
            alt="Dr Barkat Ali Child Specialist Khulna"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="hidden sm:block">
            <span className="font-heading text-base font-bold text-foreground leading-tight block">
              Dr. Barkat Ali
            </span>
            <span className="text-[0.65rem] text-muted-foreground font-medium">Child Specialist</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[0.82rem] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp ml-4 text-sm py-2.5 px-5">
            <MessageCircle className="h-4 w-4" /> Appointment
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-xl p-2.5 text-foreground hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass-card mx-4 mb-4 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-3 gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-2 justify-center text-sm">
                <MessageCircle className="h-4 w-4" /> Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
