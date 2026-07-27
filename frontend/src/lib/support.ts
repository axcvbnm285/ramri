export const SUPPORT_EMAIL = "sandronepal15@gmail.com";

export function getSupportEmailUrl(subject: string = "Help with SandroNepal") {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
