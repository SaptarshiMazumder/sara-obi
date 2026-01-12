"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar"; // IMPORT NEW NAVBAR

// --- TYPES ---
type GalleryItem = {
  id: string;
  title: string;
  image: { url: string; height: number; width: number };
  category: string[];
  price: string;
  etsy_link?: string;
  description: string;
};

// --- TRANSLATIONS ---
const UI_LABELS = {
  JP: {
    header: {
      label: "コレクション",
      title: "帯タペストリーアーカイブ",
      desc: "アンティーク帯をアップサイクルしたアートコレクション。在庫状況の確認や購入は、各作品をクリックしてEtsyページをご覧ください。"
    },
    filter: { all: "すべて" },
    grid: { viewEtsy: "Etsyで見る" },
    custom: {
      title: "カスタムオーダーについて",
      step1_title: "お問い合わせ",
      step1_desc: "ご希望のサイズや色味（例：ゴールド系、黒系など）を予約フォームよりご連絡ください。在庫の中から最適な帯をご提案します。",
      step2_title: "選定・制作",
      step2_desc: "提案した帯の中からお選びいただき、制作に入ります。制作期間は通常2〜3週間です。",
      step3_title: "お届け",
      step3_desc: "国内外問わず配送可能です（EMS/DHL）。完成したタペストリーを丁寧にお届けします。",
      price_title: "参考価格",
      price_std: "定型サイズ: ¥30,000 – ¥50,000",
      price_bespoke: "フルオーダー: ¥80,000〜",
      button: "オーダーの相談をする"
    },
    footer: "© 2026 Sara Obi. Powered by Vercel"
  },
  EN: {
    header: {
      label: "Collection",
      title: "Obi Tapestry Archive",
      desc: "Explore our collection of upcycled vintage obi art. Click on any piece to verify availability and purchase directly via Etsy."
    },
    filter: { all: "ALL" },
    grid: { viewEtsy: "View on Etsy" },
    custom: {
      title: "Bespoke & Custom Orders",
      step1_title: "Inquire",
      step1_desc: "Contact us via the reservation form with your desired size and color theme. We will check our vintage obi stock for you.",
      step2_title: "Select & Craft",
      step2_desc: "Once you select the obi fabric from our proposal, we begin the upcycling process. Production typically takes 2-3 weeks.",
      step3_title: "Delivery",
      step3_desc: "We ship worldwide via EMS/DHL. Your unique tapestry arrives ready to hang.",
      price_title: "Estimated Pricing",
      price_std: "Standard Sizes: ¥30,000 – ¥50,000",
      price_bespoke: "Full Bespoke: From ¥80,000+",
      button: "INQUIRE ABOUT CUSTOM ORDER"
    },
    footer: "© 2026 Sara Obi. Powered by Vercel"
  }
};

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [lang, setLang] = useState<"JP" | "EN">("EN");
  const [filter, setFilter] = useState("ALL");
  const ui = UI_LABELS[lang];

  const toggleLang = () => setLang((prev) => (prev === "EN" ? "JP" : "EN"));

  // Filter Logic
  const allCategories = ["ALL", ...Array.from(new Set(items.flatMap(i => i.category || [])))];
  const filteredItems = filter === "ALL" || filter === "すべて"
    ? items 
    : items.filter((item) => item.category?.includes(filter));

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      
      {/* --- NEW NAVBAR COMPONENT --- */}
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* --- HEADER --- */}
      <header className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto animate-fade-in-up">
        <span className="block text-[10px] font-sans tracking-[0.3em] text-[#C5A059] mb-6 uppercase">
          {ui.header.label}
        </span>
        <h1 className="text-4xl md:text-5xl font-light mb-8">{ui.header.title}</h1>
        <p className="text-sm md:text-base font-sans text-stone-500 leading-7 max-w-xl mx-auto">
          {ui.header.desc}
        </p>
      </header>

      {/* --- GRID --- */}
      <main className="px-4 md:px-8 pb-32 max-w-7xl mx-auto border-b border-stone-200">
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
            {allCategories.map((cat) => (
            <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs font-sans tracking-widest uppercase px-6 py-2 border transition-all ${
                filter === cat
                    ? "border-[#C5A059] bg-[#C5A059] text-white"
                    : "border-stone-300 text-stone-500 hover:border-[#C5A059] hover:text-[#C5A059]"
                }`}
            >
                {cat === "ALL" ? ui.filter.all : cat}
            </button>
            ))}
        </div>

        {/* Items */}
        {filteredItems.length === 0 ? (
           <p className="text-center text-stone-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredItems.map((item) => (
              <div key={item.id} className="group flex flex-col items-start animate-fade-in">
                {/* IMAGE */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-200 mb-6 cursor-pointer">
                  {item.etsy_link ? (
                    <a href={item.etsy_link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                      <img 
                        src={item.image?.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="bg-white text-black px-6 py-2 text-[10px] tracking-widest uppercase">
                          {ui.grid.viewEtsy}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <img src={item.image?.url} alt={item.title} className="w-full h-full object-cover" />
                  )}
                </div>
                {/* INFO */}
                <div className="w-full flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-light">{item.title}</h3>
                  <span className="text-sm font-sans text-[#C5A059]">{item.price}</span>
                </div>
                {/* CATEGORIES */}
                <div className="flex gap-2 mb-3">
                  {item.category && item.category.map((cat) => (
                      <span key={cat} className="text-[10px] font-sans tracking-wide uppercase border border-stone-300 px-2 py-1 text-stone-500">
                        {cat}
                      </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- CUSTOM ORDER SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-12">{ui.custom.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left md:text-center">
            <div>
              <span className="block text-4xl text-[#C5A059] opacity-30 mb-4">01</span>
              <h3 className="text-lg font-medium mb-3">{ui.custom.step1_title}</h3>
              <p className="text-xs font-sans text-stone-500 leading-6">{ui.custom.step1_desc}</p>
            </div>
            <div>
              <span className="block text-4xl text-[#C5A059] opacity-30 mb-4">02</span>
              <h3 className="text-lg font-medium mb-3">{ui.custom.step2_title}</h3>
              <p className="text-xs font-sans text-stone-500 leading-6">{ui.custom.step2_desc}</p>
            </div>
            <div>
              <span className="block text-4xl text-[#C5A059] opacity-30 mb-4">03</span>
              <h3 className="text-lg font-medium mb-3">{ui.custom.step3_title}</h3>
              <p className="text-xs font-sans text-stone-500 leading-6">{ui.custom.step3_desc}</p>
            </div>
          </div>

          <div className="bg-[#F9F8F4] p-8 md:p-12 inline-block w-full max-w-2xl">
            <h4 className="text-sm font-sans tracking-widest uppercase text-[#C5A059] mb-4">{ui.custom.price_title}</h4>
            <p className="text-stone-600 mb-8 font-light text-lg">
              {ui.custom.price_std} <br/>
              {ui.custom.price_bespoke}
            </p>
            {/* Navigates back to home contact form */}
            <Link href="/#contact" className="bg-black text-white px-8 py-3 text-xs font-sans tracking-widest hover:bg-[#C5A059] transition">
              {ui.custom.button}
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-black text-white py-12 px-8 text-center text-[10px] font-sans tracking-widest uppercase">
        <p>{ui.footer}</p>
      </footer>
    </div>
  );
}