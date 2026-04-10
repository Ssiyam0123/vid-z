"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-background border-b border-border flex items-center justify-between px-4 md:px-8 z-0">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden hover:bg-accent"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>
        {/* Render contextual titles here in the future if needed */}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ModeToggle />
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 hover:bg-accent p-2 rounded-lg transition-colors focus:outline-none"
          >
            <div className="text-right hidden sm:block delay-150">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Dashboard User'}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-2 border-background shadow-sm flex items-center justify-center font-bold text-lg font-mono">
              {(user?.firstName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-lg border border-border py-2 animate-in fade-in slide-in-from-top-2 origin-top-right z-50">
              <Link 
                href="/dashboard/settings/profile" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="h-4 w-4" />
                Profile Settings
              </Link>
              <div className="h-px bg-border my-1"></div>
              <button 
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-accent transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
