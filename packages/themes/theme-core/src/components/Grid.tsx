export interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Grid Component - Core Theme
 * 
 * Responsive grid layout.
 */
export default function Grid({
  children,
  columns = 4,
  gap = "md",
  className = "",
}: GridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-12",
  };

  const gaps = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gaps[gap]} ${className}`}>
      {children}
    </div>
  );
}
