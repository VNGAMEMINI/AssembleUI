import {
  forwardRef,
  useEffect,
  useState,
} from "react";
import type {
  ChangeEvent,
  ForwardedRef,
} from "react";

import { classNames } from "../../../core/utils";
import type { SearchInputProps } from "./SearchInput.types";

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(
  (
    {
      className,
      icon,
      clearable = false,
      onClear,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [inputValue, setInputValue] = useState(
      String(value ?? defaultValue ?? ""),
    );

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(String(value));
      }
    }, [value]);

    const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      setInputValue(event.target.value);
      onChange?.(event);
    };

    const handleClear = () => {
      setInputValue("");
      onClear?.();
    };

    const currentValue =
      value !== undefined
        ? String(value)
        : inputValue;

    return (
      <div
        className={classNames(
          "aui-search-input",
          className,
        )}
      >
        {icon && (
          <span
            className="aui-search-input__icon"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        <input
          {...props}
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          className="aui-search-input__field"
        />

        {clearable && currentValue && (
          <button
            type="button"
            className="aui-search-input__clear"
            aria-label="Clear search"
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
