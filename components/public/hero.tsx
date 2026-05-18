"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { value: "3", label: "Szakképesítés" },
  { value: "8", label: "Év tapasztalat" },
  { value: "150", suffix: "+", label: "Elégedett ügyfél" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="kezdolap"
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat pt-28 lg:pt-36"
      style={{ backgroundImage: "url(/img/blur.png)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
        >
          {/* Left: heading + girl image */}
          <div className="relative lg:col-span-8">
            <motion.div variants={item} className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                Személyi edző · Debrecen
              </span>
              <h1 className="mt-6 font-heading text-4xl uppercase leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl xl:text-7xl">
                Építsd fel az erős,
                <br />
                egészséges <span className="text-brand">önmagad</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-600 sm:text-lg">
                Személyre szabott edzés, táplálkozási tanácsadás és valódi
                motiváció. Tedd meg az első lépést még ma egy ingyenes
                konzultációval.
              </p>
              <Link href="/contact">
                <Button className="mt-8 h-14 rounded-none bg-brand px-9 font-heading text-sm uppercase tracking-wide text-white shadow-xl shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-2xl hover:shadow-brand/30">
                  Foglalj időpontot
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Girl image */}
            <motion.img
              variants={item}
              src="/img/Photo-1.png"
              alt="Nagy Viktória személyi edző"
              className="pointer-events-none mx-auto mt-[-2rem] w-[78%] max-w-xl drop-shadow-2xl sm:w-[60%] lg:absolute lg:bottom-0 lg:right-[-4%] lg:mt-0 lg:w-[52%]"
            />
          </div>

          {/* Right: quote + video */}
          <div className="space-y-6 lg:col-span-4">
            <motion.div
              variants={item}
              className="rounded-2xl border border-white/60 bg-white/70 p-6 backdrop-blur-md"
            >
              <Quote className="size-7 text-brand" />
              <p className="mt-3 text-[15px] font-medium italic leading-relaxed text-zinc-700">
                „Nem a tökéletes testről szól. Arról szól, hogy erősebb, magabiztosabb
                és energikusabb legyél, mint valaha."
              </p>
            </motion.div>

            <motion.div variants={item} className="group relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/img/Video-Player.jpg"
                  alt="Bemutatkozó videó"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  aria-label="Videó lejátszása"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform group-hover:scale-110">
                    <Play className="ml-1 size-6 fill-current" />
                  </span>
                </button>
              </div>
              <h4 className="mt-4 font-heading text-lg text-black">
                Maradj egészséges aktívan
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                Ismerd meg a módszeremet, és lásd, hogyan érhetsz el tartós
                eredményt élvezhető edzésekkel.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Funfact glass bar */}
        <motion.ul
          variants={item}
          initial="hidden"
          animate="show"
          className="relative z-20 mx-auto -mb-12 mt-10 grid max-w-4xl grid-cols-3 gap-4 rounded-2xl border border-white/70 bg-white/70 p-8 shadow-[1px_6px_38px_6px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-10"
        >
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="border-zinc-300 text-center [&:not(:last-child)]:border-r"
            >
              <div className="font-heading text-4xl text-black sm:text-5xl lg:text-6xl">
                {stat.value}
                <span className="text-brand">{stat.suffix ?? ""}</span>
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-500 sm:text-sm">
                {stat.label}
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="h-16" />

      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="aspect-video w-full max-w-4xl">
            <iframe
              className="size-full rounded-xl"
              src="https://www.youtube.com/embed/Vr3h5X9kmUo?autoplay=1"
              title="Bemutatkozó videó"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
