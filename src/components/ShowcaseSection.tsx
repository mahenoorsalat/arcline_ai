import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import ScrambleText from "./ScrambleText";
import ScrollReveal from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "40+", label: "Global Clients" },
  { value: "99%", label: "Client Retention" },
  { value: "3x", label: "Avg. Engagement Lift" },
];

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" ref={sectionRef} className="relative py-20 lg:py-32 px-6">

      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <ScrambleText
            text="BY THE NUMBERS"
            className="text-xs tracking-[0.4em] text-muted-foreground mb-6 block"
          />
          <TextReveal
            text="Impact that speaks for itself."
            as="h2"
            variant="fade"
            className="text-4xl md:text-6xl font-display font-bold tracking-tight"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15} direction="up">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient-blue mb-3 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Horizontal divider */}
        <ScrollReveal className="my-24">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </ScrollReveal>

        {/* Marquee-style text */}
        <div className="overflow-hidden py-24 sm:py-32 opacity-10 select-none">
          <div className="flex items-center gap-12 whitespace-nowrap text-7xl md:text-9xl lg:text-[12rem] font-display font-extrabold tracking-tighter uppercase">
            <span>MOTION</span>
            <div className="w-4 h-4 lg:w-8 lg:h-8 rounded-full bg-arcline-blue" />
            <span>DESIGN</span>
            <div className="w-4 h-4 lg:w-8 lg:h-8 rounded-full bg-arcline-blue" />
            <span>CODE</span>
            <div className="w-4 h-4 lg:w-8 lg:h-8 rounded-full bg-arcline-blue" />
            <span>EXPERIENCE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
