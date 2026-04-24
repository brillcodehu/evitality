"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  CalendarPlus,
  Dumbbell,
  TrendingUp,
  Utensils,
  MessageSquare,
  FileText,
  Settings,
  Menu,
} from "lucide-react";

const navItems = [
  { label: "Kezdőlap", href: "/dashboard", icon: LayoutDashboard },
  { label: "Időpontfoglalás", href: "/dashboard/bookings", icon: CalendarPlus },
  { label: "Edzéstervem", href: "/dashboard/my-plan", icon: Dumbbell },
  { label: "Haladásom", href: "/dashboard/progress", icon: TrendingUp },
  { label: "Étrendem", href: "/dashboard/nutrition", icon: Utensils },
  { label: "Üzenetek", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Dokumentumok", href: "/dashboard/documents", icon: FileText },
  { label: "Beállítások", href: "/dashboard/settings", icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-lime text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <div className="fixed bottom-4 left-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-lime text-foreground shadow-lg hover:bg-lime-dark focus-visible:outline-none">
              <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-14 items-center border-b px-4">
              <span className="font-heading text-lg font-bold">
                <span className="text-lime">e</span>Vitality
              </span>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <NavLinks />
        </div>
      </aside>
    </>
  );
}
