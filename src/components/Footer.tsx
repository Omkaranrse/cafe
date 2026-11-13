"use client";

import Link from "next/link";
import { Coffee, MapPin, Phone, ArrowUp, Lock } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { CAFE_INFO } from "@/data/menuData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-espresso text-cream overflow-hidden pt-20 pb-12 px-4 sm:px-6 lg:px-12 border-t border-latte/20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-terracotta/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Row: Quick contact & Scroll to top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-12 border-b border-latte/20 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-terracotta text-vanilla flex items-center justify-center shadow-md">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-vanilla tracking-tight">
                CAFE FACE
              </span>
              <p className="font-hand text-sm text-latte">
                Selly Oak, Birmingham · Established for Good Moments
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-vanilla transition-all border border-white/15 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Middle Navigation & Information Columns */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Location & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-sans uppercase tracking-widest text-terracotta font-semibold">
              Find Us In Birmingham
            </span>
            <p className="text-sm font-sans text-latte/90 leading-relaxed">
              519 Bristol Road
              <br />
              Selly Oak, Birmingham
              <br />
              B29 6AU, United Kingdom
            </p>

            <div className="pt-2 space-y-2 text-sm font-sans">
              <p className="flex items-center gap-2 text-latte">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <a href={`tel:${CAFE_INFO.phoneRaw}`} className="hover:text-vanilla transition-colors">
                  {CAFE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2 text-latte">
                <InstagramIcon className="w-4 h-4 text-terracotta shrink-0" />
                <a
                  href={CAFE_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vanilla transition-colors"
                >
                  {CAFE_INFO.instagram.handle}
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-sm text-latte">
              <li>
                <a href="#home" className="hover:text-vanilla transition-colors">
                  Home & Overview
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-vanilla transition-colors">
                  Our Philosophy & Roots
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-vanilla transition-colors">
                  Interactive Food & Drink Menu
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-vanilla transition-colors">
                  Photo Journal & Craft
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-vanilla transition-colors">
                  Visit & Table Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block mb-4">
              Daily Hours
            </span>
            <div className="space-y-1.5 text-sm text-latte">
              <p className="flex justify-between border-b border-latte/15 pb-1">
                <span>Monday – Saturday</span>
                <span className="text-vanilla font-medium">9:00 AM – 4:00 PM</span>
              </p>
              <p className="flex justify-between border-b border-latte/15 pb-1">
                <span>Sunday</span>
                <span className="text-vanilla font-medium">9:00 AM – 4:00 PM</span>
              </p>
              <p className="text-[11px] text-latte/70 pt-2">
                *Kitchen serves full breakfast & flatbreads daily until 4:00 PM.
              </p>
            </div>
          </div>

          {/* Column 4: Delivery Platforms (2 cols) */}
          <div className="lg:col-span-2 space-y-3 font-sans">
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block mb-4">
              Order Online
            </span>
            <div className="space-y-2">
              <a
                href={CAFE_INFO.ordering.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-vanilla transition-colors text-center border border-white/10"
              >
                Uber Eats
              </a>
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="block px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-latte hover:text-vanilla transition-colors text-center border border-white/5"
              >
                Direct Call Order
              </a>
            </div>
          </div>
        </div>

        {/* Oversized Brand Display Typography (As specified in prompt Section 13) */}
        <div className="py-12 border-t border-latte/20 text-center select-none">
          <p className="font-hand text-2xl sm:text-3xl lg:text-4xl text-terracotta mb-2">
            Handcrafted in Selly Oak
          </p>
          <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-normal tracking-tight text-cream/20 leading-none">
            CAFE FACE
          </h2>
        </div>

        {/* Bottom Legal, Staff Link & Copyright */}
        <div className="pt-8 border-t border-latte/15 flex flex-col sm:flex-row items-center justify-between text-xs text-latte/60 font-sans gap-4">
          <p>© {new Date().getFullYear()} Cafe Face (Selly Oak) Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-latte/70 hover:text-terracotta transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Café Admin Portal</span>
            </Link>
            <span>519 Bristol Rd · B29 6AU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
