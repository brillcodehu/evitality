"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { value: "3", label: "Szakképesítés" },
  { value: "8", label: "Év tapasztalat" },
  { value: "150+", label: "Elégedett ügyfél" },
];

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="kezdolap"
      className="relative bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url(/img/blur.png)" }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8 lg:pt-44">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          {/* LEFT: heading + button + girl image */}
          <div className="relative lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-xl"
            >
              <h1 className="font-heading text-4xl uppercase leading-[1.08] text-black sm:text-5xl lg:text-6xl xl:text-[68px]">
                Építsd fel az
                <br />
                egészséges
                <br />
                <span className="text-brand">önmagad</span>
              </h1>
              <p className="mt-7 max-w-md text-base leading-relaxed text-zinc-600 sm:text-lg">
                Személyre szabott edzés és táplálkozás Debrecenben. Tedd meg az
                első lépést egy ingyenes konzultációval, a többi az enyém.
              </p>
              <Link href="/contact">
                <SamButton className="mt-9">Foglalj most</SamButton>
              </Link>
            </motion.div>

            {/* Girl image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative z-0 mx-auto mt-8 w-full max-w-sm sm:max-w-md lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[58%] lg:max-w-none"
            >
              <div className="absolute -inset-3 -z-10 rounded-[2.5rem] rounded-bl-none bg-brand/15" />
              <img
                src="/img/ev-hero.jpg"
                alt="Nagy Viktória személyi edző"
                className="w-full rounded-[2.5rem] rounded-bl-none object-cover shadow-2xl"
              />
            </motion.div>
          </div>

          {/* RIGHT: quote card + video */}
          <div className="space-y-6 lg:col-span-4 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[2rem] rounded-bl-none border-2 border-white bg-white/40 p-7 backdrop-blur-md"
            >
              <span className="font-heading text-5xl leading-none text-brand">
                &ldquo;
              </span>
              <p className="-mt-3 text-base italic leading-relaxed text-black">
                Nem a tökéletes testről szól. Arról, hogy erősebb,
                magabiztosabb és energikusabb legyél, mint valaha.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/img/ev-video.jpg"
                  alt="Bemutatkozó videó"
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  aria-label="Videó lejátszása"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex size-14 items-center justify-center rounded-full border border-white/60 bg-white/30 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 size-5 fill-current" />
                  </span>
                </button>
              </div>
              <h4 className="mt-4 font-heading text-lg text-black">
                Maradj egészséges aktívan
              </h4>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-black/70">
                Ismerd meg a módszeremet, és lásd, hogyan érhetsz el tartós
                eredményt élvezhető edzésekkel.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Funfact glass bar */}
        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mt-14 grid w-full grid-cols-3 items-center gap-4 rounded-2xl border border-white bg-white/55 p-8 shadow-[1px_6px_38px_6px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-12 lg:w-[85%]"
        >
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={`text-center ${
                i !== stats.length - 1
                  ? "lg:border-r lg:border-zinc-400/50"
                  : ""
              }`}
            >
              <div className="font-sans text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                {stat.value.replace("+", "")}
                <span className="text-brand">{stat.value.includes("+") ? "+" : ""}</span>
              </div>
              <p className="mx-auto mt-2 max-w-[10rem] text-xs font-bold uppercase tracking-wide text-zinc-500 sm:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="h-16 lg:h-24" />

      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
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

/** Samantha-stílusú gomb: piros háttér, fehér uppercase, hover fekete átúszás */
export function SamButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      className={`group relative h-auto overflow-hidden rounded-none bg-brand px-10 py-[18px] font-heading text-sm uppercase tracking-wide text-white hover:bg-brand ${className}`}
    >
      <span className="absolute inset-0 -z-0 w-0 bg-black transition-all duration-300 group-hover:w-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Button>
  );
}
