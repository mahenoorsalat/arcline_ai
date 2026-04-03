import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneOutgoing, User, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import ScrambleText from "./ScrambleText";

gsap.registerPlugin(ScrollTrigger);

const callItems = [
  { id: 1, name: "Sarah M.", phone: "+64 21 345 678", time: "Just now", status: "Booked" },
  { id: 2, name: "David L.", phone: "+64 27 890 123", time: "2 mins ago", status: "Booked" },
  { id: 3, name: "James K.", phone: "+64 21 567 891", time: "5 mins ago", status: "Handled" },
  { id: 4, name: "Chloe P.", phone: "+64 22 333 444", time: "8 mins ago", status: "Booked" },
  { id: 5, name: "Michael R.", phone: "+64 21 987 654", time: "12 mins ago", status: "Handled" },
];

const CallQueue = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.from(container.children, {
      opacity: 0,
      x: -50,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    // Subtle float
    gsap.to(container, {
      x: 10,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-16 lg:py-24 px-4 lg:px-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 lg:mb-12 gap-6">
        <div>
          <h3 className="text-2xl lg:text-3xl font-display font-bold">Active Call Queue</h3>
          <p className="text-muted-foreground text-sm mt-1">Handled by Aeva · No extra staff needed</p>
        </div>
        <div className="px-4 py-2 rounded-full border border-arcline-blue/20 bg-arcline-blue/5 text-arcline-blue text-[8px] lg:text-[10px] font-bold tracking-widest flex items-center gap-2 uppercase">
          <PhoneOutgoing className="w-3 h-3 lg:w-4 lg:h-4" />
          <ScrambleText text="88 CALLS HANDLED TODAY" className="font-bold uppercase tracking-widest text-[8px] lg:text-[10px]" />
        </div>
      </div>

      <div ref={containerRef} className="space-y-2 sm:space-y-3">
        {callItems.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-black/5 hover:border-arcline-blue/30 hover:bg-arcline-blue/[0.02] transition-all duration-500 group shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-foreground tracking-tight text-sm sm:text-base truncate">{item.name}</h4>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground font-mono truncate">{item.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="hidden md:flex items-center gap-2 text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                <Clock className="w-3 h-3" />
                <span>{item.time}</span>
              </div>
              <div className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 shrink-0 ${
                item.status === "Booked" ? "bg-green-500/10 text-green-600" : "bg-arcline-blue/10 text-arcline-blue"
              }`}>
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 lg:mt-10 flex justify-center">
        <button className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-arcline-blue flex items-center gap-2 transition-colors">
          <span>View all activity</span>
          <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CallQueue;
