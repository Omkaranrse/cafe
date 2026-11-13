"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FolioFlowItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export const DEFAULT_CAFE_ITEMS: FolioFlowItem[] = [
  {
    id: "pour-over-brew",
    title: "Artisan Pour-Over",
    category: "Specialty Coffee",
    image: "/images/cafe-interior-vibe.jpg",
    alt: "Barista pouring specialty filter coffee through glass Chemex dripper",
  },
  {
    id: "gourmet-pasta",
    title: "Handmade Pasta",
    category: "Kitchen Signature",
    image: "/images/insta-3.jpg",
    alt: "Gourmet artisan pasta tossed with savory herbs and parmesan",
  },
  {
    id: "latte-art",
    title: "Signature Flat White",
    category: "Artisan Coffee",
    image: "/images/latte-art.jpg",
    alt: "Velvety textured microfoam latte art in ceramic cup",
  },
  {
    id: "cafe-main-interior",
    title: "Selly Oak Sanctuary",
    category: "Café Interior",
    image: "/images/cafe-community.jpg",
    alt: "Cafe Face warm interior with wooden dining tables, ambient lighting, and cozy seating",
  },
  {
    id: "toasted-panini",
    title: "Artisan Melt & Wraps",
    category: "Warm Bites",
    image: "/images/grilled-chicken-wrap.jpg",
    alt: "Freshly pressed artisan sandwich with melted cheese and fresh fillings",
  },
  {
    id: "chocolate-brownie",
    title: "Warm Fudge Brownie",
    category: "Pastry & Dessert",
    image: "/images/chocolate-brownie.jpg",
    alt: "Warm chocolate fudge brownie topped with vanilla bean ice cream and sauce",
  },
  {
    id: "cozy-corner",
    title: "Social Lounge",
    category: "Gathering",
    image: "/images/insta-6.jpg",
    alt: "Cozy wooden table and seating nook with soft ambient lighting",
  },
];

export interface FolioFlowProps {
  items?: FolioFlowItem[];
  startIndex?: number;
  autoplay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function FolioFlow({
  items = DEFAULT_CAFE_ITEMS,
  startIndex = 3, // Centered on the arched café interior
  autoplay = false,
  interval = 4,
  pauseOnHover = true,
  className = "",
}: FolioFlowProps) {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);
  const touchStartX = useRef(0);

