"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Elégedett ügyfél" },
  { value: "8+", label: "Év tapasztalat" },
  { value: "98%", label: "Elégedettség" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section
      id="kezdolap"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-zinc-900"
    >
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-lime/8 blur-[120px]" />
        <div className="absolute top-1/2 -left-60 size-[500px] rounded-full bg-lime/5 blur-[100px]" />
        <div className="absolute -bottom-20 right-1/3 size-[400px] rounded-full bg-emerald-500/5 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/10 px-4 py-1.5 text-xs font-medium text-lime backdrop-blur-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-lime" />
              Új ügyfeleknek ingyenes konzultáció
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="font-heading text-5xl leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Alakítsd Át
            <br />
            <span className="text-lime">Az Életed</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            Személyre szabott edzéstervek, professzionális coaching és
            táplálkozási tanácsadás. Tedd meg az első lépést az egészségesebb,
            erősebb változatod felé.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="#idopontfoglalas">
              <Button className="h-12 rounded-full bg-lime px-8 text-base font-bold text-zinc-950 shadow-lg shadow-lime/20 transition-all hover:bg-lime-dark hover:shadow-xl hover:shadow-lime/30">
                Ingyenes Konzultáció
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Link href="#szolgaltatasok">
              <Button
                variant="outline"
                className="h-12 rounded-full border-zinc-700 px-8 text-base text-zinc-300 hover:border-zinc-500 hover:bg-white/5 hover:text-white"
              >
                Tudj Meg Többet
                <ChevronDown className="ml-2 size-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md transition-all hover:border-lime/20 hover:bg-white/[0.07]"
              >
                <div className="font-heading text-3xl text-lime sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          className="flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-xs uppercase tracking-widest">Görgess</span>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
