// Simplified, stylized silhouette of a Nepali multi-tiered pagoda temple —
// not a literal architectural rendering, just a decorative motif line.
export default function PagodaMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      {/* finial */}
      <line x1="100" y1="4" x2="100" y2="34" />
      <circle cx="100" cy="10" r="4" />

      {/* tier 1 (top, narrowest) */}
      <path d="M78 34 L100 34 L122 34" />
      <path d="M70 58 L78 34 L100 40 L122 34 L130 58" />
      <line x1="70" y1="58" x2="130" y2="58" />
      <line x1="90" y1="58" x2="90" y2="86" />
      <line x1="110" y1="58" x2="110" y2="86" />

      {/* tier 2 */}
      <path d="M56 86 L70 58 L100 66 L130 58 L144 86" />
      <line x1="56" y1="86" x2="144" y2="86" />
      <line x1="76" y1="86" x2="76" y2="120" />
      <line x1="124" y1="86" x2="124" y2="120" />

      {/* tier 3 (bottom, widest) */}
      <path d="M34 120 L56 86 L100 96 L144 86 L166 120" />
      <line x1="34" y1="120" x2="166" y2="120" />

      {/* body */}
      <line x1="60" y1="120" x2="60" y2="230" />
      <line x1="140" y1="120" x2="140" y2="230" />
      <line x1="70" y1="140" x2="70" y2="230" />
      <line x1="130" y1="140" x2="130" y2="230" />
      <line x1="86" y1="150" x2="86" y2="230" />
      <line x1="114" y1="150" x2="114" y2="230" />

      {/* plinth */}
      <line x1="20" y1="230" x2="180" y2="230" />
      <line x1="10" y1="248" x2="190" y2="248" />
      <line x1="0" y1="266" x2="200" y2="266" />
    </svg>
  );
}
