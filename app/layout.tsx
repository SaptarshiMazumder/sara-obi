import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google"; // Assuming you use these fonts
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext"; // 👈 Import this

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Serif_JP({ subsets: ["latin"], weight: ["200", "400", "700"], variable: "--font-noto" });

export const metadata: Metadata = {
  title: "SARA OBI",
  description: "Upcycled Obi Art from Tokyo",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${noto.variable}`}>
        {/* 👇 Wrap everything in the LanguageProvider */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}