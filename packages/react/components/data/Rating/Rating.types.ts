export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  ariaLabel?: string;
  className?: string;
}
