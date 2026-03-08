import { client } from "@/libs/client";
import AboutClient, { type AboutPageContent } from "./AboutClient";

export const revalidate = 0;

const fallbackContent: AboutPageContent = {
  title_en: "About Sara Obi",
  title_jp: "Sara Obi について",
  story_title_en: "Reviving Forgotten Beauty\ninto Modern Art.",
  story_title_jp: "忘れ去られた美を、\n現代のアートへ。",
  story_body_en: `The Kimono is the crystallization of Japanese aesthetics.
Among them, the "Obi" (sash) is arguably the most luxurious work of art, filled with unparalleled craftsmanship.

However, due to changes in modern lifestyles,
countless Obis lie dormant in chests or are tragically discarded.

Sara Obi reconstructs these vintage Obis into "Tapestries."
We do this without cutting the fabric, preserving the original beauty of the weave.

These are not just interior decorations;
they are fragments of history, passed down through generations.`,
  story_body_jp: `着物は、日本の美意識の結晶です。
中でも「帯」は、最も豪華で、最も職人の技が詰まった芸術品と言えます。

しかし、現代のライフスタイルの変化により、
多くの帯が箪笥の中で眠ったまま、あるいは廃棄されています。

Sara Obiは、そんなヴィンテージの帯を「タペストリー」として再構築します。
ハサミを入れることなく、帯本来の美しさをそのままに。

それは単なるインテリアではなく、
時代を超えて受け継がれる、歴史の断片です。`,
  profile_title_en: "The Artist",
  profile_title_jp: "アーティスト",
  profile_name_en: "Sara",
  profile_name_jp: "サラ",
  profile_body_en: `Born in Tokyo.
Grew up surrounded by her grandmother's Kimono collection.

After working in the fashion industry and witnessing the reality of discarded textiles,
she launched the upcycling project "Sara Obi" in 2024.

Using a unique technique of "displaying without cutting or damaging,"
she breathes new life into vintage Obis as contemporary art.`,
  profile_body_jp: `東京生まれ。
幼少期より祖母の着物コレクションに触れて育つ。

ファッション業界での経験を経て、
廃棄される着物や帯の現実に直面し、
2024年よりアップサイクルプロジェクト「Sara Obi」を開始。

「帯をほどかず、傷つけず、飾る」という独自の技法で、
ヴィンテージ帯に新たな命を吹き込んでいる。`,
};

async function getAboutContent(): Promise<AboutPageContent> {
  if (!client) return fallbackContent;

  const data = await client.getObject<Partial<AboutPageContent>>({ endpoint: "about" }).catch(() => null);
  if (!data) return fallbackContent;

  return {
    title_en: data.title_en || fallbackContent.title_en,
    title_jp: data.title_jp || fallbackContent.title_jp,
    story_title_en: data.story_title_en || fallbackContent.story_title_en,
    story_title_jp: data.story_title_jp || fallbackContent.story_title_jp,
    story_body_en: data.story_body_en || fallbackContent.story_body_en,
    story_body_jp: data.story_body_jp || fallbackContent.story_body_jp,
    profile_title_en: data.profile_title_en || fallbackContent.profile_title_en,
    profile_title_jp: data.profile_title_jp || fallbackContent.profile_title_jp,
    profile_name_en: data.profile_name_en || fallbackContent.profile_name_en,
    profile_name_jp: data.profile_name_jp || fallbackContent.profile_name_jp,
    profile_body_en: data.profile_body_en || fallbackContent.profile_body_en,
    profile_body_jp: data.profile_body_jp || fallbackContent.profile_body_jp,
  };
}

export default async function AboutPage() {
  const content = await getAboutContent();
  return <AboutClient content={content} />;
}