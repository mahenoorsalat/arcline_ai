import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  variant?: "word" | "char" | "line" | "fade";
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
}

const TextReveal = ({
  text,
  className = "",
  as: Tag = "p",
  variant = "word",
  delay = 0,
  stagger = 0.05,
  scrollTrigger = true,
}: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".reveal-item");

    const tl = gsap.timeline({
      scrollTrigger: scrollTrigger
        ? {
            trigger: container,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        : undefined,
      delay,
    });

    tl.fromTo(
      elements,
      {
        y: variant === "line" ? 60 : variant === "fade" ? 0 : 30,
        opacity: variant === "fade" ? 0.3 : 0,
        rotateX: variant === "char" ? 90 : 0,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: variant === "char" ? 0.6 : 0.8,
        stagger,
        ease: variant === "fade" ? "none" : "power3.out",
        scrollTrigger: variant === "fade" && scrollTrigger
          ? {
              trigger: container,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            }
          : undefined,
      }
    );

    return () => {
      tl.kill();
    };
  }, [text, variant, delay, stagger, scrollTrigger]);

  const renderContent = () => {
    if (variant === "line") {
      return (
        <span className="reveal-item inline-block" style={{ perspective: "1000px" }}>
          {text}
        </span>
      );
    }

    const units = variant === "char" ? text.split("") : text.split(" ");
    return units.map((unit, i) => (
      <span
        key={i}
        className="reveal-item inline-block overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <span className="inline-block">
          {unit}
          {variant === "word" && i < units.length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Tag className="leading-tight">{renderContent()}</Tag>
    </div>
  );
};

export default TextReveal;
