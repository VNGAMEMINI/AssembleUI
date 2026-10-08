import { useState } from "react";
import type { CSSProperties } from "react";
import type { RatingProps } from "./Rating.types";

const DEFAULT_MAX = 5;

function clampValue(value: number, max: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), max);
}

export function Rating({
  value,
  defaultValue = 0,
  max = DEFAULT_MAX,
  readOnly = false,
  onChange,
  ariaLabel,
  className,
}: RatingProps) {
  const safeMax =
    Number.isInteger(max) && max > 0 ? max : DEFAULT_MAX;

  const [internalValue, setInternalValue] = useState(
    clampValue(defaultValue, safeMax),
  );

  const currentValue = clampValue(
    value ?? internalValue,
    safeMax,
  );

  const handleChange = (nextValue: number) => {
    if (readOnly) {
      return;
    }

    const next = clampValue(nextValue, safeMax);

    if (value === undefined) {
      setInternalValue(next);
    }

    onChange?.(next);
  };

  const classes = [
    "aui-rating",
    readOnly ? "aui-rating--readonly" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role="group"
      aria-label={
        ariaLabel ?? `Rating: ${currentValue} out of ${safeMax}`
      }
    >
      {Array.from({ length: safeMax }, (_, index) => {
        const fill = Math.min(
          1,
          Math.max(0, currentValue - index),
        );

        const style = {
          "--aui-rating-fill": `${fill * 100}%`,
        } as CSSProperties;

        return (
          <button
            key={index}
            type="button"
            className="aui-rating__star"
            aria-label={`Set rating to ${index + 1}`}
            disabled={readOnly}
            onClick={() => handleChange(index + 1)}
          >
            <span
              className="aui-rating__star-base"
              aria-hidden="true"
            >
              ★
            </span>

            <span
              className="aui-rating__star-fill"
              aria-hidden="true"
              style={style}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}
