import { client, microcmsConfigured } from "@/libs/client";
import ClientPage from "./components/ClientPage";

// --- TYPES ---
type HomeContent = {
  hero_image?: { url: string };
  // Concept
  concept_title_en?: string; concept_body_en?: string;
  concept_title_jp?: string; concept_body_jp?: string;
  // Banner 1
  banner_image?: { url: string };
  banner_title_en?: string; banner_body_en?: string;
  banner_title_jp?: string; banner_body_jp?: string;
  // Banner 2
  product_image?: { url: string };
  product_title_en?: string; product_body_en?: string;
  product_title_jp?: string; product_body_jp?: string;
  // Banner 3
  reserve_image?: { url: string };
  reserve_title_en?: string; reserve_body_en?: string;
  reserve_title_jp?: string; reserve_body_jp?: string;
  // Newsletter (NEW)
  news_title_en?: string; news_body_en?: string;
  news_title_jp?: string; news_body_jp?: string;
};

export default async function Home() {
  if (!microcmsConfigured || !client) return <div>Connecting...</div>;

  const homeData = await client.get<HomeContent>({ endpoint: "home" }).catch(() => null);

  // 1. Concept Data
  const conceptText = {
    title_en: homeData?.concept_title_en || "Default Concept Title",
    body_en: homeData?.concept_body_en || "Default Concept Body",
    title_jp: homeData?.concept_title_jp || "コンセプト",
    body_jp: homeData?.concept_body_jp || "コンセプトの本文",
  };

  // 2. Banner Data
  const bannerData = {
    imageUrl: homeData?.banner_image?.url || "/hero.jpg",
    title_en: homeData?.banner_title_en || "Fabric Collection",
    body_en: homeData?.banner_body_en || "Description here.",
    title_jp: homeData?.banner_title_jp || "ファブリック",
    body_jp: homeData?.banner_body_jp || "説明文",
  };

  // 3. Product Data
  const productData = {
    imageUrl: homeData?.product_image?.url || "/hero.jpg",
    title_en: homeData?.product_title_en || "Hoshi - Blazer",
    body_en: homeData?.product_body_en || "Signature piece.",
    title_jp: homeData?.product_title_jp || "星 - ブレザー",
    body_jp: homeData?.product_body_jp || "シグネチャーアイテム。",
  };

  // 4. Reservation Data
  const reserveData = {
    imageUrl: homeData?.reserve_image?.url || "/hero.jpg",
    title_en: homeData?.reserve_title_en || "Gallery Reservation",
    body_en: homeData?.reserve_body_en || "Book your visit.",
    title_jp: homeData?.reserve_title_jp || "ギャラリー予約",
    body_jp: homeData?.reserve_body_jp || "ご来店予約はこちら。",
  };

  // 5. Newsletter Data (NEW)
  const newsData = {
    title_en: homeData?.news_title_en || "Newsletters",
    body_en: homeData?.news_body_en || "Sign up for the latest news.",
    title_jp: homeData?.news_title_jp || "ニュースレター",
    body_jp: homeData?.news_body_jp || "最新情報をお届けします。",
  };

  const heroImageUrl = homeData?.hero_image?.url || '/hero.jpg';

  return (
    <ClientPage 
      heroImageUrl={heroImageUrl} 
      conceptText={conceptText} 
      bannerData={bannerData}
      productData={productData}
      reserveData={reserveData}
      newsData={newsData}
    />
  );
}