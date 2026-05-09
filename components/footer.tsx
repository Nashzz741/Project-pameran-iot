"use client";
import Image from "next/image";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#071A26] border-t border-white/5 pt-20 pb-10 px-6 md:px-10 overflow-hidden font-poppins">
      {/* WATERMARK BACKGROUND */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 opacity-[0.02] text-[25vw] font-black pointer-events-none whitespace-nowrap uppercase">
        PPLG 2
      </div>
      <div className="relative z-10 flex flex-col items-center">
        {/* 1. TEXT UTAMA (TAG) */}
        <div className="text-center mb-10">
          <h1 className="text-[10vw] md:text-[8vw] font-black text-white uppercase tracking-tighter leading-none">
            CONNECTED <span className="text-[#FC563C]">WORLD</span>
          </h1>
          <p className="text-gray-500 text-xs md:text-sm tracking-[0.4em] uppercase mt-4">
            Building the next generation of intelligence
          </p>
        </div>

        {/* 2. 🔥 SLOT 3D MODEL */}
        <div className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center my-5 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent relative">
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-OvzFmDRrtiz1TsZ6Aip1EUxB/"
              frameBorder="0"
              width="100%"
              height="100%"
              className="scale-[1.9] md:scale-[1.7] origin-center translate-y-[12%] md:translate-y-[8%]"
            ></iframe>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] tracking-[0.5em] text-white/20 font-bold uppercase animate-pulse pointer-events-none z-0">
              [ 3D Model Area / Spline Canvas ]
            </p>
          </div>
        </div>

        {/* 3. SOCIAL MEDIA */}
        <div className="flex gap-6 mt-10 mb-20">
          <a
            href="https://youtube.com/@xpplg2-nesas?si=TlWzzqQr5-Z9QnyN"
            className="p-4 rounded-full border border-white/10 hover:bg-[#c91b00] hover:border-[#FC563C] transition-all duration-300 group"
          >
            <FaYoutube
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="https://www.tiktok.com/@two_xpplg?_r=1&_t=ZS-95vXydfRHtd"
            className="p-4 rounded-full border border-white/10 hover:bg-[#0b0706] hover:border-[#f5eeed] transition-all duration-300 group"
          >
            <FaTiktok
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="https://www.instagram.com/two_xpplg?igsh=Mzhzb3V2dmE4NmRn"
            className="p-4 rounded-full border border-white/10 hover:bg-[#FC563C] hover:border-[#c10777] transition-all duration-300 group"
          >
            <FaInstagram
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
          </a>
        </div>

        {/* 4. BOTTOM BAR (INFO & LOGOS) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-10 gap-8">
          {/* TEKS DI KIRI */}
          <div className="text-[9px] md:text-[10px] text-gray-500 leading-loose">
            <p className="font-bold text-white mb-1 tracking-[0.2em]">
              LEAD BY YANI YULIANTI S.T
            </p>
            <p>DESIGNED BY X PPLG 2 </p>
            <p>PRODUCT MADE BY X TJKT  </p>
            <p>PROPERTIES BY SMKN 1 SUBANG</p>
            <p className="mt-3 opacity-50 text-[11px] md:text-[12px] leading-normal tracking-wide">
              Copyright © 2026 — Enzo-Alfa-Rizky - X PPLG 2
            </p>
          </div>

          {/* LOGO DI KANAN */}
          <div className="flex items-center gap-6">
            <Image
              src="/img/LogoSMKN1SUBANG.png"
              width={45}
              height={45}
              alt="Logo 1"
            />
            <Image src="/img/LogoRPL.png" width={45} height={45} alt="Logo 2" />
            <Image src="/img/LogoTKJ.png" width={45} height={45} alt="Logo 3" />
          </div>
        </div>
      </div>{" "}
      {/* DIV PENUTUP INI TADI YANG HILANG */}
      {/* VERTICAL TEXT DECORATION */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 text-[9px] font-black text-white/5 uppercase tracking-[0.8em] [writing-mode:vertical-lr]">
        SMKN 1 SUBANG — X PPLG 2 — SMKN 1 SUBANG — X PPLG 2
      </div>
    </footer>
  );
}
