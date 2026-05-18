"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SamButton } from "@/components/public/hero";

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Photo collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto h-[460px] w-full max-w-[460px] sm:h-[540px]"
          >
            {/* Main photo */}
            <img
              src="/img/ev-about-2.jpg"
              alt="Nagy Viktória edzés közben"
              className="absolute right-0 top-0 h-[78%] w-[68%] rounded-2xl object-cover shadow-xl"
            />
            {/* Square top-left, white border */}
            <img
              src="/img/ev-about-1.jpg"
              alt="Nagy Viktória portré"
              className="absolute left-0 top-[14%] size-[42%] rounded-2xl border-[12px] border-white object-cover shadow-2xl"
            />
            {/* Square bottom, white border */}
            <img
              src="/img/ev-about-3.jpg"
              alt="Edzés a teremben"
              className="absolute bottom-0 left-[20%] size-[44%] rounded-2xl border-[12px] border-white object-cover shadow-2xl"
            />
            {/* Experience badge */}
            <span className="absolute -right-2 bottom-[18%] z-10 rounded-2xl rounded-bl-none bg-brand px-5 py-3 text-center font-heading text-white shadow-lg">
              <span className="block text-3xl leading-none">8+</span>
              <span className="text-[10px] uppercase tracking-wider">
                év tapasztalat
              </span>
            </span>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Decorative white-on-brand vertical bar */}
            <span className="absolute -left-4 -top-6 hidden h-40 w-8 bg-brand/15 lg:block" />
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Rólam
            </span>
            <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-black sm:text-4xl lg:text-5xl">
              Szia! Nagy
              <br />
              Viktória vagyok
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              Okleveles személyi edző és táplálkozási tanácsadó vagyok
              Debrecenben. Több mint nyolc éve segítek embereknek
              visszanyerni az energiájukat, formába lendülni és megszeretni a
              mozgást, fenntartható módon.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              Nálam nincs általános recept. Minden tervet a te céljaidra és az
              életritmusodra szabok, hogy az eredmény ne csak látszódjon, hanem
              ki is tartson.
            </p>
            <Link href="/about">
              <SamButton className="mt-9">Tudj meg többet</SamButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
