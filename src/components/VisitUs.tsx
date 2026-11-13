"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { CAFE_INFO } from "@/data/menuData";

// Zod validation schema for table/catering/event inquiry
const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid telephone number"),
  inquiryType: z.enum(["table", "catering", "private-event", "general"]),
  message: z.string().min(10, "Please leave a message with at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function VisitUs() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: "table",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // In production this can post to Supabase or an API route
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Inquiry submitted:", data);
    setSubmitted(true);
    reset();
  };

  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday ...
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = days[todayIndex];

  return (
    <section
      id="visit"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-cream noise-overlay border-t border-latte/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vanilla border border-latte/60 shadow-soft text-xs font-sans tracking-wide text-terracotta uppercase mb-4"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Selly Oak, Birmingham</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-espresso leading-tight"
          >
            Your next coffee stop.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-espresso/75 font-sans"
          >
            Drop by for your morning brew, grab a Mediterranean flatbread box between
            lectures, or settle in with a friend. We’re right on Bristol Road.
          </motion.p>
        </div>

        {/* 2-Column Main Layout: Location & Hours on Left, Form & Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Address, Quick Contact & Opening Hours */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Address & Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] bg-vanilla border border-latte/50 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-espresso text-vanilla flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-espresso">
                    Cafe Face
                  </h3>
                  <span className="text-xs text-espresso/60 font-sans">
                    Independent Café · Selly Oak
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-espresso/80 font-sans leading-relaxed">
                519 Bristol Road
                <br />
                Selly Oak, Birmingham
                <br />
                <span className="font-semibold text-espresso">B29 6AU</span>,
                United Kingdom
              </p>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-latte/30 flex flex-wrap gap-3">
                <a
                  href={CAFE_INFO.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-espresso text-vanilla text-xs sm:text-sm font-sans font-medium shadow-pill hover:bg-terracotta transition-all duration-300 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${CAFE_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cream text-espresso border border-latte/50 text-xs sm:text-sm font-sans font-medium shadow-soft hover:border-terracotta transition-all duration-300 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-terracotta" />
                  <span>{CAFE_INFO.phone}</span>
                </a>
              </div>
            </motion.div>

            {/* Opening Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-8 rounded-[32px] bg-vanilla border border-latte/50 shadow-soft"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-terracotta" />
                  <h3 className="font-serif text-xl font-semibold text-espresso">
                    Opening Hours
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Today
                </span>
              </div>

              <div className="space-y-3 font-sans">
                {CAFE_INFO.openingHours.map((schedule) => {
                  const isCurrent = schedule.day === currentDayName;
                  return (
                    <div
                      key={schedule.day}
                      className={`flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-xl transition-colors ${
                        isCurrent
                          ? "bg-cream font-bold text-espresso border border-latte/40"
                          : "text-espresso/75"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {schedule.day}
                        {isCurrent && (
                          <span className="text-[10px] uppercase tracking-wider text-terracotta font-semibold">
                            (Today)
                          </span>
                        )}
                      </span>
                      <span>{schedule.hours}</span>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 pt-4 border-t border-latte/30 text-[11px] text-espresso/60 font-sans">
                *Kitchen serves full breakfast & flatbread boxes daily until close.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Stylized Map Card & Inquiry Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Stylized Map View Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[32px] overflow-hidden bg-espresso text-cream shadow-deep border border-latte/30 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Background Map Atmosphere Pattern */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #D7BDA5 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
                    Neighborhood Anchor
                  </span>
                  <h4 className="font-serif text-2xl text-vanilla mt-1">
                    Heart of Selly Oak
                  </h4>
                  <p className="text-xs text-latte max-w-sm mt-1">
                    Just minutes from the University of Birmingham campus,
                    Selly Oak train station, and Queen Elizabeth Hospital.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <MapPin className="w-6 h-6 text-terracotta animate-bounce" />
                </div>
              </div>

              {/* Map Coordinates & Direct Link */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-xs text-latte">
                  52.4432° N, 1.9366° W
                </div>
                <a
                  href={CAFE_INFO.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-vanilla font-medium hover:text-terracotta transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Inquiries & Pre-order Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-8 rounded-[32px] bg-vanilla border border-latte/50 shadow-soft"
            >
              <div className="mb-6">
                <span className="font-hand text-terracotta text-lg block">
                  Get in touch
                </span>
                <h3 className="font-serif text-2xl text-espresso font-semibold">
                  Reserve a Table or Inquire for Catering
                </h3>
                <p className="text-xs sm:text-sm text-espresso/70 font-sans mt-1">
                  Have a question, large group booking, or catering request? Send us a note.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-3" />
                  <h4 className="font-serif text-xl font-bold text-emerald-900">
                    Thank you for reaching out!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 font-sans mt-1 max-w-sm">
                    Our team at Cafe Face will review your message and get back
                    to you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 px-6 py-2 rounded-full bg-espresso text-vanilla text-xs font-sans hover:bg-terracotta transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-espresso/80 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-latte/50 text-xs sm:text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta transition-colors"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-espresso/80 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-latte/50 text-xs sm:text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta transition-colors"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-espresso/80 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="07123 456789"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-latte/50 text-xs sm:text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-espresso/80 mb-1">
                        Inquiry Type
                      </label>
                      <select
                        {...register("inquiryType")}
                        className="w-full px-4 py-2.5 rounded-xl bg-cream border border-latte/50 text-xs sm:text-sm text-espresso focus:outline-none focus:border-terracotta transition-colors"
                      >
                        <option value="table">Table Reservation (4+ guests)</option>
                        <option value="catering">Office / Event Catering</option>
                        <option value="private-event">Private Hire</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-espresso/80 mb-1">
                      Message & Preferred Date/Time *
                    </label>
                    <textarea
                      rows={3}
                      {...register("message")}
                      placeholder="Tell us about your party size, date, or specific culinary requests..."
                      className="w-full px-4 py-2.5 rounded-xl bg-cream border border-latte/50 text-xs sm:text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta transition-colors"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-espresso text-vanilla text-sm font-medium shadow-pill hover:bg-terracotta transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
