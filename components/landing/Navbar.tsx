import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrainCircuit } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-500 rounded-lg p-1.5">
             <BrainCircuit className="h-5 w-5 text-slate-950" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">VId-z</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link>
          <Link href="#solution" className="hover:text-cyan-400 transition-colors">How it Works</Link>
          <Link href="#testimonials" className="hover:text-cyan-400 transition-colors">Testimonials</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden text-sm font-medium text-slate-300 hover:text-white md:block">
            Log in
          </Link>
          <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            Start Free Trial
          </Button>
        </div>
      </div>
    </header>
  )
}
