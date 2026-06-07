"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface SoftwareProject {
  id: number;
  title: string;
  tagline: string;
  desc: string;
  fullDesc: string;
  stack: string[];
  imgCard: string;
  imgDetail: string;
}

const SOFTWARE_DATA: SoftwareProject[] = [
  {
    id: 1,
    title: " PATH",
    tagline: " Menuju Indonesia Digital",
    desc: " Hardware computer, logika computer, dan pemrograman.",
    fullDesc:
      "(PROGRAMMING–ALGORITHM–TECHNOLOGY) merupakan Game edukasi interaktif berbasis teknologi informasi yang dirancang untuk membantu pengguna mempelajari dasar hardware komputer, logika komputasi, dan pemrograman melalui pengalaman belajar berbasis game yang menarik, progresif, dan immersive.",
    stack: ["Visual Studio Code", "Figma"],
    imgCard: "/img/path_pplg1.webp",
    imgDetail: "/img/path_pplg2.webp",
  },
  {
    id: 2,
    title: "COFFEE SCREAM",
    tagline: "Scream Loud. Fill the Cup. Win the Coffee.",
    desc: "Coffee Scream Challenge is an interactive browser-based game that leverages real-time microphone input through the Web Audio API to measure a participant's voice volume.",
    fullDesc:
      "Coffee Scream Challenge is an interactive browser-based game that leverages real-time microphone input through the Web Audio API to measure a participant's voice volume. The louder the scream, the higher the score — reaching a score of 100 fills a virtual coffee cup and wins the participant a real cup of coffee.",
    stack: ["HTML5", "CSS3	", "JavaScript ", "Web Audio API"],
    imgCard: "/img/kelompok_cs1.webp",
    imgDetail: "/img/kelompok_cs2.webp",
  },
  {
    id: 3,
    title: "Logic AreNa",
    tagline: "“Buktikan logikamu di arena!”",
    desc: "Matematika, Puzzle, Tebak kata",
    fullDesc:
      "Game edukatif berisi berbagai game, diantaranya ; sudoku, puzzle, wordle, typing game, memory, sequence, math challenge, hingga tug of war berbasis matematika.",
    stack: ["Visual Studio Code", "Claude AI"],
    imgCard: "/img/logicarena_pplg2.webp",
    imgDetail: "/img/logicarena_pplg1.webp",
  },
  {
    id: 4,
    title: "PINKYBOOTH",
    tagline: "tunjukan, kecantikan mu girls!",
    desc: "Eksis dan Gaya",
    fullDesc:
      "Photobooth adalah layanan atau aplikasi yang digunakan untuk mengambil foto secara otomatis dengan kamera, biasanya dilengkapi berbagai fitur menarik seperti filter, frame, timer, dan efek foto. Photobooth sering digunakan pada acara ulang tahun, wisuda, pernikahan, hingga website kreatif untuk mengabadikan momen dengan cara yang lebih seru dan interaktif.",
    stack: ["Visual Studio Code", "Xampp", "HTML", "CSS"],
    imgCard: "/img/pinkybooth1.webp",
    imgDetail: "/img/pinkybooth2.webp",
  },
  {
    id: 5,
    title: "Cekrek pplg",
    tagline: "capture the moment ,keep the memory",
    desc: "APLIKASI PHOTOBOOTH BERBASIS WEB",
    fullDesc:
      "Cekrek pplg Adalah sebuah produk yang berupa photobooth yang dirancang memfasilitasi Dokumentasi cekrek pplg satu.ini Adalah aplikasi berbasis web interaktif local",
    stack: ["phython", "Javascript", "HTML", "CSS"],
    imgCard: "/img/x pplg1_photoboth.webp",
    imgDetail: "/img/x pplg_photobooth.webp",
  },
  {
    id: 6,
    title: "Nesas : School Life",
    tagline:
      " Kalau bisa besok, kenapa harus sekarang? / Your school, your story",
    desc: "Mengikuti genre gamenya yg bergenre School RPG. Bersetting tempat di SMKN 1 Subang.",
    fullDesc:
      " Game yang menawarkan pengalaman imersif untuk sekolah di SMKN 1 Subang. Menyelesaikan tugas yang disediakan, berjuang menaikan reputasi Jurusan, mencari relasi dan mencoba menjadi entrepreneur sebagai siswa di SMKN 1 Subang.",
    stack: ["Roblox Studio", "Blender", "Figma"],
    imgCard: "/img/NesasSchoolLife1.webp",
    imgDetail: "/img/NesasSchoolLife2.webp",
  },
];

