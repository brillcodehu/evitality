"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const points = [
  "Ingyenes, kötelezettség nélküli első konzultáció",
  "Személyre szabott edzés- és táplálkozási terv",
  "Folyamatos támogatás és haladáskövetés",
];

export function CTASection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="absolute inset-x-6 bottom-0 top-10 rounded-3xl bg-cover bg-center"
              style={{ backgroundImage: "url(/img/background.jpg)" }}
            />
            <img
              src="/img/gorgeous-young.png"
              alt="Nagy Viktória"
              className="relative mx-auto w-full max-w-md drop-shadow-2xl"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Kezdjük el
            </span>
            <h2 className="mt-4 font-heading text-4xl uppercase leading-[1.05] text-black sm:text-5xl lg:text-6xl">
              Készen állsz a<br />
              <span className="text-brand">változásra?</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              Ne halaszd tovább. Egy rövid, ingyenes beszélgetésen átnézzük a
              céljaidat, és megmutatom, hogyan jutsz el oda, lépésről lépésre.
            </p>

            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-zinc-700">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm font-medium">{p}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact">
              <Button className="mt-9 h-14 rounded-none bg-brand px-9 font-heading text-sm uppercase tracking-wide text-white shadow-xl shadow-brand/25 transition-all hover:bg-brand-dark">
                Kérem az ingyenes konzultációt
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
