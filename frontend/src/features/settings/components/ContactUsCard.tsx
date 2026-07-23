import { Mail } from "lucide-react";

interface Props {
  storeEmail: string;
}

// Routes to the platform owner's real inbox rather than a placeholder
// support address, so this button actually reaches someone.
const SUPPORT_EMAIL = "abhinavverma9026@gmail.com";

export default function ContactUsCard({ storeEmail }: Props) {
  const subject = encodeURIComponent("Support request from SandroNepal store admin");
  const body = encodeURIComponent(`Hi,\n\nMy store's registered email is ${storeEmail}.\n\n`);

  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Contact Us</h2>
      <p className="mt-1 text-sm text-gray-500">
        Stuck on something, or just want to say namaste? We&apos;re rooting for your store — reach out anytime.
      </p>

      <div className="mt-4">
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`}
          className="flex w-fit items-center gap-2 rounded-lg bg-nepal-maroon px-4 py-2.5 text-sm font-medium text-white transition hover:bg-nepal-maroon-dark"
        >
          <Mail size={16} />
          Email SandroNepal support
        </a>
      </div>
    </div>
  );
}