export default function SoftwarePage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [selectedSoft, setSelectedSoft] = useState<SoftwareProject | null>(
    null,
  );
  const [activeIdx, setActiveIdx] = useState(0);

  // --- ANIMASI MODAL ---
  useLayoutEffect(() => {
    if (selectedSoft) {
      const tl = gsap.timeline();
      gsap.set(modalContainerRef.current, { display: "flex" });
      tl.to(modalContainerRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      tl.fromTo(
        modalContentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" },
        "-=0.2",
      );
      document.body.style.overflow = "hidden";
    } else {
      if (modalContainerRef.current) {
        gsap.to(modalContainerRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.set(modalContainerRef.current, { display: "none" });
            document.body.style.overflow = "auto";
          },
        });
      }
    }
  }, [selectedSoft]);

  // --- NAVIGASI KARTU ---
  const handleNav = (index: number) => {
    if (index < 0 || index >= SOFTWARE_DATA.length) return;
    setActiveIdx(index);
    const container = scrollContainerRef.current;
    const cards = gsap.utils.toArray(".soft-card") as HTMLElement[];
    if (!container || cards.length === 0) return;

    const moveX = index * (cards[0].offsetWidth + 40);
    gsap.to(container, { x: -moveX, duration: 1.2, ease: "expo.inOut" });

    cards.forEach((card, i) => {
      gsap.to(card, {
        autoAlpha: i === index ? 1 : 0,
        scale: i === index ? 1 : 0.95,
        duration: 0.8,
        overwrite: true,
      });
    });
  };

  // --- KEYBOARD LISTENER DENGAN ISOLASI SECTION ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;

      // Proteksi Bentrok: Cek apakah section komponen ini sedang terlihat di layar viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible =
        rect.top >= -window.innerHeight / 2 &&
        rect.bottom <= window.innerHeight * 1.5;

      // Jika halaman ini tidak aktif/sedang di-scroll menjauh, abaikan event keyboard-nya
      if (!isVisible) return;

      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation(); // Hentikan penyebaran event ke komponen luar
        if (selectedSoft) {
          setSelectedSoft(null);
        } else {
          setSelectedSoft(SOFTWARE_DATA[activeIdx]);
        }
        return;
      }

      if (!selectedSoft) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          e.stopPropagation();
          handleNav(activeIdx + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          e.stopPropagation();
          handleNav(activeIdx - 1);
        }
      } else {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          setSelectedSoft(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true }); // Menggunakan fase capture agar diprioritaskan dengan aman
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [activeIdx, selectedSoft]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#050B10] text-white font-sans max-w-full"
    >
      {/* BG GRADIENT */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2" />
      </div>

      {/* LEFT SIDE: PROJECT TEXT */}
      <div className="relative z-50 h-full flex flex-col justify-center px-10 md:px-24 pointer-events-none">
        {SOFTWARE_DATA.map((item, i) => (
          <div
            key={item.id}
            className={`absolute transition-all duration-700 ${i === activeIdx ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-10 invisible"}`}
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-8 bg-cyan-500" />
                <span className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                  {" "}
                  {item.tagline}{" "}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.9] mb-6 tracking-tight">
                {" "}
                {item.title}{" "}
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-sm">
                {" "}
                {item.desc}{" "}
              </p>
              <div className="flex flex-wrap gap-2 mb-10 pointer-events-auto">
                {item.stack.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-1.5 text-[9px] font-bold border border-white/10 rounded-full bg-white/5 uppercase tracking-widest"
                  >
                    {" "}
                    {s}{" "}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedSoft(item)}
                className="pointer-events-auto bg-white text-black px-10 py-4 rounded-full font-black text-xs tracking-widest hover:bg-cyan-400 transition-all flex items-center gap-4"
              >
                {" "}
                VIEW CASE STUDY <span>→</span>{" "}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NAV CONTROLS */}
      <div className="absolute bottom-12 left-10 md:left-24 z-50 flex items-center gap-6">
        <div className="flex gap-2">
          <button
            onClick={() => handleNav(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 disabled:opacity-20"
          >
            {" "}
            ←{" "}
          </button>
          <button
            onClick={() => handleNav(activeIdx + 1)}
            disabled={activeIdx === SOFTWARE_DATA.length - 1}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 disabled:opacity-20"
          >
            {" "}
            →{" "}
          </button>
        </div>
        <div className="text-[10px] font-mono text-gray-500 tracking-[0.4em]">
          <span className="text-white">0{activeIdx + 1}</span> / 0
          {SOFTWARE_DATA.length}
        </div>
      </div>

      {/* RIGHT SIDE: MOCKUP TRACK */}
      <div className="absolute inset-y-0 right-0 left-[75%] md:left-[50%] flex items-center z-10 pointer-events-none overflow-hidden pr-10">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-10 w-max"
        >
          {SOFTWARE_DATA.map((item, i) => (
            <div
              key={item.id}
              className="soft-card flex-shrink-0 w-[80vw] md:w-[580px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#0A1118] shadow-2xl relative"
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
              }}
            >
              <div className="w-full h-7 bg-white/5 flex items-center px-4 gap-1.5 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
              <img
                src={item.imgCard}
                className="w-full h-full object-cover object-top opacity-90"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL CASE STUDY */}
      <div
        ref={modalContainerRef}
        style={{ display: "none", opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#050B10]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
      >
        <div
          ref={modalContentRef}
          className="relative w-full max-w-7xl bg-[#0A1118] border border-white/10 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          <button
            onClick={() => setSelectedSoft(null)}
            className="absolute top-6 right-6 z-50 bg-white text-black px-4 py-2 rounded-full text-[10px] font-black uppercase md:hidden"
          >
            {" "}
            X{" "}
          </button>
          <div className="w-full md:w-[60%] p-6 md:p-10 bg-black/40 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#111] shadow-inner">
              {selectedSoft && (
                <img
                  src={selectedSoft.imgDetail}
                  className="w-full h-auto aspect-video object-contain block mx-auto"
                  alt="Detail"
                />
              )}
            </div>
          </div>
          <div className="w-full md:w-[40%] p-8 md:p-12 bg-[#0A1118] overflow-y-auto">
            <div className="hidden md:flex justify-end mb-8">
              <button
                onClick={() => setSelectedSoft(null)}
                className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase hover:bg-cyan-400 transition-all"
              >
                {" "}
                Close [X]{" "}
              </button>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic leading-tight mb-6">
              {" "}
              {selectedSoft?.title}{" "}
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-2 opacity-50">
                  {" "}
                  Overview{" "}
                </h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                  {" "}
                  "{selectedSoft?.fullDesc}"{" "}
                </p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-3 opacity-50">
                  {" "}
                  Core Stack{" "}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {" "}
                  {selectedSoft?.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-gray-400 uppercase"
                    >
                      {" "}
                      {s}{" "}
                    </span>
                  ))}{" "}
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-white/5">
              <p className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">
                {" "}
                Status: Completed Project{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
