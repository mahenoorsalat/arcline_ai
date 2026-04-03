import TextReveal from "./TextReveal";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import ScrambleText from "./ScrambleText";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-20 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrambleText
          text="LET'S TALK"
          className="text-[10px] lg:text-xs tracking-[0.4em] text-muted-foreground mb-4 lg:mb-6 block font-bold"
        />

        <TextReveal
          text="Ready to build something extraordinary?"
          as="h2"
          variant="word"
          className="text-3xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6 lg:mb-8"
        />

        <ScrollReveal delay={0.2}>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 lg:mb-12 px-2">
            We partner with ambitious teams to create digital experiences that
            move people — literally and figuratively.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <MagneticButton strength={0.4}>
            <button className="w-full sm:w-auto group relative px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-medium text-sm sm:text-base tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_-5px_hsl(var(--primary)_/_0.3)]">
              <span className="relative z-10">Start a Conversation</span>
            </button>
          </MagneticButton>
        </ScrollReveal>

        {/* Footer */}
        <div className="mt-20 lg:mt-32 pt-10 lg:pt-12 border-t border-black/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
            <a href="#" className="logo-text flex items-center gap-0.5">
              <span className="arc text-2xl font-extrabold tracking-tighter">A</span>
              <span className="line text-xl font-bold">rcline</span>
            </a>
            <p className="text-[10px] text-muted-foreground tracking-wide order-3 md:order-2">
              © 2025 Arcline. All rights reserved.
            </p>
            <div className="flex items-center gap-6 order-2 md:order-3">
              {["Twitter", "LinkedIn", "GitHub"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-widest uppercase"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
