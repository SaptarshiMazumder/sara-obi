"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext"; // 👈 Import Global Hook

// ... (Keep your existing CONTENT object here) ...
const CONTENT = { 
    // Paste your existing CONTENT object here (it's long so I won't repeat it, but keep it exactly as it was)
    JP: {
    title: "お問い合わせ",
    desc: "カスタムオーダーのご相談や、一般のお問い合わせはこちらからお願いいたします。",
    form: {
      name: "お名前",
      email: "メールアドレス",
      type: "お問い合わせ内容",
      types: ["カスタムオーダーについて", "一般お問い合わせ", "その他"],
      message: "メッセージ",
      submit: "送信する",
      sending: "送信中...",
      success: "送信完了しました。ご連絡ありがとうございます。"
    },
    footer: "© 2026 Sara Obi. Powered by Vercel"
  },
  EN: {
    title: "Contact",
    desc: "Please use this form for custom order inquiries or general enquiries.",
    form: {
      name: "Name",
      email: "Email Address",
      type: "Inquiry Type",
      types: ["Custom Order Inquiry", "General Enquiry", "Other"],
      message: "Message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully. Thank you."
    },
    footer: "© 2026 Sara Obi. Powered by Vercel"
  }
};

export default function ContactPage() {
  // 👇 REPLACED local useState with global useLanguage
  const { lang, toggleLang } = useLanguage(); 
  
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS">("IDLE");
  
  const t = CONTENT[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xykeopzb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("SUCCESS");
      } else {
        alert("Error sending message. Please try again.");
        setStatus("IDLE");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
      setStatus("IDLE");
    }
  };

  return (
    <div className={`min-h-screen bg-[#F9F8F4] font-serif text-[#2C2C2C] selection:bg-[#C5A059] selection:text-white ${lang === "JP" ? "font-sans-jp" : ""}`}>
      <Navbar lang={lang} toggleLang={toggleLang} />

      <header className="pt-40 pb-16 px-6 text-center max-w-2xl mx-auto animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-light mb-6">{t.title}</h1>
        <p className="text-sm font-sans text-stone-500 leading-7">
          {t.desc}
        </p>
      </header>

      <main className="max-w-xl mx-auto px-6 pb-32">
        {status === "SUCCESS" ? (
          <div className="bg-white p-12 text-center border border-stone-200 animate-fade-in">
            <span className="text-4xl text-[#C5A059] block mb-4">✓</span>
            <p className="text-sm font-sans tracking-wide">{t.form.success}</p>
            <button 
              onClick={() => setStatus("IDLE")} 
              className="mt-8 text-xs text-stone-400 underline hover:text-stone-600"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 border border-stone-100 shadow-sm animate-fade-in-up">
            
            {/* NAME */}
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-stone-500 mb-2">{t.form.name}</label>
              <input name="name" type="text" required className="w-full border-b border-stone-300 py-2 outline-none focus:border-[#C5A059] transition-colors bg-transparent" />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-stone-500 mb-2">{t.form.email}</label>
              <input name="email" type="email" required className="w-full border-b border-stone-300 py-2 outline-none focus:border-[#C5A059] transition-colors bg-transparent" />
            </div>

            {/* TYPE */}
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-stone-500 mb-2">{t.form.type}</label>
              <select name="type" className="w-full border-b border-stone-300 py-2 outline-none focus:border-[#C5A059] bg-transparent">
                {t.form.types.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-stone-500 mb-2">{t.form.message}</label>
              <textarea name="message" rows={4} required className="w-full border border-stone-300 p-3 outline-none focus:border-[#C5A059] transition-colors bg-transparent text-sm" />
            </div>

            <button 
              type="submit" 
              disabled={status === "SENDING"}
              className="w-full bg-black text-white py-4 text-xs font-sans tracking-widest uppercase hover:bg-[#C5A059] transition-colors disabled:opacity-50"
            >
              {status === "SENDING" ? t.form.sending : t.form.submit}
            </button>
          </form>
        )}
      </main>

      <footer className="bg-black text-white py-12 px-8 text-center text-[10px] font-sans tracking-widest uppercase">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
