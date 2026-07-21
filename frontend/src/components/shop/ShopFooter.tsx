import Link from "next/link";

export default function ShopFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} SandroNepal. All rights reserved.</p>
        <p className="mt-1">Cash on delivery available on all orders.</p>
        <Link href="/login" className="mt-3 inline-block text-xs text-gray-400 hover:text-gray-600 hover:underline">
          Store Login
        </Link>
      </div>
    </footer>
  );
}
