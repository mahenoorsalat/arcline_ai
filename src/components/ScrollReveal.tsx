import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 1,
  distance = 60,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    if (direction === "up") fromVars.y = distance;
    if (direction === "left") fromVars.x = -distance;
    if (direction === "right") fromVars.x = distance;
    if (direction === "scale") {
      fromVars.scale = 0.9;
      fromVars.y = 30;
    }

    gsap.fromTo(el, fromVars, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, [direction, delay, duration, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
