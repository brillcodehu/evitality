"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    image: "/img/ev-result-1.jpg",
    quote:
      "Évek óta próbálkoztam egyedül, eredmény nélkül. Viktóriával 16 hét alatt nemcsak lefogytam, hanem végre megszerettem a mozgást. Reális tervet kaptam, ami beleférhetett az életembe.",
    name: "Kovács Anita",
    detail: "16 hét edzés",
  },
  {
    image: "/img/ev-result-2.jpg",
    quote:
      "A személyre szabott edzés és a folyamatos visszajelzés mindent megváltoztatott. Erősebb vagyok, mint valaha, és először érzem azt, hogy ez tartós lesz.",
    name: "Tóth Gábor",
    detail: "24 hét edzés",
  },
  {
    image: "/img/ev-cta.jpg",
    quote:
      "Szülés után teljesen elvesztettem a formám és az önbizalmam. Viktória türelmesen, lépésről lépésre vezetett vissza. Ma újra jól érzem magam a bőrömben.",
    name: "Nagy Eszter",
    detail: "20 hét edzés",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const go = (dir: number) =>
    setIndex((p) => (p + dir + testimonials.length) % testimonials.length);

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Eredmények
          </span>
          <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-black sm:text-4xl lg:text-5xl">
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
              className="grid grid-cols-1 items-center gap-0 overflow-hidden shadow-[-1px_3px_19px_-6px_rgba(0,0,0,0.12)] lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-72 w-full object-cover sm:h-96 lg:h-[460px]"
                />
              </div>

              <div className="bg-white p-8 sm:p-12 lg:col-span-7">
                <span className="font-heading text-6xl leading-none text-brand">
                  &ldquo;
                </span>
                <p className="-mt-4 text-lg italic leading-relaxed text-zinc-700 sm:text-xl">
                  {t.quote}
                </p>
                <div className="mt-8 flex items-center gap-5 border-t border-zinc-200 pt-7">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand font-heading text-xl text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-heading text-lg text-black">{t.name}</p>
                    <p className="text-sm font-semibold text-brand">
                      {t.detail}
                    </p>
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
              className="flex size-11 items-center justify-center rounded-full border border-zinc-400 text-black transition-colors hover:border-brand hover:bg-brand hover:text-white"
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
              className="flex size-11 items-center justify-center rounded-full border border-zinc-400 text-black transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
