import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power3.out" }
    );

    // Global Scroll Progress Bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-white/80 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent text-foreground"
      }`}
    >
      {/* Global Scroll Progress Bar */}
      <div 
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[2px] bg-arcline-blue origin-left z-50 w-full scale-x-0" 
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="#" className="logo-text flex items-center gap-3 relative z-50 group">
          <div className="relative w-8 h-8">
            <img 
              src="/LOGO.png" 
              alt="Arcline Logo" 
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-arcline-blue/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-xl" />
          </div>
          <span className="text-xl font-bold tracking-tight">Arcline</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {["Work", "Services", "About", "Contact"].map((item) => (
            <MagneticButton key={item} strength={0.2}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-widest uppercase"
              >
                {item}
              </a>
            </MagneticButton>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <MagneticButton>
              <button className="px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-full border border-black/5 bg-black/5 text-foreground hover:bg-black/10 transition-all duration-300">
                Get in Touch
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden relative z-50 p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-white h-screen transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {["Work", "Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-display font-bold tracking-tight text-foreground hover:text-arcline-blue transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="mt-8 px-10 py-5 rounded-full bg-black text-white font-bold tracking-widest uppercase text-xs">
            Start a Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
