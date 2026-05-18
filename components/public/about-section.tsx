"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto h-[480px] w-full max-w-md sm:h-[560px]"
          >
            <img
              src="/img/Photo.jpg"
              alt="Nagy Viktória edzés közben"
              className="absolute left-0 top-0 h-[70%] w-[70%] rounded-2xl object-cover shadow-xl"
            />
            <img
              src="/img/Photo-3.jpg"
              alt="Edzés a teremben"
              className="absolute bottom-0 right-0 h-[55%] w-[55%] rounded-2xl border-8 border-white object-cover shadow-2xl"
            />
            <img
              src="/img/Photo-4.jpg"
              alt="Személyi edzés"
              className="absolute bottom-[8%] left-[6%] hidden h-[32%] w-[38%] rounded-2xl border-8 border-white object-cover shadow-2xl sm:block"
            />
            <span className="absolute -right-3 top-[8%] hidden rounded-full bg-brand px-5 py-3 text-center font-heading text-white shadow-lg sm:block">
              <span className="block text-2xl leading-none">8+</span>
              <span className="text-[10px] uppercase tracking-wider">év tapasztalat</span>
            </span>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Rólam
            </span>
            <h2 className="mt-4 font-heading text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
              Szia! Nagy Viktória
              <br />
              vagyok
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              Okleveles személyi edző és táplálkozási tanácsadó vagyok
              Debrecenben. Több mint nyolc éve segítek embereknek abban, hogy
              visszanyerjék az energiájukat, formába lendüljenek és
              megszeressék a mozgást, fenntartható módon.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              Nálam nincs általános recept. Minden tervet a te céljaidra, az
              életritmusodra és a tested adottságaira szabok, hogy az eredmény
              ne csak látszódjon, hanem ki is tartson.
            </p>
            <Link href="/about">
              <Button className="mt-8 h-13 rounded-none bg-black px-8 py-4 font-heading text-sm uppercase tracking-wide text-white transition-colors hover:bg-brand">
                Tudj meg többet
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
