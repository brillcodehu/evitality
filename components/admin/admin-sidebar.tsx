"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CalendarCheck,
  Dumbbell,
  Library,
  Apple,
  FileText,
  Wallet,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const navItems = [
  { label: "Áttekintés", icon: LayoutDashboard, href: "/admin" },
  { label: "Ügyfelek", icon: Users, href: "/admin/clients" },
  { label: "Órarend", icon: CalendarDays, href: "/admin/schedule" },
  { label: "Foglalások", icon: CalendarCheck, href: "/admin/bookings" },
  { label: "Programok", icon: Dumbbell, href: "/admin/programs" },
  { label: "Gyakorlatok", icon: Library, href: "/admin/exercises" },
  { label: "Táplálkozás", icon: Apple, href: "/admin/nutrition" },
  { label: "Blog", icon: FileText, href: "/admin/blog" },
  { label: "Pénzügyek", icon: Wallet, href: "/admin/finances" },
  { label: "Beállítások", icon: Settings, href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "EV";

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-zinc-900 text-zinc-300">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-heading text-2xl tracking-tight text-lime">
            eVitality
          </span>
        </Link>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-lime/10 text-lime"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 ${
                    active ? "text-lime" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {active && (
                  <ChevronRight className="h-4 w-4 text-lime/60" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator className="bg-zinc-800" />

      {/* User info */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-zinc-700">
            <AvatarFallback className="bg-lime/20 text-xs font-semibold text-lime">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-zinc-200">
              {session?.user?.name || "Edző"}
            </p>
            <p className="truncate text-xs text-zinc-500">
              {session?.user?.email || ""}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            onClick={() => signOut({ callbackUrl: "/" })}
            title="Kijelentkezés"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
