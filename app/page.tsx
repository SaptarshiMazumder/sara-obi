import { client, microcmsConfigured } from "@/libs/client";
import ClientPage from "./components/ClientPage";

// --- TYPES ---
type Tapestry = {
  id: string;
  title: string;
  title_english?: string;
  image: { url: string; height: number; width: number };
};

type HomeContent = {
  hero_image?: { url: string };
  // Concept
  concept_title_en?: string; concept_body_en?: string;
  concept_title_jp?: string; concept_body_jp?: string;
  // Banner (New)
  banner_image?: { url: string };
  banner_title_en?: string; banner_body_en?: string;
  banner_title_jp?: string; banner_body_jp?: string;
};

export default async function Home() {
  if (!microcmsConfigured || !client) return <div>Connecting...</div>;

  const [galleryData, homeData] = await Promise.all([
    client.get<{ contents: Tapestry[] }>({ endpoint: "gallery" }).catch(() => null),
    client.get<HomeContent>({ endpoint: "home" }).catch(() => null),
  ]);

  const galleryItems = galleryData?.contents || [];

  // Data Objects
  const conceptText = {
    title_en: homeData?.concept_title_en || "Default English Title",
    body_en: homeData?.concept_body_en || "Default English Body",
    title_jp: homeData?.concept_title_jp || "Default Japanese Title",
    body_jp: homeData?.concept_body_jp || "Default Japanese Body",
  };

  const bannerData = {
    imageUrl: homeData?.banner_image?.url || "/hero.jpg", // Fallback if no image
    title_en: homeData?.banner_title_en || "Fabric Collection",
    body_en: homeData?.banner_body_en || "Discover our exclusive fabrics.",
    title_jp: homeData?.banner_title_jp || "ファブリックコレクション",
    body_jp: homeData?.banner_body_jp || "限定のファブリックをご覧ください。",
  };

  const heroImageUrl = homeData?.hero_image?.url || '/hero.jpg';

  return (
    <ClientPage 
      galleryItems={galleryItems} 
      heroImageUrl={heroImageUrl} 
      conceptText={conceptText} 
      bannerData={bannerData}
    />
  );
}