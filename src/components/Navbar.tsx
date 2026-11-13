"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ParticleNavbar from "./ParticleNavbar";

const NAV_LINKS = [
  { label: "Home", link: "#home", active: true },
  { label: "Our Story", link: "#story" },
  { label: "Menu", link: "#menu" },
  { label: "Experience", link: "#experience" },
  { label: "Visit Us", link: "#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<any>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-4 sm:px-8 py-4 sm:py-5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-center relative">
          {/* CENTER: ParticleNavbar Floating Pill (Translucent Cream) */}
          <div className="pointer-events-auto hidden md:block">
            <ParticleNavbar
              logoText=""
              mark="None"
              align="Center"
              layout="Desktop"
              links={NAV_LINKS}
              button={{ show: false }}
              textColor="#492512"
              hoverTextColor="#C47A43"
              radius="999px"
              padding="6px 14px 6px 14px"
              gap="22px"
              surface={{
                fill: "rgba(255, 251, 247, 0.75)",
                blur: 20,
                shadow: "0 8px 30px -8px rgba(73, 37, 18, 0.08)",
              }}
              particles={{
                color: "#C47A43",
                hoverColor: "#C47A43",
                density: 1.1,
                size: 1.3,
                glow: 0.5,
                twinkle: 0.5,
              }}
            />
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="pointer-events-auto md:hidden ml-auto">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 rounded-full bg-[#FFF9F2]/90 backdrop-blur-md border border-[#D7BDA5]/50 flex items-center justify-center text-[#492512] shadow-sm cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-3xl bg-[#FFF9F2]/95 backdrop-blur-xl border border-[#D7BDA5]/60 shadow-2xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.link}
                  onClick={(e) => scrollToSection(e, link.link)}
                  className={`px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    link.active
                      ? "bg-[#492512] text-[#FFF9F2] font-semibold"
                      : "text-[#492512] hover:bg-[#D7BDA5]/20"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
