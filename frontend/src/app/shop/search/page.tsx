import type { Metadata } from "next";
import { Suspense } from "react";

import SearchResults from "@/features/storefront/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default function ShopSearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
