interface Props {
  featured: boolean;
}

export default function FeaturedBadge({
  featured,
}: Props) {
  return featured ? (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
      Featured
    </span>
  ) : (
    <span className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs text-gray-600 dark:text-gray-300">
      Normal
    </span>
  );
}