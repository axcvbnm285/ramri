import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo-header.png"
        alt="SandroNepal"
        width={1254}
        height={978}
        className="h-10 w-auto"
      />

      <div>
        <p className="text-lg font-bold text-nepal-maroon">SandroNepal</p>
        <p className="text-xs text-gray-500">
          Store Management
        </p>
      </div>
    </div>
  );
}
