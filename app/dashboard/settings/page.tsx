"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, User, Bell, Calendar, Copy } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const icsUrl = "webcal://evitality.hu/api/calendar/feed.ics?token=client123";

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Beállítások
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Profil és értesítési beállítások
        </p>
      </div>

      {/* Profile */}
      <Card className="border-zinc-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-lime" />
            <CardTitle className="text-lg">Személyes adatok</CardTitle>
          </div>
          <CardDescription>
            Tartsd naprakészen az adataidat
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Név</Label>
              <Input defaultValue="Kovács Anna" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="anna.kovacs@email.hu" type="email" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input defaultValue="+36 30 987 6543" />
            </div>
            <div className="space-y-2">
              <Label>Születési dátum</Label>
              <Input defaultValue="1992-05-14" type="date" />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Fitnesz céljaim</Label>
            <Textarea
              defaultValue="Fogyás (cél: 70 kg), erőnövelés, egészségesebb életmód kialakítása"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Egészségügyi megjegyzések</Label>
            <Textarea
              defaultValue="Enyhe térdprobléma (bal láb), allergia: laktóz érzékenység"
              rows={2}
            />
          </div>
          <Button
            onClick={() => toast.success("Profil mentve!")}
            className="bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
          >
            <Save className="h-4 w-4 mr-2" />
            Mentés
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-zinc-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-lime" />
            <CardTitle className="text-lg">Értesítések</CardTitle>
          </div>
          <CardDescription>
            Milyen értesítéseket szeretnél kapni
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Edzés emlékeztető", desc: "24 órával és 2 órával az edzés előtt", default: true },
            { label: "Edzésterv frissítés", desc: "Ha az edző frissíti az edzéstervedet", default: true },
            { label: "Új üzenet", desc: "Ha az edződ üzenetet küld", default: true },
            { label: "Haladási emlékeztető", desc: "Heti emlékeztető a mérések rögzítésére", default: false },
            { label: "Blog értesítés", desc: "Ha új blog cikk jelenik meg", default: false },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900">{notif.label}</p>
                <p className="text-xs text-zinc-500">{notif.desc}</p>
              </div>
              <Switch defaultChecked={notif.default} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calendar Sync */}
      <Card className="border-zinc-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-lime" />
            <CardTitle className="text-lg">Naptár szinkronizáció</CardTitle>
          </div>
          <CardDescription>
            Szinkronizáld az edzéseidet a telefonod naptárával
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-zinc-500">ICS Feed URL</Label>
            <div className="flex gap-2 mt-1">
              <Input value={icsUrl} readOnly className="font-mono text-xs" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(icsUrl);
                  toast.success("URL vágólapra másolva!");
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-zinc-50 rounded-lg p-4 text-sm text-zinc-600 space-y-2">
            <p className="font-medium text-zinc-900">Hogyan add hozzá?</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Másold ki a fenti URL-t</li>
              <li><strong>iPhone:</strong> Beállítások &rarr; Naptár &rarr; Fiókok &rarr; Előfizetett naptár hozzáadása</li>
              <li><strong>Android:</strong> Google Naptár &rarr; Más naptárak &rarr; URL-ről</li>
              <li>Illeszd be az URL-t és mentsd el</li>
              <li>Az edzéseid automatikusan megjelennek a naptáradban</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg">Jelszó módosítása</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Jelenlegi jelszó</Label>
            <Input type="password" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Új jelszó</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Jelszó megerősítése</Label>
              <Input type="password" />
            </div>
          </div>
          <Button
            onClick={() => toast.success("Jelszó módosítva!")}
            variant="outline"
          >
            Jelszó módosítása
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
