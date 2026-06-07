"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fungsi untuk cek status overflow body
    const checkOverflow = () => {
      setIsModalOpen(document.body.style.overflow === "hidden");
    };

    // Jalankan observer untuk memantau perubahan style pada body
    const observer = new MutationObserver(checkOverflow);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 transition-all duration-500 ease-in-out
        ${isModalOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      {/* LOGO KIRI */}
      <Image
        width={200}
        height={200}
        src="/img/logo.png"
        alt="nav-logo-left"
        className="w-32 md:w-40 h-auto object-contain pointer-events-auto transition-all duration-300 hover:scale-105"
      />

      {/* KONTAINER LOGO KANAN (Merapikan MRC & Top Kopi ke ujung kanan) */}
      <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
        {/* LOGO MRC */}
        <Image
          width={200}
          height={200}
          src="/img/MRC.png"
          alt="nav-logo-mrc"
          className="w-20 md:w-20 h-auto object-contain transition-all duration-300 hover:scale-110"
        />

        {/* LOGO TOP KOPI */}
        <Image
          width={200}
          height={200}
          src="/img/topkopi.png"
          alt="nav-logo-topkopi"
          className="w-20 md:w-20 h-auto object-contain transition-all duration-300 hover:scale-110"
        />
      </div>
    </nav>
  );
};

export default Navbar;
