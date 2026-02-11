"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  lang: "JP" | "EN";
  toggleLang: () => void;
};

export default function Navbar({ lang, toggleLang }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Labels for navigation
  const LABELS = {
    JP: {
      about: "コンセプト",       // Was "ABOUT"
      gallery: "コレクション",     // Was "GALLERY"
      contact: "お問い合わせ",     // Was "CONTACT"
      shop: "オンラインショップ",  // Was "ONLINE SHOP"
    },
    EN: {
      about: "ABOUT",
      gallery: "COLLECTION",
      contact: "CONTACT",
      shop: "ONLINE SHOP",
    },
  };

  const t = LABELS[lang];
  const closeMenu = () => setIsOpen(false);
  const etsyLink = "https://www.etsy.com/jp/shop/SARAOBIPRODUCTS";

  return (
    <>
      {/* 👇 Added font-sans-jp conditional class so JP font looks good */}
      <nav className={`fixed top-0 w-full z-50 bg-black text-white h-[80px] px-6 flex items-center justify-between ${lang === "JP" ? "font-sans-jp" : ""}`}>

        {/* --- 1. HAMBURGER (Mobile Only - LEFT) --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 p-2 -ml-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            // X Icon
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          )}
        </button>

        {/* --- 2. LOGO (Centered on Mobile, Left on Desktop) --- */}
        <Link
          href="/"
          onClick={closeMenu}
          className="z-50 flex items-center
                     absolute left-1/2 -translate-x-1/2 
                     md:static md:translate-x-0 h-full w-auto overflow-hidden"
          aria-label="SARA OBI Home"
        >
          <Image
            src="/logo.png"
            alt="SARA OBI"
            width={160}
            height={48}
            className="h-[130px] w-auto max-h-none object-contain object-left"
            priority
          />
        </Link>

        {/* --- 3. SHOP ICON (Mobile Only - RIGHT) --- */}
        <a
          href={etsyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden z-50 p-2 -mr-2"
          aria-label="Shop on Etsy"
        >
          {/* Shopping Bag Icon */}
          <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </a>

        {/* --- 4. DESKTOP MENU (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center ml-auto gap-8 text-xs font-sans tracking-widest">
          <Link href="/about" className="hover:text-[#C5A059] transition-colors">
            {t.about}
          </Link>
          <Link href="/gallery" className="hover:text-[#C5A059] transition-colors">
            {t.gallery}
          </Link>
          <a href={etsyLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] transition-colors">
            {t.shop}
          </a>
          <Link href="/contact" className="hover:text-[#C5A059] transition-colors">
            {t.contact}
          </Link>

          <button onClick={toggleLang} className="border border-white/30 px-3 py-1 hover:bg-white hover:text-black transition">
            {lang === "EN" ? "JP" : "EN"}
          </button>
        </div>
      </nav>

      {/* --- 5. MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* 👇 Added font-sans-jp here too */}
        <div className={`flex flex-col items-center gap-10 text-xl font-serif text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
          <Link href="/about" onClick={closeMenu} className="hover:text-[#C5A059] transition-colors">
            {t.about}
          </Link>
          <Link href="/gallery" onClick={closeMenu} className="hover:text-[#C5A059] transition-colors">
            {t.gallery}
          </Link>
          <a href={etsyLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] transition-colors">
            {t.shop}
          </a>
          <Link href="/contact" onClick={closeMenu} className="hover:text-[#C5A059] transition-colors">
            {t.contact}
          </Link>

          <div className="w-10 h-px bg-stone-700 my-4"></div>

          <button onClick={() => { toggleLang(); closeMenu(); }} className="text-sm font-sans tracking-widest border border-stone-600 px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
            {lang === "EN" ? "SWITCH TO JP" : "ENGLISH"}
          </button>
        </div>
      </div>
    </>
  );
}