"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrainCircuit } from "lucide-react"
import { useAuth } from "@/components/providers/AuthProvider"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-cyan-500 rounded-lg p-1.5">
             <BrainCircuit className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">VId-z</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link>
          <Link href="#solution" className="hover:text-cyan-400 transition-colors">How it Works</Link>
          <Link href="#testimonials" className="hover:text-cyan-400 transition-colors">Testimonials</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <>
              <Button variant="ghost" asChild className="hidden text-sm font-medium text-muted-foreground hover:text-foreground md:block border-0 hover:bg-accent">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <div className="relative group">
                <Button className="h-8 w-8 rounded-full bg-secondary text-cyan-400 border border-border p-0 flex items-center justify-center font-bold">
                  {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                </Button>
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-popover border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <button 
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden text-sm font-medium text-muted-foreground hover:text-foreground border-0 md:block hover:bg-accent">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-primary-foreground font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Link href="/register">Start Free Trial</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
