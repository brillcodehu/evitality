"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ExternalLink,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  views: number;
};

const initialPosts: BlogPost[] = [
  { id: "1", title: "Az 5 Legfontosabb Gyakorlat Kezdőknek", slug: "5-legfontosabb-gyakorlat-kezdoknek", status: "published", publishedAt: "2026-04-20", createdAt: "2026-04-18", views: 342 },
  { id: "2", title: "Fehérje Bevitel Optimalizálása: Mennyire Van Szükséged?", slug: "feherje-bevitel-optimalizalasa", status: "published", publishedAt: "2026-04-15", createdAt: "2026-04-13", views: 289 },
  { id: "3", title: "Hogyan Kerüld El A Sérülést Az Edzőteremben", slug: "hogyan-keruldd-el-a-serulest", status: "published", publishedAt: "2026-04-10", createdAt: "2026-04-08", views: 215 },
  { id: "4", title: "Miért Fontos Az Alvás A Fitnesz Célok Elérésében?", slug: "miert-fontos-az-alvas", status: "published", publishedAt: "2026-04-05", createdAt: "2026-04-03", views: 178 },
  { id: "5", title: "HIIT vs. LISS Kardió: Melyik A Jobb Fogyás Szempontjából?", slug: "hiit-vs-liss-kardio", status: "published", publishedAt: "2026-03-28", createdAt: "2026-03-25", views: 456 },
  { id: "6", title: "A Stressz És A Testsúly Kapcsolata", slug: "stressz-es-testsuly", status: "draft", publishedAt: null, createdAt: "2026-04-22", views: 0 },
  { id: "7", title: "Kreatint Érdemes Szedni? Teljes Útmutató", slug: "kreatin-utmutato", status: "draft", publishedAt: null, createdAt: "2026-04-21", views: 0 },
];

export default function BlogManagementPage() {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [dialogOpen, setDialogOpen] = useState(false);

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            Blog kezelés
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Írj és kezelj blog cikkeket az ügyfeleidnek
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none bg-lime text-zinc-900 hover:bg-lime-dark font-semibold h-10 px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Új cikk
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Új blog cikk</DialogTitle>
              <DialogDescription>
                Kezdj el írni egy új cikket
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Cím</Label>
                <Input placeholder="A cikk címe..." />
              </div>
              <div className="space-y-2">
                <Label>URL slug</Label>
                <Input placeholder="cikk-cime-automatikus" />
              </div>
              <div className="space-y-2">
                <Label>Kivonat</Label>
                <Textarea placeholder="Rövid összefoglaló..." rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Tartalom</Label>
                <Textarea placeholder="A cikk tartalma..." rows={8} />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setDialogOpen(false);
                    toast.success("Vázlat mentve!");
                  }}
                >
                  Mentés vázlatként
                </Button>
                <Button
                  className="flex-1 bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
                  onClick={() => {
                    setDialogOpen(false);
                    toast.success("Cikk publikálva!");
                  }}
                >
                  Publikálás
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <p className="text-sm text-zinc-500">Publikált cikkek</p>
            <p className="text-2xl font-bold text-zinc-900">{publishedCount}</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <p className="text-sm text-zinc-500">Vázlatok</p>
            <p className="text-2xl font-bold text-zinc-900">{draftCount}</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <p className="text-sm text-zinc-500">Összes megtekintés</p>
            <p className="text-2xl font-bold text-zinc-900">{totalViews.toLocaleString("hu-HU")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg">Cikkek</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cím</TableHead>
                <TableHead>Státusz</TableHead>
                <TableHead>Dátum</TableHead>
                <TableHead>Megtekintés</TableHead>
                <TableHead className="text-right">Műveletek</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                      <span className="font-medium text-sm">{post.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        post.status === "published"
                          ? "bg-lime/20 text-lime-dark border-lime/30"
                          : "bg-zinc-100 text-zinc-600 border-zinc-200"
                      }
                    >
                      {post.status === "published" ? "Publikált" : "Vázlat"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500">
                    {post.publishedAt || post.createdAt}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500">
                    {post.views > 0 ? (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {post.views}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Szerkesztés
                        </DropdownMenuItem>
                        {post.status === "published" && (
                          <DropdownMenuItem>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Megtekintés
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Törlés
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
