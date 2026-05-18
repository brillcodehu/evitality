"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    if (w > 0 && h > 0) {
      setResult(Math.round((w / (h * h)) * 10) / 10);
    }
  };

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-2">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[360px] bg-zinc-100"
            style={{
              backgroundImage: "url(/img/Photo-Section.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src="/img/full-length-portrait.png"
              alt="Nagy Viktória"
              className="absolute bottom-0 left-1/2 h-[95%] -translate-x-1/2 object-contain"
            />
          </motion.div>

          {/* Calculator side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zinc-950 p-8 sm:p-12"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Hol tartasz most?
            </span>
            <h2 className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl">
              Számold ki a BMI-d
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Egy gyors kiindulópont. A pontos terv viszont mindig személyes,
              ezért az eredmény után beszéljük át együtt.
            </p>

            <div className="mt-7 flex gap-2">
              {(["no", "ferfi"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 rounded-none border py-3 font-heading text-xs uppercase tracking-wide transition-colors ${
                    gender === g
                      ? "border-brand bg-brand text-white"
                      : "border-zinc-700 bg-transparent text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  {g === "no" ? "Nő" : "Férfi"}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                type="number"
                placeholder="Életkor"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="rounded-none border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand focus:outline-none"
              />
              <input
                type="number"
                placeholder="Súly / kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="rounded-none border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand focus:outline-none"
              />
              <input
                type="number"
                placeholder="Magasság / cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="rounded-none border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand focus:outline-none"
              />
            </div>

            <Button
              onClick={calculate}
              className="mt-4 h-12 w-full rounded-none bg-brand font-heading text-sm uppercase tracking-wide text-white hover:bg-brand-dark"
            >
              <Scale className="mr-2 size-4" />
              Kiszámolom
            </Button>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      A BMI-d
                    </p>
                    <p className="font-heading text-4xl text-white">{result}</p>
                  </div>
                  <p
                    className={`font-heading text-lg ${bmiCategory(result).color}`}
                  >
                    {bmiCategory(result).label}
                  </p>
                </div>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    className="mt-4 h-auto p-0 font-bold text-brand hover:bg-transparent hover:text-brand-light"
                  >
                    Beszéljük át egy ingyenes konzultáción
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
