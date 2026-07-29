import { InstagramIcon, FacebookIcon, TiktokIcon } from "./SocialIcons";

interface Props {
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  size?: number;
  className?: string;
}

export default function SocialLinks({ instagram, facebook, tiktok, size = 16, className = "" }: Props) {
  if (!instagram && !facebook && !tiktok) return null;

  const linkClass =
    "text-gray-400 transition hover:text-nepal-maroon dark:text-gray-500 dark:hover:text-nepal-gold";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkClass}>
          <InstagramIcon size={size} />
        </a>
      )}
      {tiktok && (
        <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={linkClass}>
          <TiktokIcon size={size} />
        </a>
      )}
      {facebook && (
        <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={linkClass}>
          <FacebookIcon size={size} />
        </a>
      )}
    </div>
  );
}
