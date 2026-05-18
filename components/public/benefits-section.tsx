"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    title: "Táplálkozási stratégia",
    text: "Nem diéta, hanem fenntartható étkezési rendszer, ami illik az életedhez.",
  },
  {
    title: "Edzésrutinok",
    text: "Személyre szabott gyakorlatok a te szintedhez, folyamatos progresszióval.",
  },
  {
    title: "Egyéni támogatás",
    text: "Végig melletted vagyok kérdésekkel, motivációval és visszajelzéssel.",
  },
  {
    title: "Szakértői háttér",
    text: "Bizonyított módszerek és nyolc év terepi tapasztalat, nem féligazságok.",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-white pb-20 lg:pb-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Miért érdemes
          </span>
          <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-black sm:text-4xl lg:text-5xl">
            A személyi edzés előnyei
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative ml-8 border-2 border-white bg-white p-9 shadow-[2px_31px_61px_-14px_rgba(0,0,0,0.14)]"
            >
              <h3 className="-ml-20 mb-5 block border-b-2 border-r-2 border-brand bg-white p-3 font-heading text-lg leading-snug text-black transition-colors hover:bg-black hover:text-white">
                {b.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-zinc-600">
                {b.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
