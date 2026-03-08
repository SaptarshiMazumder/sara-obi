import { notFound } from "next/navigation";
import { client } from "@/libs/client";
import GalleryDetailClient from "./GalleryDetailClient";

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

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getGalleryItem(id: string) {
  if (!client) return null;
  const item = await client
    .getListDetail<GalleryItem>({
      endpoint: "gallery",
      contentId: id,
    })
    .catch(() => null);

  return item;
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = await getGalleryItem(id);

  if (!item) {
    notFound();
  }

  return <GalleryDetailClient item={item} />;
}
