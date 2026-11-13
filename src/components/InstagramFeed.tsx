"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { INSTAGRAM_POSTS, CAFE_INFO } from "@/data/menuData";

export default function InstagramFeed() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-12 bg-cream border-t border-latte/30 overflow-hidden noise-overlay">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vanilla border border-latte/60 shadow-soft text-xs font-sans tracking-wide text-terracotta uppercase mb-4"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Social Journal</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-espresso leading-tight"
            >
              A little more Cafe Face.
            </motion.h2>
          </div>

          <motion.a
            href={CAFE_INFO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-espresso text-vanilla text-xs sm:text-sm font-sans font-medium shadow-pill hover:bg-terracotta transition-all duration-300 hover:-translate-y-0.5 self-start sm:self-auto cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow {CAFE_INFO.instagram.handle}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* 6-Item Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{ position: "relative", minHeight: "180px" }}
              className="group relative aspect-square rounded-[24px] overflow-hidden bg-vanilla border border-latte/50 shadow-soft hover:shadow-deep transition-all duration-500 hover:-translate-y-1 block"
            >
              <Image
                src={post.image_url}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Hover Dark Overlay with Stats & Caption */}
              <div className="absolute inset-0 bg-noir/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-vanilla backdrop-blur-[2px]">
                <div className="flex justify-end">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-xs mb-1.5 font-sans font-medium">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </span>
                  </div>
                  <p className="text-[11px] text-latte line-clamp-2 leading-snug font-sans">
                    {post.caption}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
