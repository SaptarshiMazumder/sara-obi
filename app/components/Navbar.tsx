"use client";

import React from "react";
import Link from "next/link";

type Props = {
  lang: "JP" | "EN";
  toggleLang: () => void;
};

export default function Navbar({ lang, toggleLang }: Props) {
  
  const labels = {
    JP: { home: "ホーム", about: "コンセプト", gallery: "ギャラリー", contact: "お問い合わせ" },
    EN: { home: "Home", about: "About", gallery: "Gallery", contact: "Contact" }
  };

  const t = labels[lang];

  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-5 flex justify-between items-center z-50 bg-black text-white">
      {/* LEFT: Logo & Lang Toggle */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-serif text-[#C5A059] tracking-wider">
          Sara Obi
        </Link>
        <button 
          onClick={toggleLang} 
          className="border border-[#C5A059] text-[#C5A059] px-3 py-1 text-[10px] tracking-widest hover:bg-[#C5A059] hover:text-black transition-colors"
        >
          {lang === "EN" ? "JP / 日本語" : "EN / English"}
        </button>
      </div>

      {/* RIGHT: Menu Links */}
      <div className="hidden md:flex space-x-8 text-xs font-sans tracking-[0.15em] uppercase">
        <Link href="/" className="hover:text-[#C5A059] transition-colors">
          {t.home}
        </Link>
        {/* We use /#id so links work from any page */}
        <Link href="/#concept" className="hover:text-[#C5A059] transition-colors">
          {t.about}
        </Link>
        <Link href="/gallery" className="hover:text-[#C5A059] transition-colors">
          {t.gallery}
        </Link>
        <Link href="/#contact" className="hover:text-[#C5A059] transition-colors">
          {t.contact}
        </Link>
      </div>
    </nav>
  );
}