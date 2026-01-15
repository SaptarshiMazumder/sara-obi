"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

// Define the shape of the data passed from the server
type AboutContent = {
  image: string;
  s1_title_jp: string;
  s1_body_jp: string;
  s1_title_en: string;
  s1_body_en: string;
  s2_title_jp: string;
  s2_body_jp: string;
  s2_title_en: string;
  s2_body_en: string;
};

export default function AboutClient({ content }: { content: AboutContent }) {
  const [lang, setLang] = useState<"JP" | "EN">("EN");
  const toggleLang = () => setLang((prev) => (prev === "EN" ? "JP" : "EN"));

  const s1_title = lang === "EN" ? content.s1_title_en : content.s1_title_jp;
  const s1_body = lang === "EN" ? content.s1_body_en : content.s1_body_jp;
  
  const s2_title = lang === "EN" ? content.s2_title_en : content.s2_title_jp;
  const s2_body = lang === "EN" ? content.s2_body_en : content.s2_body_jp;

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* --- HEADER --- */}
      <header className="pt-40 pb-20 px-6 text-center max-w-3xl mx-auto animate-fade-in-up">
        <span className="block text-[10px] font-sans tracking-[0.3em] text-[#C5A059] mb-6 uppercase">
          {lang === "EN" ? "About" : "紹介"}
        </span>
        <h1 className="text-4xl md:text-5xl font-light mb-12 min-h-[3rem]">
          {s1_title}
        </h1>
        <p className="text-base md:text-lg leading-9 text-stone-600 font-light whitespace-pre-wrap">
          {s1_body}
        </p>
      </header>

      {/* --- IMAGE --- */}
      <section className="w-full h-[60vh] bg-stone-200 overflow-hidden relative mb-24">
        {content.image ? (
          <img 
            src={content.image} 
            alt="About"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400">
             {/* If this shows, the image URL from MicroCMS is empty */}
          </div>
        )}
      </section>

      {/* --- SECTION 2 --- */}
      <section className="max-w-2xl mx-auto px-6 pb-32 text-center">
        <h2 className="text-2xl font-light mb-8 min-h-[2rem]">
          {s2_title}
        </h2>
        <p className="text-sm md:text-base leading-8 text-stone-600 font-sans whitespace-pre-wrap">
          {s2_body}
        </p>
      </section>

      <footer className="bg-black text-white py-12 px-8 text-center text-[10px] font-sans tracking-widest uppercase">
        <p>© 2026 Sara Obi. Powered by Vercel</p>
      </footer>
    </div>
  );
}