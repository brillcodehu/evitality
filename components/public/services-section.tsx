"use client";

import { motion } from "framer-motion";
import { Dumbbell, Monitor, Users, Apple, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Dumbbell,
    title: "Személyi Edzés",
    description:
      "Egyéni edzéstervek, személyre szabott felkészítés. Minden alkalom 100%-ban rád szabva, a te céljaid szerint.",
    href: "#szemelyi-edzes",
  },
  {
    icon: Monitor,
    title: "Online Coaching",
    description:
      "Távolról is hatékony edzésprogram. Heti videóhívás, folyamatos üzenetben való támogatás és nyomon követés.",
    href: "#online-coaching",
  },
  {
    icon: Users,
    title: "Kiscsoportos Edzés",
    description:
      "Maximum 4 fős csoportban, közösségi motivációval. Az egyéni figyelem és a csapatszellem kombinációja.",
    href: "#kiscsoportos",
  },
  {
    icon: Apple,
    title: "Táplálkozási Tanácsadás",
    description:
      "Személyre szabott étrend, makrószámítás, bevásárlólista. Az edzés mellett a konyha is a szövetségesed lesz.",
    href: "#taplalkozas",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ServicesSection() {
  return (
    <section
      id="szolgaltatasok"
      className="relative bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-lime-dark">
            Mit kínálok
          </span>
          <h2 className="mt-3 font-heading text-3xl text-zinc-950 sm:text-4xl lg:text-5xl">
            Szolgáltatásaim
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-lime" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
            Válaszd ki a számodra legmegfelelőbb szolgáltatást, és kezdjük el
            együtt az utadat a jobb közérzet felé.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariant}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lime/30 hover:shadow-xl hover:shadow-lime/5"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-lime/10 text-lime-dark transition-colors group-hover:bg-lime group-hover:text-zinc-950">
                  <service.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-heading text-lg text-zinc-950">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-lime-dark transition-colors group-hover:text-zinc-950">
                  Részletek
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
