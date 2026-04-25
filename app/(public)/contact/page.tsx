"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  { icon: Phone, label: "Telefon", value: "+36 30 123 4567" },
  { icon: Mail, label: "Email", value: "info@evitality.hu" },
  { icon: MapPin, label: "Helyszín", value: "Budapest, XIII. kerület" },
  { icon: Clock, label: "Nyitvatartás", value: "H-P: 6:00-21:00, Szo: 8:00-14:00" },
];

function SocialIcon({ type, className }: { type: string; className?: string }) {
  if (type === "instagram") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
  if (type === "facebook") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socials = [
  { type: "instagram", label: "Instagram", href: "#" },
  { type: "facebook", label: "Facebook", href: "#" },
  { type: "youtube", label: "YouTube", href: "#" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Üzenet elküldve! Hamarosan válaszolok.");
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-zinc-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-lime/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="max-w-3xl">
            <Badge className="bg-lime/10 text-lime border-lime/20 mb-4">
              Kapcsolat
            </Badge>
            <h1 className="text-4xl md:text-6xl font-[var(--font-archivo)] font-black text-white mb-6">
              Lépj Velem{" "}
              <span className="text-lime">Kapcsolatba</span>
            </h1>
            <p className="text-lg text-zinc-400">
              Kérdésed van? Írj nekem bátran, és 24 órán belül válaszolok!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                Elérhetőségeim
              </h2>
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">{item.label}</p>
                    <p className="font-medium text-zinc-900">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="pt-6 border-t border-zinc-200">
                <p className="text-sm text-zinc-500 mb-3">Kövess a közösségi médián!</p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-lime/10 hover:text-lime transition-colors text-zinc-600"
                    >
                      <SocialIcon type={social.type} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="p-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                    Írj Nekem
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Név</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Teljes neved"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="példa@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefonszám</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+36 30 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Tárgy</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Miben segíthetek?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Üzenet</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Írd le részletesen, miben segíthetek..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Üzenet Küldése
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-80 bg-zinc-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
            <p className="text-zinc-500">Google Maps térkép itt jelenik meg</p>
          </div>
        </div>
      </section>
    </main>
  );
}
