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
    category: "Atmosphere & Ambience",
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
  // Enhanced side-card visibility with higher opacity and sharper contrast
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
        z: isMobile ? 35 : 70,
        rotY: 0,
        scale: isMobile ? 1.03 : 1.08,
        opacity: 1,
        zIndex: 50,
        filter: "contrast(1.02) brightness(1)",
        pointerEvents: "auto" as const,
      };
    }

    // Increased scale by ~12-15% and improved side-card spacing
    const stepX = isMobile ? 95 : isTablet ? 165 : 220;
    const depthZ = isMobile ? 65 : isTablet ? 100 : 120;
    const rotY = isMobile ? 20 : isTablet ? 18 : 16;

    const x = sign * (isMobile ? 115 : isTablet ? 175 : 225 + (absDiff - 1) * stepX);
    const z = -absDiff * depthZ;
    const rotationY = -sign * (15 + (absDiff - 1) * rotY);
    const scale = Math.max(0.72, 1 - absDiff * 0.09);

    // Significantly reduced opacity drop: side cards stay crisp and clearly visible
    const opacity = absDiff > 3 ? 0 : Math.max(0.78, 1 - absDiff * 0.07);

    // Strong contrast and no excessive darkening
    const brightness = Math.max(0.92, 1 - absDiff * 0.03);
    const contrast = 1.04;
    const zIndex = 50 - absDiff * 10;

    return {
      x,
      z,
      rotY: rotationY,
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
      style={{ perspective: "1800px" }}
    >
      {/* 3D Curved Cylindrical Gallery Stage (Increased height by ~12-15%) */}
      <div
        className="relative w-full h-[390px] sm:h-[480px] md:h-[550px] lg:h-[600px] flex items-center justify-center overflow-visible"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle, natural organic shadows beneath the floating gallery */}
        <div
          className="absolute -bottom-2 sm:bottom-1 left-1/2 -translate-x-1/2 w-[72%] max-w-[950px] h-[36px] sm:h-[48px] rounded-[100%] bg-[#3A2218]/15 blur-2xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-2 sm:bottom-5 left-1/2 -translate-x-1/2 w-[55%] max-w-[700px] h-[24px] sm:h-[32px] rounded-[100%] bg-[#C47A43]/16 blur-xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 w-[38%] max-w-[450px] h-[16px] sm:h-[22px] rounded-[100%] bg-[#2A1712]/18 blur-md pointer-events-none -z-10"
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
                position: "absolute",
                left: "50%",
                top: "50%",
                zIndex: transform.zIndex,
                pointerEvents: transform.pointerEvents,
                transformStyle: "preserve-3d",
              }}
              className="cursor-pointer will-change-transform"
            >
              {/* Centered Card Box (10–15% larger dimensions) */}
              <div
                className={`-translate-x-1/2 -translate-y-1/2 relative w-[235px] sm:w-[305px] md:w-[365px] lg:w-[410px] h-[325px] sm:h-[415px] md:h-[495px] lg:h-[545px] rounded-[26px] sm:rounded-[34px] overflow-hidden transition-shadow duration-500 ${
                  isCenter
                    ? "shadow-[0_28px_56px_-12px_rgba(58,34,24,0.38),0_10px_24px_-6px_rgba(58,34,24,0.22)] ring-1 ring-white/60"
                    : "shadow-[0_18px_40px_-10px_rgba(58,34,24,0.26)] ring-1 ring-white/35"
                }`}
                style={{ position: "relative", minHeight: "325px" }}
              >
                {/* Edge-to-edge High Definition Photograph (Sharp & clear) */}
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 380px, 460px"
                  priority={isCenter}
                  quality={92}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />

                {/* Subtle Glassmorphic Specular Rim Light */}
                <div
                  className="absolute inset-0 rounded-[26px] sm:rounded-[34px] pointer-events-none bg-gradient-to-t from-[#2A1712]/30 via-transparent to-white/20"
                  aria-hidden="true"
                />

                {/* Active Card Subtle Label Overlay (Bottom) */}
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
          className="absolute left-2 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF9F2]/90 hover:bg-[#FFF9F2] text-[#492512] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/60 cursor-pointer"
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
          className="absolute right-2 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF9F2]/90 hover:bg-[#FFF9F2] text-[#492512] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/60 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        </button>
      </div>

      {/* BOTTOM CENTER: Mouse Scroll Indicator Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-6 sm:mt-8 flex flex-col items-center gap-1.5 pointer-events-none"
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
