"use client";

import React from "react"; // Removed useState import
import Link from "next/link"; 
import Navbar from "./Navbar";
import { useLanguage } from "../context/LanguageContext"; // 👈 Import Global Hook

// --- STATIC LABELS ---
const UI_LABELS = {
  JP: {
    hero: { subtitle: "東京 • アップサイクル • アート", scroll: "スクロール" },
    concept: { label: "コンセプト", button: "ストーリーを読む" }, 
    gallery: { label: "コレクション", button: "ギャラリーを見る" }, 
    shop: { label: "オンラインショップ", button: "Etsyで見る" }, 
    contact: { label: "カスタムオーダー", button: "オーダーの相談をする" }, 
    footer: { 
      rights: "© 2026 Sara Obi. Powered by Vercel", 
      items: [
        { label: "オンラインショップ (Etsy)", href: "https://www.etsy.com/jp/shop/SARAOBIPRODUCTS" },
        { label: "SARA OBIについて", href: "/about" },
        { label: "ギャラリー", href: "/gallery" },
        { label: "お問い合わせ", href: "/contact" },
        { label: "利用規約", href: "#" },
        { label: "プライバシーポリシー", href: "#" }
      ]
    }
  },
  EN: {
    hero: { subtitle: "Tokyo • Upcycled • Art", scroll: "Scroll" },
    concept: { label: "ABOUT", button: "Read Our Story" }, 
    gallery: { label: "COLLECTION", button: "View Collection" }, 
    shop: { label: "ONLINE SHOP", button: "Visit Etsy Shop" }, 
    contact: { label: "CUSTOM ORDER", button: "Inquire / Custom Order" }, 
    footer: { 
      rights: "© 2026 Sara Obi. Powered by Vercel",
      items: [
        { label: "Online Shop (Etsy)", href: "https://www.etsy.com/jp/shop/SARAOBIPRODUCTS" },
        { label: "About", href: "/about" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" }
      ]
    }
  }
};

type SectionDataWithImage = {
  imageUrl: string;
  title_en: string; body_en: string;
  title_jp: string; body_jp: string;
};

type TextOnlyData = {
  title_en: string; body_en: string;
  title_jp: string; body_jp: string;
};

type Props = {
  heroImageUrl: string;
  conceptText: TextOnlyData;
  galleryData: SectionDataWithImage;
  shopData: TextOnlyData;
  contactData: SectionDataWithImage;
};

export default function ClientPage({ heroImageUrl, conceptText, galleryData, shopData, contactData }: Props) {
  // 👇 REPLACED useState with useLanguage()
  const { lang, toggleLang } = useLanguage();
  
  const ui = UI_LABELS[lang];

  // --- STYLES ---
  const baseLabelStyle = "block text-xs md:text-sm font-sans tracking-[0.3em] mb-6 uppercase font-bold";
  const goldenLabelStyle = `${baseLabelStyle} text-[#C5A059]`;
  const whiteLabelStyle = `${baseLabelStyle} text-white`;
  const titleStyle = "text-4xl md:text-6xl font-serif mb-8 leading-tight";
  const bodyStyle = "text-sm md:text-lg font-sans font-medium leading-relaxed mb-10 whitespace-pre-wrap";
  const strongShadow = { textShadow: "0 2px 10px rgba(0,0,0,0.8)" };

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* --- 1. HERO --- */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${heroImageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 text-white animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl font-light tracking-widest mb-6" style={strongShadow}>SARA OBI</h1>
          <p className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase opacity-90" style={strongShadow}>{ui.hero.subtitle}</p>
        </div>
      </header>

      {/* --- 2. ABOUT --- */}
      <section className="py-32 px-6 max-w-3xl mx-auto text-center">
        <span className={goldenLabelStyle}>{ui.concept.label}</span>
        <h2 className={`${titleStyle} text-[#2C2C2C]`}>
          {lang === "EN" ? conceptText.title_en : conceptText.title_jp}
        </h2>
        <p className={`${bodyStyle} text-stone-600`}>
          {lang === "EN" ? conceptText.body_en : conceptText.body_jp}
        </p>
        <Link href="/about" className="inline-block px-10 py-3 border border-gray-300 text-xs font-sans tracking-widest hover:bg-stone-100 transition">
          {ui.concept.button}
        </Link>
      </section>

      {/* --- 3. GALLERY --- */}
      <section className="relative py-48 px-4 text-center text-white">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${galleryData.imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className={whiteLabelStyle} style={strongShadow}>{ui.gallery.label}</span>
          <h3 className={`${titleStyle} text-white`} style={strongShadow}>
            {lang === "EN" ? galleryData.title_en : galleryData.title_jp}
          </h3>
          <p className={`${bodyStyle} text-white`} style={strongShadow}>
            {lang === "EN" ? galleryData.body_en : galleryData.body_jp}
          </p>
          <Link href="/gallery" className="bg-white text-black px-10 py-4 text-xs font-sans tracking-widest hover:bg-gray-200 transition inline-block shadow-xl">
            {ui.gallery.button}
          </Link>
        </div>
      </section>

      {/* --- 4. ONLINE SHOP --- */}
      <section className="py-32 px-6 bg-white text-center border-y border-stone-200">
        <div className="max-w-2xl mx-auto">
          <span className={goldenLabelStyle}>{ui.shop.label}</span>
          <h3 className={`${titleStyle} text-[#2C2C2C]`}>
            {lang === "EN" ? shopData.title_en : shopData.title_jp}
          </h3>
          <p className={`${bodyStyle} text-stone-600`}>
            {lang === "EN" ? shopData.body_en : shopData.body_jp}
          </p>
          <a 
            href="https://www.etsy.com/jp/shop/SARAOBIPRODUCTS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#F1641E] text-white px-10 py-4 text-xs font-sans tracking-widest hover:bg-[#d55517] transition inline-block rounded-sm shadow-sm"
          >
            {ui.shop.button}
          </a>
        </div>
      </section>

      {/* --- 5. CONTACT --- */}
      <section className="relative py-48 px-4 text-center text-white">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${contactData.imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className={whiteLabelStyle} style={strongShadow}>{ui.contact.label}</span>
          <h3 className={`${titleStyle} text-white`} style={strongShadow}>
            {lang === "EN" ? contactData.title_en : contactData.title_jp}
          </h3>
          <p className={`${bodyStyle} text-white`} style={strongShadow}>
            {lang === "EN" ? contactData.body_en : contactData.body_jp}
          </p>
          <Link href="/contact" className="bg-white text-black px-10 py-4 text-xs font-sans tracking-widest hover:bg-gray-200 transition inline-block shadow-xl">
            {ui.contact.button}
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-24 px-8 border-t border-stone-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-0">
          <div className="flex flex-col items-start gap-6">
            <span className="text-3xl font-serif text-[#C5A059] tracking-wider">Sara Obi</span>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-4 text-sm font-sans tracking-wide">
            {ui.footer.items.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                className="hover:text-[#C5A059] transition-colors text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-[10px] text-stone-500 font-sans tracking-widest uppercase text-center md:text-left">
            <p>{ui.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}