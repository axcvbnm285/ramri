interface IconProps {
  size?: number;
  className?: string;
}

export function InstagramIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.2 4.32 15.2 4.23 14 4.23c-2.4 0-4.05 1.47-4.05 4.17V10.5H7.5v3h2.45V21h3.55Z" />
    </svg>
  );
}

export function TiktokIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 3c.4 2.1 1.7 3.5 4 3.7v2.9c-1.4.1-2.7-.3-4-1.1v6.4c0 3.2-2.3 5.6-5.5 5.6-3.1 0-5.5-2.4-5.5-5.5s2.4-5.5 5.5-5.5c.3 0 .6 0 .9.1v3c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.6s1.1 2.6 2.5 2.6c1.5 0 2.6-1.2 2.6-2.7V3h2.9Z" />
    </svg>
  );
}
