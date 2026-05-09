"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ParallaxText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLHeadingElement>(null);
  const bottomTextRef = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

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
      if (
        !topTextRef.current ||
        !bottomTextRef.current ||
        !boxRef.current ||
        !sectionRef.current
      )
        return;

      const topChars = splitText(topTextRef.current);
      const bottomChars = splitText(bottomTextRef.current);

      // TIMELINE - Durasinya dipendekin biar scroll gak kelamaan
      const tl = gsap.timeline({
        // Di dalam ParallaxText.tsx, ganti bagian ScrollTrigger-nya:
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Mulai animasi teks sedikit sebelum Page 2 bener-bener full di layar
          end: "+=100%",
          scrub: 0.8,
        },
      });

      // Animasi warna teks
      tl.to(topChars, { color: "#faeade", stagger: 0.05 }, 0)
        .to(bottomChars, { color: "#faeade", stagger: 0.05 }, 0.2)
        // Box muncul sedikit membesar (scale) pas scroll
        .fromTo(
          boxRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1 },
          0.1,
        );
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
      className="relative w-full h-screen bg-[#172A39] overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center w-full max-w-[95%] md:max-w-[85%] mx-auto">
        {/* TEXT ATAS - Ukuran dikit dikecilin biar gak sumpek */}
        <h1
          ref={topTextRef}
          className="font-poppins font-black text-[7vw] md:text-[5vw] leading-[0.9] tracking-[-0.05em] text-[#faeade15] text-center uppercase z-10"
        >
          Make your li <br /> fe  easier with
        </h1>

        {/* BOX IOT - Sekarang di tengah, gak nutupin teks */}
        <div
          ref={boxRef}
          className="bg-[#154c76] px-8 py-2 md:px-12 md:py-3 rotate-[-4deg] z-30 my-2 shadow-2xl flex items-center justify-center"
        >
          <span className="font-poppins font-black text-[6vw] md:text-[4vw] text-[#f4efed] leading-none whitespace-nowrap uppercase">
            IoT
          </span>
        </div>

        {/* TEXT BAWAH */}
        <h1
          ref={bottomTextRef}
          className="font-poppins font-black text-[7vw] md:text-[5vw] leading-[0.9] tracking-[-0.05em] text-[#faeade15] text-center uppercase z-10"
        >
          The future is now rig<br />
          <br />ht in your hands
        </h1>

        {/* PARAGRAF BAWAH */}
      </div>
    </section>
  );
}
