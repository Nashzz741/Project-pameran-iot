"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { time } from "console";

const IOT_DATA = [
  {
    id: 1,
    title: "AeroTech Fan",
    desc: "Mini ukurannya, maksimal sejuknya. (TJKT_2)",
    fullDesc:
      "kipas mini sederhana berbasis motor dan rangkaian elektronik dasar. Kipas ini menggunakan baling-baling plastik yang dipasang pada motor kecil, dengan rangka penopang dari kayu atau bahan ringan lainnya. Sumber daya berasal dari baterai, dan kontrolnya sederhana menggunakan saklar on/off.",
    imgCard: "/img/AeroTech_Fan_Pt.webp",
    imgDetail: "/img/AeroTech_Fan.webp",
  },
  {
    id: 2,
    title: "O.A.S.I.S",
    desc: "Bukan Sihir, Ini O.A.S.I.S. (TJKT_2)",
    fullDesc:
      "O.A.S.I.S (Optical Automated Smart Illumination System) adalah proyek smart light berbasis IoT yang menggunakan ESP32 sebagai pusat kontrol dan aplikasi Blynk sebagai pengendali melalui smartphone. Sistem ini memungkinkan pengguna menyalakan atau mematikan lampu dari jarak jauh melalui koneksi Wi-Fi. ESP32 akan menerima perintah dari aplikasi lalu mengontrol modul relay sebagai sakelar elektronik untuk mengatur arus listrik pada lampu secara otomatis dan praktis.",
    imgCard: "/img/oasis-P.webp",
    imgDetail: "/img/lc.webp",
  },
  {
    id: 3,
    title: "ECO ENERGYY",
    desc: "Eco energy hemat listrik. (TJKT_2)",
    fullDesc:
      "Projek ini menggunakan beberapa panal surya kecil yang berfungsi menangkap cahaya matahari lalu mengubahnya menjadi eneri listrik. Energi tersebut di salurkan ke batrai dan dapat digunakan untuk mengisi daya HP atau perangkat elektronik kecil lain nya.",
    imgCard: "/img/ecoenergypt.webp",
    imgDetail: "/img/ecoenergylc.webp",
  },
  {
    id: 4,
    title: "Smart Lampp",
    desc: "Belajar Lebih Nyaman dengan Cahaya. (TJKT_1)",
    fullDesc:
      "Smart Lamp adalah lampu belajar pintar berbasis Internet of Things yang dilengkapi dengan sensor suara untuk memudahkan pengguna dalam mengontrol lampu. Lampu dapat dinyalakan atau dimatikan melalui perintah suara sehingga lebih praktis dan modern. Dengan desain fleksibel dan hemat energi, Smart Lamp memberikan pencahayaan yang nyaman untuk belajar atau bekerja.",
    imgCard: "/img/smartlamp2.webp",
    imgDetail: "/img/smartlamp1.webp",
  },
  {
    id: 5,
    title: "SMARTFAN",
    desc: "Nyala Otomatis, Sejuk Tanpa Ribet. (TJKT_2)",
    fullDesc:
      "Sistem IoT yang mengontrol kipas secara otomatis berdasarkan suhu ruangan menggunakan sensor suhu untuk menciptakan kenyamanan dan efisiensi energi.",
    imgCard: "/img/smartfannpt.webp",
    imgDetail: "/img/smartfanlc.webp",
  },
  {
    id: 6,
    title: "PAKAN OTOMATIS",
    desc: "Pergi Tenang, Peliharaan Kenyang. (11_TJKT_2)",
    fullDesc:
      "Project IOT ini adalah sistem pemberi pakan hewan peliharaan (ikan) otomatis yang terhubung ke internet. Menggunakan Arduino uno sebagai mikrokontroler utama, sistem ini mengatur jadwal pemberian pakan secara real-time atau berdasarkan perintah dari codingan di system yang sudah di atur.",
    imgCard: "/img/pakanotomatis1.webp",
    imgDetail: "/img/pakanotomatis2.webp",
  },
  {
    id: 7,
    title: "Tol Gate",
    desc: "Project Tol Gate Solid Solid Solid. (TJKT_1)",
    fullDesc:
      "Smart Gate E-Toll adalah sebuah prototipe sistem otomasi gerbang tol pintar yang dirancang untuk mensimulasikan mekanisme Gerbang Tol Otomatis (GTO) asli di Indonesia. Sistem ini mengintegrasikan teknologi identifikasi frekuensi radio (RFID), pemrosesan logika kontrol mikro, dan interface visual interaktif secara real-time.",
    imgCard: "/img/Tolgate1.webp",
    imgDetail: "/img/Tolgate2.webp",
  },
  {
    id: 8,
    title: "SMART HOME",
    desc: "Satu Sensor, Sejuta Kemudahan. Sambut Masa Depan Tanpa Hambatan!. (11_TJKT_2)",
    fullDesc:
      "Home adalah sistem rumah pintar yang menggunakan teknologi otomatis untuk meningkatkan keamanan dan kenyamanan. Pada proyek ini digunakan sensor RFID sebagai akses masuk, LED sebagai indikator status, dan motor servo sebagai penggerak pintu otomatis. Semua komponen bekerja bersama untuk membuat sistem rumah menjadi lebih modern dan efisien.",
    imgCard: "/img/smarthome4.webp",
    imgDetail: "/img/smarthome2.webp",
  },
  {
    id: 9,
    title: "Smart home alarm",
    desc: "Mendeteksi lebih cepat untuk menjaga rumah lebih aman. (11_TJKT_2)",
    fullDesc:
      "Smart Home Alarm adalah sistem rumah pintar berbasis Arduino yang menggabungkan efisiensi energi dan keamanan otomatis. Sistem ini dilengkapi Sensor LDR dan LED untuk menyalakan lampu secara otomatis saat gelap, Sensor Rain untuk mendeteksi turunnya hujan, serta Sensor Flame & Smoke sebagai deteksi dini pencegah bahaya kebakaran.",
    imgCard: "/img/smarthomealarm.webp",
    imgDetail: "/img/smarthomealarm.webp",
  },
  {
    id: 10,
    title: "Sky Gate Residence",
    desc: "Keluar Kawasan Lebih Aman, Cepat, dan Nyaman.(TJKT_1)",
    fullDesc:
      "Sky Gate Residence adalah sistem palang pintu keluar pintar berbasis Internet of Things (IoT) yang dirancang khusus untuk area apartemen. Dilengkapi dengan sensor pemindai otomatis, sistem ini memudahkan penghuni untuk keluar apartemen tanpa perlu interaksi manual yang lama. Palang pintu akan terbuka secara otomatis hanya untuk kendaraan yang terverifikasi, sehingga lebih praktis, modern, dan efisien. Dengan sistem pemantauan real-time, Sky Gate Residence tidak hanya mengurai antrean kendaraan di jam sibuk tetapi juga meningkatkan standar keamanan lingkungan apartemen.",
    imgCard: "/img/Skygate1.webp",
    imgDetail: "/img/Skygate2.webp",
  },
  {
    id: 11,
    title: "pengukur digital",
    desc: "bersatu kita hebat bersama kita kuat (TJKT_1)",
    fullDesc:
      "Penggaris digital adalah alat ukur jarak modern yang bekerja menggunakan sensor ultrasonik dan mikrokontroler Arduino. Alat ini mengukur jarak dengan cara memancarkan gelombang ultrasonik ke suatu objek, kemudian menghitung waktu pantulan gelombang tersebut kembali ke sensor. Hasil pengukuran lalu diproses oleh Arduino dan dapat ditampilkan secara digital.",
    imgCard: "/img/pengukurdigital1.webp",
    imgDetail: "/img/pengukurdigital2.webp",
  },

  {
    id: 12,
    title: "Smart cluster gate",
    desc: "Hunian Cerdas, Keamanan Terkendali (11_TJKT_2)",
    fullDesc:
      "Proyek ini merupakan sebuah inovasi sistem keamanan pintu otomatis (Smart Lock) berbasis mikrokontroler Arduino Uno yang dirancang khusus untuk memenuhi kebutuhan pengamanan dan pembatasan hak akses pada kawasan perumahan modern, seperti area cluster atau residence. Sistem ini mengintegrasikan teknologi RFID (Radio Frequency Identification) sebagai media autentikasi masuk utama, menggantikan penggunaan kunci fisik konvensional yang dinilai kurang efisien, mudah hilang, dan rentan terhadap risiko duplikasi oleh pihak yang tidak bertanggung jawab.",
    imgCard: "/img/smartclustergate_xitkj2_pt.webp",
    imgDetail: "/img/smartclustergate_xitkj2_lc.webp",
  },
  {
    id: 13,
    title: "mini coolerr",
    desc: "Mini ukurannya, maksimal sejuknya. (TJKT_2)",
    fullDesc:
      "kipas mini sederhana berbasis motor dan rangkaian elektronik dasar. Kipas ini menggunakan baling-baling plastik yang dipasang pada motor kecil, dengan rangka penopang dari kayu atau bahan ringan lainnya. Sumber daya berasal dari baterai, dan kontrolnya sederhana menggunakan saklar on/off.",
    imgCard: "/img/mini cooler pt.webp",
    imgDetail: "/img/mini cooler lc.webp",
  },
  {
    id: 14,
    title: "BLIND NAV STICK",
    desc: "Navigasi cerdas untuk menuntun langkah yang lebih aman” (11_TJKT_2)",
    fullDesc:
      "Proyek ini merupakan sebuah inovasi alat bantu mobilitas pintar berbasis mikrokontroler Arduino Uno yang dirancang khusus untuk membantu penyandang tunanetra dalam meningkatkan keamanan dan kenyamanan saat berjalan. Sistem ini memanfaatkan teknologi sensor sebagai pendeteksi kondisi lingkungan sekitar secara otomatis sehingga pengguna dapat mengetahui adanya hambatan maupun kondisi tertentu tanpa harus melihat secara langsung. Alat ini hadir sebagai pengembangan dari tongkat konvensional yang dinilai masih memiliki keterbatasan dalam mendeteksi rintangan di area depan pengguna secara lebih cepat dan akurat.",
    imgCard: "/img/Blind Nav Stick.webp",
    imgDetail: "/img/Blind Nav Stick2.webp",
  },
  {
    id: 15,
    title: "automatic trash can",
    desc: "Smart bin, Smart Living (TJKT_1)",
    fullDesc:
      "Tempat Sampah Otomatis merupakan proyek loT (Internet of Things) yang menggunakan sensor untuk membuka dan menutup tutup sampah secara otomatis tanpa harus disentuh. Alat ini dirancang untuk memudahkan pengguna dalam membuang sampah sekaligus menjaga kebersihan dan kehigienisan lingkungan.",
    imgCard: "/img/smarttrash1.webp",
    imgDetail: "/img/smarttrash2.webp",
  },
  {
    id: 16,
    title: "Solar Junkk Racer",
    desc: "Sampah bisa jalan kalau kreatif (TJKT_2)",
    fullDesc:
      "Mobil mainan mini ini adalah projek mobil mainan yang terbuat dari 90% sampah barang bekas beserta panel surya untuk mengelola energi dari energi sinar matahari menjadi energi listik yang disalurkan ke kipas yang berada di bagian belakang mobil dan saat kipas itu berputar kencang disitulah mobil bisa berjalan.",
    imgCard: "/img/potret sansan.webp",
    imgDetail: "/img/sansan lc.webp",
  },
  {
    id: 17,
    title: "Mechabox",
    desc: "Membangun Ide Menjadi Teknologi. (TJKT_2)",
    fullDesc:
      "Project ini merupakan robot/mini kendaraan sederhana yang dibuat dari bahan kardus bekas, motor dc, baterai, dan roda mekanik sebagai media pembelajaran dasar tentang mekanika dan elektronika. Proyek ini dirancang untuk melatih kreativitas, kerja sama tim, serta pemahaman mengenai sistem penggerak sederhana dengan memanfaatkan bahan yang mudah ditemukan dan ramah lingkungan.",
    imgCard: "/img/mechabox2.webp",
    imgDetail: "/img/mechabox1.webp",
  },
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
    const gap = 40;
    const moveX = index * (cardWidth + gap);

    gsap.to(container, { x: -moveX, duration: 1, ease: "expo.inOut" });

    cards.forEach((card, i) => {
      if (i === index) {
        gsap.to(card, {
          opacity: 1,
          scale: 1.05,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        gsap.to(card, {
          opacity: 0.4,
          scale: 0.9,
          duration: 0.4,
          onComplete: () => {
            gsap.to(card, { opacity: 0, duration: 0.4, ease: "power2.in" });
          },
        });
      }
    });
  };

  // Fitur Toggle Enter (Buka / Tutup) dan Navigasi Panah
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIoT) {
          // Klik kedua: Jika modal sudah terbuka, maka tutup modal
          setSelectedIoT(null);
        } else {
          // Klik pertama: Jika modal tertutup, maka buka modal
          setSelectedIoT(IOT_DATA[activeIdx]);
        }
        return;
      }

      // Navigasi panah hanya berfungsi jika modal sedang tertutup
      if (!selectedIoT) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNav(activeIdx + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          handleNav(activeIdx - 1);
        }
      } else {
        // Jika modal terbuka, tombol Escape tetap bisa digunakan untuk menutup
        if (e.key === "Escape") {
          setSelectedIoT(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, selectedIoT]);

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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === activeIdx ? "opacity-30 visible" : "opacity-0 invisible"}`}
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
            className={`absolute transition-all duration-700 ease-in-out ${i === activeIdx ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-10 invisible pointer-events-none"}`}
          >
            <div className="max-w-xl">
              <span className="text-[#FC563C] font-black uppercase text-[10px] mb-4 block tracking-[.4em]">
                {" "}
                Project 0{i + 1}{" "}
              </span>
              <h1 className="text-[8vw] md:text-[7vw] font-black uppercase leading-[0.8] mb-6 tracking-tighter">
                {" "}
                {item.title}{" "}
              </h1>
              <p className="text-gray-400 text-lg mb-10 max-w-sm leading-relaxed opacity-70 italic">
                {" "}
                "{item.desc}"{" "}
              </p>
              <button
                onClick={() => setSelectedIoT(item)}
                className="pointer-events-auto bg-[#FC563C] px-10 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-[0_0_40px_rgba(252,86,60,0.7)] hover:scale-105 active:scale-95 transition-all"
              >
                {" "}
                Preview Project{" "}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="absolute bottom-12 left-10 md:left-24 z-50 flex gap-4 items-center">
        <button
          onClick={() => handleNav(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#FC563C] hover:border-[#FC563C] transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
        >
          {" "}
          ←{" "}
        </button>
        <button
          onClick={() => handleNav(activeIdx + 1)}
          disabled={activeIdx === IOT_DATA.length - 1}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#FC563C] hover:border-[#FC563C] transition-all disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
        >
          {" "}
          →{" "}
        </button>
        <div className="text-[10px] font-mono text-gray-500 tracking-[0.4em]">
          <span className="text-white">0{activeIdx + 1}</span> / 0
          {IOT_DATA.length}
        </div>
      </div>

      {/* CARDS TRACK */}
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
                  {" "}
                  0{item.id} {item.title}{" "}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 bg-[#071A26] translate-y-full opacity-0 flex flex-col md:flex-row items-center justify-center p-10 md:p-24 gap-12"
      >
        <button
          onClick={() => setSelectedIoT(null)}
          className="absolute top-10 right-10 text-white border border-white/20 px-8 py-3 rounded-full uppercase text-[10px] font-black hover:bg-[#FC563C] transition-all"
        >
          {" "}
          CLOSE [X]{" "}
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
                {" "}
                {selectedIoT.title}{" "}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                {" "}
                {selectedIoT.fullDesc}{" "}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
