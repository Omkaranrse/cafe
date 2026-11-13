"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Utensils, Compass, ArrowRight } from "lucide-react";

interface TrailCard {
  id: number;
  x: number;
  y: number;
  rotation: number;
  image: string;
  title: string;
  category: string;
  price: string;
}

const PREVIEW_ITEMS = [
  { title: "Signature Flat White", category: "Barista Special", price: "£3.60", image: "/images/flat-white.jpg" },
  { title: "Persian Lamb Kebab Box", category: "Grill Kitchen", price: "£9.50", image: "/images/persian-lamb-box.jpg" },
  { title: "Stacked Buttermilk Pancakes", category: "Brunch", price: "£7.95", image: "/images/stacked-pancakes.jpg" },
  { title: "Spanish Latte", category: "Sweet Roast", price: "£4.20", image: "/images/spanish-latte.jpg" },
  { title: "Halloumi Flatbread Box", category: "Mediterranean", price: "£8.50", image: "/images/halloumi-box.jpg" },
  { title: "Ceremonial Matcha Latte", category: "Japanese Green", price: "£4.10", image: "/images/matcha-latte.jpg" },
  { title: "Sea Salt Dark Brownie", category: "Fresh Bake", price: "£3.50", image: "/images/chocolate-brownie.jpg" },
  { title: "Spicy Rice Box", category: "Hot Box", price: "£8.75", image: "/images/spicy-rice-box.jpg" },
  { title: "Iced Oat Latte", category: "Chilled", price: "£3.80", image: "/images/iced-latte.jpg" },
  { title: "Avocado & Poached Eggs", category: "Artisan Brunch", price: "£8.25", image: "/images/avocado-toast.jpg" },
];

export default function MoodExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<TrailCard[]>([]);
  const lastSpawnTime = useRef<number>(0);
  const itemIndex = useRef<number>(0);
  const cardIdCounter = useRef<number>(0);

  const spawnCard = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Check bounds
    if (x < 30 || x > rect.width - 30 || y < 30 || y > rect.height - 30) return;

    const item = PREVIEW_ITEMS[itemIndex.current % PREVIEW_ITEMS.length];
    itemIndex.current++;
    cardIdCounter.current++;

    const newCard: TrailCard = {
      id: cardIdCounter.current,
      x,
      y,
      rotation: (Math.random() - 0.5) * 22,
      image: item.image,
      title: item.title,
      category: item.category,
      price: item.price,
    };

    setCards((prev) => [...prev.slice(-4), newCard]);

    // Automatically remove after 1.8s
    setTimeout(() => {
      setCards((prev) => prev.filter((c) => c.id !== newCard.id));
    }, 1800);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawnTime.current > 140) {
      lastSpawnTime.current = now;
      spawnCard(e.clientX, e.clientY);
    }
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      spawnCard(touch.clientX, touch.clientY);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="mood"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouch}
      className="relative min-h-[460px] sm:min-h-[520px] py-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-cream via-vanilla to-cream select-none cursor-crosshair border-y border-latte/30"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none noise-overlay" />
      <div className="absolute w-[500px] h-[300px] rounded-full bg-latte/20 blur-[100px] pointer-events-none" />

      {/* Floating Trail Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{
                opacity: 0,
                scale: 0.6,
                x: card.x - 90,
                y: card.y - 70,
                rotate: card.rotation,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: card.x - 90,
                y: card.y - 110,
                rotate: card.rotation,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                y: card.y - 150,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute w-[180px] p-2.5 rounded-[22px] glass-cream border border-latte/60 shadow-deep pointer-events-none backdrop-blur-md"
            >
              <div className="relative w-full h-24 rounded-[16px] overflow-hidden mb-2" style={{ position: "relative" }}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
              <div className="text-left px-1">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-terracotta block">
                  {card.category}
                </span>
                <p className="font-serif text-xs font-semibold text-espresso truncate">
                  {card.title}
                </p>
                <p className="font-sans text-[11px] text-espresso/70 font-medium">
                  {card.price}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Interactive Badge Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vanilla border border-latte/60 shadow-soft text-xs font-sans font-medium text-espresso/80 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-terracotta animate-spin" />
          <span>Move your cursor or tap anywhere!</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-espresso tracking-tight leading-tight"
        >
          What are you in the mood for?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-espresso/75 text-sm sm:text-base font-sans max-w-md"
        >
          From single-origin roasts to flame-grilled flatbread boxes and sweet
          afternoon bites, explore our kitchen creations.
        </motion.p>

        {/* Two CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#menu")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-espresso text-vanilla text-xs sm:text-sm font-sans font-medium shadow-pill transition-all duration-300 hover:bg-terracotta hover:-translate-y-0.5 cursor-pointer"
          >
            <span>See the Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo("#visit")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-vanilla text-espresso border border-latte/60 text-xs sm:text-sm font-sans font-medium shadow-soft transition-all duration-300 hover:border-terracotta hover:bg-vanilla/90 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-terracotta" />
            <span>Find Us</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

