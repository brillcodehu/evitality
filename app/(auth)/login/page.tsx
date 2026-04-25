"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Hibás email vagy jelszó");
      setLoading(false);
      return;
    }

    toast.success("Sikeres bejelentkezés!");
    router.push("/dashboard");
    router.refresh();
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
          Jelentkezz be a fiókodba
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="password" className="text-zinc-300">
              Jelszó
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Jelszó"
                required
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
              "Bejelentkezés"
            )}
          </Button>
        </form>
        <p className="text-center text-sm text-zinc-500 mt-4">
          Még nincs fiókod?{" "}
          <Link href="/register" className="text-lime hover:underline">
            Regisztráció
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
