import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "medium",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    "aui-button",
    `aui-button--${variant}`,
    `aui-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
