"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarParticles from "./StarParticles";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const robotContainerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Banner Marquee (Dipolankan: durasi diubah dari 25 ke 50)
      if (bannerRef.current) {
        gsap.to(bannerRef.current, {
          x: "-50%",
          repeat: -1,
          duration: 50,
          ease: "none",
        });
      }

      // 2. Animasi Scroll Transisi
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        scale: 0.9,
        yPercent: -10,
        opacity: 0.5,
        filter: "blur(10px)",
      });

      // 3. Animasi Teks Muncul
      gsap.fromTo(
        [textRef1.current, textRef2.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex relative overflow-hidden isolate bg-[#050B14]"
    >
      {/* --- 1. BACKGROUND TEXTURE & GRID --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay brightness-100"
          style={{ backgroundImage: `url('https://vercel.app')` }}
        />
        <StarParticles />
      </div>

      {/* --- 2. LIGHTING SPOTS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#14b8a6] opacity-[0.05] blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#FC563C] opacity-[0.04] blur-[100px] rounded-full" />

      {/* --- 3. BANNER HUD STYLE --- */}
      <div className="absolute top-[12%] -left-10 w-[150%] bg-white/[0.02] backdrop-blur-[2px] border-y border-white/5 py-2 -rotate-2 z-0 overflow-hidden pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        <div ref={bannerRef} className="flex whitespace-nowrap gap-12 w-fit">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-[#3FB9AD] font-bold text-[9px] tracking-[0.8em] uppercase opacity-40">
                {" "}
                X PPLG 2 — SMKN 1 SUBANG{" "}
              </span>
              <div className="w-1 h-1 bg-[#FC563C] rounded-full opacity-50" />
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. LAYER BELAKANG ROBOT (INTERNET OF) --- */}
      <div className="absolute inset-0 z-0 flex flex-col pl-10 md:pl-32 pt-[30vh] pointer-events-none">
        <h1
          ref={textRef1}
          className="text-[10vw] md:text-[7.5vw] font-black text-white/[0.85] leading-[0.85] tracking-[-0.07em] uppercase mix-blend-plus-lighter"
        >
          {" "}
          Internet <br /> Of{" "}
        </h1>
      </div>

      {/* --- 5. 3D ROBOT CONTAINER --- */}
      <div
        ref={robotContainerRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
      >
        <div className="w-full h-full flex justify-center items-end">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-Iw42GPMcPiyNgunKtN81lHF3/"
            className="w-full h-full scale-[1.2] md:scale-[1.4] translate-y-24 md:translate-y-40 contrast-[1.1] brightness-110"
          />
        </div>
      </div>

      {/* --- 6. LAYER DEPAN ROBOT (THINKS.) --- */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end items-end p-10 md:p-32 pb-[22vh] pointer-events-none">
        <h1
          ref={textRef2}
          className="text-[10vw] md:text-[7.5vw] font-black text-white leading-[0.8] tracking-[-0.07em] uppercase text-right drop-shadow-2xl"
        >
          {" "}
          Things<span className="text-[#FC563C]">.</span>{" "}
        </h1>
      </div>

      {/* --- 7. HUD INFO BLOCKS --- */}
      <div className="absolute bottom-12 left-12 max-w-[280px] z-30 hidden md:block pointer-events-none border-l border-white/10 pl-6 py-2">
        <p className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em] mb-2">
          {" "}
          Technical Specs{" "}
        </p>
        <p className="text-white/40 text-[10px] font-medium leading-relaxed">
          {" "}
          Integrated ecosystem for real-time monitoring and smart automation
          systems.{" "}
        </p>
      </div>
      <div className="absolute bottom-[40%] right-12 max-w-[200px] z-30 hidden md:block text-right pointer-events-none border-r border-[#FC563C]/20 pr-6 py-2">
        <p className="text-[#FC563C]/40 text-[8px] font-bold uppercase tracking-[0.3em] mb-2">
          {" "}
          Innovation{" "}
        </p>
        <p className="text-white/40 text-[10px] font-medium leading-relaxed">
          {" "}
          The future is built with connected intelligence.{" "}
        </p>
      </div>
    </section>
  );
}
