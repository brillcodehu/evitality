"use client";

import { useState } from "react";
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

const clients = [
  {
    id: "1",
    name: "Kovács Anna",
    email: "kovacs.anna@example.com",
    phone: "+36 30 123 4567",
    status: "active",
    package: "Havi 8 alkalom",
    lastSession: "2026-04-22",
  },
  {
    id: "2",
    name: "Tóth Péter",
    email: "toth.peter@example.com",
    phone: "+36 20 234 5678",
    status: "active",
    package: "Havi 12 alkalom",
    lastSession: "2026-04-21",
  },
  {
    id: "3",
    name: "Nagy László",
    email: "nagy.laszlo@example.com",
    phone: "+36 70 345 6789",
    status: "active",
    package: "Havi 4 alkalom",
    lastSession: "2026-04-20",
  },
  {
    id: "4",
    name: "Szabó Eszter",
    email: "szabo.eszter@example.com",
    phone: "+36 30 456 7890",
    status: "inactive",
    package: "Alkalmi",
    lastSession: "2026-03-15",
  },
  {
    id: "5",
    name: "Varga Júlia",
    email: "varga.julia@example.com",
    phone: "+36 20 567 8901",
    status: "active",
    package: "Havi 8 alkalom",
    lastSession: "2026-04-23",
  },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

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
          onChange={(e) => setSearch(e.target.value)}
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
              <TableHead>Csomag</TableHead>
              <TableHead>Utolsó edzés</TableHead>
              <TableHead className="w-12">Műveletek</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="text-zinc-900 hover:text-lime-dark hover:underline"
                  >
                    {client.name}
                  </Link>
                </TableCell>
                <TableCell className="text-zinc-500">{client.email}</TableCell>
                <TableCell className="text-zinc-500">{client.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      client.status === "active"
                        ? "bg-lime/20 text-lime-dark border-lime/30"
                        : "bg-zinc-100 text-zinc-500 border-zinc-200"
                    }
                  >
                    {client.status === "active" ? "Aktív" : "Inaktív"}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-500">{client.package}</TableCell>
                <TableCell className="text-zinc-500">
                  {client.lastSession}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/admin/clients/${client.id}`} className="flex items-center">
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
