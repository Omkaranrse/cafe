"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import FolioFlow from "./FolioFlow";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 flex flex-col items-center justify-center overflow-x-clip bg-[#F8F1E9]"
      style={{
        position: "relative",
        backgroundImage: "url('/images/hero-minimal-cream-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "75% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* High-Resolution Hero Background Image — Calibrated Saturation & Positioning */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <Image
          src="/images/hero-minimal-cream-bg.png"
          alt="Cafe Face Warm Cream Café Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_100%] w-full h-full"
          style={{
            filter: "saturate(0.85) brightness(1.02) contrast(1.01)",
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* 1. STEAMING COFFEE CUP ICON WITH SUBTLE ACCENT RULES */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-2 sm:mb-3"
        >
          <div className="w-12 sm:w-16 md:w-24 h-[1.2px] bg-[#492512]/30" />
          <div className="text-[#492512] flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 sm:w-7 sm:h-7"
            >
              {/* Coffee Cup */}
              <path d="M5 13h17c0 6.5-3.8 11-8.5 11S5 19.5 5 13z" />
              {/* Cup Handle */}
              <path d="M22 15h2.5a3.5 3.5 0 0 1 0 7H20.5" />
              {/* Saucer */}
              <line x1="3" y1="28" x2="25" y2="28" strokeWidth="1.6" />
              {/* Steam waves */}
              <path d="M9.5 5c0 2 1.2 2.5 1.2 4" strokeWidth="1.5" />
              <path d="M13.5 3c0 2.5 1.5 3.5 1.5 6" strokeWidth="1.5" />
              <path d="M17.5 5c0 2 1.2 2.5 1.2 4" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="w-12 sm:w-16 md:w-24 h-[1.2px] bg-[#492512]/30" />
        </motion.div>

        {/* 2. MAIN BRAND TITLE: CENTERED "CAFE FACE" IN ELEGANT SERIF */}
        <motion.h1
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold text-[#492512] tracking-tight sm:tracking-[0.02em] leading-none mb-4 sm:mb-6 select-none"
        >
          CAFE FACE
        </motion.h1>

        {/* 3. FOLIOFLOW 3D CURVED IMAGE GALLERY */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <FolioFlow />
        </motion.div>
      </div>
    </section>
  );
}
