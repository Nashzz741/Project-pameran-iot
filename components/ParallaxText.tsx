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

      // TIMELINE UTAMA: Mengunci layar (Pinning) selama proses pewarnaan teks
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Mengunci tepat saat bagian atas komponen menyentuh atas layar
          end: "+=150%", // Durasi penahanan layar agar transisi pewarnaan terasa pas
          pin: true, // Kunci halaman agar teks selesai di-reveal dahulu
          scrub: 1, // Animasi mengikuti pergerakan scroll dengan halus
        },
      });

      // 1. Animasi warna teks (Masing-masing huruf menyala bertahap)
      tl.to(topChars, { color: "#faeade", stagger: 0.05 }, 0)
        .to(bottomChars, { color: "#faeade", stagger: 0.05 }, 0.5)

        // 2. Box IoT membesar dan muncul bersamaan di tengah timeline
        .fromTo(
          boxRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1 },
          0.2,
        );

      // 3. Efek Parallax: Teks atas & bawah bergerak horizontal berlawanan arah saat di-scroll
      gsap.to(topTextRef.current, {
        x: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
        },
      });

      gsap.to(bottomTextRef.current, {
        x: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
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
      className="relative w-full h-screen bg-[#172A39] overflow-hidden flex flex-col items-center justify-center border-t border-white/5"
    >
      <div className="relative flex flex-col items-center w-full max-w-[95%] md:max-w-[85%] mx-auto">
        {/* TEXT ATAS */}
        <h1
          ref={topTextRef}
          className="font-poppins font-black text-[7vw] md:text-[5vw] leading-[0.9] tracking-[-0.05em] text-[#faeade15] text-center uppercase z-10"
        >
          Make your li <br /> fe easier with{" "}
        </h1>

        {/* BOX IOT */}
        <div
          ref={boxRef}
          className="bg-[#154c76] px-8 py-2 md:px-12 md:py-3 rotate-[-4deg] z-30 my-4 shadow-2xl flex items-center justify-center"
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
          The future is now rig
          <br />
          ht in your hands{" "}
        </h1>
      </div>
    </section>
  );
}
