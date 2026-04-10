import { Card, CardContent } from "@/components/ui/card"
import { BrainCircuit, Share2, TrendingUp } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features. Zero Friction.</h2>
          <p className="text-slate-400">Everything you need to command an audience across platforms, packed into one cinematic interface.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Feature 1 */}
          <Card className="bg-slate-900 border-slate-800 transition-all hover:border-cyan-500/50 hover:bg-slate-900/80 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
            <CardContent className="p-8 relative z-10">
              <div className="h-12 w-12 bg-slate-950 border border-slate-800 text-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Generation</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Turn a simple prompt into high-retention short videos. Our AI automatically handles the template, b-roll selection, voiceovers, and dynamic captions to keep your audience hooked.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-slate-900 border-slate-800 transition-all hover:border-blue-500/50 hover:bg-slate-900/80 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
            <CardContent className="p-8 relative z-10">
              <div className="h-12 w-12 bg-slate-950 border border-slate-800 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Platform Scheduling</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Stop copying, pasting, and uploading locally. Hook up your YouTube, Instagram, TikTok, and LinkedIn accounts. VId-z schedules your assets out for weeks automatically.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-slate-900 border-slate-800 transition-all hover:border-purple-500/50 hover:bg-slate-900/80 group overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
            <CardContent className="p-8 relative z-10">
              <div className="h-12 w-12 bg-slate-950 border border-slate-800 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analytics & Reporting</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Consolidate your metrics. Track views, likes, and watch time across every platform from a single, unified command center. Increase engagement by up to 20% by doubling down on what works.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
