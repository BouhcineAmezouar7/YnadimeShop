import Link from "next/link";

export default function ViewAllLink({
  href,
  label = "View all",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex shrink-0 items-center justify-center gap-3 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors duration-200 hover:border-[#DB4444] hover:text-[#DB4444] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DB4444] ${className}`}
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      >
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </svg>
    </Link>
  );
}
