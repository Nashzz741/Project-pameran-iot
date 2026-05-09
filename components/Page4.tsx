"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page4() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const splitText = (el: HTMLElement) => {
      const text = el.innerText;
      el.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? `<span>&nbsp;</span>`
            : `<span class="char inline-block">${char}</span>`,
        )
        .join("");
      return Array.from(el.querySelectorAll(".char"));
    };

    const init = () => {
      if (!text1Ref.current || !text2Ref.current || !sectionRef.current) return;

      const chars1 = splitText(text1Ref.current);
      const chars2 = splitText(text2Ref.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // Kasih waktu scroll yang pas
          pin: true, // Tahan layar biar teks ke-reveal semua
          scrub: 1,
        },
      });

      // Animasi Reveal Warna (Gahar)
      tl.to(chars1, { color: "#faeade", stagger: 0.05 }, 0).to(
        chars2,
        { color: "#faeade", stagger: 0.05 },
        0.5,
      );

      // Efek Parallax (Teks atas & bawah gerak berlawanan dikit)
      gsap.to(text1Ref.current, {
        x: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });

      gsap.to(text2Ref.current, {
        x: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });
    };

    const t = setTimeout(init, 100);
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#071A26] flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      <div
        ref={containerRef}
        className="relative flex flex-col items-center w-full max-w-[95%] md:max-w-[85%] mx-auto"
      >
        {/* BARIS 1 - Saran Teks: Filosofi IoT */}
        <h1
          ref={text1Ref}
          className="font-poppins font-black text-[8vw] md:text-[6vw] leading-[0.85] tracking-[-0.05em] text-[#faeade10] text-center uppercase z-10"
        >
          Beyond ju <br /> st connecting things
        </h1>

        {/* ORNAMEN TENAH - Garis Minimalis biar estetik */}
        <div className="w-1 h-24 bg-[#FC563C] my-10 opacity-50 shadow-[0_0_20px_#FC563C]" />

        {/* BARIS 2 */}
        <h1
          ref={text2Ref}
          className="font-poppins font-black text-[8vw] md:text-[6vw] leading-[0.85] tracking-[-0.05em] text-[#faeade10] text-center uppercase z-10"
        >
          we empow <br />er the future
        </h1>

        {/* FOOTER KECIL */}
        <div className="mt-16 max-w-md text-center opacity-40">
          <p className="font-poppins text-[#faeade] text-[10px] md:text-[12px] font-medium uppercase tracking-[0.3em]">
            Integration — Intelligence — Innovation
          </p>
        </div>
      </div>
    </section>
  );
}
