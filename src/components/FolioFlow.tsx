"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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
    id: "interior-window",
    title: "Window Seating",
    category: "Ambience",
    image: "/images/cafe-community.jpg",
    alt: "Cafe Face sunlit window seating with leafy plants",
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
    id: "cafe-main-arched",
    title: "Selly Oak Sanctuary",
    category: "Atmosphere",
    image: "/images/cafe-interior-vibe.jpg",
    alt: "Cafe Face arched window interior with warm pendant lamps and greenery",
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
  startIndex = 3, // Centered on the arched interior
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

  // Calculate 3D cylindrical arc transform for each card relative to activeIndex
  const getCardTransform = (index: number) => {
    // Cyclic shortest distance: -3 to +3
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
        z: isMobile ? 30 : 60,
        rotY: 0,
        scale: isMobile ? 1.02 : 1.06,
        opacity: 1,
        zIndex: 50,
        filter: "brightness(1)",
        pointerEvents: "auto" as const,
      };
    }

    // Step spacing, depth, and rotation based on screen width
    const stepX = isMobile ? 80 : isTablet ? 135 : 180;
    const depthZ = isMobile ? 70 : isTablet ? 110 : 130;
    const rotY = isMobile ? 22 : isTablet ? 20 : 18;

    const x = sign * (isMobile ? 100 : isTablet ? 145 : 185 + (absDiff - 1) * stepX);
    const z = -absDiff * depthZ;
    const rotationY = -sign * (16 + (absDiff - 1) * rotY);
    const scale = Math.max(0.68, 1 - absDiff * 0.1);
    const opacity = absDiff > 3 ? 0 : Math.max(0.45, 1 - absDiff * 0.16);
    const brightness = Math.max(0.65, 1 - absDiff * 0.12);
    const zIndex = 50 - absDiff * 10;

    return {
      x,
      z,
      rotY: rotationY,
      scale,
      opacity,
      zIndex,
      filter: `brightness(${brightness})`,
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
      style={{ perspective: "1800px" }}
    >
      {/* 3D Curved Cylindrical Gallery Stage */}
      <div
        className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft floor shadow & warm ambient reflection under center card */}
        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[340px] sm:w-[440px] lg:w-[500px] h-[70px] sm:h-[100px] rounded-[100%] bg-gradient-to-r from-transparent via-[#C47A43]/30 to-transparent blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] h-[32px] sm:h-[42px] rounded-[100%] bg-[#2A1712]/20 blur-xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Gallery Cards */}
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
                z: transform.z,
                rotateY: transform.rotY,
                scale: transform.scale,
                opacity: transform.opacity,
                filter: transform.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
                mass: 0.9,
              }}
              style={{
                zIndex: transform.zIndex,
                pointerEvents: transform.pointerEvents,
                transformStyle: "preserve-3d",
              }}
              className="absolute cursor-pointer will-change-transform"
            >
              {/* Card Container */}
              <div
                className={`relative w-[210px] sm:w-[270px] md:w-[320px] lg:w-[360px] h-[290px] sm:h-[370px] md:h-[440px] lg:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden transition-shadow duration-500 ${
                  isCenter
                    ? "shadow-[0_28px_60px_-14px_rgba(73,37,18,0.45),0_0_40px_rgba(196,122,67,0.22)] ring-1 ring-white/60"
                    : "shadow-[0_16px_36px_-10px_rgba(73,37,18,0.3)] ring-1 ring-white/30"
                }`}
                style={{ position: "relative" }}
              >
                {/* Edge-to-edge High Definition Photograph */}
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 400px"
                  priority={isCenter}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />

                {/* Subtle Glassmorphic Specular Rim Light */}
                <div
                  className="absolute inset-0 rounded-[24px] sm:rounded-[32px] pointer-events-none bg-gradient-to-t from-[#2A1712]/30 via-transparent to-white/20"
                  aria-hidden="true"
                />

                {/* Active Card Subtle Label Overlay (Bottom) */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#2A1712]/80 via-[#2A1712]/30 to-transparent flex flex-col pointer-events-none"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D7BDA5]">
                      {item.category}
                    </span>
                    <span className="text-white font-serif text-lg sm:text-xl font-medium tracking-wide">
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
          className="absolute left-2 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF9F2]/85 hover:bg-[#FFF9F2] text-[#492512] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/60"
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
          className="absolute right-2 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF9F2]/85 hover:bg-[#FFF9F2] text-[#492512] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/60"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        </button>
      </div>

      {/* BOTTOM CENTER: Mouse Scroll Indicator Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-4 sm:mt-6 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        {/* Mouse outline with animated scroll wheel */}
        <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border-[1.8px] border-[#492512]/45 flex justify-center pt-1.5 bg-[#FFF9F2]/40 backdrop-blur-sm shadow-sm">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 rounded-full bg-[#492512]/75"
          />
        </div>
        {/* Tiny downward chevron */}
        <motion.div
          animate={{
            y: [0, 3, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[#492512]/60 text-xs font-semibold"
        >
          ⌄
        </motion.div>
      </motion.div>
    </div>
  );
}
