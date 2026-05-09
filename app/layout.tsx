  import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google"; 
  import "./globals.css";

  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
  });

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "IoT Landing",
    description: "Modern IoT Landing Page",
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full`}
      >
        <body className="min-h-full bg-[#071A26] text-white antialiased">
          {children}
        </body>
      </html>
    );
  }