  // Track window width for responsive 3D fan transforms
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = items.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay (if enabled)
  useEffect(() => {
    if (!autoplay) return;
    if (pauseOnHover && isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [autoplay, interval, pauseOnHover, isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Trackpad horizontal wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;

    if (Math.abs(e.deltaX) > 25) {
      if (e.deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      lastWheelTime.current = now;
    }
  };

  // Touch drag swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  // Calculate symmetrical straight card positions aligned in center
  // Left and right cards are completely straight (rotY = 0) with zero tilt
  const getCardTransform = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const sign = Math.sign(diff);

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    if (diff === 0) {
      return {
        x: 0,
        z: 0,
        rotY: 0,
        scale: isMobile ? 1.02 : 1.06,
        opacity: 1,
        zIndex: 50,
        filter: "contrast(1.02) brightness(1)",
        pointerEvents: "auto" as const,
      };
    }

    // Straight cards symmetrically spaced from center
    const stepX = isMobile ? 85 : isTablet ? 135 : 180;
    const baseX = isMobile ? 100 : isTablet ? 155 : 200;

    const x = sign * (baseX + (absDiff - 1) * stepX);
    const scale = Math.max(0.74, 1 - absDiff * 0.08);

    // Visible side-cards without competing with the center card
    const opacity = absDiff > 3 ? 0 : Math.max(0.78, 1 - absDiff * 0.07);

    // Enhanced sharpness and contrast
    const brightness = Math.max(0.95, 1 - absDiff * 0.02);
    const contrast = 1.04;
    const zIndex = 50 - absDiff * 10;

    return {
      x,
      z: 0,
      rotY: 0, // ALL STRAIGHT: 0deg rotation for all cards!
      scale,
      opacity,
      zIndex,
      filter: `brightness(${brightness}) contrast(${contrast})`,
      pointerEvents: absDiff > 3 ? ("none" as const) : ("auto" as const),
    };
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full select-none flex flex-col items-center ${className}`}
    >
      {/* Centered Gallery Stage (Straight Cards) */}
      <div
        className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] lg:h-[470px] flex items-center justify-center overflow-visible"
      >
        {/* Subtle natural shadows beneath the floating gallery */}
        <div
          className="absolute -bottom-2 sm:bottom-1 left-1/2 -translate-x-1/2 w-[72%] max-w-[950px] h-[36px] sm:h-[48px] rounded-[100%] bg-[#3A2218]/12 blur-2xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[55%] max-w-[700px] h-[24px] sm:h-[32px] rounded-[100%] bg-[#C47A43]/14 blur-xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[38%] max-w-[420px] h-[16px] sm:h-[20px] rounded-[100%] bg-[#2A1712]/15 blur-md pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Gallery Cards (All Straight, Centered) */}
        {items.map((item, idx) => {
          const transform = getCardTransform(idx);
          const isCenter = (idx - activeIndex) % total === 0;

          return (
            <motion.div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              initial={false}
              animate={{
                x: transform.x,
                rotateY: 0,
                scale: transform.scale,
                opacity: transform.opacity,
                filter: transform.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 28,
                mass: 0.9,
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                zIndex: transform.zIndex,
                pointerEvents: transform.pointerEvents,
              }}
              className="cursor-pointer will-change-transform"
            >
              {/* Centered Straight Card Box */}
              <div
                className={`-translate-x-1/2 -translate-y-1/2 relative w-[200px] sm:w-[250px] md:w-[290px] lg:w-[330px] h-[270px] sm:h-[330px] md:h-[380px] lg:h-[430px] rounded-[24px] sm:rounded-[32px] overflow-hidden transition-shadow duration-500 ${
                  isCenter
                    ? "shadow-[0_24px_50px_-12px_rgba(73,37,18,0.32),0_8px_20px_-6px_rgba(73,37,18,0.18)] ring-1 ring-white/60"
                    : "shadow-[0_16px_36px_-10px_rgba(73,37,18,0.22)] ring-1 ring-white/35"
                }`}
                style={{ position: "relative", minHeight: "260px" }}
              >
                {/* Edge-to-edge Photograph */}
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 420px"
                  priority={isCenter}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />

                {/* Subtle Specular Rim Light */}
                <div
                  className="absolute inset-0 rounded-[28px] sm:rounded-[36px] pointer-events-none bg-gradient-to-t from-[#2A1712]/30 via-transparent to-white/20"
                  aria-hidden="true"
                />

                {/* Active Card Label Overlay */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-[#2A1712]/80 via-[#2A1712]/30 to-transparent flex flex-col pointer-events-none"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D7BDA5]">
                      {item.category}
                    </span>
                    <span className="text-white font-serif text-lg sm:text-2xl font-medium tracking-wide">
                      {item.title}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* LEFT NAV ARROW BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous photograph"
          className="absolute left-2 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF9F2]/90 hover:bg-[#FFF9F2] text-[#492512] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/60 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        </button>

        {/* RIGHT NAV ARROW BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next photograph"
          className="absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF9F2]/90 hover:bg-[#FFF9F2] text-[#492512] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/60 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        </button>
      </div>

      {/* BOTTOM CENTER: Mouse Scroll Indicator Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-2 sm:mt-3 flex flex-col items-center gap-1 pointer-events-none"
      >
        {/* Mouse outline with animated scroll wheel */}
        <div className="w-4.5 h-7 sm:w-5 sm:h-8 rounded-full border-[1.8px] border-[#492512]/45 flex justify-center pt-1.5 bg-[#FFF9F2]/40 backdrop-blur-sm shadow-sm">
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1.5 rounded-full bg-[#492512]/75"
          />
        </div>
        {/* Tiny downward chevron */}
        <motion.div
          animate={{
            y: [0, 2, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[#492512]/60 text-xs font-semibold leading-none"
        >
          ⌄
        </motion.div>
      </motion.div>
    </div>
  );
}
