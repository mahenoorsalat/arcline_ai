import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmbientBackground from "@/components/AmbientBackground";
import LoadSequence from "@/components/LoadSequence";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AevaShowcase from "@/components/AevaShowcase";
import OutboundCampaign from "@/components/OutboundCampaign";
import ImpactGraph from "@/components/ImpactGraph";
import CallQueue from "@/components/CallQueue";
import ServicesSection from "@/components/ServicesSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      lerp: 0.08,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [loaded]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <LoadSequence onComplete={() => setLoaded(true)} />
      <AmbientBackground />
      {loaded && (
        <>
          <Navbar />
          <HeroSection />
          <AevaShowcase />
          <OutboundCampaign />
          <ImpactGraph />
          <CallQueue />
          <ServicesSection />
          <ShowcaseSection />
          <ContactSection />
        </>
      )}
    </div>
  );
};

export default Index;
