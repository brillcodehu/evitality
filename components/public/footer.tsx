"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigationLinks = [
  { href: "#kezdolap", label: "Kezdőlap" },
  { href: "#rolam", label: "Rólam" },
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#arak", label: "Árak" },
  { href: "#blog", label: "Blog" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

const serviceLinks = [
  { href: "#szemelyi-edzes", label: "Személyi edzés" },
  { href: "#online-coaching", label: "Online coaching" },
  { href: "#kiscsoportos", label: "Kiscsoportos edzés" },
  { href: "#taplalkozas", label: "Táplálkozási tanácsadás" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
  { href: "https://youtube.com", icon: YoutubeIcon, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      {/* Newsletter Section */}
      <div className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div>
              <h3 className="font-heading text-xl text-white">
                Iratkozz fel a hírlevelemre
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Heti edzés tippek, receptek és motiváció közvetlenül a postaládádba.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md gap-2"
            >
              <Input
                type="email"
                placeholder="E-mail címed"
                className="h-10 flex-1 rounded-full border-zinc-700 bg-zinc-800 px-4 text-white placeholder:text-zinc-500 focus-visible:border-lime focus-visible:ring-lime/30"
              />
              <Button
                type="submit"
                className="h-10 rounded-full bg-lime px-6 font-semibold text-zinc-950 hover:bg-lime-dark"
              >
                <Send className="mr-2 size-4" />
                Feliratkozás
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl text-lime">eVitality</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Professzionális személyi edzés és wellness platform. Segítek elérni a
              fitness céljaidat személyre szabott edzéstervekkel és táplálkozási
              tanácsadással.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all hover:bg-lime hover:text-zinc-950"
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Navigáció
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Szolgáltatások
            </h4>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Kapcsolat
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:info@evitality.hu"
                  className="transition-colors hover:text-lime"
                >
                  info@evitality.hu
                </a>
              </li>
              <li>
                <a
                  href="tel:+36301234567"
                  className="transition-colors hover:text-lime"
                >
                  +36 30 123 4567
                </a>
              </li>
              <li className="leading-relaxed">
                1052 Budapest,
                <br />
                Váci utca 12., 3. emelet
              </li>
              <li className="text-zinc-500">
                H-P: 06:00 - 21:00
                <br />
                Szo: 08:00 - 16:00
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} eVitality. Minden jog fenntartva.</p>
            <div className="flex gap-6">
              <Link href="/adatvedelmi-tajekoztato" className="transition-colors hover:text-zinc-300">
                Adatvédelmi tájékoztató
              </Link>
              <Link href="/aszf" className="transition-colors hover:text-zinc-300">
                ÁSZF
              </Link>
              <Link href="/sutik" className="transition-colors hover:text-zinc-300">
                Sütik kezelése
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
