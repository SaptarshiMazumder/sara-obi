"use client";

import React from "react"; // Removed useState import
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { useLanguage } from "../context/LanguageContext"; // 👈 Import Global Hook

// --- STATIC LABELS ---
const UI_LABELS = {
  JP: {
    hero: { subtitle: "東京 • アップサイクル • アート", scroll: "スクロール" },
    concept: { label: "コンセプト", button: "ストーリーを読む" },
    gallery: { label: "コレクション", button: "ギャラリーを見る" },
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

type ShopData = TextOnlyData & {
  // Optional: allow controlling these from MicroCMS if fields exist
  label_en?: string;
  label_jp?: string;
  button_en?: string;
  button_jp?: string;
  url?: string;
};

type Props = {
  heroImageUrl: string;
  conceptText: TextOnlyData;
  galleryData: SectionDataWithImage;
  shopData: ShopData;
  contactData: SectionDataWithImage;
};

export default function ClientPage({ heroImageUrl, conceptText, galleryData, shopData, contactData }: Props) {
  // 👇 REPLACED useState with useLanguage()
  const { lang, toggleLang } = useLanguage();

  const ui = UI_LABELS[lang];
  const SHOP_FALLBACK_URL = "https://www.etsy.com/jp/shop/SARAOBIPRODUCTS";

  // Section labels should come from MicroCMS titles (no big titles).
  const conceptLabel = (lang === "EN" ? conceptText.title_en : conceptText.title_jp)?.trim();
  const galleryLabel = (lang === "EN" ? galleryData.title_en : galleryData.title_jp)?.trim();
  const contactLabel = (lang === "EN" ? contactData.title_en : contactData.title_jp)?.trim();

  // Shop section: only show the small gold label (no big title).
  // Prefer optional MicroCMS label fields if present; otherwise fall back to existing shop_title_* fields.
  const shopLabel = (
    lang === "EN"
      ? (shopData.label_en ?? shopData.title_en)
      : (shopData.label_jp ?? shopData.title_jp)
  )?.trim();

  const shopButton =
    lang === "EN"
      ? (shopData.button_en ?? "Visit Etsy Shop")
      : (shopData.button_jp ?? "Etsyで見る");

  const shopUrl = shopData.url || SHOP_FALLBACK_URL;

  // --- STYLES ---
  const baseLabelStyle = "block text-xs md:text-sm font-sans tracking-[0.3em] mb-6 uppercase font-bold";
  const goldenLabelStyle = `${baseLabelStyle} text-[#C5A059]`;
  const whiteLabelStyle = `${baseLabelStyle} text-white`;
  const bodyStyle = "text-sm md:text-lg font-sans font-medium leading-relaxed mb-10 whitespace-pre-wrap";
  const strongShadow = { textShadow: "0 2px 10px rgba(0,0,0,0.8)" };

  const optimizeMicrocmsImage = (url: string, width: number) => {
    try {
      const u = new URL(url);
      // Only mutate MicroCMS asset URLs; otherwise return as-is.
      if (u.hostname !== "images.microcms-assets.io") return url;

      // microCMS image API supports `w` + `fm` (format). Using webp reduces payload significantly.
      u.searchParams.set("w", String(width));
      u.searchParams.set("fm", "webp");
      u.searchParams.set("q", "85");
      return u.toString();
    } catch {
      return url;
    }
  };

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>

      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* --- 1. HERO --- */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/10">
          {heroImageUrl ? (
            <Image
              src={optimizeMicrocmsImage(heroImageUrl, 2200)}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 text-white animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl font-light tracking-widest mb-6" style={strongShadow}>SARA OBI</h1>
          <p className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase opacity-90" style={strongShadow}>{ui.hero.subtitle}</p>
        </div>
      </header>

      {/* --- 2. ABOUT --- */}
      <section className="py-32 px-6 max-w-3xl mx-auto text-center">
        {conceptLabel ? <span className={goldenLabelStyle}>{conceptLabel}</span> : null}
        <p className={`${bodyStyle} text-stone-600`}>
          {lang === "EN" ? conceptText.body_en : conceptText.body_jp}
        </p>
        <Link href="/about" className="inline-block px-10 py-3 border border-gray-300 text-xs font-sans tracking-widest hover:bg-stone-100 transition">
          {ui.concept.button}
        </Link>
      </section>

      {/* --- 3. GALLERY --- */}
      <section className="relative py-48 px-4 text-center text-white">
        <div className="absolute inset-0 z-0 bg-black/10">
          {galleryData.imageUrl ? (
            <Image
              src={optimizeMicrocmsImage(galleryData.imageUrl, 2000)}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          {galleryLabel ? (
            <span className={whiteLabelStyle} style={strongShadow}>
              {galleryLabel}
            </span>
          ) : null}
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
          {shopLabel ? <span className={goldenLabelStyle}>{shopLabel}</span> : null}
          <p className={`${bodyStyle} text-stone-600`}>
            {lang === "EN" ? shopData.body_en : shopData.body_jp}
          </p>
          <a
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F1641E] text-white px-10 py-4 text-xs font-sans tracking-widest hover:bg-[#d55517] transition inline-block rounded-sm shadow-sm"
          >
            {shopButton}
          </a>
        </div>
      </section>

      {/* --- 5. CONTACT --- */}
      <section className="relative py-48 px-4 text-center text-white">
        <div className="absolute inset-0 z-0 bg-black/10">
          {contactData.imageUrl ? (
            <Image
              src={optimizeMicrocmsImage(contactData.imageUrl, 2000)}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          {contactLabel ? (
            <span className={whiteLabelStyle} style={strongShadow}>
              {contactLabel}
            </span>
          ) : null}
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
            <a
              href="https://www.instagram.com/sara_obi_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sara Obi on Instagram"
              className="text-white/90 hover:text-[#C5A059] transition-colors"
            >
              <svg
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <path d="M16 11.37a4 4 0 11-7.41 2.18 4 4 0 017.41-2.18z" />
                <path d="M17.5 6.5h.01" />
              </svg>
            </a>
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