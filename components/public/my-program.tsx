"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const programs = [
  { icon: "/img/service-icon-1.svg", title: "Kardió & állóképesség", text: "Zsírégető, szív- és érrendszert erősítő tréningek a kitartásért." },
  { icon: "/img/service-icon-2.svg", title: "Has & törzs", text: "Stabil core, erős törzs és fájdalommentes hétköznapok." },
  { icon: "/img/service-icon-3.svg", title: "Váll & hát", text: "Helyes tartás, erős felsőtest, megelőzött gerincproblémák." },
  { icon: "/img/service-icon-4.svg", title: "Kar & felsőtest", text: "Feszes, formás karok progresszív erősítő tervvel." },
  { icon: "/img/service-icon-5.svg", title: "Rugalmas időbeosztás", text: "Az edzéseidet a te naptáradhoz igazítom, akár online is." },
];

export function MyProgram() {
  return (
    <section
      className="bg-cover bg-center py-20 lg:py-28"
      style={{ backgroundImage: "url(/img/blur-1.png)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-brand">
                Edzésterületek
              </span>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
                A programom
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                Komplex felkészítés, ahol minden testrész és cél a helyére
                kerül. Az alábbi területekre építem fel a személyre szabott
                terved.
              </p>
              <Link href="/services">
                <Button className="mt-6 h-12 rounded-none bg-brand px-7 font-heading text-sm uppercase tracking-wide text-white hover:bg-brand-dark">
                  Foglalj időpontot
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </motion.div>

            {programs.slice(0, 2).map((p, i) => (
              <ProgramCard key={p.title} {...p} delay={i * 0.1} />
            ))}
          </div>

          {/* Center image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <img
              src="/img/smiling-pretty.png"
              alt="Nagy Viktória edzés közben"
              className="mx-auto w-full max-w-sm drop-shadow-2xl"
            />
          </motion.div>

          {/* Right column */}
          <div className="space-y-6 lg:col-span-4">
            {programs.slice(2).map((p, i) => (
              <ProgramCard key={p.title} {...p} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  icon,
  title,
  text,
  delay,
}: {
  icon: string;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/70 bg-white/80 p-6 backdrop-blur-sm transition-all hover:border-brand hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10">
          <img src={icon} alt="" className="size-6" />
        </span>
        <h3 className="font-heading text-lg text-black">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{text}</p>
    </motion.div>
  );
}
