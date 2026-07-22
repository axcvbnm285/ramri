import type { Metadata } from "next";

import ShopHomeClient from "@/features/storefront/components/ShopHomeClient";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = `${SITE_NAME} | Fashion for Every You`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/shop`,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function ShopHomePage() {
  return <ShopHomeClient />;
}
