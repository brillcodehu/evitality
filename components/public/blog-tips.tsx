"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const posts = [
  {
    img: "/img/Post-1.jpg",
    tag: "Táplálkozás",
    title: "5 reggeli, ami egész napra feltölt energiával",
    date: "2026. május 12.",
  },
  {
    img: "/img/Post-2.jpg",
    tag: "Életmód",
    title: "Hogyan építs be mozgást egy zsúfolt hétköznapba",
    date: "2026. május 4.",
  },
  {
    img: "/img/Post-3.jpg",
    tag: "Edzés",
    title: "A 3 leggyakoribb hiba kezdő edzőként, és a megoldás",
    date: "2026. április 28.",
  },
  {
    img: "/img/Post-4.jpg",
    tag: "Motiváció",
    title: "Miért nem a motiváció, hanem a rendszer visz előre",
    date: "2026. április 19.",
  },
];

export function BlogTips() {
  return (
    <section
      className="bg-cover bg-center py-20 lg:py-28"
      style={{ backgroundImage: "url(/img/blur-3.png)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Blog
            </span>
            <h2 className="mt-4 font-heading text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
              Egészséges
              <br />
              tippek & trükkök
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              Gyakorlatias, kipróbált tanácsok edzésről, táplálkozásról és
              motivációról, hogy két edzés között is haladj.
            </p>
            <Link href="/blog">
              <Button className="mt-6 h-12 rounded-none bg-black px-7 font-heading text-sm uppercase tracking-wide text-white hover:bg-brand">
                Összes cikk
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg leading-snug text-black transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {post.date}
                    </span>
                    <Link
                      href="/blog"
                      className="flex items-center gap-1 font-bold text-brand"
                    >
                      Tovább
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
