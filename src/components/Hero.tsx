"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import FolioFlow from "./FolioFlow";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-screen max-w-full h-screen min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#F8F1E9] pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6"
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* High-Resolution Hero Background Image — 100vw & 100vh */}
      <div
        className="absolute inset-0 w-[100vw] h-[100vh] pointer-events-none select-none z-0 overflow-hidden"
        style={{ position: "absolute", width: "100vw", height: "100vh", top: 0, left: 0 }}
      >
        <Image
          src="/images/hero-minimal-cream-bg.png"
          alt="Cafe Face Warm Cream Café Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom sm:object-[75%_100%]"
          style={{
            filter: "saturate(0.85) brightness(1.02) contrast(1.01)",
          }}
        />
      </div>

      {/* Main Content Area — Centered vertically within 100vh */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center flex-1">
        {/* MAIN BRAND TITLE: ONLY "CAFE FACE" IN ELEGANT SERIF */}
        <motion.h1
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-bold text-[#492512] tracking-tight sm:tracking-[0.02em] leading-none mb-6 sm:mb-8 lg:mb-10 select-none"
        >
          CAFE FACE
        </motion.h1>

        {/* 3. ACTUAL FRAMER FOLIOFLOW COMPONENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl h-[380px] sm:h-[440px] md:h-[490px] lg:h-[530px] flex justify-center mt-1 sm:mt-2 relative z-10"
        >
          <FolioFlow />
        </motion.div>
      </div>
    </section>
  );
}
