"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

const menu = [
  { href: "/", label: "Kezdőlap" },
  { href: "/about", label: "Rólam" },
  { href: "/services", label: "Szolgáltatások" },
  { href: "/pricing", label: "Árak" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Kapcsolat" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl text-white sm:text-3xl">
            Iratkozz fel a hírlevélre
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm">
            Heti egy gyakorlatias tipp edzésről, táplálkozásról és motivációról.
            Spam nélkül, bármikor leiratkozhatsz.
          </p>
          <form
            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="E-mail címed"
              className="flex-1 rounded-none border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand focus:outline-none"
            />
            <Button
              type="submit"
              className="h-auto rounded-none bg-brand px-8 py-3 font-heading text-sm uppercase tracking-wide text-white hover:bg-brand-dark"
            >
              Feliratkozom
            </Button>
          </form>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-2xl text-white">
                eVitality
              </span>
              <span className="size-2 rounded-full bg-brand" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Nagy Viktória okleveles személyi edző. Személyre szabott edzés és
              táplálkozás Debrecenben, hogy tartós eredményt érj el.
            </p>
            <ul className="mt-6 flex gap-3">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: InstagramIcon, label: "Instagram" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <s.icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm uppercase tracking-widest text-white">
              Menü
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {menu.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="transition-colors hover:text-brand"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm uppercase tracking-widest text-white">
              Kapcsolat
            </p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                4025 Debrecen, Piac utca 1.
              </li>
              <li>
                <a
                  href="tel:+36301234567"
                  className="flex items-center gap-3 transition-colors hover:text-brand"
                >
                  <Phone className="size-4 shrink-0 text-brand" />
                  +36 30 123 4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@evitality.hu"
                  className="flex items-center gap-3 transition-colors hover:text-brand"
                >
                  <Mail className="size-4 shrink-0 text-brand" />
                  hello@evitality.hu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} eVitality. Minden jog fenntartva.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="#" className="transition-colors hover:text-brand">
                Adatvédelem
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-brand">
                ÁSZF
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
