import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxSection = ({ children, className = "", speed = 0.3 }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    gsap.to(inner, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
};

export default ParallaxSection;
