"use client";

import { motion } from "framer-motion";
import { Salad, Dumbbell, HeartHandshake, BadgeCheck } from "lucide-react";

const benefits = [
  {
    icon: Salad,
    title: "Táplálkozási stratégia",
    text: "Nem diéta, hanem egy fenntartható étkezési rendszer, ami illik az életedhez és a céljaidhoz.",
  },
  {
    icon: Dumbbell,
    title: "Személyre szabott edzés",
    text: "Minden gyakorlat a te szintedhez és adottságaidhoz igazítva, folyamatos progresszióval.",
  },
  {
    icon: HeartHandshake,
    title: "Egyéni támogatás",
    text: "Végig melletted vagyok, kérdésekkel, motivációval és visszajelzéssel, hogy ne add fel.",
  },
  {
    icon: BadgeCheck,
    title: "Szakértői háttér",
    text: "Bizonyított módszerek és nyolc év terepi tapasztalat, nem internetes féligazságok.",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-zinc-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Miért érdemes
          </span>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
            A személyi edzés előnyei
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:-translate-y-2 hover:border-brand hover:shadow-xl"
            >
              <span className="flex size-14 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <b.icon className="size-7" />
              </span>
              <h3 className="mt-6 font-heading text-xl text-black">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {b.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
