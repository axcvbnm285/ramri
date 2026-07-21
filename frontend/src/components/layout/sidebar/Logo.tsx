export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-header.png" alt="SandroNepal" className="h-10 w-auto" />

      <div>
        <h1 className="text-lg font-bold">SandroNepal</h1>
        <p className="text-xs text-gray-500">
          Store Management
        </p>
      </div>
    </div>
  );
}
