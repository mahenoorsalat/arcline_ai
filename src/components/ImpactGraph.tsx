import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

gsap.registerPlugin(ScrollTrigger);

const ImpactGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Set initial path state
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom center",
        scrub: 1.5,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    })
    .from(".impact-stat", {
      textContent: 0,
      duration: 3,
      ease: "power1.out",
      snap: { textContent: 1 },
      stagger: 0.2,
    }, "<");

    // Floating animation
    gsap.to(container, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-16 lg:py-24 px-6 lg:px-10 bg-white rounded-2xl lg:rounded-3xl overflow-hidden border border-black/5 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 lg:mb-12 cursor-default">
        <div>
          <h3 className="text-xl lg:text-2xl font-display font-bold">Live ROI Impact</h3>
          <p className="text-muted-foreground text-xs lg:text-sm mt-1">Real-time performance metrics</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-arcline-blue/5 border border-arcline-blue/10 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-arcline-blue animate-pulse" />
          <ScrambleText text="LIVE DATA" className="text-[8px] lg:text-[10px] tracking-widest text-arcline-blue font-bold uppercase" />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16 relative z-10">
        <div className="space-y-1">
          <ScrambleText text="TOTAL REVENUE" className="text-muted-foreground text-[8px] lg:text-[10px] tracking-widest font-bold uppercase" />
          <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gradient-blue">$<span className="impact-stat">25490</span></div>
        </div>
        <div className="space-y-1">
          <ScrambleText text="CALLS ANSWERED" className="text-muted-foreground text-[8px] lg:text-[10px] tracking-widest font-bold uppercase" />
          <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground"><span className="impact-stat">1280</span></div>
        </div>
        <div className="space-y-1">
          <ScrambleText text="HOURS SAVED" className="text-muted-foreground text-[8px] lg:text-[10px] tracking-widest font-bold uppercase" />
          <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground"><span className="impact-stat">432</span></div>
        </div>
        <div className="space-y-1">
          <ScrambleText text="APPTS BOOKED" className="text-muted-foreground text-[8px] lg:text-[10px] tracking-widest font-bold uppercase" />
          <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground"><span className="impact-stat">840</span></div>
        </div>
      </div>

      <div className="relative h-48 lg:h-64 w-full">
        <svg viewBox="0 0 1000 300" className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="1000" y2="50" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          <line x1="0" y1="150" x2="1000" y2="150" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          
          {/* Gradient fill */}
          <defs>
            <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(210 100% 56% / 0.15)" />
              <stop offset="100%" stopColor="hsl(210 100% 56% / 0)" />
            </linearGradient>
          </defs>
          <path d="M0,250 L100,230 L200,245 L300,180 L400,210 L500,120 L600,150 L700,80 L800,110 L900,40 L1000,60 V300 H0 Z" fill="url(#line-gradient)" />
          
          {/* Animated line */}
          <path 
            ref={pathRef}
            d="M0,250 C100,230 150,250 200,245 S250,180 300,180 S350,220 400,210 S450,120 500,120 S550,160 600,150 S650,80 700,80 S750,120 800,110 S850,40 900,40 S950,70 1000,60" 
            fill="none" 
            stroke="hsl(210 100% 56%)" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default ImpactGraph;
