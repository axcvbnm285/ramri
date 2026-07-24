import Image from "next/image";

interface Props {
  compact?: boolean;
}

export default function Logo({ compact = false }: Props) {
  return (
    <Image
      src="/logo-header.png"
      alt="SandroNepal"
      width={1254}
      height={978}
      className={compact ? "h-8 w-auto" : "h-10 w-auto"}
    />
  );
}
