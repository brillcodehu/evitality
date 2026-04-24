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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Save, Calendar, Bell, User, Shield } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const icsUrl = "webcal://evitality.hu/api/calendar/feed.ics?token=abc123";

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Beállítások
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Platform és profil beállítások kezelése
        </p>
      </div>

      {/* Profile */}
      <Card className="border-zinc-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-lime" />
            <CardTitle className="text-lg">Profil adatok</CardTitle>
          </div>
          <CardDescription>
            Az edzői profilod adatai, amik a publikus oldalon is megjelennek
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Név</Label>
              <Input defaultValue="Kiss Trainer" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="trainer@evitality.hu" type="email" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input defaultValue="+36 30 123 4567" />
            </div>
            <div className="space-y-2">
              <Label>Helyszín</Label>
              <Input defaultValue="Budapest, XIII. kerület" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Bemutatkozás</Label>
            <Textarea
              defaultValue="Több mint 8 éve segítem az embereket fitnesz céljaik elérésében. Személyre szabott programokkal dolgozom."
              rows={3}
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

      {/* Booking Settings */}
      <Card className="border-zinc-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-lime" />
            <CardTitle className="text-lg">Foglalási beállítások</CardTitle>
          </div>
          <CardDescription>
            Szabályozd, hogyan foglalhatnak időpontot az ügyfeleid
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lemondási határidő</Label>
              <Select defaultValue="24">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 óra</SelectItem>
                  <SelectItem value="12">12 óra</SelectItem>
                  <SelectItem value="24">24 óra</SelectItem>
                  <SelectItem value="48">48 óra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Előre foglalható napok</Label>
              <Select defaultValue="14">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">1 hét</SelectItem>
                  <SelectItem value="14">2 hét</SelectItem>
                  <SelectItem value="30">1 hónap</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Edzések közti szünet (perc)</Label>
              <Input type="number" defaultValue={15} min={0} max={60} />
            </div>
            <div className="space-y-2">
              <Label>Alapértelmezett edzéshossz (perc)</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 perc</SelectItem>
                  <SelectItem value="45">45 perc</SelectItem>
                  <SelectItem value="60">60 perc</SelectItem>
                  <SelectItem value="90">90 perc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-900">Automatikus megerősítés</p>
              <p className="text-xs text-zinc-500">Foglalások automatikus elfogadása</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-900">Online foglalás engedélyezése</p>
              <p className="text-xs text-zinc-500">Ügyfelek maguk foglalhatnak a portálon</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button
            onClick={() => toast.success("Beállítások mentve!")}
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
            { label: "Új foglalás", desc: "Értesítés amikor egy ügyfél foglal", default: true },
            { label: "Lemondás", desc: "Értesítés amikor egy ügyfél lemond", default: true },
            { label: "Új üzenet", desc: "Értesítés beérkező üzenetről", default: true },
            { label: "Új regisztráció", desc: "Értesítés amikor új ügyfél regisztrál", default: true },
            { label: "Fizetési emlékeztető", desc: "Emlékeztető lejáró számlákról", default: false },
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
            <Shield className="h-5 w-5 text-lime" />
            <CardTitle className="text-lg">Naptár szinkronizáció</CardTitle>
          </div>
          <CardDescription>
            Szinkronizáld a foglalásaidat iPhone vagy Google naptárral
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
              <li>iPhone: Beállítások &rarr; Naptár &rarr; Fiókok &rarr; Előfizetett naptár hozzáadása</li>
              <li>Illeszd be az URL-t és mentsd el</li>
              <li>A foglalásaid automatikusan megjelennek a naptáradban</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
