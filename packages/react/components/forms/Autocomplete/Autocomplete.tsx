import { forwardRef, useId, useMemo, useState } from "react";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
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
      onKeyDown,
      onFocus,
      onBlur,
      ...props
    }: AutocompleteProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const generatedId = useId();
    const listId = `aui-autocomplete-list-${generatedId}`;
    const optionId = (index: number) => `${listId}-option-${index}`;

    const [inputValue, setInputValue] = useState(defaultValue);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);

    const currentValue = value ?? inputValue;

    const filteredOptions = useMemo(() => {
      const query = currentValue.trim().toLowerCase();

      if (!query) return options;

      return options.filter((option) => {
        const label =
          typeof option.label === "string" ||
          typeof option.label === "number"
            ? String(option.label)
            : String(option.value);

        return label.toLowerCase().includes(query);
      });
    }, [currentValue, options]);

    const selectOption = (option: AutocompleteOption<T>) => {
      const label =
        typeof option.label === "string" ||
        typeof option.label === "number"
          ? String(option.label)
          : String(option.value);

      setInputValue(label);
      setActiveIndex(-1);
      setIsOpen(false);
      onChange?.(label, option);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setInputValue(nextValue);
      setActiveIndex(-1);
      setIsOpen(true);
      onChange?.(nextValue, undefined);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) return;

      if (event.key === "ArrowDown") {
        if (filteredOptions.length === 0) return;

        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((index) =>
          index >= filteredOptions.length - 1 ? 0 : index + 1,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        if (filteredOptions.length === 0) return;

        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((index) =>
          index <= 0 ? filteredOptions.length - 1 : index - 1,
        );
        return;
      }

      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveIndex(-1);
        return;
      }

      if (event.key === "Enter") {
        if (!isOpen || filteredOptions.length === 0) return;

        event.preventDefault();

        const option =
          activeIndex >= 0
            ? filteredOptions[activeIndex]
            : filteredOptions[0];

        if (option) selectOption(option);
      }
    };

    const handleOptionMouseDown = (
      event: MouseEvent<HTMLLIElement>,
      option: AutocompleteOption<T>,
    ) => {
      event.preventDefault();
      selectOption(option);
    };

    return (
      <div className="aui-autocomplete">
        <input
          {...props}
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={(event) => {
            onFocus?.(event);
            setIsOpen(true);
          }}
          onBlur={(event) => {
            onBlur?.(event);
            setIsOpen(false);
            setActiveIndex(-1);
          }}
          className={classNames("aui-autocomplete__input", className)}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && filteredOptions.length > 0}
          aria-controls={listId}
          aria-activedescendant={
            activeIndex >= 0
              ? optionId(activeIndex)
              : undefined
          }
          autoComplete="off"
        />

        {isOpen && filteredOptions.length > 0 && (
          <ul
            id={listId}
            className="aui-autocomplete__list"
            role="listbox"
          >
            {filteredOptions.map((option, index) => (
              <li
                id={optionId(index)}
                key={String(option.value)}
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) =>
                  handleOptionMouseDown(event, option)
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
