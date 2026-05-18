"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import { SamButton } from "@/components/public/hero";

const small1 = {
  img: "/img/Post-1.jpg",
  tag: "Táplálkozás",
  title: "5 reggeli, ami egész napra feltölt energiával",
  date: "2026. máj. 12.",
};
const big1 = {
  img: "/img/ev-lifestyle.jpg",
  tags: ["Életmód", "Motiváció"],
  title: "Miért nem a motiváció, hanem a rendszer visz előre",
  excerpt:
    "A lelkesedés elmúlik, a szokás megmarad. Megmutatom, hogyan építs fenntartható rutint nehéz heteken is.",
  date: "2026. máj. 4.",
};
const big2 = {
  img: "/img/Post-3.jpg",
  tags: ["Edzés", "Kezdő"],
  title: "A 3 leggyakoribb hiba kezdő edzőként, és a megoldás",
  excerpt:
    "A legtöbben ugyanazon a három ponton akadnak el. Ha ezeket elkerülöd, hónapokat spórolsz.",
  date: "2026. ápr. 28.",
};
const small2 = {
  img: "/img/Post-4.jpg",
  tag: "Edzés",
  title: "Otthoni edzés eszköz nélkül: működik?",
  date: "2026. ápr. 19.",
};

export function BlogTips() {
  return (
    <section
      className="bg-cover bg-center py-20 lg:py-[120px]"
      style={{ backgroundImage: "url(/img/blur-3.png)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Heading column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:self-center"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Blog
            </span>
            <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-black sm:text-4xl lg:text-5xl">
              Egészséges
              <br />
              tippek & trükkök
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-600">
              Gyakorlatias, kipróbált tanácsok edzésről, táplálkozásról és
              motivációról, hogy két edzés között is haladj.
            </p>
            <Link href="/blog">
              <SamButton className="mt-7">Összes cikk</SamButton>
            </Link>
          </motion.div>

          {/* Middle column: small + big */}
          <div className="space-y-6 lg:col-span-4">
            <SmallPost {...small1} delay={0.1} />
            <BigPost {...big1} delay={0.2} />
          </div>

          {/* Right column: big + small */}
          <div className="space-y-6 lg:col-span-4">
            <BigPost {...big2} delay={0.15} />
            <SmallPost {...small2} delay={0.25} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallPost({
  img,
  tag,
  title,
  date,
  delay,
}: {
  img: string;
  tag: string;
  title: string;
  date: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-stretch gap-5 bg-white p-6 shadow-[-1px_3px_19px_-6px_rgba(0,0,0,0.1)]"
    >
      <div className="flex-1">
        <span className="inline-block bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
          {tag}
        </span>
        <h3 className="mt-4 font-heading text-base leading-snug text-black">
          {title}
        </h3>
        <Link
          href="/blog"
          className="mt-3 flex items-center gap-2 text-sm font-bold text-black transition-colors hover:text-brand"
        >
          Tovább <ArrowRight className="size-4" />
        </Link>
        <p className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
          <CalendarDays className="size-3.5" />
          {date}
        </p>
      </div>
      <img
        src={img}
        alt={title}
        className="w-28 shrink-0 rounded-lg object-cover sm:w-32"
      />
    </motion.article>
  );
}

function BigPost({
  img,
  tags,
  title,
  excerpt,
  date,
  delay,
}: {
  img: string;
  tags: string[];
  title: string;
  excerpt: string;
  date: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group overflow-hidden border border-white bg-white shadow-[-1px_3px_19px_-6px_rgba(0,0,0,0.1)]"
    >
      <div className="overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-block bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-heading text-lg leading-snug text-black transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4">
          <p className="text-sm font-semibold text-black">Nagy Viktória</p>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Share2 className="size-3.5" />5
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="size-3.5" />
              12
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
