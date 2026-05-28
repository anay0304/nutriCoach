// Abstract concentric-arc brand mark — no photos, no avatars
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" opacity=".25" />
      <path d="M16 4a12 12 0 0 1 0 24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
      <path d="M16 9a7 7 0 0 1 0 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  )
}
