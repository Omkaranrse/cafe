"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-4 sm:px-8 py-4 sm:py-5`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Coffee Cup Badge Button */}
          <div className="pointer-events-auto">
            <Link
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              aria-label="Cafe Face Home"
              className="w-11 h-11 rounded-full bg-[#492512] text-[#FFF9F2] shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-[#351B11] active:scale-95 group"
            >
              <Coffee className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6 text-[#FFF9F2]" />
            </Link>
          </div>

          {/* CENTER: ParticleNavbar Floating Pill */}
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
              padding="6px 8px 6px 8px"
              gap="24px"
              surface={{
                fill: "rgba(255, 249, 242, 0.78)",
                blur: 18,
                shadow: "0 10px 30px -10px rgba(73, 37, 18, 0.12)",
              }}
              particles={{
                color: "#C47A43",
                hoverColor: "#C47A43",
                density: 1.2,
                size: 1.4,
                glow: 0.6,
                twinkle: 0.6,
              }}
            />
          </div>

          {/* RIGHT: Order Now Button & Mobile Hamburger */}
          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href="#menu"
              onClick={(e) => scrollToSection(e, "#menu")}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#492512] text-[#FFF9F2] text-sm font-semibold tracking-wide shadow-md transition-all duration-300 hover:bg-[#351B11] hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <span>Order Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-[#FFF9F2]/80 backdrop-blur-md border border-[#D7BDA5]/50 flex items-center justify-center text-[#492512] shadow-sm"
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

            <div className="pt-2 border-t border-[#D7BDA5]/30 flex flex-col gap-2">
              <Link
                href="#menu"
                onClick={(e) => scrollToSection(e, "#menu")}
                className="w-full py-3 rounded-full bg-[#492512] text-[#FFF9F2] text-center font-semibold text-sm shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Order Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
