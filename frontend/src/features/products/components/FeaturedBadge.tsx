interface Props {
  featured: boolean;
}

export default function FeaturedBadge({
  featured,
}: Props) {
  return featured ? (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
      Featured
    </span>
  ) : (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
      Normal
    </span>
  );
}