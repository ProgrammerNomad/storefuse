import Link from "next/link";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

/**
 * Navigation Component - Core Theme
 * 
 * Flexible navigation component.
 */
export default function Navigation({ items, className = "" }: NavigationProps) {
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover:text-gray-600 transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
