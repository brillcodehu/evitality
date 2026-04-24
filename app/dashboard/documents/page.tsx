"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  ClipboardList,
  FileSignature,
  Receipt,
  Eye,
} from "lucide-react";

type Document = {
  id: string;
  name: string;
  type: "parq" | "contract" | "invoice";
  status: "completed" | "pending";
  date: string;
  description: string;
};

const documents: Document[] = [
  { id: "1", name: "PAR-Q Kérdőív", type: "parq", status: "completed", date: "2026-01-15", description: "Fizikai aktivitási készültségi kérdőív" },
  { id: "2", name: "Edzési Szerződés", type: "contract", status: "completed", date: "2026-01-15", description: "Személyi edzés szolgáltatási szerződés" },
  { id: "3", name: "Felelősségvállalási Nyilatkozat", type: "contract", status: "completed", date: "2026-01-15", description: "Edzőtermi felelősségvállalás" },
  { id: "4", name: "Egészségügyi Nyilatkozat", type: "parq", status: "completed", date: "2026-01-15", description: "Egészségi állapot felmérés" },
  { id: "5", name: "Számla - Április 2026", type: "invoice", status: "completed", date: "2026-04-01", description: "Prémium csomag - 85.000 Ft" },
  { id: "6", name: "Számla - Március 2026", type: "invoice", status: "completed", date: "2026-03-01", description: "Prémium csomag - 85.000 Ft" },
  { id: "7", name: "Számla - Február 2026", type: "invoice", status: "completed", date: "2026-02-01", description: "Prémium csomag - 85.000 Ft" },
  { id: "8", name: "Számla - Május 2026", type: "invoice", status: "pending", date: "2026-05-01", description: "Prémium csomag - 85.000 Ft" },
];

const typeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  parq: { label: "PAR-Q", icon: ClipboardList, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  contract: { label: "Szerződés", icon: FileSignature, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  invoice: { label: "Számla", icon: Receipt, color: "bg-lime/20 text-lime-dark border-lime/30" },
};

const statusConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  completed: { label: "Teljesítve", icon: CheckCircle2, className: "bg-lime/20 text-lime-dark border-lime/30" },
  pending: { label: "Függőben", icon: Clock, className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20" },
};

export default function DocumentsPage() {
  const categories = [
    { key: "parq", title: "PAR-Q kérdőívek", description: "Egészségügyi felmérések és nyilatkozatok" },
    { key: "contract", title: "Szerződések", description: "Szolgáltatási és felelősségvállalási dokumentumok" },
    { key: "invoice", title: "Számlák", description: "Fizetési bizonylatok" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Dokumentumok
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Kérdőívek, szerződések és számlák egy helyen
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat) => {
          const config = typeConfig[cat.key];
          const count = documents.filter((d) => d.type === cat.key).length;
          return (
            <Card key={cat.key} className="border-zinc-200">
              <CardContent className="pt-5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color.split(" ")[0]}`}>
                  <config.icon className={`h-5 w-5 ${config.color.split(" ")[1]}`} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{config.label}</p>
                  <p className="text-xl font-bold text-zinc-900">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Document Lists by Category */}
      {categories.map((cat) => {
        const catDocs = documents.filter((d) => d.type === cat.key);
        if (catDocs.length === 0) return null;

        return (
          <Card key={cat.key} className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">{cat.title}</CardTitle>
              <CardDescription>{cat.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {catDocs.map((doc) => {
                const tc = typeConfig[doc.type];
                const sc = statusConfig[doc.status];
                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/50 p-4 hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tc.color.split(" ")[0]}`}>
                        <FileText className={`h-5 w-5 ${tc.color.split(" ")[1]}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          {doc.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-zinc-500">
                            {doc.date}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {doc.description}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={sc.className}>
                        <sc.icon className="h-3 w-3 mr-1" />
                        {sc.label}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-700">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
