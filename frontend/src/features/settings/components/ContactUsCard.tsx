import { MessageCircle } from "lucide-react";

import { getWhatsAppSupportUrl } from "@/lib/support";

export default function ContactUsCard() {
  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Contact Us</h2>
      <p className="mt-1 text-sm text-gray-500">
        Stuck on something, or just want to say namaste? We&apos;re rooting for your store — reach out anytime.
      </p>

      <div className="mt-4">
        <a
          href={getWhatsAppSupportUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 rounded-lg bg-nepal-maroon px-4 py-2.5 text-sm font-medium text-white transition hover:bg-nepal-maroon-dark"
        >
          <MessageCircle size={16} />
          Chat with SandroNepal support
        </a>
      </div>
    </div>
  );
}
