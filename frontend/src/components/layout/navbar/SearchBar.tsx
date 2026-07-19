import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-96">
      <Search
        className="absolute left-3 top-3 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search products, customers..."
        className="w-full rounded-xl border bg-gray-50 py-2 pl-10 pr-4 outline-none transition focus:border-pink-500"
      />
    </div>
  );
}