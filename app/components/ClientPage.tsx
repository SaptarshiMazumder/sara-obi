"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar"; // IMPORT NEW NAVBAR

// --- STATIC LABELS ---
const UI_LABELS = {
  JP: {
    hero: { subtitle: "東京 • アップサイクル • アート", scroll: "スクロール" },
    concept: { label: "コンセプト", button: "詳しく見る" },
    banner: { button: "もっと見る" },
    reserve: { button: "ギャラリーを予約する" },
    newsletter: { placeholder: "メールアドレス", success: "登録ありがとうございます。" },
    footer: { 
      rights: "© 2026 Sara Obi. Powered by Vercel", 
      items: [
        { label: "オンラインショップ", href: "/gallery" },
        { label: "着物の魅力", href: "#concept" },
        { label: "ギャラリー予約", href: "#reservation" },
        { label: "Sara Obiについて", href: "#concept" },
        { label: "利用規約", href: "#" },
        { label: "アカウント作成", href: "#" },
        { label: "プライバシーポリシー", href: "#" }
      ]
    }
  },
  EN: {
    hero: { subtitle: "Tokyo • Upcycled • Art", scroll: "Scroll" },
    concept: { label: "The Concept", button: "Learn More" },
    banner: { button: "See More" },
    reserve: { button: "Visit the Gallery" },
    newsletter: { placeholder: "Email address", success: "Thank you for subscribing." },
    footer: { 
      rights: "© 2026 Sara Obi. Powered by Vercel",
      items: [
        { label: "Online Shop", href: "/gallery" },
        { label: "Why Kimono?", href: "#concept" },
        { label: "Gallery Reservation", href: "#reservation" },
        { label: "About Sara Obi", href: "#concept" },
        { label: "Terms of Service", href: "#" },
        { label: "Create Account", href: "#" },
        { label: "Privacy Policy", href: "#" }
      ]
    }
  }
};

type SectionData = {
  imageUrl: string;
  title_en: string; body_en: string;
  title_jp: string; body_jp: string;
};

type NewsData = {
  title_en: string; body_en: string;
  title_jp: string; body_jp: string;
};

type Props = {
  heroImageUrl: string;
  conceptText: {
    title_en: string; body_en: string;
    title_jp: string; body_jp: string;
  };
  bannerData: SectionData;
  productData: SectionData;
  reserveData: SectionData;
  newsData: NewsData;
};

export default function ClientPage({ heroImageUrl, conceptText, bannerData, productData, reserveData, newsData }: Props) {
  const [lang, setLang] = useState<"JP" | "EN">("EN");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const ui = UI_LABELS[lang];
  const toggleLang = () => setLang((prev) => (prev === "EN" ? "JP" : "EN"));

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch("https://formspree.io/f/mojjqvjd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      
      {/* --- NEW NAVBAR COMPONENT --- */}
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* --- HERO --- */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${heroImageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-white animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl font-light tracking-widest mb-6 drop-shadow-lg">SARA OBI</h1>
          <p className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase opacity-90">{ui.hero.subtitle}</p>
        </div>
      </header>

      {/* --- CONCEPT --- */}
      <section id="concept" className="py-32 px-6 max-w-3xl mx-auto text-center">
        <span className="block text-[10px] font-sans tracking-[0.3em] text-[#C5A059] mb-8 uppercase">{ui.concept.label}</span>
        <h2 className="text-3xl md:text-4xl leading-relaxed font-light mb-8 whitespace-pre-line">
          {lang === "EN" ? conceptText.title_en : conceptText.title_jp}
        </h2>
        <p className="text-sm md:text-base leading-8 text-stone-600 font-sans font-light mb-10 whitespace-pre-wrap">
          {lang === "EN" ? conceptText.body_en : conceptText.body_jp}
        </p>
        <button className="inline-block px-10 py-3 border border-gray-300 text-xs font-sans tracking-widest hover:bg-stone-100 transition">{ui.concept.button}</button>
      </section>

      {/* --- 1. FABRIC COLLECTION --- */}
      <section className="relative py-32 px-4 text-center text-white">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${bannerData.imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif mb-6">
            {lang === "EN" ? bannerData.title_en : bannerData.title_jp}
          </h3>
          <p className="text-sm md:text-base font-sans font-light leading-7 mb-10 opacity-90 whitespace-pre-wrap">
            {lang === "EN" ? bannerData.body_en : bannerData.body_jp}
          </p>
          <button className="bg-white text-black px-8 py-3 text-xs font-sans tracking-widest hover:bg-gray-200 transition">
            {ui.banner.button}
          </button>
        </div>
      </section>

      {/* --- 2. SIGNATURE PRODUCT --- */}
      <section className="relative py-32 px-4 text-center text-white">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${productData.imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif mb-6">
            {lang === "EN" ? productData.title_en : productData.title_jp}
          </h3>
          <p className="text-sm md:text-base font-sans font-light leading-7 mb-10 opacity-90 whitespace-pre-wrap">
            {lang === "EN" ? productData.body_en : productData.body_jp}
          </p>
          <button className="bg-white text-black px-8 py-3 text-xs font-sans tracking-widest hover:bg-gray-200 transition">
            {ui.banner.button}
          </button>
        </div>
      </section>

      {/* --- 3. RESERVATION --- */}
      <section id="reservation" className="relative py-48 px-4 text-center text-white">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${reserveData.imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif mb-6">
            {lang === "EN" ? reserveData.title_en : reserveData.title_jp}
          </h3>
          <p className="text-sm md:text-base font-sans font-light leading-7 mb-10 opacity-90 whitespace-pre-wrap">
            {lang === "EN" ? reserveData.body_en : reserveData.body_jp}
          </p>
          <button className="bg-white text-black px-8 py-3 text-xs font-sans tracking-widest hover:bg-gray-200 transition">
            {ui.reserve.button}
          </button>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-32 px-4 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="text-3xl font-serif mb-6 text-[#2C2C2C]">
            {lang === "EN" ? newsData.title_en : newsData.title_jp}
          </h3>
          <p className="text-sm font-sans text-stone-500 mb-10 leading-7">
            {lang === "EN" ? newsData.body_en : newsData.body_jp}
          </p>
          
          {isSubmitted ? (
            <div className="text-[#C5A059] font-sans tracking-widest text-sm animate-fade-in-up">
              {ui.newsletter.success}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative max-w-sm mx-auto border-b border-stone-300">
              <input 
                type="email" 
                placeholder={ui.newsletter.placeholder} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 text-sm font-sans outline-none text-[#2C2C2C] placeholder:text-stone-400 bg-transparent"
                required
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#C5A059] transition-colors">
                →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-black text-white py-24 px-8 border-t border-stone-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-0">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col items-start gap-6">
            <span className="text-3xl font-serif text-[#C5A059] tracking-wider">Sara Obi</span>
            
            <a href="#" className="text-white hover:text-[#C5A059] transition">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-start md:items-end space-y-4 text-sm font-sans tracking-wide">
            {ui.footer.items.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="hover:text-[#C5A059] transition-colors text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-[10px] text-stone-500 font-sans tracking-widest uppercase text-center md:text-left">
            <p>{ui.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}