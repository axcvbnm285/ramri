import Link from "next/link";

import { getWhatsAppSupportUrl } from "@/lib/support";

export default function ShopFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} SandroNepal. All rights reserved.</p>
        <p className="mt-1">Pay easily by QR at checkout — no cash needed.</p>
        <p className="mt-3 text-xs text-gray-400">
          Need help?{" "}
          <a
            href={getWhatsAppSupportUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 hover:underline"
          >
            Chat with us on WhatsApp
          </a>
        </p>
        <Link href="/login" className="mt-3 inline-block text-xs text-gray-400 hover:text-gray-600 hover:underline">
          Store Login
        </Link>
      </div>
    </footer>
  );
}
