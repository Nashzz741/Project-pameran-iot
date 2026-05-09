"use client";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    // pt-2 md:pt-4 buat ngasih "napas" dikit di atas biar gak full mepet
    // pl-6 buat jarak aman di kiri
    <nav className="fixed top-0 left-0 z-[100] pt-2 md:pt-4 pl-6 pointer-events-none">
      <Image
        width={200}
        height={200}
        src="/img/logo.png"
        alt="nav-logo"
        // -mt nya kita kecilin (jadi -mt-2 atau -mt-4) biar dia turun dikit dari plafon
        // Ukuran md:w-40 biar makin compact dan estetik
        className="w-32 md:w-40 h-auto object-contain -mt-2 md:-mt-4 pointer-events-auto transition-all duration-300 hover:scale-105"
      />
    </nav>
  );
};

export default Navbar;
