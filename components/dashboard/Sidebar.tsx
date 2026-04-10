"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { 
  BrainCircuit, 
  Plus, 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  CreditCard, 
  Settings,
  ArrowUpCircle,
  UserCircle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Series", href: "/dashboard", icon: LayoutDashboard },
  { name: "Videos", href: "/dashboard/videos", icon: Video },
  { name: "Guides", href: "/dashboard/guides", icon: BookOpen },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const footerItems = [
  { name: "Upgrade Plan", href: "/dashboard/billing/upgrade", icon: ArrowUpCircle, highlight: true },
  { name: "User Profile Settings", href: "/dashboard/settings/profile", icon: UserCircle },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="w-80 flex-shrink-0 border-r border-border bg-card flex flex-col h-full shadow-sm z-10 transition-all">
      {/* Top Brand Section */}
      <div className="p-6 pb-2 border-b border-border">
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-cyan-500 rounded-lg p-2 shadow-sm text-primary-foreground">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">VId-z</span>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-accent h-10 w-10 rounded-xl"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <Link href="/dashboard/create">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md py-6 mb-6">
            <Plus className="mr-2 h-5 w-5" />
            Create New Series
          </Button>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Main Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-accent text-cyan-500" 
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-cyan-500" : "text-muted-foreground"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-border space-y-1 bg-card">
        {footerItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.highlight 
                  ? "text-cyan-500 hover:bg-cyan-500/10" 
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${item.highlight ? "text-cyan-500" : "text-muted-foreground"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
