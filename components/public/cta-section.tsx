"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { SamButton } from "@/components/public/hero";

const points = [
  "Ingyenes, kötelezettség nélküli első konzultáció",
  "Személyre szabott edzés- és táplálkozási terv",
  "Folyamatos támogatás és haladáskövetés",
];

export function CTASection() {
  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image with decorative background */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              className="absolute -inset-x-6 inset-y-10 -z-0 rounded-3xl bg-cover bg-center opacity-90"
              style={{ backgroundImage: "url(/img/background.jpg)" }}
            />
            <img
              src="/img/ev-cta.jpg"
              alt="Nagy Viktória"
              className="relative z-10 w-full rounded-3xl rounded-bl-none object-cover shadow-2xl"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:pl-6"
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
            <p className="mt-6 font-heading text-lg text-black">
              Soha többé unalmas edzésterv!
            </p>

            <ul className="mt-6 space-y-3">
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
              <SamButton className="mt-9">Kérem az ingyenes konzultációt</SamButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
