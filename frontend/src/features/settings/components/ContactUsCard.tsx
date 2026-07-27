import { Mail } from "lucide-react";

import { getSupportEmailUrl } from "@/lib/support";

export default function ContactUsCard() {
  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <h2 className="text-lg font-bold">Contact Us</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Stuck on something, or just want to say namaste? We&apos;re rooting for your store — reach out anytime.
      </p>

      <div className="mt-4">
        <a
          href={getSupportEmailUrl()}
          className="flex w-fit items-center gap-2 rounded-lg bg-nepal-maroon px-4 py-2.5 text-sm font-medium text-white transition hover:bg-nepal-maroon-dark"
        >
          <Mail size={16} />
          Email SandroNepal support
        </a>
      </div>
    </div>
  );
}
