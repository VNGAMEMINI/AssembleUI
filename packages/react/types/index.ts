/* Common TypeScript types and utility types for AssembleUI */

/**
 * Sizes across the design system
 */
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Spacing scale from design tokens
 */
export type Spacing =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16";

/**
 * Border radius values from design tokens
 */
export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Color semantic roles
 */
export type ColorRole =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

/**
 * Responsive breakpoint
 */
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Horizontal alignment options
 */
export type HorizontalAlign = "start" | "center" | "end";

/**
 * Vertical alignment options
 */
export type VerticalAlign = "start" | "center" | "end" | "stretch";

/**
 * Props that all interactive components should accept
 */
export interface InteractiveComponentProps {
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Props that all styled components should accept
 */
export interface StyledComponentProps {
  className?: string;
  style?: React.CSSProperties;
}
