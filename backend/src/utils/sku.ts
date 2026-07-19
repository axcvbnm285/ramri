export function generateSKU(
  productName: string,
  size?: string | null,
  color?: string | null
) {
  const prefix = productName
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 3)
    .toUpperCase();

  const random = Math.floor(1000 + Math.random() * 9000);

  return [
    prefix,
    random,
    size,
    color?.toUpperCase()
  ]
    .filter(Boolean)
    .join("-");
}