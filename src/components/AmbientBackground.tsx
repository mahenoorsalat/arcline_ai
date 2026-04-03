import { useEffect, useRef } from "react";

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      pulse: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles - fewer on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;
    const connectionDist = isMobile ? 80 : 150;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dot grid
      const dotSpacing = 40;
      const dotSize = 0.8;
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Ambient gradient orbs
      const time = Date.now() * 0.01;
      
      const targetMouseX = mouseX;
      const targetMouseY = mouseY;
      
      const gradient1 = ctx.createRadialGradient(
        targetMouseX,
        targetMouseY,
        0,
        targetMouseX,
        targetMouseY,
        500
      );
      gradient1.addColorStop(0, "hsla(210, 100%, 56%, 0.03)");
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        // Mouse attraction/repulsion logic
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx -= (dx / dist) * 0.01;
          p.vy -= (dy / dist) * 0.01;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentOpacity = p.opacity * (0.3 + 0.7 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(210, 100%, 56%, ${currentOpacity * 1.5})`;
        ctx.fill();
      });

      // Connections with glowing intersections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(210, 100%, 56%, ${0.08 * (1 - dist / connectionDist)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            
            // Intersection glow
            if (dist < 30) {
              ctx.beginPath();
              ctx.arc((a.x + b.x)/2, (a.y + b.y)/2, 2, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(210, 100%, 56%, ${0.15 * (1 - dist / 30)})`;
              ctx.fill();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AmbientBackground;
