"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext"; // 👈 1. Connect to Global Brain

const CONTENT = {
  JP: {
    title: "Sara Obi について",
    storyTitle: "忘れ去られた美を、\n現代のアートへ。",
    storyBody: `
      着物は、日本の美意識の結晶です。
      中でも「帯」は、最も豪華で、最も職人の技が詰まった芸術品と言えます。

      しかし、現代のライフスタイルの変化により、
      多くの帯が箪笥の中で眠ったまま、あるいは廃棄されています。

      Sara Obiは、そんなヴィンテージの帯を「タペストリー」として再構築します。
      ハサミを入れることなく、帯本来の美しさをそのままに。

      それは単なるインテリアではなく、
      時代を超えて受け継がれる、歴史の断片です。
    `,
    profileTitle: "アーティスト",
    profileName: "サラ",
    profileBody: `
      東京生まれ。
      幼少期より祖母の着物コレクションに触れて育つ。
      
      ファッション業界での経験を経て、
      廃棄される着物や帯の現実に直面し、
      2024年よりアップサイクルプロジェクト「Sara Obi」を開始。
      
      「帯をほどかず、傷つけず、飾る」という独自の技法で、
      ヴィンテージ帯に新たな命を吹き込んでいる。
    `,
    footer: "© 2026 Sara Obi. Powered by Vercel"
  },
  EN: {
    title: "About Sara Obi",
    storyTitle: "Reviving Forgotten Beauty\ninto Modern Art.",
    storyBody: `
      The Kimono is the crystallization of Japanese aesthetics.
      Among them, the "Obi" (sash) is arguably the most luxurious work of art, filled with unparalleled craftsmanship.

      However, due to changes in modern lifestyles,
      countless Obis lie dormant in chests or are tragically discarded.

      Sara Obi reconstructs these vintage Obis into "Tapestries."
      We do this without cutting the fabric, preserving the original beauty of the weave.

      These are not just interior decorations;
      they are fragments of history, passed down through generations.
    `,
    profileTitle: "The Artist",
    profileName: "Sara",
    profileBody: `
      Born in Tokyo.
      Grew up surrounded by her grandmother's Kimono collection.
      
      After working in the fashion industry and witnessing the reality of discarded textiles,
      she launched the upcycling project "Sara Obi" in 2024.
      
      Using a unique technique of "displaying without cutting or damaging,"
      she breathes new life into vintage Obis as contemporary art.
    `,
    footer: "© 2026 Sara Obi. Powered by Vercel"
  }
};

export default function AboutPage() {
  // 👇 2. Use the Global Hook instead of useState
  const { lang, toggleLang } = useLanguage();
  
  const t = CONTENT[lang];

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* HEADER */}
      <header className="pt-40 pb-20 px-6 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-light tracking-widest mb-6">{t.title}</h1>
        <div className="w-12 h-[1px] bg-[#C5A059] mx-auto"></div>
      </header>

      {/* STORY SECTION */}
      <main className="max-w-3xl mx-auto px-6 pb-32">
        <section className="mb-32 text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-10 leading-relaxed whitespace-pre-line">
            {t.storyTitle}
          </h2>
          <p className="text-sm md:text-base leading-8 text-stone-600 font-sans font-light whitespace-pre-wrap">
            {t.storyBody}
          </p>
        </section>

        {/* IMAGE BREAK (Optional placeholder if you have a profile pic later) */}
        {/* <div className="w-full h-64 bg-stone-200 mb-32 grayscale opacity-50"></div> */}

        {/* PROFILE SECTION */}
        <section className="text-center bg-white p-12 border border-stone-100 shadow-sm">
          <span className="block text-xs font-sans tracking-[0.3em] text-[#C5A059] mb-6 uppercase">
            {t.profileTitle}
          </span>
          <h3 className="text-xl md:text-2xl font-serif mb-6">
            {t.profileName}
          </h3>
          <p className="text-sm md:text-base leading-8 text-stone-600 font-sans font-light whitespace-pre-wrap">
            {t.profileBody}
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 px-8 text-center text-[10px] font-sans tracking-widest uppercase">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}