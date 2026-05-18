"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Gender = "no" | "ferfi";

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Soványság", color: "text-amber-500" };
  if (bmi < 25) return { label: "Normál tartomány", color: "text-emerald-600" };
  if (bmi < 30) return { label: "Túlsúly", color: "text-orange-500" };
  return { label: "Elhízás", color: "text-brand" };
}

export function BmiCalculator() {
  const [gender, setGender] = useState<Gender>("no");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) setResult(Math.round((w / (h * h)) * 10) / 10);
  };

  return (
    <section className="bg-black py-20 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-2">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]"
          >
            <div
              className="absolute inset-x-4 inset-y-8 bg-cover bg-center opacity-90"
              style={{ backgroundImage: "url(/img/Photo-Section.jpg)" }}
            />
            <img
              src="/img/ev-calc.jpg"
              alt="Nagy Viktória"
              className="absolute bottom-0 left-1/2 h-[96%] -translate-x-1/2 object-contain object-bottom"
            />
          </motion.div>

          {/* Calculator side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 sm:p-12 lg:my-14"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Hol tartasz most?
            </span>
            <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-black sm:text-4xl">
              Számold ki a BMI-d
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Egy gyors kiindulópont. A pontos terv mindig személyes, ezért az
              eredmény után beszéljük át együtt.
            </p>

            <div className="mt-7 flex gap-3">
              {(["no", "ferfi"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`h-14 w-36 border font-heading text-sm uppercase tracking-wide transition-colors ${
                    gender === g
                      ? "border-brand bg-brand text-white"
                      : "border-zinc-300 bg-white text-zinc-600 hover:border-brand"
                  }`}
                >
                  {g === "no" ? "Nő" : "Férfi"}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              <input
                type="number"
                placeholder="Életkor"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="h-16 w-full border border-zinc-300 px-5 text-base text-black placeholder:text-zinc-400 focus:border-brand focus:outline-none"
              />
              <input
                type="number"
                placeholder="Súly / kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-16 w-full border border-zinc-300 px-5 text-base text-black placeholder:text-zinc-400 focus:border-brand focus:outline-none"
              />
              <input
                type="number"
                placeholder="Magasság / cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-16 w-full border border-zinc-300 px-5 text-base text-black placeholder:text-zinc-400 focus:border-brand focus:outline-none"
              />
              <button
                type="button"
                onClick={calculate}
                className="group relative h-16 w-full overflow-hidden bg-brand font-heading text-sm uppercase tracking-wide text-white"
              >
                <span className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                <span className="relative z-10">Kiszámolom</span>
              </button>
            </div>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 border border-zinc-200 bg-zinc-50 p-5"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      A BMI-d
                    </p>
                    <p className="font-heading text-4xl text-black">{result}</p>
                  </div>
                  <p className={`font-heading text-lg ${bmiCategory(result).color}`}>
                    {bmiCategory(result).label}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 font-bold text-brand transition-colors hover:text-brand-dark"
                >
                  Beszéljük át egy ingyenes konzultáción
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
