"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transformations = [
  {
    name: "Kovacs Anna",
    duration: "12 het",
    weightLoss: "-14 kg",
    bodyFat: "-8%",
    quote: "Soha nem gondoltam volna, hogy ennyi valtozas lehetseges ilyen rovid ido alatt!",
  },
  {
    name: "Nagy Peter",
    duration: "16 het",
    weightLoss: "-22 kg",
    bodyFat: "-12%",
    quote: "Az eVitality programja teljesen megvaltoztatta az eletem. Ujra magabiztosan erzem magam.",
  },
  {
    name: "Szabo Reka",
    duration: "8 het",
    weightLoss: "-8 kg",
    bodyFat: "-5%",
    quote: "A kiscsoportos edzesek hihetetlen kozosseget adtak, es az eredmenyek magukert beszelnek.",
  },
  {
    name: "Toth Gabor",
    duration: "20 het",
    weightLoss: "-30 kg",
    bodyFat: "-15%",
    quote: "Az edzom nem csak fizikailag, hanem mentálisan is felkeszitett a valtozasra.",
  },
  {
    name: "Kiss Marta",
    duration: "12 het",
    weightLoss: "-11 kg",
    bodyFat: "-6%",
    quote: "Az etrend terv kulcsfontossagu volt. Vegre megértettem, hogyan kell helyesen taplalkozni.",
  },
  {
    name: "Horvath Daniel",
    duration: "24 het",
    weightLoss: "+8 kg izom",
    bodyFat: "-4%",
    quote: "Cel az izomepites volt, es az eredmeny felulmulta a varakozasaimat!",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime/8 rounded-full blur-[200px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div {...fadeUp}>
            <Badge className="bg-lime/10 text-lime border-lime/20 mb-4">
              Eredmenyek
            </Badge>
            <h1 className="text-4xl md:text-6xl font-[var(--font-archivo)] font-black text-white mb-6">
              Valos Ugyfelek,{" "}
              <span className="text-lime">Valos Eredmenyek</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Tekintsd meg ugyfeleim atalakulas torteneteit. Mindenki mas
              kiindulasi pontrol indult, de egy kozos bennuk: eldontottek, hogy
              valtoztatnak.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-lime">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-zinc-900">
                500+
              </p>
              <p className="text-zinc-700 text-sm">Sikeres atalakulás</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-zinc-900">
                -15 kg
              </p>
              <p className="text-zinc-700 text-sm">Atlagos fogyás</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-zinc-900">
                98%
              </p>
              <p className="text-zinc-700 text-sm">Elégedettségi ráta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformations.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Before/After Visual Placeholder */}
                  <div className="relative h-56 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-100">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 bg-zinc-300 flex items-center justify-center border-r-2 border-white">
                        <span className="text-zinc-500 text-sm font-medium">
                          ELOTTE
                        </span>
                      </div>
                      <div className="w-1/2 bg-zinc-100 flex items-center justify-center">
                        <span className="text-zinc-500 text-sm font-medium">
                          UTANA
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-lime text-zinc-900 font-bold">
                        {item.weightLoss}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-zinc-900 text-lg">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Clock className="w-3.5 h-3.5" />
                        {item.duration}
                      </div>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <TrendingDown className="w-3.5 h-3.5" />
                        Testzsir: {item.bodyFat}
                      </div>
                    </div>
                    <blockquote className="text-sm text-zinc-600 italic border-l-2 border-lime pl-3">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-12 h-12 text-lime mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-[var(--font-archivo)] font-black text-white mb-4">
            Te Lehetsz A Kovetkezo Sikertortenet
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Tedd meg az elso lepest a valtozas fele. Foglalj egy ingyenes
            konzultaciot meg ma!
          </p>
          <a href="/dashboard/bookings">
            <button className="bg-lime text-zinc-900 hover:bg-lime-dark font-semibold px-8 py-3 rounded-lg text-lg transition-colors">
              Kezdjuk El!
            </button>
          </a>
        </div>
      </section>
    </main>
  );
}
