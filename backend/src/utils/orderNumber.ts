export function generateOrderNumber() {
  const timePart = Date.now().toString().slice(-8);
  const randomPart = Math.random().toString(36).slice(2, 5).toUpperCase();

  return `RC${timePart}${randomPart}`;
}
