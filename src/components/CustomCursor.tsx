import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");
    const setFollowerX = gsap.quickSetter(follower, "x", "px");
    const setFollowerY = gsap.quickSetter(follower, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "expo.out",
      });
    };

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.7, duration: 0.3 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.3 });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-arcline-blue rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-black/10 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default CustomCursor;
