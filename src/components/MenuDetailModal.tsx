"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ExternalLink, Phone, ShieldCheck, AlertCircle, Clock, Flame } from "lucide-react";
import { MenuItem } from "@/types";
import { CAFE_INFO } from "@/data/menuData";

interface MenuDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-noir/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-vanilla rounded-[36px] overflow-hidden shadow-deep border border-latte/50 z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-espresso/80 text-vanilla hover:bg-espresso flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Product Photography */}
          <div className="relative w-full h-64 sm:h-80 bg-latte/20" style={{ position: "relative" }}>
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vanilla via-transparent to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-cream text-xs font-semibold text-terracotta uppercase tracking-wider shadow-sm">
              {item.category_name}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 -mt-6 relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                  {item.name}
                </h3>
                {item.prep_note && (
                  <div className="flex items-center gap-1.5 text-xs text-espresso/60 font-sans mt-1">
                    <Clock className="w-3.5 h-3.5 text-terracotta" />
                    <span>{item.prep_note}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-espresso">
                  £{item.price.toFixed(2)}
                </span>
                {item.calories_approx && (
                  <span className="block text-xs text-espresso/60 font-sans">
                    {item.calories_approx}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-espresso/80 font-sans text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>

            {/* Dietary Tags */}
            {item.dietary_tags.length > 0 && (
              <div className="mt-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-espresso/60 block mb-2 font-sans">
                  Dietary Information
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.dietary_tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream border border-latte/60 text-xs font-medium text-espresso"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {tag}
                    </span>
                  ))}
                  {item.is_verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-medium border border-terracotta/20">
                      Verified Menu Item
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Allergen Information */}
            {item.allergen_information.length > 0 && (
              <div className="mt-4 p-3.5 rounded-2xl bg-cream/70 border border-latte/40 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div className="text-xs text-espresso/70 font-sans">
                  <span className="font-semibold text-espresso">Allergen Notice: </span>
                  {item.allergen_information.join(", ")}. Please inform our staff
                  of any severe allergies before ordering.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-latte/40 flex flex-wrap gap-3 items-center justify-between">
              <a
                href={CAFE_INFO.ordering.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-espresso text-vanilla text-sm font-sans font-medium shadow-pill hover:bg-terracotta transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-center"
              >
                <span>Order on Uber Eats</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-vanilla text-espresso border border-latte/60 text-sm font-sans font-medium shadow-soft hover:bg-cream transition-all duration-300 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-terracotta" />
                <span>Call to Order</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

