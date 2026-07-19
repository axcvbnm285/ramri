export default function ProfileMenu() {
  return (
    <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 font-bold text-white">
        A
      </div>

      <div>
        <p className="font-medium">
          Admin
        </p>

        <p className="text-xs text-gray-500">
          Store Owner
        </p>
      </div>
    </div>
  );
}