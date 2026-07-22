import type { Metadata } from "next";

import CategoryPageClient from "@/features/storefront/components/CategoryPageClient";
import {
  getStorefrontCategoryBySlug,
  getStorefrontProducts,
} from "@/lib/serverStorefront";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

function humanize(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getStorefrontCategoryBySlug(slug);
  const name = category?.name ?? humanize(slug);
  const description = `Shop ${name} at ${SITE_NAME} — fresh arrivals, cash on delivery available across Nepal.`;
  const canonicalPath = `/shop/categories/${slug}`;

  return {
    title: name,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: name,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      images: category?.imageUrl ? [{ url: category.imageUrl, alt: name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: category?.imageUrl ? [category.imageUrl] : undefined,
    },
  };
}

export default async function ShopCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getStorefrontCategoryBySlug(slug),
    getStorefrontProducts({ category: slug, limit: 24 }),
  ]);

  const name = category?.name ?? humanize(slug);
  const categoryUrl = `${SITE_URL}/shop/categories/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 2, name, item: categoryUrl },
    ],
  };

  const itemListJsonLd =
    products.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name,
          url: categoryUrl,
          itemListElement: products.map((product, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/shop/products/${product.slug}`,
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <CategoryPageClient />
    </>
  );
}
