import {
  forwardRef,
  useMemo,
  useState,
} from "react";
import type {
  ChangeEvent,
  KeyboardEvent,
} from "react";

import { classNames } from "../../../core/utils";
import type {
  AutocompleteOption,
  AutocompleteProps,
} from "./Autocomplete.types";

export const Autocomplete = forwardRef(
  <T,>(
    {
      className,
      options,
      value,
      defaultValue = "",
      onChange,
      ...props
    }: AutocompleteProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const [inputValue, setInputValue] = useState(
      value ?? defaultValue,
    );

    const filteredOptions = useMemo(() => {
      const query = inputValue.trim().toLowerCase();

      if (!query) {
        return options;
      }

      return options.filter((option) =>
        String(option.label)
          .toLowerCase()
          .includes(query),
      );
    }, [inputValue, options]);

    const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      const nextValue = event.target.value;

      setInputValue(nextValue);
      onChange?.(nextValue, undefined);
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key !== "Enter") {
        return;
      }

      const option = filteredOptions[0];

      if (!option) {
        return;
      }

      setInputValue(String(option.label));
      onChange?.(String(option.label), option);
    };

    return (
      <div className="aui-autocomplete">
        <input
          {...props}
          ref={ref}
          value={value ?? inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={classNames(
            "aui-autocomplete__input",
            className,
          )}
          role="combobox"
          aria-autocomplete="list"
        />

        {filteredOptions.length > 0 && (
          <ul
            className="aui-autocomplete__list"
            role="listbox"
          >
            {filteredOptions.map((option) => (
              <li
                key={String(option.value)}
                role="option"
                aria-selected={
                  String(option.label) === inputValue
                }
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = "Autocomplete";
