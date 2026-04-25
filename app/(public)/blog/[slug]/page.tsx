import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <section className="bg-zinc-950 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-zinc-400 hover:text-lime transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Vissza a bloghoz
          </Link>
          <Badge className="bg-lime/10 text-lime border-lime/20 mb-4">
            Edzés
          </Badge>
          <h1 className="text-3xl md:text-5xl font-[var(--font-archivo)] font-black text-white mb-6 leading-tight">
            {slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")}
          </h1>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              eVitality
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              2026. április 20.
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />5 perc olvasás
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="prose prose-lg prose-zinc max-w-none">
            <p className="text-lg text-zinc-600 leading-relaxed">
              Ez egy placeholder blog cikk tartalom. A valós tartalom az admin
              felületen keresztül kerülhet feltöltésre és az adatbázisból
              jelenik majd meg.
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-8 mb-4">
              Bevezetés
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Az edzés egy komplex tudomány, amely folyamatosan fejlődik. Ahhoz,
              hogy a legtöbbet hozd ki az edzésből, fontos megértened az
              alapelveket és alkalmazni őket a gyakorlatban.
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-8 mb-4">
              A Legfontosabb Szempontok
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Az edzés tervezésénél figyelembe kell venni a célokat, az aktuális
              fitnesz szintet, az egészségi állapotot és az életmód tényezőket
              is. Nincs egységes megoldás, ami mindenkire működik.
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-8 mb-4">
              Összefoglalás
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Remélem hasznos volt ez a cikk! Ha kérdésed van, írj bizalommal
              vagy foglalj egy ingyenes konzultációt.
            </p>
          </article>

          <div className="mt-12 pt-8 border-t border-zinc-200 text-center">
            <p className="text-zinc-500 mb-4">
              Tetszett a cikk? Foglalj időpontot és beszélgessünk részletesebben!
            </p>
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center bg-lime text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-lime-dark transition-colors"
            >
              Időpontfoglalás
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
