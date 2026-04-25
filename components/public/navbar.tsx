"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
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
          ? "bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl tracking-tight text-lime">
              eVitality
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-zinc-300 hover:text-white hover:bg-white/10"
              >
                Bejelentkezés
              </Button>
            </Link>
            <Link href="/dashboard/bookings">
              <Button className="bg-lime text-zinc-950 font-semibold hover:bg-lime-dark rounded-full px-6">
                Időpontfoglalás
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
                    className="text-white hover:bg-white/10"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 border-zinc-800 bg-zinc-950 p-0"
              >
                <SheetHeader className="border-b border-zinc-800 p-6">
                  <SheetTitle className="font-heading text-xl text-lime">
                    eVitality
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-3 border-t border-zinc-800 pt-4">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-zinc-700 text-zinc-300 hover:text-white"
                      >
                        Bejelentkezés
                      </Button>
                    </Link>
                    <Link href="/dashboard/bookings" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-lime text-zinc-950 font-semibold hover:bg-lime-dark rounded-full">
                        Időpontfoglalás
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
