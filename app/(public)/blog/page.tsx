"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const posts = [
  {
    slug: "5-legfontosabb-gyakorlat-kezdoknek",
    title: "Az 5 Legfontosabb Gyakorlat Kezdoknek",
    excerpt:
      "Ha most kezded az edzest, ezzel az 5 alapgyakorlattal epitsd fel a fundamentumot. Minden izomcsoportot lefednek es biztonsagosan vegezhetok.",
    category: "Edzés",
    date: "2026. aprilis 20.",
    readTime: "5 perc",
  },
  {
    slug: "feherje-bevitel-optimalizalasa",
    title: "Feherje Bevitel Optimalizalasa: Mennyire Van Szukseged?",
    excerpt:
      "A feherje a legfontosabb makronutriens az izomepites es a regeneracio szempontjabol. De mennyit fogyasszunk naponta?",
    category: "Taplalkozas",
    date: "2026. aprilis 15.",
    readTime: "7 perc",
  },
  {
    slug: "hogyan-keruldd-el-a-serulest",
    title: "Hogyan Keruldd El A Serulest Az Edzoteremben",
    excerpt:
      "A serules megelozese ugyanolyan fontos, mint maga az edzes. Mutatom a leggyakoribb hibakat es hogyan kerulheted el oket.",
    category: "Egeszség",
    date: "2026. aprilis 10.",
    readTime: "6 perc",
  },
  {
    slug: "miert-fontos-az-alvas",
    title: "Miert Fontos Az Alvas A Fitnesz Celok Elereseben?",
    excerpt:
      "Az alvas az egyik legalabecsultebb tenyezo a fitnesz vilagaban. Tobb kutatas is bizonyitja, hogy az alvas minosege kozvetlen hatassal van az edzesi eredmenyekre.",
    category: "Eletmod",
    date: "2026. aprilis 5.",
    readTime: "4 perc",
  },
  {
    slug: "hiit-vs-liss-kardio",
    title: "HIIT vs. LISS Kardio: Melyik A Jobb Fogyas Szempontjabol?",
    excerpt:
      "Ket nepszeru kardio modszer, ket kulonbozo megkozelites. Megvizsgaljuk, melyik hatekonyabb a zsiregetesben.",
    category: "Edzés",
    date: "2026. marcius 28.",
    readTime: "8 perc",
  },
  {
    slug: "stresszkezeles-es-kortizol",
    title: "Stresszkezeles Es Kortizol: Hogyan Hat A Testsulyadra?",
    excerpt:
      "A kronikus stressz a kortizolszint emelkedeset okozza, ami hozzajarulhat a hasi zsir felszaporodasahoz. Mutatom, mit tehetsz ellene.",
    category: "Egeszség",
    date: "2026. marcius 20.",
    readTime: "5 perc",
  },
];

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-lime/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-lime/10 text-lime border-lime/20 mb-4">
              Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-[var(--font-archivo)] font-black text-white mb-6">
              Tippek, Trukkok,{" "}
              <span className="text-lime">Tudomany</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Cikkek edzesrol, taplalkozasrol es egeszseges eletmodrol, hogy
              jobban megertsd a testedet es hatekonyabban edzhess.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer overflow-hidden">
                    {/* Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-zinc-200 to-zinc-100 flex items-center justify-center">
                      <Badge
                        variant="secondary"
                        className="bg-lime/80 text-zinc-900"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-zinc-900 text-lg group-hover:text-lime transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm text-zinc-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center text-sm text-lime font-medium group-hover:gap-2 transition-all">
                        Tovabb olvasom
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
