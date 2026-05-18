"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    before: "/img/slider-2.jpg",
    after: "/img/slider-1.jpg",
    avatar: "/img/slider-na-1.jpg",
    quote:
      "Évek óta próbálkoztam egyedül, eredmény nélkül. Viktóriával 16 hét alatt nemcsak lefogytam, hanem végre megszerettem a mozgást. Reális tervet kaptam, ami beleférhetett az életembe.",
    name: "Kovács Anita",
    detail: "16 hét · -12 kg",
  },
  {
    before: "/img/slider-2.jpg",
    after: "/img/slider-3.jpg",
    avatar: "/img/slider-na-2.png",
    quote:
      "A személyre szabott edzés és a folyamatos visszajelzés mindent megváltoztatott. Erősebb vagyok, mint valaha, és először érzem azt, hogy ez tartós lesz.",
    name: "Tóth Gábor",
    detail: "24 hét · +8 kg izom",
  },
  {
    before: "/img/slider-2.jpg",
    after: "/img/slider-1.jpg",
    avatar: "/img/slider-na-1.png",
    quote:
      "Szülés után teljesen elvesztettem a formám és az önbizalmam. Viktória türelmesen, lépésről lépésre vezetett vissza. Ma újra jól érzem magam a bőrömben.",
    name: "Nagy Eszter",
    detail: "20 hét · alakformálás",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const go = (dir: number) =>
    setIndex(
      (prev) => (prev + dir + testimonials.length) % testimonials.length
    );

  return (
    <section className="bg-zinc-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Eredmények
          </span>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
            Valódi emberek. Valódi eredmények.
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Nem retusált csodák, hanem következetes munka és személyes
            támogatás eredménye.
          </p>
        </div>

        <div className="relative mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
            >
              {/* Before / after */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: t.before, label: "Előtte" },
                  { src: t.after, label: "Utána" },
                ].map((img) => (
                  <div
                    key={img.label}
                    className="relative overflow-hidden rounded-2xl shadow-lg"
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="h-80 w-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
                      {img.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div>
                <Quote className="size-10 text-brand" />
                <p className="mt-5 text-lg leading-relaxed text-zinc-700 sm:text-xl">
                  {t.quote}
                </p>
                <div className="mt-7 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="size-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading text-lg text-black">{t.name}</p>
                    <p className="text-sm font-medium text-brand">{t.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Előző"
              className="flex size-12 items-center justify-center rounded-full border border-zinc-300 text-black transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}. vélemény`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-brand" : "w-2 bg-zinc-300"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Következő"
              className="flex size-12 items-center justify-center rounded-full border border-zinc-300 text-black transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
