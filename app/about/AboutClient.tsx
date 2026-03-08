"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

export type AboutPageContent = {
  title_en: string;
  title_jp: string;
  story_title_en: string;
  story_title_jp: string;
  story_body_en: string;
  story_body_jp: string;
  profile_title_en: string;
  profile_title_jp: string;
  profile_name_en: string;
  profile_name_jp: string;
  profile_body_en: string;
  profile_body_jp: string;
};

export default function AboutClient({ content }: { content: AboutPageContent }) {
  const { lang, toggleLang } = useLanguage();

  const localized = {
    title: lang === "EN" ? content.title_en : content.title_jp,
    storyTitle: lang === "EN" ? content.story_title_en : content.story_title_jp,
    storyBody: lang === "EN" ? content.story_body_en : content.story_body_jp,
    profileTitle: lang === "EN" ? content.profile_title_en : content.profile_title_jp,
    profileName: lang === "EN" ? content.profile_name_en : content.profile_name_jp,
    profileBody: lang === "EN" ? content.profile_body_en : content.profile_body_jp,
    footer: "© 2026 Sara Obi. Powered by Vercel",
  };

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* HEADER */}
      <header className="pt-40 pb-20 px-6 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-light tracking-widest mb-6">{localized.title}</h1>
        <div className="w-12 h-px bg-[#C5A059] mx-auto"></div>
      </header>

      {/* STORY SECTION */}
      <main className="max-w-3xl mx-auto px-6 pb-32">
        <section className="mb-32 text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-10 leading-relaxed whitespace-pre-line">
            {localized.storyTitle}
          </h2>
          <p className="text-sm md:text-base leading-8 text-stone-600 font-sans font-light whitespace-pre-wrap">
            {localized.storyBody}
          </p>
        </section>

        {/* PROFILE SECTION */}
        <section className="text-center bg-white p-12 border border-stone-100 shadow-sm">
          <span className="block text-xs font-sans tracking-[0.3em] text-[#C5A059] mb-6 uppercase">
            {localized.profileTitle}
          </span>
          <h3 className="text-xl md:text-2xl font-serif mb-6">
            {localized.profileName}
          </h3>
          <p className="text-sm md:text-base leading-8 text-stone-600 font-sans font-light whitespace-pre-wrap">
            {localized.profileBody}
          </p>
        </section>
      </main>

      <footer className="bg-black text-white py-12 px-8 text-center text-[10px] font-sans tracking-widest uppercase">
        <p>{localized.footer}</p>
      </footer>
    </div>
  );
}