import { Navbar } from "@/components/landing/Navbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { SolutionSection } from "@/components/landing/SolutionSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { CtaSection } from "@/components/landing/CtaSection"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <HeroSection />
      <SolutionSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
