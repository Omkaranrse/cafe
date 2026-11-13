"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Filter, Eye, ArrowUpRight, Check } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";
import { MenuItem } from "@/types";
import MenuDetailModal from "./MenuDetailModal";

const DIETARY_FILTERS = [
  "All Diets",
  "Halal",
  "Vegetarian",
  "Vegan",
  "Gluten-Free Option",
];

export default function InteractiveMenu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietaryFilter, setDietaryFilter] = useState("All Diets");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Filter logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" || item.category_id === selectedCategory;

      // Dietary match
      const matchesDietary =
        dietaryFilter === "All Diets" ||
        item.dietary_tags.some((tag) =>
          tag.toLowerCase().includes(dietaryFilter.toLowerCase())
        );

      // Search match
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category_name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section
      id="menu"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-cream noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vanilla border border-latte/60 shadow-soft text-xs font-sans tracking-wide text-terracotta uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kitchen & Barista Craft</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-espresso leading-tight"
          >
            Something delicious awaits.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-espresso/75 font-sans"
          >
            Explore the flavours and favourites of Cafe Face — from single origin
            roasts to authentic Mediterranean flatbread boxes.
          </motion.p>
        </div>

        {/* Category Filter Pills (Scrollable on Mobile) */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 pt-1 gap-2 scrollbar-none no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-vanilla shadow-pill"
                    : "text-espresso/75 bg-vanilla/80 hover:bg-vanilla hover:text-espresso border border-latte/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-espresso rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Search Bar */}
        <div className="mt-6 mb-10 flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-vanilla/70 border border-latte/40 backdrop-blur-sm">
          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-sans text-espresso/60 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-terracotta" />
              Diet:
            </span>
            {DIETARY_FILTERS.map((diet) => {
              const active = dietaryFilter === diet;
              return (
                <button
                  key={diet}
                  onClick={() => setDietaryFilter(diet)}
                  className={`px-3 py-1 rounded-full text-xs font-sans transition-all cursor-pointer ${
                    active
                      ? "bg-terracotta text-vanilla font-medium shadow-sm"
                      : "bg-cream/80 text-espresso/70 hover:bg-cream hover:text-espresso border border-latte/30"
                  }`}
                >
                  {diet}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes or coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-cream border border-latte/50 text-xs sm:text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 px-2">
          <span className="text-xs font-sans uppercase tracking-wider text-espresso/60 font-medium">
            Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
          </span>
          <span className="text-xs font-hand text-terracotta text-sm">
            All prices in GBP (£) · Halal options available
          </span>
        </div>

        {/* Responsive Product Cards Grid (Inspired by Joe's Coffee reference) */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-vanilla/50 rounded-[32px] border border-latte/40">
            <p className="font-serif text-2xl text-espresso">No items found</p>
            <p className="mt-2 text-sm text-espresso/60 font-sans">
              Try adjusting your category or dietary filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setDietaryFilter("All Diets");
                setSearchQuery("");
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-espresso text-vanilla text-xs font-sans hover:bg-terracotta transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-[32px] overflow-hidden bg-vanilla border border-latte/50 shadow-soft hover:shadow-deep transition-all duration-500 hover:-translate-y-1.5 flex flex-col cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-latte/20" style={{ position: "relative" }}>
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Quick View Pill on Hover */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-vanilla/90 text-espresso flex items-center justify-center backdrop-blur-md shadow-md">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Dietary badge pill */}
                    {item.dietary_tags[0] && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-cream text-[10px] font-sans font-semibold tracking-wider text-espresso/80 uppercase shadow-sm">
                        {item.dietary_tags[0]}
                      </div>
                    )}

                    {/* Floating Product Name & Price pill at bottom of image (as in Joe's Coffee reference) */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl glass-cream border border-white/40 backdrop-blur-md shadow-sm flex items-center justify-between gap-2">
                      <span className="font-serif text-sm font-semibold text-espresso truncate">
                        {item.name}
                      </span>
                      <span className="font-sans text-xs font-bold text-terracotta shrink-0">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Description & Action */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-espresso/70 font-sans line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-latte/30 flex items-center justify-between text-xs">
                      <span className="font-hand text-sm text-terracotta">
                        {item.is_verified ? "Cafe Face Special" : "Classic"}
                      </span>
                      <span className="font-sans text-[11px] font-medium text-espresso/80 group-hover:text-terracotta flex items-center gap-1 transition-colors">
                        View details
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      <MenuDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}

