import { client } from "@/libs/client";
import ClientPage from "./components/ClientPage";

// Force dynamic update
export const revalidate = 0;

export default async function Home() {
  const data = client
    ? await client.getObject({ endpoint: "home" }).catch(() => null)
    : null;

  // 1. Prepare SHOP Data (No Image)
  const shopData = {
    // Existing MicroCMS fields (from your schema)
    title_en: data?.shop_title_en || "",
    body_en: data?.shop_body_en || "",
    title_jp: data?.shop_title_jp || "",
    body_jp: data?.shop_body_jp || "",

    // Optional fields (only used if you add them later)
    label_en: data?.shop_label_en,
    label_jp: data?.shop_label_jp,
    button_en: data?.shop_button_en,
    button_jp: data?.shop_button_jp,
    url: data?.shop_url,
  };

  // 2. Prepare Other Data (Keep existing logic)
  const heroImageUrl = data?.hero_image?.url || "";
  
  const conceptText = {
    title_en: data?.concept_title_en || "",
    body_en: data?.concept_body_en || "",
    title_jp: data?.concept_title_jp || "",
    body_jp: data?.concept_body_jp || "",
  };

  const galleryData = {
    imageUrl: data?.gallery_image?.url || "", // Renamed from bannerData for clarity if you want, or keep variable name
    title_en: data?.gallery_title_en || "",
    body_en: data?.gallery_body_en || "",
    title_jp: data?.gallery_title_jp || "",
    body_jp: data?.gallery_body_jp || "",
  };

  const contactData = {
    imageUrl: data?.contact_image?.url || "", // Renamed from reserveData
    title_en: data?.contact_title_en || "",
    body_en: data?.contact_body_en || "",
    title_jp: data?.contact_title_jp || "",
    body_jp: data?.contact_body_jp || "",
  };

  return (
    <ClientPage 
      heroImageUrl={heroImageUrl}
      conceptText={conceptText}
      galleryData={galleryData}
      shopData={shopData}       // 👈 Passed new clear Shop data
      contactData={contactData} 
    />
  );
}