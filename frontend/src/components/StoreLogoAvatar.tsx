import Image from "next/image";

interface Props {
  logoUrl?: string | null;
  name: string;
  size?: number;
  className?: string;
}

export default function StoreLogoAvatar({ logoUrl, name, size = 28, className = "" }: Props) {
  if (logoUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`relative shrink-0 overflow-hidden rounded-full border border-black/10 bg-white ${className}`}
      >
        <Image src={logoUrl} alt={`${name} logo`} fill sizes={`${size}px`} className="object-cover" />
      </div>
    );
  }

  const initial = name.trim().charAt(0).toUpperCase() || "S";

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-nepal-maroon to-nepal-maroon-dark font-bold text-white ${className}`}
    >
      {initial}
    </div>
  );
}
