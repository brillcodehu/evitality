"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, TrendingUp, Clock, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "Havi bevétel", value: "742.000 Ft", change: "+12%", up: true, icon: Wallet },
  { label: "Kintlévőség", value: "85.000 Ft", change: "2 számla", up: false, icon: Clock },
  { label: "Kiállított számlák", value: "18", change: "Ebben a hónapban", up: true, icon: Receipt },
  { label: "Átlag ügyfél érték", value: "32.260 Ft", change: "+5%", up: true, icon: TrendingUp },
];

const invoices = [
  { id: "INV-2026-042", client: "Kovács Anna", amount: "85.000 Ft", status: "paid", date: "2026-04-20", dueDate: "2026-04-20", plan: "Prémium csomag" },
  { id: "INV-2026-041", client: "Tóth Péter", amount: "45.000 Ft", status: "paid", date: "2026-04-18", dueDate: "2026-04-18", plan: "Alap csomag" },
  { id: "INV-2026-040", client: "Szabó Eszter", amount: "150.000 Ft", status: "paid", date: "2026-04-15", dueDate: "2026-04-15", plan: "VIP csomag" },
  { id: "INV-2026-039", client: "Nagy László", amount: "85.000 Ft", status: "overdue", date: "2026-04-10", dueDate: "2026-04-10", plan: "Prémium csomag" },
  { id: "INV-2026-038", client: "Kiss Gábor", amount: "45.000 Ft", status: "paid", date: "2026-04-08", dueDate: "2026-04-08", plan: "Alap csomag" },
  { id: "INV-2026-037", client: "Varga Júlia", amount: "85.000 Ft", status: "pending", date: "2026-04-05", dueDate: "2026-04-30", plan: "Prémium csomag" },
  { id: "INV-2026-036", client: "Horváth Dániel", amount: "150.000 Ft", status: "paid", date: "2026-04-01", dueDate: "2026-04-01", plan: "VIP csomag" },
  { id: "INV-2026-035", client: "Molnár Réka", amount: "45.000 Ft", status: "paid", date: "2026-04-01", dueDate: "2026-04-01", plan: "Alap csomag" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  paid: { label: "Fizetve", className: "bg-lime/20 text-lime-dark border-lime/30" },
  pending: { label: "Függőben", className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20" },
  overdue: { label: "Lejárt", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const monthlyData = [
  { month: "Jan", revenue: 580000 },
  { month: "Feb", revenue: 620000 },
  { month: "Már", revenue: 650000 },
  { month: "Ápr", revenue: 742000 },
];

export default function FinancesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Pénzügyek
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Bevételek, számlák és pénzügyi áttekintés
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-zinc-200">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-zinc-400" />
              </div>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                {stat.up ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg">Havi bevétel alakulás</CardTitle>
          <CardDescription>Az elmúlt 4 hónap bevételei</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-6 h-48 px-4">
            {monthlyData.map((d) => {
              const height = (d.revenue / 800000) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-zinc-700">
                    {(d.revenue / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full rounded-t-md bg-lime/80 transition-all hover:bg-lime"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-zinc-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg">Számlák</CardTitle>
          <CardDescription>Legutóbbi kiállított számlák</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Szám</TableHead>
                <TableHead>Ügyfél</TableHead>
                <TableHead>Csomag</TableHead>
                <TableHead>Összeg</TableHead>
                <TableHead>Státusz</TableHead>
                <TableHead>Dátum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const sc = statusConfig[invoice.status];
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="text-sm font-mono text-zinc-500">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {invoice.client}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {invoice.plan}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {invoice.amount}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={sc.className}>
                        {sc.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {invoice.date}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
