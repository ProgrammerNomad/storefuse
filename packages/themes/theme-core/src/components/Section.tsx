export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

/**
 * Section Component - Core Theme
 * 
 * Page section with consistent spacing.
 */
export default function Section({
  children,
  className = "",
  padding = "md",
}: SectionProps) {
  const paddings = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  };

  return (
    <section className={`${paddings[padding]} ${className}`}>
      {children}
    </section>
  );
}
