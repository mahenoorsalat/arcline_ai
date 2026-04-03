import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadSequenceProps {
  onComplete: () => void;
}

const LoadSequence = ({ onComplete }: LoadSequenceProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        "-=0.3"
      )
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(lineRef.current, { opacity: 0, duration: 0.3 }, "-=0.3")
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center"
      style={{ zIndex: 100 }}
    >
      <div ref={logoRef} className="text-center logo-text">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
            <img 
              src="/LOGO.png" 
              alt="Arcline Logo" 
              className="w-full h-full object-contain relative z-10"
            />
            <div className="absolute inset-0 bg-arcline-blue/10 rounded-full animate-pulse-glow blur-2xl" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-black flex items-center gap-1">
            <span>Arcline</span>
          </h1>
          <div className="mt-2 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-black/10" />
            <p className="text-black/40 text-[10px] font-bold tracking-[0.4em] uppercase">
              Motion Studio
            </p>
            <div className="h-px w-8 bg-black/10" />
          </div>
        </div>
      </div>
      <div
        ref={lineRef}
        className="mt-8 h-px w-32 origin-left"
        style={{ background: "linear-gradient(90deg, transparent, hsl(210 100% 56%), transparent)" }}
      />
    </div>
  );
};

export default LoadSequence;
