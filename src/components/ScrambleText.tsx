import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const ScrambleText = ({ text, className = "", as: Tag = "span" }: ScrambleTextProps) => {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasPlayed.current) return;
        hasPlayed.current = true;

        let iteration = 0;
        const totalIterations = text.length * 3;

        const interval = setInterval(() => {
          setDisplay(
            text
              .split("")
              .map((char, i) => {
                if (char === " ") return " ";
                if (i < iteration / 3) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );

          iteration++;
          if (iteration > totalIterations) {
            clearInterval(interval);
            setDisplay(text);
          }
        }, 30);
      },
    });
  }, [text]);

  return (
    <div ref={ref}>
      <Tag className={`font-mono ${className}`}>{display}</Tag>
    </div>
  );
};

export default ScrambleText;
