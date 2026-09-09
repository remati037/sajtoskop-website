import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      strokeLinecap="round"
    >
      {/* prsten „skopa" */}
      <circle cx="10.5" cy="10.5" r="7.25" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      <circle cx="10.5" cy="10.5" r="3.6" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      {/* nišan */}
      <path d="M10.5 1.6v3.1M10.5 16.3v3.1M1.6 10.5h3.1M16.3 10.5h3.1" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      {/* drška */}
      <path d="M15.9 15.9 21.4 21.4" stroke="currentColor" strokeWidth="1.9" />
      {/* meta */}
      <circle cx="10.5" cy="10.5" r="1.9" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Sajtoskop, početna strana"
    >
      <LogoMark className="h-[22px] w-[22px] text-fg transition-transform duration-300 group-hover:rotate-[-12deg]" />
      <span className="text-[15px] font-semibold tracking-[-0.03em] text-fg">
        sajtoskop
      </span>
    </Link>
  );
}
