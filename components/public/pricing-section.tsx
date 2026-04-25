"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const plans = [
  {
    name: "Alap",
    price: "29 900",
    period: "Ft / hó",
    description: "Tökéletes kezdőknek, akik szeretnék megtenni az első lépést.",
    features: [
      "Heti 2 személyi edzés",
      "Alap edzésterv",
      "Havi eredménymérés",
      "E-mail támogatás",
      "Gyakorlat videótár hozzáférés",
    ],
    featured: false,
    cta: "Kezdjük El",
  },
  {
    name: "Prémium",
    price: "49 900",
    period: "Ft / hó",
    description:
      "A legnépszerűbb csomag komolyabb célokkal rendelkezők számára.",
    features: [
      "Heti 3 személyi edzés",
      "Személyre szabott edzésterv",
      "Táplálkozási tanácsadás",
      "Heti eredménykövetés",
      "24/7 chat támogatás",
      "Havi testösszetétel mérés",
      "Receptkönyv hozzáférés",
    ],
    featured: true,
    cta: "Csatlakozom",
  },
  {
    name: "VIP",
    price: "89 900",
    period: "Ft / hó",
    description: "Az all-inclusive élmény maximális odafigyeléssel és luxussal.",
    features: [
      "Korlátlan személyi edzés",
      "Komplex edzés- és étrend terv",
      "Heti videóhívás coaching",
      "Napi chat támogatás",
      "Heti testösszetétel mérés",
      "Supplement tanácsadás",
      "Prioritásos időpontfoglalás",
      "Vendég jegy havi 2x",
    ],
    featured: false,
    cta: "VIP Leszek",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function PricingSection() {
  return (
    <section id="arak" className="relative bg-zinc-950 py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 size-[500px] rounded-full bg-lime/5 blur-[120px]" />
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
            Befektetés önmagadba
          </span>
          <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
            Csomagok és Árak
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-lime" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Átlátható árazás, rejtett költségek nélkül. Válaszd ki a hozzád
            leginkább passzoló csomagot.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariant}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-lime bg-zinc-900 shadow-2xl shadow-lime/10 scale-[1.02] lg:scale-105"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-lime text-zinc-950 font-semibold px-4 py-1 text-xs rounded-full">
                    Népszerű
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="font-heading text-xl text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-heading text-4xl text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-500">{plan.period}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15">
                      <Check className="size-3 text-lime" />
                    </div>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/dashboard/bookings">
                  <Button
                    className={`w-full rounded-full h-11 text-base font-semibold ${
                      plan.featured
                        ? "bg-lime text-zinc-950 hover:bg-lime-dark shadow-lg shadow-lime/20"
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-zinc-500"
        >
          Minden csomag hűségszerződés nélkül, bármikor lemondható.
          Első alkalom ingyenes konzultáció!
        </motion.p>
      </div>
    </section>
  );
}
