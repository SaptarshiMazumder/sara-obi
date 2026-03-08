"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useLanguage } from "@/app/context/LanguageContext";

type GalleryItem = {
  id: string;
  title: string;
  title_jp?: string;
  image: { url: string; height: number; width: number };
  category: string[];
  price: string;
  price_jp?: string;
  etsy_link?: string;
  description: string;
  description_jp?: string;
};

const UI_LABELS = {
  JP: {
    back: "コレクションへ戻る",
    description: "説明",
    category: "カテゴリー",
    buyButton: "Etsyで購入",
  },
  EN: {
    back: "Back to Collection",
    description: "Description",
    category: "Category",
    buyButton: "Buy on Etsy",
  },
};

export default function GalleryDetailClient({ item }: { item: GalleryItem }) {
  const { lang, toggleLang } = useLanguage();
  const ui = UI_LABELS[lang];
  const localizedTitle = (lang === "JP" ? item.title_jp : undefined) || item.title;
  const localizedPrice = (lang === "JP" ? item.price_jp : undefined) || item.price;
  const localizedDescription =
    (lang === "JP" ? item.description_jp : undefined) || item.description;

  return (
    <div className={`min-h-screen bg-[#F9F8F4] text-[#2C2C2C] ${lang === "JP" ? "font-sans-jp" : ""}`}>
      <Navbar lang={lang} toggleLang={toggleLang} />

      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <Link
          href="/gallery"
          className="inline-block mb-10 text-xs font-sans tracking-[0.2em] uppercase text-stone-500 hover:text-[#C5A059] transition-colors"
        >
          ← {ui.back}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="w-full bg-stone-200 overflow-hidden shadow-sm">
            {item.image?.url ? (
              <img
                src={item.image.url}
                alt={localizedTitle}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="aspect-3/4 flex items-center justify-center text-stone-500 text-sm">
                NO IMAGE
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-light mb-4">{localizedTitle}</h1>
            <p className="text-xl text-[#C5A059] font-medium mb-8">{localizedPrice}</p>

            {item.category?.length ? (
              <div className="mb-8">
                <p className="text-xs font-sans tracking-widest uppercase text-stone-400 mb-3">{ui.category}</p>
                <div className="flex flex-wrap gap-2">
                  {item.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-sans tracking-wide uppercase border border-stone-300 px-2 py-1 text-stone-500"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mb-10">
              <p className="text-xs font-sans tracking-widest uppercase text-stone-400 mb-3">{ui.description}</p>
              <p className="text-sm md:text-base leading-7 text-stone-600 whitespace-pre-line">
                {localizedDescription}
              </p>
            </div>

            {item.etsy_link ? (
              <a
                href={item.etsy_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#F1641E] text-white px-8 py-3 text-xs font-sans tracking-widest rounded-sm hover:bg-[#d55517] transition-colors"
              >
                {ui.buyButton}
              </a>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
