"use client";

import React from "react";
import { motion } from "motion/react";
import FolioFlow from "./FolioFlow";

// Botanical branch silhouette for top-left foreground
function BotanicalBranchLeft() {
  return (
    <div
      className="absolute -top-6 -left-6 sm:top-0 sm:left-0 w-44 sm:w-64 md:w-80 h-44 sm:h-64 md:h-80 pointer-events-none select-none z-20 opacity-40 mix-blend-multiply"
      style={{ filter: "blur(1.8px)" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="#3A2218"
        className="w-full h-full transform -rotate-12"
      >
        {/* Main branch stem */}
        <path
          d="M0 0 Q60 50 140 120 Q160 140 190 180"
          stroke="#3A2218"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Olive / eucalyptus leaves */}
        <ellipse cx="45" cy="30" rx="14" ry="7" transform="rotate(35 45 30)" />
        <ellipse cx="60" cy="52" rx="16" ry="8" transform="rotate(-25 60 52)" />
        <ellipse cx="80" cy="58" rx="18" ry="9" transform="rotate(45 80 58)" />
        <ellipse cx="102" cy="80" rx="20" ry="9" transform="rotate(-30 102 80)" />
        <ellipse cx="118" cy="94" rx="22" ry="10" transform="rotate(38 118 94)" />
        <ellipse cx="142" cy="115" rx="20" ry="9" transform="rotate(-20 142 115)" />
        <ellipse cx="158" cy="138" rx="18" ry="8" transform="rotate(40 158 138)" />
        <ellipse cx="178" cy="162" rx="16" ry="7" transform="rotate(15 178 162)" />
        {/* Secondary twigs & buds */}
        <path d="M80 58 Q95 40 110 35" stroke="#3A2218" strokeWidth="1.5" fill="none" />
        <ellipse cx="110" cy="35" rx="12" ry="6" transform="rotate(20 110 35)" />
        <path d="M118 94 Q130 80 148 76" stroke="#3A2218" strokeWidth="1.5" fill="none" />
        <ellipse cx="148" cy="76" rx="13" ry="6" transform="rotate(-15 148 76)" />
      </svg>
    </div>
  );
}

// Botanical branch silhouette for top-right foreground
function BotanicalBranchRight() {
  return (
    <div
      className="absolute -top-6 -right-6 sm:top-0 sm:right-0 w-44 sm:w-64 md:w-80 h-44 sm:h-64 md:h-80 pointer-events-none select-none z-20 opacity-38 mix-blend-multiply"
      style={{ filter: "blur(2px)" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="#3A2218"
        className="w-full h-full transform scale-x-[-1] -rotate-12"
      >
        {/* Main branch stem */}
        <path
          d="M0 0 Q60 50 140 120 Q160 140 190 180"
          stroke="#3A2218"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaves */}
        <ellipse cx="45" cy="30" rx="14" ry="7" transform="rotate(35 45 30)" />
        <ellipse cx="60" cy="52" rx="16" ry="8" transform="rotate(-25 60 52)" />
        <ellipse cx="80" cy="58" rx="18" ry="9" transform="rotate(45 80 58)" />
        <ellipse cx="102" cy="80" rx="20" ry="9" transform="rotate(-30 102 80)" />
        <ellipse cx="118" cy="94" rx="22" ry="10" transform="rotate(38 118 94)" />
        <ellipse cx="142" cy="115" rx="20" ry="9" transform="rotate(-20 142 115)" />
        <ellipse cx="158" cy="138" rx="18" ry="8" transform="rotate(40 158 138)" />
        <ellipse cx="178" cy="162" rx="16" ry="7" transform="rotate(15 178 162)" />
        {/* Twigs */}
        <path d="M80 58 Q95 40 110 35" stroke="#3A2218" strokeWidth="1.5" fill="none" />
        <ellipse cx="110" cy="35" rx="12" ry="6" transform="rotate(20 110 35)" />
        <path d="M118 94 Q130 80 148 76" stroke="#3A2218" strokeWidth="1.5" fill="none" />
        <ellipse cx="148" cy="76" rx="13" ry="6" transform="rotate(-15 148 76)" />
      </svg>
    </div>
  );
}

// Glowing architectural canopy arc
function ArchitecturalArc() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] h-[580px] sm:h-[720px] pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center opacity-85"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arcGlow" x1="0%" y1="100%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F2" stopOpacity="0" />
            <stop offset="25%" stopColor="#FFF9F2" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="75%" stopColor="#FFF9F2" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFF9F2" stopOpacity="0" />
          </linearGradient>
          <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* Outer glowing halo line */}
        <path
          d="M 50 560 C 260 80, 940 80, 1150 560"
          stroke="url(#arcGlow)"
          strokeWidth="3.5"
          filter="url(#glowBlur)"
        />
        {/* Crisp core hairline */}
        <path
          d="M 50 560 C 260 80, 940 80, 1150 560"
          stroke="rgba(255, 255, 255, 0.95)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col items-center justify-center overflow-hidden bg-[#F8F1E9]"
      style={{ position: "relative" }}
    >
      {/* Botanical Corner Silhouettes */}
      <BotanicalBranchLeft />
      <BotanicalBranchRight />

      {/* Luminous Architectural Arc Line */}
      <ArchitecturalArc />

      {/* Ambient warm radial glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[400px] rounded-full bg-[#FFF9F2]/60 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] rounded-full bg-[#C47A43]/12 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* 1. STEAMING COFFEE CUP ICON WITH SUBTLE ACCENT RULES */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-2 sm:mb-3"
        >
          <div className="w-12 sm:w-16 md:w-24 h-[1.2px] bg-[#492512]/35" />
          <div className="text-[#492512] flex items-center justify-center">
            <svg
              width="30"
              height="30"
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
          <div className="w-12 sm:w-16 md:w-24 h-[1.2px] bg-[#492512]/35" />
        </motion.div>

        {/* 2. MAIN BRAND TITLE: ONLY "CAFE FACE" */}
        <motion.h1
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.4rem] font-bold text-[#492512] tracking-tight sm:tracking-[0.03em] leading-none mb-6 sm:mb-8 drop-shadow-sm select-none"
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
