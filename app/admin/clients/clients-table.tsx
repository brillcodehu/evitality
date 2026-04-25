"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Client = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  isActive: boolean;
  createdAt: Date;
};

export function ClientsTable({
  clients,
  initialSearch,
}: {
  clients: Client[];
  initialSearch: string;
}) {
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();

  function handleSearch(value: string) {
    setSearch(value);
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    router.push(`/admin/clients${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            Ügyfelek
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Ügyfélnyilvántartás és kezelés
          </p>
        </div>
        <Button className="bg-lime text-zinc-900 hover:bg-lime-dark">
          <Plus className="mr-2 h-4 w-4" />
          Új ügyfél
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Keresés név vagy email alapján..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Név</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Státusz</TableHead>
              <TableHead>Regisztráció</TableHead>
              <TableHead className="w-12">Műveletek</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-sm text-zinc-400"
                >
                  Nincsenek ügyfelek
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-zinc-900 hover:text-lime-dark hover:underline"
                    >
                      {client.name || "Névtelen"}
                    </Link>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {client.email}
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {client.phone || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        client.isActive
                          ? "bg-lime/20 text-lime-dark border-lime/30"
                          : "bg-zinc-100 text-zinc-500 border-zinc-200"
                      }
                    >
                      {client.isActive ? "Aktív" : "Inaktív"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {client.createdAt.toLocaleDateString("hu-HU")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link
                            href={`/admin/clients/${client.id}`}
                            className="flex items-center"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Megtekintés
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Szerkesztés
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Törlés
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
