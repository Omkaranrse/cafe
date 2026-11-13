"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Sparkles, Camera } from "lucide-react";

const PHOTO_GRID = [
  {
    title: "Golden Crema Extraction",
    subtitle: "Extracted at 9 bars with single-origin beans",
    image: "/images/espresso.jpg",
    span: "col-span-12 sm:col-span-6 lg:col-span-4",
    aspect: "aspect-[4/3]",
  },
  {
    title: "The Art of Microfoam",
    subtitle: "Silky texture poured with heart",
    image: "/images/latte-art.jpg",
    span: "col-span-12 sm:col-span-6 lg:col-span-4",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Barista Precision",
    subtitle: "Handcrafted moments behind the bar",
    image: "/images/cafe-barista.jpg",
    span: "col-span-12 sm:col-span-12 lg:col-span-4",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Mediterranean Flatbreads",
    subtitle: "Charcoal aroma, sumac herbs & pomegranate",
    image: "/images/persian-lamb-box.jpg",
    span: "col-span-12 sm:col-span-12 lg:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Selly Oak Gathering Space",
    subtitle: "Warm acoustics, study tables & good vibes",
    image: "/images/cafe-community.jpg",
    span: "col-span-12 sm:col-span-12 lg:col-span-5",
    aspect: "aspect-[16/10]",
  },
];

export default function PhotoStory() {
  return (
    <section
      id="experience"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-cream border-t border-latte/30 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vanilla border border-latte/60 shadow-soft text-xs font-sans tracking-wide text-terracotta uppercase mb-4"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Journey</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-espresso leading-tight"
            >
              Moments of Craft & Connection
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-md text-sm sm:text-base text-espresso/70 font-sans leading-relaxed"
          >
            Every pour, every flame-grilled flatbread, every laugh shared across
            our wooden tables. Discover the everyday rhythm of Cafe Face.
          </motion.p>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {PHOTO_GRID.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={`group relative rounded-[32px] overflow-hidden bg-vanilla border border-latte/50 shadow-soft hover:shadow-deep transition-all duration-500 hover:-translate-y-1 ${item.span}`}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden`} style={{ position: "relative" }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Inset Caption Overlay */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-cream/90 backdrop-blur-md border border-white/40 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-espresso">
                    {item.title}
                  </h3>
                  <p className="text-xs text-espresso/70 font-sans mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

