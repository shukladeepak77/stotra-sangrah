import Link from "next/link";
import { notFound } from "next/navigation";
import { stotraCategories } from "@/content/stotras";
import HeroBanner from "@/components/HeroBanner";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return stotraCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = stotraCategories.find((c) => c.slug === categorySlug);
  if (!category) return {};
  return {
    title: category.title,
    description: `${category.description} — ${category.stotras
      .map((s) => s.title)
      .join(", ")}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = stotraCategories.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.title,
    url: `${SITE_URL}/${category.slug}`,
    hasPart: category.stotras.map((stotra) => ({
      "@type": "CreativeWork",
      name: stotra.title,
      url: `${SITE_URL}/${category.slug}#${stotra.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="mb-4 inline-block text-sm font-semibold text-orange-900/70 hover:text-orange-900"
      >
        ← स्तोत्र संग्रह
      </Link>
      <HeroBanner
        eyebrow={category.icon}
        title={category.title}
        description={category.description}
      />

      <nav className="mt-8 flex flex-wrap justify-center gap-3">
        {category.stotras.map((stotra) => (
          <a
            key={stotra.slug}
            href={`#${stotra.slug}`}
            className="font-devanagari rounded-full border border-border-muted bg-surface px-5 py-2.5 text-sm font-semibold text-orange-900 shadow-sm transition-colors hover:brightness-110 sm:text-base"
          >
            {stotra.title}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-10">
        {category.stotras.map((stotra) => (
          <section
            key={stotra.slug}
            id={stotra.slug}
            className="scroll-mt-24 rounded-[24px] border border-border-muted bg-surface px-5 py-6 shadow-[var(--shadow)] sm:px-8 sm:py-8"
          >
            <div className="text-center">
              {stotra.subtitle && (
                <p className="font-devanagari text-sm font-semibold tracking-wide text-orange-900/70 uppercase">
                  {stotra.subtitle}
                </p>
              )}
              <h2 className="font-devanagari mt-1 text-2xl font-bold text-orange-900 sm:text-3xl">
                {stotra.title}
              </h2>
            </div>

            <div className="mt-6 flex flex-col divide-y divide-border-muted/60">
              {stotra.verses.map((verse) => (
                <div key={verse.id} className="py-2">
                  <p className="font-devanagari text-lg leading-loose text-foreground sm:text-xl">
                    {verse.text.split("\n").map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            {stotra.colophon && (
              <p className="font-devanagari mt-5 text-center text-sm text-foreground/60">
                {stotra.colophon}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
