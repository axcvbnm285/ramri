import { Suspense } from "react";

import SearchResults from "@/features/storefront/components/SearchResults";

export default function ShopSearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
