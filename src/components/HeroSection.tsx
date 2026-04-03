import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import ScrambleText from "./ScrambleText";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!badgeRef.current || !subtitleRef.current || !ctaRef.current) return;
    
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 15, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div ref={badgeRef} className="mb-8 opacity-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 text-sm text-muted-foreground shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <ScrambleText text="AI · Automation · Experience" className="text-xs tracking-widest uppercase font-bold" />
          </span>
        </div>

        <TextReveal
          text="We build digital"
          as="h1"
          variant="fade"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-1 lg:mb-2"
          scrollTrigger={true}
          delay={0}
        />
        <TextReveal
          text="products that move."
          as="h1"
          variant="fade"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-gradient-blue mb-6 lg:mb-8"
          scrollTrigger={true}
          delay={0.1}
        />

        <TextReveal
          text="Technology and design studio at the intersection of AI, automation, and web experience. Motion that stops you mid-scroll."
          as="p"
          variant="char"
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
          scrollTrigger={true}
          delay={0.4}
          stagger={0.01}
        />

        <div ref={ctaRef} className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 opacity-0">
          <MagneticButton>
            <button className="w-full sm:w-auto group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_hsl(210_100%_56%_/_0.5)]">
              <span className="relative z-10">Explore Our Work</span>
            </button>
          </MagneticButton>
          <MagneticButton>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-black/10 bg-white/5 text-foreground font-medium text-sm tracking-wide hover:bg-secondary transition-all duration-300">
              Learn More
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
      </div>
    </section>
  );
};

export default HeroSection;
