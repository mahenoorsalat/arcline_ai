import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const OutboundCampaign = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGSVGElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const paths = section.querySelectorAll(".campaign-path");
    const endpoints = section.querySelectorAll(".campaign-endpoint");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // 1. Grow paths and light up endpoints
    paths.forEach((path, i) => {
      tl.fromTo(
        path,
        { strokeDasharray: "1000", strokeDashoffset: "1000" },
        { 
          strokeDashoffset: 0, 
          duration: 1, 
          ease: "power2.inOut",
          onUpdate: () => {
             // Mock percentage update based on first path
             if (i === 0) {
                const progress = tl.progress();
                setCompletedCount(Math.floor(progress * 4));
             }
          }
        },
        i * 0.2
      );

      tl.fromTo(
        endpoints[i],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
        (i * 0.2) + 0.8
      );
    });

    // 2. Pill background change
    tl.to(pillRef.current, {
      backgroundColor: "hsl(210 100% 56%)",
      color: "white",
      duration: 0.5,
    }, ">-0.5");

    // 3. Final cards pop-in
    tl.fromTo(
      cardsRef.current?.children || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      ">"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 lg:py-32 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12 lg:mb-16">
          <ScrambleText 
            text="AI OUTBOUND" 
            className="text-[10px] lg:text-xs tracking-[0.4em] text-muted-foreground mb-4 lg:mb-6 block font-bold" 
          />
          <TextReveal 
            text="Autonomous expansion at scale." 
            as="h2" 
            variant="fade"
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight px-4"
          />
        </div>

        {/* Central Hub Visualization */}
        <div className="relative w-full max-w-4xl h-[400px] lg:h-[500px] mb-12 lg:mb-20 flex items-center justify-center">
          <div className="absolute inset-0 scale-[0.6] sm:scale-[0.8] lg:scale-100 transition-transform duration-500">
            <svg ref={pathsRef} className="w-full h-full" viewBox="0 0 800 400">
              {/* Connection Paths */}
              <path className="campaign-path stroke-arcline-blue/20 fill-none" d="M400,200 C300,100 150,150 100,100" strokeWidth="2" strokeDasharray="10" />
              <path className="campaign-path stroke-arcline-blue/20 fill-none" d="M400,200 C500,100 650,150 700,100" strokeWidth="2" strokeDasharray="10" />
              <path className="campaign-path stroke-arcline-blue/20 fill-none" d="M400,200 C250,300 150,250 100,350" strokeWidth="2" strokeDasharray="10" />
              <path className="campaign-path stroke-arcline-blue/20 fill-none" d="M400,200 C550,300 650,250 700,350" strokeWidth="2" strokeDasharray="10" />

              {/* Endpoints */}
              <circle className="campaign-endpoint fill-arcline-blue" cx="100" cy="100" r="6" />
              <circle className="campaign-endpoint fill-arcline-blue" cx="700" cy="100" r="6" />
              <circle className="campaign-endpoint fill-arcline-blue" cx="100" cy="350" r="6" />
              <circle className="campaign-endpoint fill-arcline-blue" cx="700" cy="350" r="6" />

              {/* Central Hub */}
              <g className="relative cursor-pointer group">
                <circle cx="400" cy="200" r="40" className="fill-white stroke-arcline-blue stroke-2" />
                <path 
                  d="M392 190 L408 190 L408 215 L392 215 Z" 
                  className="fill-arcline-blue animate-pulse"
                />
                <path 
                  d="M390 188 L410 188" 
                  className="stroke-arcline-blue stroke-2"
                />
              </g>
            </svg>
          </div>

          {/* Progress Pill */}
          <div 
            ref={pillRef}
            className="relative z-10 px-4 py-2 rounded-full border border-black/10 bg-black/5 text-[10px] font-bold tracking-widest transition-colors duration-500 whitespace-nowrap"
          >
            {completedCount}/4 CAMPAIGNS ACTIVE
          </div>
        </div>

        {/* Dynamic Data Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full px-4">
          {[
            { label: "Outbound Calls", value: "1,280" },
            { label: "Conversion Rate", value: "24.5%" },
            { label: "Hours Saved", value: "48h" }
          ].map((card) => (
            <div key={card.label} className="bg-arcline-surface border border-black/5 p-6 lg:p-8 rounded-2xl hover-lift">
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2 font-bold">{card.label}</div>
              <div className="text-2xl lg:text-3xl font-display font-bold text-foreground">{card.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutboundCampaign;
