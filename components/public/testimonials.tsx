"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kovács Anna",
    badge: "-18 kg / 5 hónap",
    rating: 5,
    text: "Az eVitality teljesen megváltoztatta az életem. Nem csak a kilókat adtam le, hanem egy teljesen új szemléletet kaptam az egészséges életmóddal kapcsolatban. A személyre szabott edzésterv és a folyamatos motiváció nélkülözhetetlen volt.",
    initials: "KA",
  },
  {
    name: "Szabó Péter",
    badge: "+12 kg izom / 8 hónap",
    rating: 5,
    text: "Évekig jártam edzőterembe eredmény nélkül. Az eVitality-vel végre megértettem, mit csinálok rosszul. A táplálkozási tanácsadás és a precíz edzésterv meghozta az áttörést, amire vártam.",
    initials: "SP",
  },
  {
    name: "Tóth Réka",
    badge: "-25 kg / 10 hónap",
    rating: 5,
    text: "Szülés után azt hittem, sosem nyerem vissza régi formám. Az online coaching rugalmassága tökéletesen illett az élethelyzetemhez. Ma jobban érzem magam, mint valaha, és sokkal több energiám van a gyerekekkel.",
    initials: "TR",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Testimonials() {
  return (
    <section className="relative bg-zinc-900 py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-lime/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-lime">
            Visszajelzések
          </span>
          <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
            Amit Az Ügyfeleim Mondanak
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-lime" />
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariant}
              className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700"
            >
              {/* Quote icon */}
              <Quote className="mb-4 size-8 text-lime/20" />

              {/* Text */}
              <p className="flex-1 text-sm leading-relaxed text-zinc-400">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Rating */}
              <div className="mt-6 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-lime text-lime"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3 border-t border-zinc-800 pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-lime/15 font-heading text-sm text-lime">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="mt-0.5 inline-flex rounded-full bg-lime/10 px-2.5 py-0.5 text-xs font-medium text-lime">
                    {testimonial.badge}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
