export const revalidate = 0;
import { client } from "@/libs/client";
import GalleryClient from "./GalleryClient"; // Import the client component

// --- TYPE DEFINITION ---
type GalleryItem = {
  id: string;
  title: string;
  image: { url: string; height: number; width: number };
  category: string[];
  price: string;
  etsy_link?: string;
  description: string;
};

// --- FETCH DATA ---
async function getGalleryItems() {
  if (!client) return [];
  const data = await client.getList<GalleryItem>({
    endpoint: "gallery",
    queries: { limit: 100 }, 
  }).catch(() => null);
  return data?.contents || [];
}

export default async function GalleryPage() {
  const items = await getGalleryItems();
  
  // Pass the items to the Client Component which handles the languages
  return <GalleryClient items={items} />;
}