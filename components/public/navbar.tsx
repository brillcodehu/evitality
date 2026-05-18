"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Kezdőlap" },
  { href: "/about", label: "Rólam" },
  { href: "/services", label: "Szolgáltatások" },
  { href: "/pricing", label: "Árak" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Kapcsolat" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-heading text-2xl tracking-tight text-black lg:text-3xl">
              eVitality
            </span>
            <span className="size-2 rounded-full bg-brand" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[15px] font-semibold text-zinc-700 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+36301234567"
              className="flex items-center gap-2 text-sm font-bold text-black"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Phone className="size-4" />
              </span>
              +36 30 123 4567
            </a>
            <Link href="/contact">
              <Button className="h-12 rounded-none bg-brand px-7 font-heading text-sm uppercase tracking-wide text-white hover:bg-brand-dark">
                Ingyenes konzultáció
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-black hover:bg-black/5"
                  />
                }
              >
                <Menu className="size-6" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 border-zinc-200 bg-white p-0"
              >
                <SheetHeader className="border-b border-zinc-200 p-6">
                  <SheetTitle className="font-heading text-xl text-black">
                    eVitality
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-3 text-base font-semibold text-zinc-700 transition-colors hover:bg-brand/5 hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-3 border-t border-zinc-200 pt-4">
                    <a
                      href="tel:+36301234567"
                      className="flex items-center justify-center gap-2 text-sm font-bold text-black"
                    >
                      <Phone className="size-4 text-brand" />
                      +36 30 123 4567
                    </a>
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full rounded-none bg-brand font-heading text-sm uppercase tracking-wide text-white hover:bg-brand-dark">
                        Ingyenes konzultáció
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
