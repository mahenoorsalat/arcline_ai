import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import ScrambleText from "./ScrambleText";
import ParallaxSection from "./ParallaxSection";

const services = [
  {
    number: "01",
    title: "Web Animation",
    description:
      "Browser-native motion that brings interfaces to life. GSAP, ScrollTrigger, and custom shaders — no pre-rendered shortcuts.",
    tags: ["GSAP", "ScrollTrigger", "WebGL"],
  },
  {
    number: "02",
    title: "AI Integration",
    description:
      "Intelligent products powered by modern AI. From conversational interfaces to autonomous workflows.",
    tags: ["LLM", "Automation", "NLP"],
  },
  {
    number: "03",
    title: "Product Design",
    description:
      "End-to-end digital product experiences. Strategy, design, and engineering under one roof.",
    tags: ["UX", "UI", "Prototyping"],
  },
  {
    number: "04",
    title: "Creative Development",
    description:
      "Technically ambitious builds that push the browser. WebGL, Canvas, real-time 3D, and experimental interfaces.",
    tags: ["Three.js", "Canvas", "R3F"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <ScrambleText
            text="WHAT WE DO"
            className="text-xs tracking-[0.4em] text-muted-foreground mb-6 block"
          />
          <TextReveal
            text="Services built for the future."
            as="h2"
            variant="fade"
            className="text-4xl md:text-6xl font-display font-bold tracking-tight"
          />
        </div>
 
        <ParallaxSection speed={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.number} delay={i * 0.1} direction="up">
                <div className="group bg-arcline-surface border border-black/5 rounded-2xl p-8 md:p-10 hover:border-arcline-blue/30 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[10px] text-muted-foreground font-bold tracking-widest">
                      {service.number}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-arcline-blue/10 transition-colors duration-500">
                      <svg
                        className="w-3 h-3 text-arcline-blue -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
 
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-foreground group-hover:text-arcline-blue transition-all duration-500">
                    {service.title}
                  </h3>
 
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>
 
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-secondary/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};

export default ServicesSection;
