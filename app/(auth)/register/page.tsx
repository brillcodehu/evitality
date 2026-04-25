"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { registerUser } from "@/lib/actions/auth-actions";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const result = await registerUser(formData);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success("Sikeres regisztráció! Jelentkezz be.");
    router.push("/login");
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
      <CardHeader className="text-center space-y-2 pb-2">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-[var(--font-archivo)] font-black text-lime tracking-tight">
            eVitality
          </span>
        </Link>
        <p className="text-zinc-400 text-sm">
          Hozd létre a fiókodat és kezdj el edzeni!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300">
              Teljes név
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="name"
                name="name"
                placeholder="Kovács Anna"
                required
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="pelda@email.com"
                required
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-300">
              Telefonszám
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+36 30 123 4567"
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">
              Jelszó
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 8 karakter"
                required
                minLength={8}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-zinc-300">
              Jelszó megerősítése
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Jelszó újra"
                required
                minLength={8}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Regisztráció"
            )}
          </Button>
        </form>
        <p className="text-center text-sm text-zinc-500 mt-4">
          Már van fiókod?{" "}
          <Link href="/login" className="text-lime hover:underline">
            Bejelentkezés
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
