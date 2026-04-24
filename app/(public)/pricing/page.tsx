"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Alap",
    price: "45.000",
    period: "ho",
    description: "Onallo edzeshez szakmai hatterrel",
    features: [
      "Heti edzesterv",
      "Havi 2 szemelyi edzes",
      "Online chat tamogatas",
      "Haladaskovetes app-ban",
      "Altalanos taplalkozasi tippek",
    ],
    notIncluded: [
      "Szemelyre szabott etrend",
      "Video forma ellenorzes",
      "Prioritasos idopontfoglalas",
    ],
    cta: "Valasztom",
    featured: false,
  },
  {
    name: "Premium",
    price: "85.000",
    period: "ho",
    description: "A legnepszerubb csomag komoly eredmenyekert",
    features: [
      "Szemelyre szabott edzesterv",
      "Heti 3 szemelyi edzes",
      "Korlátlan online tamogatas",
      "Reszletes haladaskovetes",
      "Szemelyre szabott etrend terv",
      "Heti video forma ellenorzes",
      "Prioritasos idopontfoglalas",
    ],
    notIncluded: [],
    cta: "Valasztom",
    featured: true,
  },
  {
    name: "VIP",
    price: "150.000",
    period: "ho",
    description: "Maximalis figyelem es tamogatas",
    features: [
      "Teljesen egyedi edzesterv",
      "Korlátlan szemelyi edzes",
      "0-24 elerheto tamogatas",
      "Reszletes haladaskovetes",
      "Personalizalt etrend + receptek",
      "Napi video forma ellenorzes",
      "VIP idopontfoglalas",
      "Havi testosszetétel meres",
      "Supplement tanacsadas",
    ],
    notIncluded: [],
    cta: "Valasztom",
    featured: false,
  },
];

const faqs = [
  {
    q: "Lehet-e csomagot valtani kesobb?",
    a: "Igen, barmikor valthatsz magasabb vagy alacsonyabb csomagra. A kulonbozet aranyositva szamoljuk.",
  },
  {
    q: "Van-e elkotelezettseg?",
    a: "Nincs hosszu tavu szerzodes. Havi elofizetes, amit barmikor lemondhatsz 30 napos felmondasi idovel.",
  },
  {
    q: "Mi tortenik ha le kell mondanom egy edzest?",
    a: "24 oraval az edzes elott ingyenesen lemondhatod. Kesobbi lemondas eseten az alkalom elvesz.",
  },
  {
    q: "Hogy nez ki az elso konzultacio?",
    a: "45 perces ingyenes beszelgetes, ahol megismerjuk a celjaidat, felmerjuk az allapotodat es kialakitjuk a tervet.",
  },
];

export default function PricingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-lime/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-lime/10 text-lime border-lime/20 mb-4">
              Arak
            </Badge>
            <h1 className="text-4xl md:text-6xl font-[var(--font-archivo)] font-black text-white mb-6">
              Atlathatoo Arak,{" "}
              <span className="text-lime">Rejtett Koltsegek Nelkul</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Valaszd ki a hozzad legjobban illo csomagot. Minden csomag
              tartalmazza a mobilalkalmazas hozzaferest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card
                  className={`h-full relative ${
                    plan.featured
                      ? "border-2 border-lime shadow-xl shadow-lime/10 scale-105"
                      : "border-zinc-200"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-lime text-zinc-900 font-semibold px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Nepszeru
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2 pt-8">
                    <h3 className="text-xl font-bold text-zinc-900">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-zinc-500">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-[var(--font-archivo)] font-black text-zinc-900">
                        {plan.price}
                      </span>
                      <span className="text-zinc-500 ml-1">
                        Ft / {plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                          <span className="text-zinc-700">{feature}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm opacity-40"
                        >
                          <Check className="w-4 h-4 shrink-0 mt-0.5" />
                          <span className="text-zinc-400 line-through">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/register" className="block">
                      <Button
                        className={`w-full font-semibold ${
                          plan.featured
                            ? "bg-lime text-zinc-900 hover:bg-lime-dark"
                            : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }`}
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-[var(--font-archivo)] font-black text-zinc-900 mb-4">
              Gyakran Ismetelt Kerdesek
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-zinc-600">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
