"use client";

import React, { useState, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

export interface InteractiveBookShadow {
  color?: string;
  opacity?: number;
  blur?: number;
  offsetX?: number;
  offsetY?: number;
  spread?: number;
}

export interface InteractiveBookProps {
  width?: number;
  height?: number;
  frontCover?: string;
  backCover?: string;
  innerPages?: string[];
  shadow?: InteractiveBookShadow;
  borderRadius?: number;
}

/**
 * InteractiveBook — Official Framer Component
 * Source: https://framer.com/m/InteractiveBook-xGXc.js@uLOYl8huI2w4XDdONaRK
 * Preserves realistic 3D page-flipping animation, spine shading, and page progression.
 */
export default function InteractiveBook(props: InteractiveBookProps) {
  const {
    width = 380,
    height = 560,
    frontCover = "/images/book/00_front_cover.jpg",
    backCover = "/images/book/05_back_cover.jpg",
    innerPages = [
      "/images/book/01_page_interior.jpg",
      "/images/book/02_page_coffee.jpg",
      "/images/book/03_page_food.jpg",
      "/images/book/04_page_story.jpg",
    ],
    shadow = {
      color: "#492512",
      opacity: 0.35,
      blur: 25,
      offsetX: 10,
      offsetY: 15,
      spread: -4,
    },
    borderRadius = 14,
  } = props;

  const rawImages = [frontCover, ...innerPages, backCover].filter(Boolean) as string[];
  const allImages = rawImages.length % 2 === 0 ? rawImages : [...rawImages, null];
  const leafPairs: [string | null, string | null][] = [];
  for (let i = 0; i < allImages.length; i += 2) {
    leafPairs.push([allImages[i], allImages[i + 1]]);
  }
  const totalLeaves = leafPairs.length;
  const [flippedCount, setFlippedCount] = useState(0);
  const [isBookClosed, setIsBookClosed] = useState(true);
  const flippedRef = useRef(0);
  const controlsPool = Array.from({ length: 20 }, () => useAnimationControls());
  const bookContainerControls = useAnimationControls();

  const getRgba = (color?: string, alpha: number = 0.4) => {
    if (!color) return `rgba(0,0,0,${alpha})`;
    const hex = color.replace("#", "");
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowCol = getRgba(shadow.color, shadow.opacity);
  const closedBookShadow = `${shadow.offsetX ?? 5}px ${shadow.offsetY ?? 5}px ${shadow.blur ?? 10}px ${shadow.spread ?? 0}px ${shadowCol}`;

  const handleClick = async () => {
    if (flippedCount === 0) {
      setIsBookClosed(false);
      bookContainerControls.start({
        x: width / 2,
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }
    if (flippedCount < totalLeaves) {
      const indexToFlip = flippedCount;
      setFlippedCount((prev) => prev + 1);
      flippedRef.current = flippedCount + 1;
      await controlsPool[indexToFlip].start({
        rotateY: -180,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
      });
    } else {
      bookContainerControls.start({
        x: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      for (let i = totalLeaves - 1; i >= 0; i--) {
        controlsPool[i].start({
          rotateY: 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
        await new Promise((r) => setTimeout(r, 80));
      }
      setFlippedCount(0);
      flippedRef.current = 0;
      setIsBookClosed(true);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 2500,
        cursor: "pointer",
        overflow: "visible",
      }}
      onClick={handleClick}
      title="Click to turn page"
    >
      <motion.div
        animate={bookContainerControls}
        style={{
          width,
          height,
          position: "relative",
          transformStyle: "preserve-3d",
          boxShadow: isBookClosed ? closedBookShadow : "0px 15px 35px rgba(73, 37, 18, 0.15)",
          borderRadius: `${borderRadius}px`,
          transition: "box-shadow 0.4s ease",
        }}
      >
        {leafPairs.map(([frontSrc, backSrc], index) => {
          const isFlipped = index < flippedCount;
          const isFlipping = index === flippedCount - 1;
          const zOffset = isFlipped
            ? index * 0.4
            : (totalLeaves - index) * 0.4;
          const zIndex = isFlipping
            ? 100
            : isFlipped
            ? index
            : totalLeaves - index;

          return (
            <motion.div
              key={index}
              animate={controlsPool[index]}
              initial={{ rotateY: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                zIndex: zIndex,
                transform: `translateZ(${zOffset}px)`,
                willChange: "transform",
              }}
            >
              {/* Front of the leaf */}
              <div
                style={{
                  ...faceStyle,
                  borderRadius: `0px ${borderRadius}px ${borderRadius}px 0px`,
                }}
              >
                {frontSrc && (
                  <img
                    src={frontSrc}
                    style={imgStyle}
                    alt={`Book page ${index * 2 + 1}`}
                    draggable={false}
                  />
                )}
                <div style={spineGradient} />
              </div>

              {/* Back of the leaf */}
              <div
                style={{
                  ...faceStyle,
                  transform: "rotateY(180deg) translateZ(0.01px)",
                  borderRadius: `${borderRadius}px 0px 0px ${borderRadius}px`,
                }}
              >
                {backSrc && (
                  <img
                    src={backSrc}
                    style={imgStyle}
                    alt={`Book page ${index * 2 + 2}`}
                    draggable={false}
                  />
                )}
                <div
                  style={{
                    ...spineGradient,
                    left: "auto",
                    right: 0,
                    transform: "scaleX(-1)",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

const faceStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  backgroundColor: "#F8F1E9",
  overflow: "hidden",
  boxShadow: "inset 0 0 30px rgba(73, 37, 18, 0.05)",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  userSelect: "none",
  WebkitUserSelect: "none",
};

const spineGradient: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: "14%",
  background:
    "linear-gradient(to right, rgba(73, 37, 18, 0.28) 0%, rgba(73, 37, 18, 0.08) 40%, transparent 100%)",
  pointerEvents: "none",
};

