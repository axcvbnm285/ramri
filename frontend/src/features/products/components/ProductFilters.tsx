"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  featured: string;
  setFeatured: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function ProductFilters({
  search,
  setSearch,
  status,
  setStatus,
  featured,
  setFeatured,
  sort,
  setSort,
}: Props) {
  return (
    <div className="rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border dark:border-gray-700 px-4 py-2 outline-none focus:ring-2 focus:ring-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <select
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
          className="rounded-lg border dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        >
          <option value="">Featured</option>
          <option value="true">Featured Only</option>
          <option value="false">Not Featured</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="stock-asc">Stock ↑</option>
          <option value="stock-desc">Stock ↓</option>
        </select>
      </div>
    </div>
  );
}