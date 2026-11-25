interface LogoProps {
  size?: number;
  className?: string;
}

/** The official X Utility mark, copied from assets/xutil.svg. */
export default function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="X Utility logo"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#1a1b26" />
      <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#7aa2f7" strokeWidth="2.5" />
      <polyline
        points="18,20 32,32 18,44"
        fill="none"
        stroke="#7aa2f7"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="36" y1="46" x2="48" y2="46" stroke="#9ece6a" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
