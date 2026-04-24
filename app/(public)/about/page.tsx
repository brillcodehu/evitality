"use client";

import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Heart,
  Target,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const certifications = [
  { name: "NSCA-CPT", description: "Certified Personal Trainer" },
  { name: "ISSA Nutrition", description: "Taplalkozasi szakerto" },
  { name: "FMS Level 2", description: "Funkcionalis mozgasszures" },
  { name: "Kettlebell Instructor", description: "StrongFirst minositett" },
];

const milestones = [
  { icon: Clock, value: "8+", label: "Ev tapasztalat" },
  { icon: Users, value: "500+", label: "Elegedett ugyfeel" },
  { icon: Award, value: "12", label: "Szakmai kepesites" },
  { icon: Target, value: "98%", label: "Cel elerese rata" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="max-w-3xl">
            <Badge className="bg-lime/10 text-lime border-lime/20 mb-4">
              Rolam
            </Badge>
            <h1 className="text-4xl md:text-6xl font-[var(--font-archivo)] font-black text-white mb-6">
              Szenvedely, Tudomany,{" "}
              <span className="text-lime">Eredmenyek</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Tobb mint 8 eve segitem az embereket abban, hogy elerjek fitnesz
              celjaikat. Nem csak edzessel, hanem komplex eletmod-valtoztatasi
              programokkal, amelyek tudomanyosan megalapozottak es
              személyre szabottak.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <Heart className="w-20 h-20" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-lime rounded-xl p-6 shadow-lg">
                  <p className="text-3xl font-[var(--font-archivo)] font-black text-zinc-900">
                    8+
                  </p>
                  <p className="text-sm font-medium text-zinc-700">
                    ev tapasztalat
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-zinc-900 mb-6">
                A Tortenetem
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  Az edzoi palyam 2018-ban kezdodott, amikor felismertem, hogy a
                  fitnesz nem csak testedzesrol szol, hanem az egesz eletmod
                  atalakitasarol. Azota minden nap azon dolgozom, hogy
                  ugyfeleim a legjobb verziojukka valjanak.
                </p>
                <p>
                  Filozofiam egyszerű: nincs ket egyforma ember, ezert nincs ket
                  egyforma edzesterv sem. Minden programot egyedileg allitok
                  ossze, figyelembe veve a celjaidat, az egeszsegi allapotodat
                  es az eletmoddodat.
                </p>
                <p>
                  Folyamatosan kepzem magam a legujabb sporttudomanyi kutatasok
                  alapjan, hogy a leheto legjobb szolgaltatast nyujthassam.
                </p>
              </div>
              <Link href="/contact">
                <Button className="mt-8 bg-lime text-zinc-900 hover:bg-lime-dark font-semibold px-8">
                  Vedd Fel Velem A Kapcsolatot
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {milestones.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-zinc-900 border-zinc-800 text-center p-6">
                  <CardContent className="p-0 space-y-3">
                    <item.icon className="w-8 h-8 text-lime mx-auto" />
                    <p className="text-3xl font-[var(--font-archivo)] font-black text-white">
                      {item.value}
                    </p>
                    <p className="text-sm text-zinc-400">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-zinc-900 mb-4">
              Kepesiteseim
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Folyamatosan fejlesztem tudasomat a legjobb eredmenyek erdekeben
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center p-6 hover:border-lime/50 transition-colors">
                  <CardContent className="p-0 space-y-3">
                    <GraduationCap className="w-10 h-10 text-lime mx-auto" />
                    <h3 className="font-bold text-zinc-900">{cert.name}</h3>
                    <p className="text-sm text-zinc-500">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-lime">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-zinc-900 mb-4">
            Kesz Vagy Elkezdeni?
          </h2>
          <p className="text-zinc-700 mb-8 max-w-xl mx-auto">
            Foglalj egy ingyenes konzultaciot, es beszelgessunk a celjaidrol!
          </p>
          <Link href="/dashboard/bookings">
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800 font-semibold px-8 py-3 text-lg">
              Ingyenes Konzultacio
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
