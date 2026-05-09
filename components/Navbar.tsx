"use client";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] pt-2 md:pt-4 pointer-events-none flex justify-between items-start px-6">
      {/* LOGO KIRI */}
      <Image
        width={200}
        height={200}
        src="/img/logo.png"
        alt="nav-logo-left"
        // -mt-2 biar gak terlalu nempel ke atas, w-32 buat mobile, w-40 buat desktop
        className="w-32 md:w-40 h-auto object-contain -mt-2 md:-mt-4 pointer-events-auto transition-all duration-300 hover:scale-105"
      />

      {/* LOGO KANAN */}
      <Image
        width={200}
        height={200}
        src="/img/logo.png" // Ganti path kalau logo kanannya beda
        alt="nav-logo-right"
        className="w-32 md:w-40 h-auto object-contain -mt-2 md:-mt-4 pointer-events-auto transition-all duration-300 hover:scale-105"
      />
    </nav>
  );
};

export default Navbar;
