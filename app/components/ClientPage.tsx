"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- STATIC LABELS ---
const UI_LABELS = {
  JP: {
    menu: { home: "ホーム", about: "コンセプト", collection: "コレクション", contact: "お問い合わせ" },
    hero: { subtitle: "東京 • アップサイクル • アート", scroll: "スクロール" },
    concept: { label: "コンセプト", button: "詳しく見る" },
    banner: { button: "もっと見る" }, // NEW
    collection: { title: "コレクション", available: "作品数", view: "詳細を見る" },
    footer: { rights: "© 2024 Sara Obi / Tokyo", contactBtn: "メールを送る" }
  },
  EN: {
    menu: { home: "Home", about: "About", collection: "Collection", contact: "Contact" },
    hero: { subtitle: "Tokyo • Upcycled • Art", scroll: "Scroll" },
    concept: { label: "The Concept", button: "Learn More" },
    banner: { button: "See More" }, // NEW
    collection: { title: "Collection", available: "WORKS AVAILABLE", view: "View Details" },
    footer: { rights: "© 2024 Sara Obi / Tokyo", contactBtn: "CONTACT US" }
  }
};

// --- TYPES ---
type Tapestry = {
  id: string;
  title: string;
  title_english?: string;
  image: { url: string };
};

// Updated Props to include the new Banner data
type Props = {
  galleryItems: Tapestry[];
  heroImageUrl: string;
  conceptText: {
    title_en: string; body_en: string;
    title_jp: string; body_jp: string;
  };
  bannerData: { // NEW PROP
    imageUrl: string;
    title_en: string; body_en: string;
    title_jp: string; body_jp: string;
  };
};

export default function ClientPage({ galleryItems, heroImageUrl, conceptText, bannerData }: Props) {
  const [lang, setLang] = useState<"JP" | "EN">("EN");
  const ui = UI_LABELS[lang];

  const toggleLang = () => setLang((prev) => (prev === "EN" ? "JP" : "EN"));

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full px-8 py-5 flex justify-between items-center z-50 bg-black text-white">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-serif text-[#C5A059] tracking-wider">Sara Obi</span>
          <button onClick={toggleLang} className="border border-[#C5A059] text-[#C5A059] px-3 py-1 text-[10px] tracking-widest hover:bg-[#C5A059] hover:text-black transition-colors">
            {lang === "EN" ? "JP / 日本語" : "EN / English"}
          </button>
        </div>
        <div className="hidden md:flex space-x-8 text-xs font-sans tracking-[0.15em] uppercase">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">{ui.menu.home}</Link>
          <Link href="#concept" className="hover:text-[#C5A059] transition-colors">{ui.menu.about}</Link>
          <Link href="#collection" className="hover:text-[#C5A059] transition-colors">{ui.menu.collection}</Link>
          <Link href="#contact" className="hover:text-[#C5A059] transition-colors">{ui.menu.contact}</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${heroImageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-white animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl font-light tracking-widest mb-6 drop-shadow-lg">SARA OBI</h1>
          <p className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase opacity-90">{ui.hero.subtitle}</p>
        </div>
      </header>

      {/* --- CONCEPT SECTION --- */}
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

      {/* --- NEW: FABRIC COLLECTION BANNER (Ichijiku Style) --- */}
      <section className="relative py-32 px-4 text-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${bannerData.imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          {/* Dark Overlay to make text pop */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Content */}
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

      {/* --- COLLECTION --- */}
      <section id="collection" className="py-20 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-stone-100 pb-4">
            <h3 className="text-3xl font-light italic">{ui.collection.title}</h3>
            <span className="hidden md:block text-xs font-sans tracking-widest text-stone-400">
              {galleryItems.length} {ui.collection.available}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {galleryItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-stone-100">
                  <img src={item.image.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                </div>
                <h4 className="text-lg font-light tracking-wide">
                  {lang === "EN" ? (item.title_english || item.title) : item.title}
                </h4>
                <p className="text-[10px] font-sans text-[#C5A059] mt-1 tracking-widest uppercase">{ui.collection.view}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-black text-stone-500 py-12 px-8 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-sans tracking-widest uppercase">
          <p>{ui.footer.rights}</p>
          <div className="mt-4 md:mt-0">
             <a href="mailto:contact@sara-obi.com" className="hover:text-white transition">{ui.footer.contactBtn}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}