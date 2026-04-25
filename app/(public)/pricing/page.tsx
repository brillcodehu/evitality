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
    period: "hó",
    description: "Önálló edzéshez szakmai háttérrel",
    features: [
      "Heti edzésterv",
      "Havi 2 személyi edzés",
      "Online chat támogatás",
      "Haladáskövetés app-ban",
      "Általános táplálkozási tippek",
    ],
    notIncluded: [
      "Személyre szabott étrend",
      "Videó forma ellenőrzés",
      "Prioritásos időpontfoglalás",
    ],
    cta: "Választom",
    featured: false,
  },
  {
    name: "Prémium",
    price: "85.000",
    period: "hó",
    description: "A legnépszerűbb csomag komoly eredményekért",
    features: [
      "Személyre szabott edzésterv",
      "Heti 3 személyi edzés",
      "Korlátlan online támogatás",
      "Részletes haladáskövetés",
      "Személyre szabott étrend terv",
      "Heti videó forma ellenőrzés",
      "Prioritásos időpontfoglalás",
    ],
    notIncluded: [],
    cta: "Választom",
    featured: true,
  },
  {
    name: "VIP",
    price: "150.000",
    period: "hó",
    description: "Maximális figyelem és támogatás",
    features: [
      "Teljesen egyedi edzésterv",
      "Korlátlan személyi edzés",
      "0-24 elérhető támogatás",
      "Részletes haladáskövetés",
      "Personalizált étrend + receptek",
      "Napi videó forma ellenőrzés",
      "VIP időpontfoglalás",
      "Havi testösszetétel mérés",
      "Supplement tanácsadás",
    ],
    notIncluded: [],
    cta: "Választom",
    featured: false,
  },
];

const faqs = [
  {
    q: "Lehet-e csomagot váltani később?",
    a: "Igen, bármikor válthatsz magasabb vagy alacsonyabb csomagra. A különbözetet arányosítva számoljuk.",
  },
  {
    q: "Van-e elkötelezettség?",
    a: "Nincs hosszú távú szerződés. Havi előfizetés, amit bármikor lemondhatsz 30 napos felmondási idővel.",
  },
  {
    q: "Mi történik ha le kell mondanom egy edzést?",
    a: "24 órával az edzés előtt ingyenesen lemondhatod. Későbbi lemondás esetén az alkalom elvész.",
  },
  {
    q: "Hogy néz ki az első konzultáció?",
    a: "45 perces ingyenes beszélgetés, ahol megismerjük a céljaidat, felmérjük az állapotodat és kialakítjuk a tervet.",
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
              Árak
            </Badge>
            <h1 className="text-4xl md:text-6xl font-[var(--font-archivo)] font-black text-white mb-6">
              Átlátható Árak,{" "}
              <span className="text-lime">Rejtett Költségek Nélkül</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Válaszd ki a hozzád legjobban illő csomagot. Minden csomag
              tartalmazza a mobilalkalmazás hozzáférést.
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
                        Népszerű
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
              Gyakran Ismételt Kérdések
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
