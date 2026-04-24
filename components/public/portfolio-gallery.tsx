"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, ArrowRight } from "lucide-react";

const transformations = [
  {
    name: "Kovács Dávid",
    duration: "6 hónap",
    weightChange: "-22 kg",
    beforeGradient: "from-zinc-700 to-zinc-600",
    afterGradient: "from-lime/40 to-emerald-500/40",
    description: "Irodai munkás, célzott zsírégetés",
  },
  {
    name: "Nagy Eszter",
    duration: "4 hónap",
    weightChange: "-15 kg",
    beforeGradient: "from-zinc-600 to-zinc-500",
    afterGradient: "from-lime/30 to-teal-500/30",
    description: "Kismama visszatérés, testformálás",
  },
  {
    name: "Fehér Tamás",
    duration: "8 hónap",
    weightChange: "+8 kg izom",
    beforeGradient: "from-zinc-700 to-zinc-500",
    afterGradient: "from-lime/35 to-emerald-400/35",
    description: "Izomépítés, erőnövelés",
  },
  {
    name: "Varga Lilla",
    duration: "5 hónap",
    weightChange: "-19 kg",
    beforeGradient: "from-zinc-600 to-zinc-400",
    afterGradient: "from-lime/25 to-green-500/25",
    description: "Teljes életmódváltás program",
  },
  {
    name: "Horváth Márk",
    duration: "10 hónap",
    weightChange: "-35 kg",
    beforeGradient: "from-zinc-700 to-zinc-600",
    afterGradient: "from-lime/30 to-emerald-500/30",
    description: "Extrém fogyás coaching",
  },
  {
    name: "Kiss Boglárka",
    duration: "3 hónap",
    weightChange: "-9 kg",
    beforeGradient: "from-zinc-500 to-zinc-400",
    afterGradient: "from-lime/35 to-teal-400/35",
    description: "Nyári forma program",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function PortfolioGallery() {
  return (
    <section className="relative bg-zinc-950 py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 size-[400px] -translate-y-1/2 rounded-full bg-lime/5 blur-[100px]" />
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
            Eredmények
          </span>
          <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
            Előtte-Utána Eredmények
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-lime" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Valódi emberek, valódi eredmények. Nézd meg, mit értek el az
            ügyfeleim kitartással és a megfelelő módszerrel.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {transformations.map((item) => (
            <motion.div
              key={item.name}
              variants={cardVariant}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-lime/20"
            >
              {/* Before / After split */}
              <div className="relative flex h-48 overflow-hidden">
                <div
                  className={`flex w-1/2 items-center justify-center bg-gradient-to-br ${item.beforeGradient}`}
                >
                  <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    Előtte
                  </span>
                </div>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
                <div
                  className={`flex w-1/2 items-center justify-center bg-gradient-to-br ${item.afterGradient}`}
                >
                  <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    Utána
                  </span>
                </div>
                {/* Overlay arrow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-lime text-zinc-950 shadow-lg">
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-heading text-base text-white">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <TrendingDown className="size-3.5 text-lime" />
                    <span className="font-semibold text-lime">
                      {item.weightChange}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                    <Clock className="size-3.5" />
                    <span>{item.duration}</span>
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
