import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-800/60 relative">
      <div className="container mx-auto px-4 relative z-10">
        <p className="text-center text-sm font-semibold tracking-widest text-slate-500 uppercase mb-8">Trusted by 10,000+ Creators and Brands</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-16">
          <span className="text-2xl font-bold text-white font-serif">Acutis.</span>
          <span className="text-2xl font-bold text-white tracking-widest">NEXUS</span>
          <span className="text-xl font-bold text-white font-mono">Globex</span>
          <span className="text-2xl font-bold text-white italic">Initech</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/60 border-slate-800 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <CardContent className="p-10 text-center">
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-6 h-6 text-cyan-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl md:text-3xl font-medium text-white mb-8 md:px-12 leading-snug">
                "VId-z increased our engagement by over 20% in the first month, all while saving me nearly 10 hours a week in formatting and scheduling. It's absolutely magic."
              </blockquote>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <div className="text-center md:text-left">
                  <p className="font-bold text-white">Jane Doe</p>
                  <p className="text-sm text-slate-400">Marketing Director, TechBridge</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
