import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Check, ArrowRight, Mic2, Settings2, Calendar } from "lucide-react";
import ScrambleText from "./ScrambleText";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const AevaShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const checkIconRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [activeVoice, setActiveVoice] = useState("Serena (Natural)");

  useEffect(() => {
    const parent = sectionRef.current;
    const container = containerRef.current;
    const phone = phoneRef.current;
    const bubbles = bubblesRef.current;
    const confirmation = confirmationRef.current;

    if (!parent || !container || !phone || !bubbles || !confirmation) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop - Silky Smooth Pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top top",
          end: "+=4500", // More space for the story
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // Story Phase 1: Text Reveals one-by-one
      tl.fromTo(title1Ref.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
      )
      .fromTo(title2Ref.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" },
        "+=0.8" // Pause between titles
      )
      .fromTo(descRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" },
        "+=0.8"
      )

      // Story Phase 2: Phone Entry & Rotation
      .to(phone, { 
        x: -180, 
        opacity: 1,
        rotateY: -15,
        rotateX: 10,
        duration: 3, 
        ease: "power4.inOut" 
      }, "+=1") // Move phone only after text is solid
      
      // Story Phase 3: The Conversation (Bubbles one-by-one)
      .to(bubbles.children, { 
        opacity: 1, 
        y: 0, 
        stagger: 3, // Each bubble gets its own scroll space
        duration: 3, 
        ease: "expo.out" 
      }, "+=0.5");
      
      setupCommonAnimations(tl);

      return () => tl.kill();
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile - More space, smoother pacing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top top",
          end: "+=3500", // Full space for mobile pinning story
          scrub: 2, // Smooth damping
          pin: true,
          anticipatePin: 1,
        },
      });

      // Mobile Sequence - Staggered Story
      tl.fromTo(title1Ref.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
      )
      .fromTo(title2Ref.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" },
        "+=0.8"
      )
      .fromTo(descRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" },
        "+=0.8"
      )
      .to(phone, { 
        scale: 0.65, // More compact for mobile viewports
        y: -10,
        opacity: 1,
        duration: 3,
        ease: "power4.inOut"
      }, "+=1")
      .to(bubbles.children, { 
        opacity: 1, 
        y: 0, 
        stagger: 3, 
        duration: 2.5, 
        ease: "power3.out" 
      }, "+=0.5");

      setupCommonAnimations(tl);

      return () => tl.kill();
    });

    function setupCommonAnimations(tl: gsap.core.Timeline) {
      tl.to(".phone-glow", { opacity: 0.8, scale: 1.4, duration: 3, ease: "power2.inOut" }, "-=2")
        .to(".status-ringing", { opacity: 0, y: -20, duration: 1, ease: "power2.in" }, "+=0.5")
        .set(".status-connected", { display: "flex" })
        .fromTo(".status-connected", 
          { opacity: 0, y: 20, scale: 0.9 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(2)" }
        )
        .to(".waveform-bar", { 
          scaleY: "random(0.4, 1.4)", 
          duration: 0.4, 
          repeat: -1, 
          yoyo: true, 
          stagger: { each: 0.08, from: "center" } 
        }, "<")
        .to(confirmation, { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 3, 
          ease: "expo.out" 
        }, "+=2") // Long hold on the phone before confirmation appears
        .to(checkIconRef.current, { 
          scale: 1.1, 
          opacity: 1, 
          rotate: 360,
          duration: 1.5, 
          ease: "back.out(3)" 
        }, "-=1.5")
        .to(checkIconRef.current, { scale: 1, duration: 0.5 });
    }

    // Initial states for the sequence
    gsap.set(phoneRef.current, { opacity: 0, x: 0, rotateY: 0, rotateX: 0 });
    gsap.set([bubbles.children], { opacity: 0, y: 40 });
    gsap.set([title1Ref.current, title2Ref.current, descRef.current], { opacity: 0, y: 30 });
    gsap.set(confirmation, { opacity: 0, scale: 0.9, y: 100 });
    gsap.set(checkIconRef.current, { scale: 0, opacity: 0, rotate: -180 });
    gsap.set(".status-ringing", { opacity: 1, display: "block", y: 0 });
    gsap.set(".status-connected", { opacity: 0, display: "none" });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden pt-20 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-24 items-center justify-start lg:justify-center min-h-screen pb-20">
        
        <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-arcline-blue/10 border border-arcline-blue/20 text-arcline-blue text-[10px] font-bold tracking-widest uppercase">
            Interactive Demo
          </div>
          <div className="space-y-3 lg:space-y-4">
            <div ref={title1Ref}>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-tight">
                Turn missed calls
              </h2>
            </div>
            <div ref={title2Ref}>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-tight text-gradient-blue">
                into new bookings.
              </h2>
            </div>
          </div>
          <p ref={descRef} className="text-muted-foreground text-sm lg:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
            Aeva answers every patient call with the most life-like voice on the market, 24/7.
          </p>
          
          <div className="p-3 lg:p-4 rounded-2xl bg-black/[0.03] border border-black/5 space-y-3 lg:space-y-4 max-w-sm mx-auto lg:mx-0 hidden lg:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <Mic2 className="w-4 h-4 text-arcline-blue shadow-[0_0_10px_rgba(var(--arcline-blue),0.2)]" />
                <span>Voice Profile</span>
              </div>
              <Settings2 className="w-3 h-3 text-muted-foreground animate-spin-slow" />
            </div>
            <div className="flex gap-2 justify-center lg:justify-start">
              {["Serena", "James", "Aria"].map(voice => (
                <button 
                  key={voice}
                  onClick={() => setActiveVoice(voice)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all duration-300 ${
                    activeVoice.includes(voice) 
                      ? "bg-arcline-blue text-white shadow-[0_4px_15px_-5px_rgba(0,122,255,0.4)]" 
                      : "bg-black/5 text-muted-foreground hover:bg-black/10"
                  }`}
                >
                  {voice}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={containerRef} className="relative flex items-center justify-center h-[350px] lg:h-[600px] w-full max-w-[500px]">
          {/* Phone Background Glow */}
          <div className="phone-glow absolute w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-arcline-blue/10 rounded-full blur-[80px] lg:blur-[120px] opacity-0" />
          
          {/* Simulated Interface (Phone) */}
          <div ref={phoneRef} className="relative z-10 w-[240px] lg:w-[300px] aspect-[9/19] bg-[#050505] rounded-[2.5rem] lg:rounded-[3.5rem] border-[8px] lg:border-[12px] border-white/5 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col origin-center ring-1 ring-white/10">
            <div className="p-4 lg:p-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 lg:mb-8">
                <div className="w-8 lg:w-12 h-1 bg-white/10 rounded-full mx-auto" />
              </div>
              <div className="text-center">
                <div className="relative w-12 lg:w-20 h-12 lg:h-20 mx-auto mb-4 lg:mb-6">
                  <div className="absolute inset-0 bg-arcline-blue/20 rounded-full animate-ping" />
                  <div className="relative w-full h-full bg-arcline-blue/10 rounded-full flex items-center justify-center border border-arcline-blue/30">
                    <Phone className="w-6 lg:w-10 h-6 lg:h-10 text-arcline-blue" />
                  </div>
                </div>
                <h3 className="text-white text-base lg:text-xl font-display font-bold">Emma Wilson</h3>
                <p className="text-arcline-blue/60 text-[10px] font-bold tracking-widest uppercase mt-1 lg:mt-2 status-ringing">Incoming...</p>
                <div className="status-connected opacity-0 flex flex-col items-center mt-1 lg:mt-2">
                  <div className="flex items-center gap-1 px-2 lg:px-3 py-0.5 lg:py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] lg:text-[10px] text-green-500 font-bold uppercase tracking-widest whitespace-nowrap">Aeva Active</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4 lg:p-6 space-y-3 lg:space-y-4 flex flex-col justify-end">
              <div className="space-y-3 mb-8">
                <div className="h-1 lg:h-1.5 w-3/4 bg-white/10 rounded-full animate-pulse" />
                <div className="h-1 lg:h-1.5 w-1/2 bg-white/10 rounded-full animate-pulse delay-75" />
                <div className="h-1 lg:h-1.5 w-2/3 bg-white/10 rounded-full animate-pulse delay-150" />
              </div>
              <div className="w-full aspect-video bg-white/[0.03] rounded-xl lg:rounded-2xl border border-white/5 flex items-center justify-center gap-1 lg:gap-1.5 p-4 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 lg:w-1.5 h-6 lg:h-10 bg-arcline-blue/40 rounded-full waveform-bar origin-bottom transition-all duration-300" />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Bubbles (Floating) */}
          <div ref={bubblesRef} className="absolute left-[50%] ml-4 lg:ml-8 space-y-4 lg:space-y-6 w-[240px] lg:w-[320px] pointer-events-none z-20">
            <div className="bg-arcline-blue text-white p-3 lg:p-5 rounded-xl lg:rounded-2xl rounded-bl-none text-[10px] lg:text-sm shadow-xl border border-white/10 leading-relaxed font-medium">
              "Hi, I'd like to book an appointment for physiotherapy."
            </div>
            <div className="bg-white text-black p-3 lg:p-5 rounded-xl lg:rounded-2xl rounded-br-none text-[10px] lg:text-sm border border-black/5 ml-auto w-4/5 leading-relaxed font-medium shadow-lg">
              "Certainly! I can help you with that."
            </div>
          </div>

          {/* Booking Confirmation Card */}
          <div ref={confirmationRef} className="absolute top-[55%] lg:top-[65%] left-[50%] -translate-x-1/2 w-[280px] sm:w-[320px] lg:w-[340px] bg-white rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 z-30 overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 lg:p-6 opacity-[0.03]">
              <Check className="w-24 lg:w-32 h-24 lg:h-32 text-black" strokeWidth={4} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <div ref={checkIconRef} className="w-10 lg:w-14 h-10 lg:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(34,197,94,0.4)]">
                  <Check className="w-5 lg:w-7 h-5 lg:h-7 text-white" strokeWidth={4} />
                </div>
                <div className="text-right">
                  <p className="text-[8px] lg:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Conf. Number</p>
                  <p className="text-[10px] lg:text-xs font-mono font-bold text-gray-900">#AE-29402B</p>
                </div>
              </div>
              
              <h4 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-1">Booking Confirmed</h4>
              <p className="text-gray-500 text-[10px] lg:text-sm mb-4 lg:mb-6">Emma Wilson · Physiotherapy</p>
              
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                <div className="p-2 lg:p-3 bg-gray-50 rounded-lg lg:rounded-xl">
                  <p className="text-[8px] lg:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Date</p>
                  <p className="text-[10px] lg:text-xs font-bold text-gray-900">Wed, Oct 14</p>
                </div>
                <div className="p-2 lg:p-3 bg-gray-50 rounded-lg lg:rounded-xl">
                  <p className="text-[8px] lg:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Time</p>
                  <p className="text-[10px] lg:text-xs font-bold text-gray-900">9:30 AM</p>
                </div>
              </div>
              
              <button className="w-full py-3 lg:py-4 rounded-lg lg:rounded-xl bg-gray-900 text-white text-[10px] lg:text-xs font-bold tracking-widest uppercase hover:bg-black transition-all flex items-center justify-center gap-2">
                <span>Add to Calendar</span>
                <ArrowRight className="w-3 lg:w-4 h-3 lg:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AevaShowcase;

