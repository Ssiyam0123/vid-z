import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, BrainCircuit, Layers, CalendarDays } from "lucide-react"

export function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-slate-900/30 border-y border-slate-800/60">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Content Treadmill is Broken.</h2>
          <p className="text-lg text-slate-400">
            For small business owners and marketing managers, creating content is a nightmare. Recording clips, editing formats, writing captions, and manually posting to 4 different apps at optimum times takes a massive toll on your productivity. You are not a full-time video editor—you have a business to run.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
           
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Enter VId-z: The Perfect Solution.
            </h3>
            <p className="text-slate-400">
              VId-z eliminates the headache of manual, multi-platform content scheduling. In just one interface, generate stunning videos via AI, and let our system deploy them to all your channels simultaneously.
            </p>
            <ul className="space-y-3">
               {[
                 "Zero editing skills required.", 
                 "One-click multi-platform publishing.", 
                 "Automated formatting for Reels, Shorts & TikTok.",
                 "Save up to 10 hours a week on content operations."
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-slate-300">
                   <CheckCircle2 className="h-5 w-5 text-cyan-500" />
                   {item}
                 </li>
               ))}
            </ul>
          </div>
          
          <div className="relative z-10">
            {/* Infographic block */}
             <Card className="bg-slate-950/80 border-slate-800 backdrop-blur-md">
               <CardContent className="p-6">
                 <div className="flex flex-col gap-4 relative">
                    <div className="flex justify-between items-center p-4 bg-slate-900 border border-slate-800 rounded-lg">
                       <div className="flex items-center gap-3"><BrainCircuit className="text-cyan-400 h-6 w-6"/> <span className="font-medium text-slate-200">1. Generate via AI</span></div>
                    </div>
                    <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-slate-800"></div>
                    <div className="flex justify-between items-center p-4 bg-slate-900 border border-slate-800 rounded-lg ml-8 relative">
                       <div className="absolute -left-8 top-1/2 w-8 h-0.5 bg-slate-800"></div>
                       <div className="flex items-center gap-3"><Layers className="text-blue-500 h-6 w-6"/> <span className="font-medium text-slate-200">2. Format for Platforms</span></div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-900 border border-cyan-500/30 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] relative ml-8">
                       <div className="absolute -left-8 top-1/2 w-8 h-0.5 bg-cyan-500/50"></div>
                       <div className="flex items-center gap-3"><CalendarDays className="text-cyan-400 h-6 w-6"/> <span className="font-medium text-slate-200">3. Auto-Schedule & Deploy</span></div>
                    </div>
                 </div>
               </CardContent>
             </Card>
          </div>
           {/* decorative glow */}
          <div className="absolute top-1/4 -right-20 w-64 h-64 bg-cyan-600/20 blur-[80px] pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}
