import type { Metadata } from "next";

import ProductDetailClient from "@/features/storefront/components/ProductDetailClient";
import { getStorefrontProductBySlug } from "@/lib/serverStorefront";
import { SITE_NAME, SITE_URL, toSingleLine } from "@/lib/seo";
import { StorefrontProduct } from "@/features/storefront/types/storefront.types";

type Props = {
  params: Promise<{ slug: string }>;
};

function buildDescription(product: StorefrontProduct) {
  if (product.description) return toSingleLine(product.description).slice(0, 160);

  const prices = product.variants.map((v) => Number(v.price));
  const minPrice = prices.length > 0 ? Math.min(...prices) : undefined;
  const brandPart = product.brand ? ` by ${product.brand}` : "";
  const pricePart = minPrice ? ` — starting at Rs. ${minPrice.toLocaleString("en-IN")}` : "";

  return `Shop ${product.name}${brandPart} at ${SITE_NAME}${pricePart}. Cash on delivery available across Nepal.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
      robots: { index: false, follow: true },
    };
  }

  const description = buildDescription(product);
  const image = product.images[0]?.url;
  const canonicalPath = `/shop/products/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: product.name,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ShopProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    return <ProductDetailClient />;
  }

  const canonicalUrl = `${SITE_URL}/shop/products/${product.slug}`;
  const categoryUrl = `${SITE_URL}/shop/categories/${product.category.slug}`;
  const prices = product.variants.map((v) => Number(v.price));
  const lowPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const highPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const inStock = product.variants.some((v) => v.stock > 0);
  const availability = inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: buildDescription(product),
    image: product.images.map((img) => img.url),
    ...(product.brand && { brand: { "@type": "Brand", name: product.brand } }),
    category: product.category.name,
    url: canonicalUrl,
    offers:
      prices.length > 1 && lowPrice !== highPrice
        ? {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice,
            highPrice,
            offerCount: product.variants.length,
            availability,
            url: canonicalUrl,
          }
        : {
            "@type": "Offer",
            priceCurrency: "INR",
            price: lowPrice,
            availability,
            url: canonicalUrl,
          },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/shop` },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category.name,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient />
    </>
  );
}
