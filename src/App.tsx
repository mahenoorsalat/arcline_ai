import React, { useEffect, useRef, useState } from 'react';
import { 
  Phone, 
  Check, 
  ArrowRight, 
  Activity, 
  Zap, 
  BarChart3,
  Calendar,
  ShieldCheck,
  Menu,
  X,
  User,
  MessageSquare,
  Clock,
  CheckCircle2
} from 'lucide-react';

/**
 * ARCLINE MOTION STUDIO - 100% VIDEO FIDELITY
 * * REPLICATING: Example.mov & Example 2.mov
 * * STYLING: aeva.ai (Clean, Medical-Tech, White/Blue/Black)
 * * FIX: Lenis constructor error resolved.
 */

const App = () => {
  const [callStatus, setCallStatus] = useState("Ringing...");
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Dynamic library loading to ensure high-end motion control
    const scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js",
      "https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"
    ];

    let loadedCount = 0;
    const handleScriptLoad = () => {
      loadedCount++;
      if (loadedCount === scripts.length) {
        // Short delay to ensure browser registration
        setTimeout(initProductionSequence, 50);
      }
    };

    const initProductionSequence = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      
      // Fix: Lenis is sometimes exported on window.Lenis or needs check
      const LenisConstructor = (window as any).Lenis;
      if (!LenisConstructor) return;

      gsap.registerPlugin(ScrollTrigger, (window as any).TextPlugin);

      // 1. Smooth Scroll Engine (Lenis)
      const lenis = new LenisConstructor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1,
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time: number) => lenis.raf(time * 1000));

      // 2. Hero Reveal
      const heroTl = gsap.timeline();
      heroTl.to(".h-char", {
        opacity: 1,
        y: 0,
        stagger: 0.01,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.3
      })
      .from(".h-sub", { opacity: 0, y: 15, duration: 0.6 }, "-=0.4")
      .from(".nv-anim", { y: -20, opacity: 0, stagger: 0.05, duration: 0.5 }, "-=0.8");

      // 3. REPLICATION: Example.mov (Phone Narrative)
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-section",
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      storyTl
        .from(".content-reveal", { x: -40, opacity: 0, duration: 1 })
        .from(".phone-frame", { scale: 0.92, opacity: 0, y: 60, duration: 1.5, ease: "expo.out" }, "-=1")
        // Ringing visuals (Example.mov)
        .to(".ring-dot", { scale: 1.4, opacity: 1, repeat: 3, yoyo: true, duration: 0.3 })
        // REPLICATION: Status swap @ 0:03 mark
        .to({}, { 
          duration: 0.5, 
          onStart: () => setCallStatus("Call Connected"),
          onReverseComplete: () => setCallStatus("Ringing...")
        })
        // Message sequence (Example.mov)
        .from(".m-seq-1", { y: 20, opacity: 0, duration: 0.8 })
        .from(".m-seq-2", { y: 20, opacity: 0, duration: 0.8 }, "+=0.3")
        .from(".m-seq-3", { y: 20, opacity: 0, duration: 0.8 }, "+=0.3")
        // REPLICATION: Success Triple Tick Card @ 0:07 mark (Staggered Pop)
        .from(".success-card-overlay", { y: 40, opacity: 0, duration: 1, ease: "power4.out" })
        .from(".s-tick-1", { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" })
        .from(".s-tick-2", { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.2")
        .from(".s-tick-3", { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.2");

      // 4. REPLICATION: Example 2.mov (Outbound Hub)
      const hubTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hub-section",
          start: "top top",
          end: "+=2500",
          pin: true,
          scrub: 1
        }
      });

      hubTl
        .from(".hub-core-node", { scale: 0, opacity: 0, duration: 1, ease: "back.out(1.7)" })
        // Radiating line growth (Example 2.mov)
        .from(".hub-ray-line", { 
          strokeDashoffset: 600, 
          opacity: 0, 
          duration: 2.2, 
          stagger: 0.12,
          ease: "power2.inOut" 
        })
        // Icons pop in exactly when line hits (Example 2.mov)
        .from(".hub-icon-node", { scale: 0, opacity: 0, stagger: 0.12, duration: 0.6, ease: "back.out(1.5)" }, "-=1.8")
        // Pill update sync
        .to({}, {
          duration: 2,
          onUpdate: function() {
            setCompletedCount(Math.floor((this as any).progress() * 4));
          }
        }, "-=2.2")
        .from(".data-box-reveal", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.4");

      // 5. Impact Drawing (Example.mov @ End)
      gsap.from(".impact-path-svg", {
        scrollTrigger: {
          trigger: ".impact-section",
          start: "top 70%",
          end: "bottom 90%",
          scrub: 1.5
        },
        strokeDashoffset: 1400,
        ease: "none"
      });
    };

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = handleScriptLoad;
      document.head.appendChild(script);
    });

    return () => {
      if ((window as any).ScrollTrigger) (window as any).ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  const splitText = (t: string) => t.split("").map((char, i) => (
    <span key={i} className="h-char inline-block opacity-0 translate-y-6">{char === " " ? "\u00A0" : char}</span>
  ));

  const hubNodes = [
    { x: 150, y: 100, icon: <User className="w-4 h-4" /> },
    { x: 300, y: 400, icon: <MessageSquare className="w-4 h-4" /> },
    { x: 450, y: 100, icon: <Calendar className="w-4 h-4" /> },
    { x: 600, y: 400, icon: <Clock className="w-4 h-4" /> },
    { x: 750, y: 100, icon: <ShieldCheck className="w-4 h-4" /> },
    { x: 900, y: 400, icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-black text-white selection:bg-blue-600 font-sans antialiased overflow-x-hidden">
      
      {/* Navbar - Refined */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="nv-anim flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center transition-all duration-500 group-hover:rotate-90">
            <div className="w-3.5 h-3.5 bg-black rotate-45"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">ARCLINE</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Impact</a>
          <button className="bg-blue-600 text-white px-7 py-2.5 rounded-full hover:bg-white hover:text-black transition-all font-bold">
            Connect
          </button>
        </div>
      </nav>

      {/* Hero - Refined Typography */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,122,255,0.06),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-tight leading-[1] mb-10 uppercase">
            {splitText("Refined Motion.")}
          </h1>
          <p className="h-sub text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Technically excellent interfaces built for the next generation of AI products. Clean, medical-tech aesthetics.
          </p>
          <div className="h-sub flex justify-center">
            <button className="group flex items-center gap-3.5 bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:bg-blue-600 hover:text-white transition-all duration-500">
              Explore Showcase <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* REPLICATION: Video 1 (Example.mov) */}
      <section className="story-section h-screen bg-zinc-50 text-black flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-8 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="content-reveal space-y-12 max-w-lg">
            <div className="space-y-5">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                What <span className="text-blue-600">Aeva</span> does for your clinic.
              </h2>
              <p className="text-xl text-zinc-500 font-medium">Turn missed calls into clinical bookings automatically.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: <Zap />, title: "Full Coverage", desc: "Reliable after-hours support." },
                { icon: <Calendar />, title: "PMS Integration", desc: "Direct real-time slot scheduling." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-0.5">{item.title}</h4>
                    <p className="text-sm text-zinc-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end scale-90 md:scale-100">
            <div className="phone-frame w-full max-w-[420px] aspect-[4/5.6] bg-white rounded-[3.5rem] border-[12px] border-zinc-950 p-10 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest leading-none">Incoming</span>
                  <p className="text-sm font-bold tracking-tight">Emma Wilson · SYD</p>
                </div>
                <div className="px-4 py-1 bg-amber-50 text-amber-600 text-[8px] font-bold rounded-full border border-amber-100 uppercase tracking-widest">Overflow</div>
              </div>

              <div className="flex flex-col items-center mb-10 py-5 border-b border-zinc-50">
                <div className="flex gap-2 mb-4">
                  {[1,2,3].map(i => <div key={i} className="ring-dot w-2 h-2 bg-blue-600 rounded-full opacity-10" />)}
                </div>
                <span className="text-[10px] font-bold text-blue-600 tracking-[0.25em] uppercase leading-none">{callStatus}</span>
              </div>

              <div className="space-y-5 flex-1 overflow-hidden pr-2">
                <div className="m-seq-1 bg-zinc-50 p-5 rounded-[2rem] rounded-tl-none text-sm font-medium text-zinc-800 leading-relaxed shadow-sm border border-zinc-100/50">
                  "Hi, I'd like to book an appointment."
                </div>
                
                <div className="m-seq-2 bg-zinc-50 p-5 rounded-[2rem] rounded-tl-none text-sm font-medium text-zinc-800 leading-relaxed shadow-sm border border-zinc-100/50">
                   <div className="flex items-center gap-2 text-green-600 font-bold mb-1 text-[9px] uppercase tracking-widest">
                      <Check className="w-3 h-3 stroke-[4]" /> Aeva Resolved
                   </div>
                   Hi! Tuesday at 2:30 PM is free.
                </div>

                <div className="m-seq-3 ml-auto bg-blue-600 text-white p-5 rounded-[2rem] rounded-tr-none text-sm font-medium leading-relaxed max-w-[90%] shadow-xl">
                  "That works perfectly, thank you!"
                </div>
              </div>

              {/* SUCCESS OVERLAY: REPLICATING 00:07 MARK SNAPPY STAGGER */}
              <div className="success-card-overlay absolute inset-x-8 bottom-10 bg-white border border-zinc-100 p-10 rounded-[3rem] flex flex-col items-center text-center shadow-2xl">
                <div className="flex gap-3.5 mb-8">
                  {[1,2,3].map(i => (
                    <div key={i} className={`s-tick-${i} w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-200`}>
                      <Check className="w-5 h-5 stroke-[4]" />
                    </div>
                  ))}
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 leading-tight">Booking<br />Confirmed</h4>
                <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest mt-4">ID: ARC-772</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* REPLICATION: Video 2 (Example 2.mov) */}
      <section className="hub-section h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 text-center mb-20 max-w-3xl">
          <span className="text-blue-500 font-bold tracking-[0.5em] text-[10px] uppercase mb-6 block">Campaign Node</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] uppercase">OUTBOUND.</h2>
          <p className="text-zinc-500 text-lg md:text-xl font-light">Proactive recovery loops that autonomously fill cancellations.</p>
        </div>

        <div className="relative w-full max-w-[900px] mx-auto flex flex-col items-center px-6">
          <svg className="w-full h-[400px] md:h-[450px]" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
            <g className="opacity-30">
              {hubNodes.map((node, i) => (
                <path
                  key={i}
                  className="hub-ray-line"
                  d={`M 500 250 L ${node.x} ${node.y}`}
                  stroke="#007AFF"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                />
              ))}
            </g>
            
            {/* Icons pop in exactly when line hits */}
            {hubNodes.map((node, i) => (
              <g key={i} className="hub-icon-node" transform={`translate(${node.x - 22}, ${node.y - 22})`}>
                <circle cx="22" cy="22" r="22" fill="#0c0c0c" stroke="#222" strokeWidth="1" />
                <foreignObject x="14" y="14" width="16" height="16">
                  <div className="flex items-center justify-center w-full h-full text-zinc-500">{node.icon}</div>
                </foreignObject>
              </g>
            ))}

            <circle cx="500" cy="250" r="80" fill="#000" stroke="#007AFF" strokeWidth="2" className="hub-core-node shadow-blue-500/20 shadow-2xl" />
            <foreignObject x="455" y="205" width="90" height="90">
              <div className="flex items-center justify-center w-full h-full text-blue-500">
                <Phone className="w-10 h-10 rotate-[15deg] animate-pulse" />
              </div>
            </foreignObject>
          </svg>

          {/* PROGRESS PILL (Video 2) */}
          <div className="mt-[-100px] bg-zinc-900 border border-zinc-800 px-10 py-3 rounded-full flex items-center gap-5 shadow-2xl z-10">
            <div className={`w-3 h-3 rounded-full ${completedCount === 4 ? 'bg-green-500 shadow-[0_0_25px_#22c55e]' : 'bg-blue-600 animate-pulse'} `} />
            <span className="text-base font-bold tracking-[0.2em] uppercase">{completedCount}/4 Completed</span>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl px-4">
            {[
              { label: "Active Nodes", val: "12", color: "text-blue-500" },
              { label: "Recov. Slots", val: "8", color: "text-green-500" },
              { label: "Neural Speed", val: "0.4s", color: "text-white" },
              { label: "Studio", val: "ELITE", color: "text-amber-500" }
            ].map((stat, i) => (
              <div key={i} className="data-box-reveal bg-zinc-950/40 border border-white/5 p-8 rounded-[3rem] flex flex-col items-center">
                <span className={`text-4xl font-bold mb-1.5 tracking-tight ${stat.color}`}>{stat.val}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Monitor */}
      <section className="impact-section py-40 bg-white text-black overflow-hidden">
        <div className="container mx-auto px-10 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1]">Metrics <br /><span className="text-blue-600 underline underline-offset-[20px] decoration-zinc-100">Live.</span></h2>
          <div className="bg-black text-white rounded-[4rem] p-14 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-16">
              <h4 className="text-lg font-bold tracking-tight uppercase">Yield Tracker</h4>
              <div className="flex items-center gap-3 px-4 py-1.5 bg-green-500 text-white text-[9px] font-bold rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  REALTIME
               </div>
            </div>

            <div className="h-64 relative mb-12">
              <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                 <path 
                   className="impact-path-svg"
                   d="M 0 380 Q 150 350 250 370 T 450 220 T 650 160 T 850 80 T 1000 10" 
                   fill="none" 
                   stroke="#007AFF" 
                   strokeWidth="10" 
                   strokeLinecap="round"
                   strokeDasharray="1400"
                   strokeDashoffset="1400"
                 />
                 <path d="M 0 380 Q 150 350 250 370 T 450 220 T 650 160 T 850 80 T 1000 10 V 400 H 0 Z" fill="rgba(0,122,255,0.06)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-32 px-12 md:px-24 border-t border-white/5">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-2 space-y-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-black rotate-45"></div>
              </div>
              <span className="font-bold text-2xl tracking-tighter uppercase leading-none">Arcline</span>
            </div>
            <p className="text-zinc-500 text-4xl md:text-5xl max-w-3xl font-light leading-[1.1] tracking-tight">
              Craft matters. How it feels is everything.
            </p>
          </div>
          <div className="space-y-8">
            <h5 className="font-bold text-[10px] uppercase tracking-[0.4em] text-blue-500">Contact</h5>
            <p className="text-zinc-400 text-2xl font-medium tracking-tight">hello@arcline.studio</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
