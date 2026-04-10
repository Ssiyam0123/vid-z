import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Introducing Auto-Pilot Publishing V2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Skip the Grind. Put Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Short Video Content on Autopilot.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto">
            VId-z instantly generates professional short videos using AI templates and automatically schedules them across YouTube, Instagram, TikTok, and LinkedIn.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center hover:scale-105">
              Save 10 Hours a Week Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white rounded-full font-medium flex items-center bg-transparent">
              <Play className="mr-2 h-4 w-4" /> Watch 2-Min Demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-slate-500">No credit card required • 14-day free trial</p>
        </div>

        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm relative">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 h-[101%] w-[101%] opacity-60 rounded-xl"></div>
             <Image 
               src="/hero-mockup.png" 
               alt="VId-z Dashboard Mockup showing AI scheduling and generation" 
               width={1920} 
               height={1080} 
               className="rounded-xl object-cover border border-slate-800 aspect-video relative z-0" 
               priority
             />
          </div>
        </div>
      </div>
    </section>
  )
}
