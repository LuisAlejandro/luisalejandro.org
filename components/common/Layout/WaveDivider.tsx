interface WaveDividerProps {
  variant?: "100" | "200";
  fill?: string;
  inverted?: boolean;
  className?: string;
}

export function WaveDivider({
  variant = "100",
  fill = "#ddd",
  inverted = false,
  className,
}: WaveDividerProps) {
  const height = variant === "100" ? 100 : 200;
  const path = inverted
    ? "M1920,0v100H0V0l960,50L1920,0z"
    : "M960,50l960-50H0L960,50z";

  return (
    <svg
      viewBox={`0 0 1920 ${height}`}
      aria-hidden="true"
      className={className}
    >
      <path fill={fill} d={path} />
    </svg>
  );
}
