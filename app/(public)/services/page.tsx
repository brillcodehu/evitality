"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  Monitor,
  Users,
  Apple,
  ArrowRight,
  CheckCircle2,
  Zap,
  Heart,
  Brain,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: Dumbbell,
    title: "Személyi Edzés",
    description:
      "Egyéni edzésprogram, teljes figyelemmel rádfordulva. Minden alkalommal ellenőrzöm a technikád és alkalmazkodom a haladásodhoz.",
    features: [
      "Személyre szabott edzésterv",
      "Technika korrekció valós időben",
      "Haladáskövetés és program módosítás",
      "Motiváció és accountability",
    ],
    price: "12.000 Ft / alkalom",
    color: "from-lime/20 to-lime/5",
  },
  {
    icon: Monitor,
    title: "Online Coaching",
    description:
      "Távoli edzésterv és tanácsadás, rugalmas időbeosztással. Ideális azoknak, akik önállóan edzenek, de szakmai iránymutatást szeretnének.",
    features: [
      "Heti edzésterv küldése",
      "Videó forma ellenőrzés",
      "Chat támogatás munkanapokon",
      "Havi haladásértékelés",
    ],
    price: "45.000 Ft / hó",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Users,
    title: "Kiscsoportos Edzés",
    description:
      "3-6 fős csoportban edzünk, közösségi élmény és kölcsönös motiváció mellett. Hatékony és kedvező árú lehetőség.",
    features: [
      "Max. 6 fős kiscsoportok",
      "Változatos edzésprogramok",
      "Közösségi motiváció",
      "Kedvező ár/érték arány",
    ],
    price: "5.000 Ft / alkalom",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: Apple,
    title: "Táplálkozási Tanácsadás",
    description:
      "Személyre szabott étrend terv a céljaidhoz igazítva. Nem diéta, hanem fenntartható életmód változás.",
    features: [
      "Részletes étrend terv",
      "Makronutriens számítás",
      "Bevásárlólisták és receptek",
      "Heti konzultáció",
    ],
    price: "35.000 Ft / hó",
    color: "from-orange-500/20 to-orange-500/5",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Gyors Eredmények",
    description: "Tudományosan megalapozott módszerekkel gyorsabb haladás",
  },
  {
    icon: Heart,
    title: "Egészség Elsőben",
    description: "Biztonságos, sérülésmentes edzésterv mindenkinek",
  },
  {
    icon: Brain,
    title: "Mentális Erősítés",
    description: "Nem csak a test, hanem az elme is edződik",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-lime/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="max-w-3xl">
            <Badge className="bg-lime/10 text-lime border-lime/20 mb-4">
              Szolgáltatások
            </Badge>
            <h1 className="text-4xl md:text-6xl font-[var(--font-archivo)] font-black text-white mb-6">
              Válaszd Ki A{" "}
              <span className="text-lime">Hozzád Illő</span> Programot
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Legyen szó fogyásról, izomépítésről vagy általános fitnesz
              javításról, megtaláljuk a számodra tökéletes megoldást.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div
                    className={`h-2 bg-gradient-to-r ${service.color}`}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-lime" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900">
                          {service.title}
                        </h3>
                        <p className="text-lime font-semibold text-sm">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-zinc-600">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-zinc-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/pricing">
                      <Button
                        variant="outline"
                        className="w-full mt-2 border-lime/30 text-lime hover:bg-lime/5 group"
                      >
                        Részletek
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-white mb-4">
              Miért Válaszd Az <span className="text-lime">eVitality</span>-t?
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-lime" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-lime">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-zinc-900 mb-4">
            Kezdjük El Együtt!
          </h2>
          <p className="text-zinc-700 mb-8 max-w-xl mx-auto">
            Az első konzultáció ingyenes. Ismerkedj meg a módszereimmel és
            beszélgessünk a céljaidról!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/bookings">
              <Button className="bg-zinc-900 text-white hover:bg-zinc-800 font-semibold px-8 py-3 text-lg">
                Foglalj Időpontot
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                className="border-zinc-900 text-zinc-900 hover:bg-zinc-900/10 font-semibold px-8 py-3 text-lg"
              >
                Csomagok és Árak
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
