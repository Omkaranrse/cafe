"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Coffee, Heart, Clock, MapPin, Sparkles } from "lucide-react";

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-espresso text-cream overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Decorative background glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-terracotta/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-latte/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10" style={{ position: "relative" }}>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-sans tracking-wide text-latte uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Our Philosophy</span>
          </motion.div>

          <motion.h2
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-vanilla leading-[1.05]"
          >
            More than just your daily coffee.
          </motion.h2>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-base sm:text-lg text-latte font-sans leading-relaxed"
          >
            Nestled on Bristol Road in the heart of Selly Oak, Birmingham, Cafe
            Face was born from a simple belief: that a neighborhood café should
            be a sanctuary of exceptional taste, genuine warmth, and culinary
            craft.
          </motion.p>
        </div>

        {/* Asymmetric Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Editorial Image */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 relative"
            style={{ position: "relative" }}
          >
            <div
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[36px] overflow-hidden border border-white/10 shadow-deep"
              style={{ position: "relative", minHeight: "320px" }}
            >
              <Image
                src="/images/cafe-interior-vibe.jpg"
                alt="Cafe Face Interior in Selly Oak"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />

              {/* Inset Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-espresso border border-white/10 backdrop-blur-md">
                <p className="font-hand text-xl sm:text-2xl text-vanilla leading-snug">
                  “A table where ideas spark, friends catch up, and every single
                  cup is treated as a work of art.”
                </p>
                <span className="mt-2 block font-sans text-xs tracking-wider uppercase text-terracotta font-medium">
                  519 Bristol Road · Selly Oak
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Two Staggered Panels */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            {/* Story Card 1 */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-[30px] bg-white/[0.04] border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-terracotta/20 border border-terracotta/30 flex items-center justify-center text-terracotta mb-4">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-vanilla mb-2">
                Specialty Roast Mastery
              </h3>
              <p className="text-sm text-latte/90 leading-relaxed font-sans">
                Every espresso pulled at Cafe Face is dialed in with precision.
                We select ethically sourced, specialty-grade Arabica beans with
                rich chocolate, stone fruit, and hazelnut profiles, perfectly
                balanced with silky steamed British milk or artisan oat milk.
              </p>
            </motion.div>

            {/* Story Card 2 */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-[30px] bg-white/[0.04] border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-latte/20 border border-latte/30 flex items-center justify-center text-vanilla mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-vanilla mb-2">
                Mediterranean & Fresh Kitchen
              </h3>
              <p className="text-sm text-latte/90 leading-relaxed font-sans">
                Beyond specialty coffee, our kitchen prepares authentic Persian
                lamb kebab flatbreads, grilled herb chicken boxes, golden
                halloumi plates, and hearty British morning breakfasts. Made
                fresh to order with halal-certified meats and vibrant herbs.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Community Banner / Live Stats */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="p-4">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-vanilla">
              519
            </span>
            <p className="mt-1 text-xs text-latte uppercase tracking-widest font-sans">
              Bristol Road, Selly Oak
            </p>
          </div>
          <div className="p-4">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-terracotta">
              7 Days
            </span>
            <p className="mt-1 text-xs text-latte uppercase tracking-widest font-sans">
              9:00 AM – 4:00 PM
            </p>
          </div>
          <div className="p-4">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-vanilla">
              100%
            </span>
            <p className="mt-1 text-xs text-latte uppercase tracking-widest font-sans">
              Halal Certified Meats
            </p>
          </div>
          <div className="p-4">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-terracotta">
              Fresh
            </span>
            <p className="mt-1 text-xs text-latte uppercase tracking-widest font-sans">
              Daily Kitchen Prep
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
