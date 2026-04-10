import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-slate-950/0 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to dominate the algorithm?</h2>
        <p className="text-xl text-slate-400 mb-10">
          Join the ranks of top-tier creators and digital marketers who have reclaimed their week. Start your 14-day free trial of VId-z today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
           <Button size="lg" className="h-16 px-10 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xl rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 w-full sm:w-auto">
              Start Saving Time Now
            </Button>
        </div>
        <p className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-cyan-500" /> Cancel anytime. No obligations.
        </p>
      </div>
    </section>
  )
}
