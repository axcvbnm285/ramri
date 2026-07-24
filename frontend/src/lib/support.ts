// Nepal WhatsApp support line — country code 977 + local number, no
// symbols, matching the wa.me deep-link format.
const SUPPORT_WHATSAPP_NUMBER = "9779860106768";
const DEFAULT_MESSAGE = "Hi, I need help with SandroNepal.";

export function getWhatsAppSupportUrl(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
