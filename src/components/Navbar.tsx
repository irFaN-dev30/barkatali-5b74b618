import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card rounded-none border-x-0 border-t-0 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="/#home" className="flex items-center gap-3">
          <img
            src="https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png"
            alt="Dr Barkat Ali Child Specialist Khulna"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-heading text-lg font-bold text-foreground hidden sm:inline">
            Dr. Barkat Ali
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+8801784052339" className="btn-primary ml-3 text-sm py-2 px-4">
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-lg p-2 text-foreground hover:bg-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card mx-4 mb-4 overflow-hidden rounded-xl md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="tel:+8801784052339" className="btn-primary mt-2 justify-center text-sm">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
