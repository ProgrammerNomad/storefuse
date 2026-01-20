import Link from "next/link";

export interface LogoProps {
  text?: string;
  href?: string;
  className?: string;
}

/**
 * Logo Component - Core Theme
 * 
 * Simple text-based logo.
 */
export default function Logo({
  text = "StoreFuse",
  href = "/",
  className = "",
}: LogoProps) {
  return (
    <Link href={href} className={`text-2xl font-bold hover:text-gray-700 ${className}`}>
      {text}
    </Link>
  );
}
