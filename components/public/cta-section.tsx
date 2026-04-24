"use client";

import { motion } from "framer-motion";
import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section
      id="idopontfoglalas"
      className="relative overflow-hidden bg-lime py-20 lg:py-28"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="font-heading text-4xl text-zinc-950 sm:text-5xl lg:text-6xl">
            Kész Vagy A Változásra?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-800">
            Az első konzultáció teljesen ingyenes és kötelezettségmentes.
            Beszéljük meg a céljaidat, és készítsünk egy személyre szabott tervet!
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#foglalas">
              <Button className="h-12 rounded-full bg-zinc-950 px-8 text-base font-bold text-white shadow-xl transition-all hover:bg-zinc-800 hover:shadow-2xl">
                <CalendarCheck className="mr-2 size-5" />
                Foglalj Időpontot
              </Button>
            </Link>
            <a href="tel:+36301234567">
              <Button
                variant="outline"
                className="h-12 rounded-full border-2 border-zinc-950 bg-transparent px-8 text-base font-bold text-zinc-950 transition-all hover:bg-zinc-950 hover:text-white"
              >
                <Phone className="mr-2 size-5" />
                +36 30 123 4567
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
