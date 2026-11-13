"use client";

import { Star, MessageSquareHeart, ExternalLink } from "lucide-react";
import Pinfold from "./Pinfold";

const GOOGLE_REVIEWS = [
  {
    quote:
      "Hands down the best flat white in Selly Oak! The sourdough toasties are incredible, and the sunlight through the windows makes it the coziest study spot in Birmingham.",
    name: "Sophie Turner",
    role: "Google Review ★★★★★ · Local Guide",
    color: "#FFF6ED",
    shape: "square",
    link: "https://www.google.com/maps/search/?api=1&query=Cafe+Face+519+Bristol+Road+Selly+Oak+Birmingham+B29+6AU",
  },
  {
    quote:
      "Cafe Face is a true gem on Bristol Road. The cardamom buns and iced pistachio latte are unmatched. Staff are super welcoming and the playlist is always on point.",
    name: "Marcus Vance",
    role: "Google Review ★★★★★ · Verified Customer",
    color: "#FDEED9",
    shape: "tall",
    link: "https://www.google.com/maps/search/?api=1&query=Cafe+Face+519+Bristol+Road+Selly+Oak+Birmingham+B29+6AU",
  },
  {
    quote:
      "Finally a specialty coffee shop near campus with serious barista craft. The single-origin Ethiopian pour-over was exquisite. Beautiful presentation and warm ambience.",
    name: "Dr. Elena Rostova",
    role: "Google Review ★★★★★ · UoB Faculty",
    color: "#EBF5ED",
    shape: "wide",
    link: "https://www.google.com/maps/search/?api=1&query=Cafe+Face+519+Bristol+Road+Selly+Oak+Birmingham+B29+6AU",
  },
  {
    quote:
      "The avocado sourdough with poached eggs and house chilli crunch is legendary. Love the relaxed creative community here. 10/10 every single visit!",
    name: "Liam O'Connor",
    role: "Google Review ★★★★★ · Regular",
    color: "#FDF0ED",
    shape: "square",
    link: "https://www.google.com/maps/search/?api=1&query=Cafe+Face+519+Bristol+Road+Selly+Oak+Birmingham+B29+6AU",
  },
  {
    quote:
      "My daily morning ritual before lectures. Outstanding filter coffee and the fluffiest brioche french toast you will ever taste. Couldn't recommend more.",
    name: "Amina Al-Mansoor",
    role: "Google Review ★★★★★ · UoB Student",
    color: "#F3EBE1",
    shape: "tall",
    link: "https://www.google.com/maps/search/?api=1&query=Cafe+Face+519+Bristol+Road+Selly+Oak+Birmingham+B29+6AU",
  },
  {
    quote:
      "Outstanding atmosphere and genuine hospitality. The handmade pasta lunch special blew us away. A must-visit whether you're working or catching up with friends.",
    name: "James & Chloe",
    role: "Google Review ★★★★★ · Birmingham Foodies",
    color: "#FFF9DB",
    shape: "wide",
    link: "https://www.google.com/maps/search/?api=1&query=Cafe+Face+519+Bristol+Road+Selly+Oak+Birmingham+B29+6AU",
  },
];

export default function GoogleReviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F8F1E9] relative overflow-hidden">
      {/* Decorative subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C47A43]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFBF7] border border-[#492512]/15 text-[#492512] text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-[#492512]">4.9 / 5.0</span>
            <span className="text-[#7A5038]">· 240+ Google Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#492512] tracking-tight leading-tight mb-4">
            The Wall of Nice Things
          </h2>
          <p className="text-base sm:text-lg text-[#29180F]/75 font-sans leading-relaxed">
            Real notes pinned by our regulars, morning commuters, and weekend brunchers in Selly Oak.
            Click, drag, or swing any note around.
          </p>
        </div>

        {/* Pinfold Interactive Sticky-Note Wall */}
        <div className="w-full h-[640px] sm:h-[720px] lg:h-[780px] rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(73,37,18,0.12)] border border-[rgba(73,37,18,0.12)] bg-[#F4EBE1]">
          <Pinfold
            notes={GOOGLE_REVIEWS}
            heading={{
              show: true,
              title: "Google Reviews ★★★★★",
              subtitle: "4.9 stars from 240+ reviews in Selly Oak. Drag any note around!",
              paper: "#FFFBF7",
              titleColor: "#492512",
              subtitleColor: "#7A5038",
              lean: -2,
            }}
            board={{
              fill: "#F4EBE1",
              texture: true,
              grain: "rgba(73, 37, 18, 0.05)",
              grainSize: 6,
              radius: 24,
              inset: 24,
              frameWidth: 0,
              frameColor: "transparent",
            }}
            spread={{
              columns: 3,
              noteSize: 220,
              scatter: 38,
              lean: 6,
              headroom: 104,
              seed: 12,
            }}
            paper={{
              face: "hand",
              ink: "#29180F",
              roleInk: "#7A5038",
              padding: 20,
              avatar: 0,
              depth: 60,
              corner: 14,
              finish: "paper",
              tooth: 45,
              fibers: true,
              curl: true,
            }}
            fasteners={{
              kind: "pin",
              size: 26,
              first: "#C47A43",
              second: "#492512",
              third: "#D49B55",
              tape: "rgba(255, 255, 255, 0.65)",
            }}
            play={{
              draggable: true,
              swing: true,
              lift: true,
              entrance: true,
              stagger: 0.07,
              breeze: true,
              breezeAngle: 1.2,
              tools: true,
              shuffleText: "Shuffle Notes",
              tidyText: "Tidy Board",
              toolPaper: "#FFFBF7",
              toolInk: "#492512",
            }}
          />
        </div>

        {/* External Link Callout */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFFBF7] border border-[rgba(73,37,18,0.12)] shadow-sm">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#492512]/10 flex items-center justify-center text-[#492512] shrink-0">
              <MessageSquareHeart className="w-5 h-5 text-[#C47A43]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#492512]">Visited Cafe Face recently?</p>
              <p className="text-xs text-[#29180F]/70">We’d love to hear about your coffee and food experience.</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Cafe+Face+519+Bristol+Road+Selly+Oak+Birmingham+B29+6AU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#492512] text-[#FFF9F2] text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:bg-[#351B11] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Leave a Google Review</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
