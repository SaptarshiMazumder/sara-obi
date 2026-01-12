"use client";

import React, { useState } from "react";

type GalleryItem = {
  id: string;
  title: string;
  image: { url: string; height: number; width: number };
  category: string[];
  price: string;
  etsy_link?: string;
  description: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("ALL");

  // 1. Get all unique categories from your items (plus "ALL")
  // You can also hardcode these if you want specific order: ["ALL", "GOLD", "MODERN", "CLASSIC"]
  const allCategories = ["ALL", ...Array.from(new Set(items.flatMap(i => i.category || [])))];

  // 2. Filter items based on selection
  const filteredItems = filter === "ALL" 
    ? items 
    : items.filter((item) => item.category?.includes(filter));

  return (
    <div>
      {/* --- FILTER BUTTONS --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs font-sans tracking-widest uppercase px-6 py-2 border transition-all ${
              filter === cat
                ? "border-[#C5A059] bg-[#C5A059] text-white" // Active
                : "border-stone-300 text-stone-500 hover:border-[#C5A059] hover:text-[#C5A059]" // Inactive
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- GRID --- */}
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
                      View on Etsy
                    </span>
                  </div>
                </a>
              ) : (
                <img 
                  src={item.image?.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* INFO */}
            <div className="w-full flex justify-between items-baseline mb-2">
              <h3 className="text-xl font-light">{item.title}</h3>
              <span className="text-sm font-sans text-[#C5A059]">{item.price}</span>
            </div>
            
            {/* TAGS */}
            <div className="flex gap-2 mb-3">
              {item.category && item.category.map((cat) => (
                  <span key={cat} className="text-[10px] font-sans tracking-wide uppercase border border-stone-300 px-2 py-1 text-stone-500">
                    {cat}
                  </span>
              ))}
            </div>

            <p className="text-xs font-sans text-stone-500 leading-relaxed line-clamp-3">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}