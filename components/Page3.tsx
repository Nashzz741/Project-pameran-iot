"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const IOT_DATA = [
  {
    id: 1,
    title: "Smart Home",
    desc: "Kontrol rumah dalam satu genggaman.",
    fullDesc:
      "Sistem cerdas untuk mengelola lampu, AC, dan keamanan rumah secara otomatis.",
    imgCard: "/img/iot1-card.jpg",
    imgDetail: "/img/iot1-large.jpg",
  },
  {
    id: 2,
    title: "Industrial IoT",
    desc: "Optimalkan produksi pabrik.",
    fullDesc: "Pemantauan mesin industri real-time untuk mencegah downtime.",
    imgCard: "/img/iot2-card.jpg",
    imgDetail: "/img/iot2-large.jpg",
  },
  {
    id: 3,
    title: "Smart Farming",
    desc: "Pantau nutrisi tani otomatis.",
    fullDesc: "Sensor kelembaban tanah terintegrasi sistem irigasi otomatis.",
    imgCard: "/img/iot3-card.jpg",
    imgDetail: "/img/iot3-large.jpg",
  },
  {
    id: 4,
    title: "Smart City",
    desc: "Transportasi kota digital.",
    fullDesc: "Integrasi sensor lalu lintas untuk mengurangi kemacetan.",
    imgCard: "/img/iot4-card.jpg",
    imgDetail: "/img/iot4-large.jpg",
  },
  // ... tambahkan data lain jika ada
];

export default function Page3() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedIoT, setSelectedIoT] = useState<any>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNav = (index: number) => {
    if (index < 0 || index >= IOT_DATA.length) return;

    const container = scrollContainerRef.current;
    const cards = gsap.utils.toArray(".iot-card") as HTMLElement[];
    if (!container || cards.length === 0) return;

    setActiveIdx(index);

    const cardWidth = cards[0].offsetWidth;
    const gap = 40; // gap-10 di tailwind
    const moveX = index * (cardWidth + gap);

    // 1. Gerakkan Container
    gsap.to(container, {
      x: -moveX,
      duration: 1,
      ease: "expo.inOut",
    });

    // 2. Animasi Visibilitas Kartu (Ghost Effect)
    cards.forEach((card, i) => {
      if (i === index) {
        // Kartu Utama: Muncul penuh dan membesar sedikit
        gsap.to(card, {
          opacity: 1,
          scale: 1.05,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        // Kartu tetangga: Muncul tipis saat transisi, lalu hilang total
        gsap.to(card, {
          opacity: 0.4, // muncul samar saat lewat
          scale: 0.9,
          duration: 0.4,
          onComplete: () => {
            // Setelah geser beres, sembunyikan yang bukan aktif
            gsap.to(card, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            });
          },
        });
      }
    });
  };

  // State Awal: Sembunyikan semua kecuali kartu pertama
  useLayoutEffect(() => {
    const cards = gsap.utils.toArray(".iot-card") as HTMLElement[];
    if (cards.length > 0) {
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1.05 : 0.9,
        });
      });
    }
  }, []);

  // Animasi Modal
  useLayoutEffect(() => {
    if (selectedIoT) {
      gsap.to(modalRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(modalRef.current, { y: "100%", opacity: 0, duration: 0.4 });
      document.body.style.overflow = "auto";
    }
  }, [selectedIoT]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#071A26] text-white font-poppins">
      {/* BACKGROUNDS */}
      <div className="absolute inset-0 z-0">
        {IOT_DATA.map((item, i) => (
          <div
            key={`bg-${item.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === activeIdx ? "opacity-30 visible" : "opacity-0 invisible"
            }`}
            style={{
              backgroundImage: `linear-gradient(to right, #071A26 45%, transparent), url(${item.imgDetail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-50 h-full flex items-center px-10 md:px-24 pointer-events-none">
        {IOT_DATA.map((item, i) => (
          <div
            key={`text-${item.id}`}
            className={`absolute transition-all duration-700 ease-in-out ${
              i === activeIdx
                ? "opacity-100 translate-y-0 visible pointer-events-auto"
                : "opacity-0 -translate-y-10 invisible pointer-events-none"
            }`}
          >
            <div className="max-w-xl">
              <span className="text-[#FC563C] font-black uppercase text-[10px] mb-4 block tracking-[.4em]">
                Project 0{i + 1}
              </span>
              <h1 className="text-[8vw] md:text-[7vw] font-black uppercase leading-[0.8] mb-6 tracking-tighter">
                {item.title}
              </h1>
              <p className="text-gray-400 text-lg mb-10 max-w-sm leading-relaxed opacity-70 italic">
                "{item.desc}"
              </p>

              <button
                onClick={() => setSelectedIoT(item)}
                className="pointer-events-auto bg-[#FC563C] px-10 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-[0_0_40px_rgba(252,86,60,0.7)] hover:scale-105 active:scale-95 transition-all"
              >
                Preview Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="absolute bottom-12 left-10 md:left-24 z-[60] flex gap-4 items-center">
        <button
          onClick={() => handleNav(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#FC563C] hover:bg-[#FC563C] transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
        >
          ←
        </button>
        <button
          onClick={() => handleNav(activeIdx + 1)}
          disabled={activeIdx === IOT_DATA.length - 1}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#FC563C] hover:border-[#FC563C] transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
        >
          →
        </button>
        <div className="text-[10px] font-mono text-gray-500 tracking-[0.4em]">
          <span className="text-white">0{activeIdx + 1}</span> / 0
          {IOT_DATA.length}
        </div>
      </div>

      {/* CARDS TRACK (Area Kartu dimajukan ke tengah layar) */}
      <div className="absolute inset-y-0 right-0 left-[45%] md:left-[50%] flex items-center z-10 pointer-events-none">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-10 pl-0 pr-[50vw] w-max pointer-events-none"
        >
          {IOT_DATA.map((item) => (
            <div
              key={item.id}
              className="iot-card flex-shrink-0 w-[280px] h-[400px] md:w-[350px] md:h-[500px] rounded-[40px] overflow-hidden border border-white/10 bg-gray-900 shadow-2xl relative"
            >
              <img
                src={item.imgCard}
                className="w-full h-full object-cover opacity-60"
                alt={item.title}
              />
              <div className="absolute inset-0 flex items-end p-10 bg-gradient-to-t from-black to-transparent">
                <h3 className="font-bold uppercase tracking-widest text-[11px] text-white/50">
                  0{item.id} {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-[100] bg-[#071A26] translate-y-full opacity-0 flex flex-col md:flex-row items-center justify-center p-10 md:p-24 gap-12"
      >
        <button
          onClick={() => setSelectedIoT(null)}
          className="absolute top-10 right-10 text-white border border-white/20 px-8 py-3 rounded-full uppercase text-[10px] font-black hover:bg-[#FC563C] transition-all"
        >
          CLOSE [X]
        </button>
        {selectedIoT && (
          <>
            <div className="w-full md:w-3/5 aspect-video bg-gray-900 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={selectedIoT.imgDetail}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full md:w-2/5">
              <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 leading-none">
                {selectedIoT.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                {selectedIoT.fullDesc}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
