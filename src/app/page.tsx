import Link from "next/link";
import { stotraCategories } from "@/content/stotras";
import HeroBanner from "@/components/HeroBanner";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "स्तोत्र संग्रह",
    url: SITE_URL,
    hasPart: stotraCategories.map((category) => ({
      "@type": "CreativeWorkSeries",
      name: category.title,
      url: `${SITE_URL}/${category.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBanner
        eyebrow="॥ हरिः ॐ ॥"
        title="स्तोत्र संग्रह"
        description="देवी-देवताओं के प्रमुख संस्कृत स्तोत्रों का संग्रह — श्रेणी चुनकर पाठ करें।"
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stotraCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className="group flex items-center gap-4 rounded-[20px] border border-border-muted bg-surface px-5 py-5 shadow-[var(--shadow)] transition-transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="text-3xl leading-none">{category.icon}</span>
            <span>
              <span className="font-devanagari block text-lg font-bold text-orange-900 sm:text-xl">
                {category.title}
              </span>
              <span className="mt-1 block text-sm text-foreground/70">
                {category.description} · {category.stotras.length} स्तोत्र
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
