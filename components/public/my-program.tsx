"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SamButton } from "@/components/public/hero";

const programs = [
  { icon: "/img/service-icon-1.svg", title: "Kardió", text: "Zsírégető, szív- és érrendszert erősítő tréningek a kitartásért." },
  { icon: "/img/service-icon-2.svg", title: "Has & törzs", text: "Stabil core, erős törzs és fájdalommentes hétköznapok." },
  { icon: "/img/service-icon-3.svg", title: "Váll & hát", text: "Helyes tartás, erős felsőtest, megelőzött gerincproblémák." },
  { icon: "/img/service-icon-4.svg", title: "Kar & felsőtest", text: "Feszes, formás karok progresszív erősítő tervvel." },
  { icon: "/img/service-icon-5.svg", title: "Rugalmas idő", text: "Az edzéseidet a te naptáradhoz igazítom, akár online." },
];

const pins = [
  { top: "20%", left: "30%" },
  { top: "42%", left: "62%" },
  { top: "58%", left: "22%" },
  { top: "74%", left: "55%" },
];

export function MyProgram() {
  return (
    <section
      className="bg-cover bg-center py-20 lg:py-[120px]"
      style={{ backgroundImage: "url(/img/blur-1.png)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left column */}
          <div className="space-y-8 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-brand">
                Edzésterületek
              </span>
              <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-black sm:text-4xl">
                A programom
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
                Komplex felkészítés, ahol minden testrész és cél a helyére
                kerül.
              </p>
              <Link href="/services">
                <SamButton className="mt-6">Foglalj most</SamButton>
              </Link>
            </motion.div>

            {programs.slice(0, 2).map((p, i) => (
              <ProgramCard key={p.title} {...p} delay={i * 0.1} />
            ))}
          </div>

          {/* Center image with pins */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-6 lg:px-6"
          >
            <img
              src="/img/ev-program.jpg"
              alt="Nagy Viktória edzés közben"
              className="mx-auto w-full max-w-md rounded-3xl object-cover shadow-2xl"
            />
            {pins.map((pin, i) => (
              <span
                key={i}
                className="absolute hidden lg:block"
                style={{ top: pin.top, left: pin.left }}
              >
                <span className="relative flex size-5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex size-5 rounded-full border-4 border-white bg-brand" />
                </span>
              </span>
            ))}
          </motion.div>

          {/* Right column */}
          <div className="space-y-8 lg:col-span-3">
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
      className="border-2 border-white bg-white/70 p-6 shadow-[2px_31px_61px_-14px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-colors hover:bg-white"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-[15px] border border-white bg-brand/10 p-3">
          <img src={icon} alt="" className="size-7" />
        </span>
        <h3 className="font-heading text-lg text-black">{title}</h3>
      </div>
      <p className="mt-5 text-[15px] leading-relaxed text-zinc-600">{text}</p>
    </motion.div>
  );
}
