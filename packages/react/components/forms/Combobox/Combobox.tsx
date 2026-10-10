import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  KeyboardEvent,
  MouseEvent,
} from "react";

import type {
  ComboboxOption,
  ComboboxProps,
} from "./Combobox.types";

import {
  classNames,
  createAccessibilityMetadata,
} from "../../../core/utils";

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      inputValue: controlledInputValue,
      defaultInputValue,
      onInputValueChange,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      placeholder = "Select an option",
      disabled = false,
      required = false,
      label,
      description,
      error,
      noResultsText = "No results",
      id,
      className,
      "aria-describedby": externalDescribedBy,
      "aria-invalid": externalInvalid,
      ...props
    },
    ref,
  ) => {

    const {
      id: comboboxId,
      descriptionId,
      errorId,
      describedBy,
      ariaInvalid,
    } = createAccessibilityMetadata({
      id,
      idPrefix: "aui-combobox",
      description,
      error,
      externalDescribedBy,
      externalInvalid,
    });

    const inputId = comboboxId;
    const listboxId = `${comboboxId}-listbox`;

    const [uncontrolledValue, setUncontrolledValue] =
      useState(defaultValue ?? "");

    const [uncontrolledInputValue, setUncontrolledInputValue] =
      useState(() => {
        if (defaultInputValue !== undefined) {
          return defaultInputValue;
        }

        const defaultOption = options.find(
          (option) => option.id === defaultValue,
        );

        return typeof defaultOption?.label === "string"
          ? defaultOption.label
          : "";
      });

    const [uncontrolledOpen, setUncontrolledOpen] =
      useState(defaultOpen);

    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const value =
      controlledValue !== undefined
        ? controlledValue
        : uncontrolledValue;

    const inputValue =
      controlledInputValue !== undefined
        ? controlledInputValue
        : uncontrolledInputValue;

    const open =
      controlledOpen !== undefined
        ? controlledOpen
        : uncontrolledOpen;

    const selectedOption = useMemo(
      () =>
        options.find(
          (option) => option.id === value,
        ),
      [options, value],
    );

    const normalizedInputValue =
      inputValue.trim().toLocaleLowerCase();

    const filteredOptions = useMemo(
      () => {
        if (!normalizedInputValue) {
          return options;
        }

        return options.filter((option) => {
          const labelText =
            typeof option.label === "string"
              ? option.label
              : "";

          return labelText
            .toLocaleLowerCase()
            .includes(normalizedInputValue);
        });
      },
      [options, normalizedInputValue],
    );

    const enabledIndexes = useMemo(
      () =>
        filteredOptions.reduce<number[]>(
          (indexes, option, index) => {
            if (!option.disabled) {
              indexes.push(index);
            }

            return indexes;
          },
          [],
        ),
      [filteredOptions],
    );

    const setOpen = (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    };

    const setInputValue = (nextValue: string) => {
      if (controlledInputValue === undefined) {
        setUncontrolledInputValue(nextValue);
      }

      onInputValueChange?.(nextValue);
    };

    const selectOption = (option: ComboboxOption) => {
      if (option.disabled) {
        return;
      }

      if (controlledValue === undefined) {
        setUncontrolledValue(option.id);
      }

      onValueChange?.(option.id);

      const labelText =
        typeof option.label === "string"
          ? option.label
          : "";

      setInputValue(labelText);
      setActiveIndex(-1);
      setOpen(false);
    };

    const moveActiveIndex = (direction: 1 | -1) => {
      if (enabledIndexes.length === 0) {
        return;
      }

      const currentPosition =
        enabledIndexes.indexOf(activeIndex);

      const nextPosition =
        currentPosition === -1
          ? direction === 1
            ? 0
            : enabledIndexes.length - 1
          : (currentPosition + direction + enabledIndexes.length) %
            enabledIndexes.length;

      setActiveIndex(enabledIndexes[nextPosition]);
    };

    const moveToBoundary = (boundary: "start" | "end") => {
      if (enabledIndexes.length === 0) {
        return;
      }

      setActiveIndex(
        boundary === "start"
          ? enabledIndexes[0]
          : enabledIndexes[enabledIndexes.length - 1],
      );
    };

    const handleInputKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      if (disabled) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();

          if (!open) {
            setOpen(true);
          }

          moveActiveIndex(1);
          break;

        case "ArrowUp":
          event.preventDefault();

          if (!open) {
            setOpen(true);
          }

          moveActiveIndex(-1);
          break;

        case "Home":
          if (open) {
            event.preventDefault();
            moveToBoundary("start");
          }
          break;

        case "End":
          if (open) {
            event.preventDefault();
            moveToBoundary("end");
          }
          break;

        case "Enter":
          if (
            open &&
            activeIndex >= 0 &&
            filteredOptions[activeIndex]
          ) {
            event.preventDefault();
            selectOption(filteredOptions[activeIndex]);
          }
          break;

        case "Escape":
          if (open) {
            event.preventDefault();
            setOpen(false);
            setActiveIndex(-1);
          }
          break;

        default:
          break;
      }
    };

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setInputValue(event.target.value);

      if (!open) {
        setOpen(true);
      }

      setActiveIndex(-1);
    };

    const handleOptionMouseDown = (
      event: MouseEvent<HTMLLIElement>,
      option: ComboboxOption,
    ) => {
      event.preventDefault();
      selectOption(option);
    };

    useEffect(() => {
      if (!open) {
        return;
      }

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target;

        if (
          target instanceof Node &&
          rootRef.current?.contains(target)
        ) {
          return;
        }

        setOpen(false);
        setActiveIndex(-1);
      };

      document.addEventListener(
        "pointerdown",
        handlePointerDown,
      );

      return () => {
        document.removeEventListener(
          "pointerdown",
          handlePointerDown,
        );
      };
    }, [open]);

    useEffect(() => {
      if (!open || activeIndex < 0) {
        return;
      }

      const option = filteredOptions[activeIndex];

      if (!option || option.disabled) {
        return;
      }

      const optionElement = document.getElementById(
        `${listboxId}-${option.id}`,
      );

      optionElement?.scrollIntoView({
        block: "nearest",
      });
    }, [
      activeIndex,
      filteredOptions,
      listboxId,
      open,
    ]);

    useEffect(() => {
      if (
        value &&
        !options.some((option) => option.id === value)
      ) {
        if (controlledValue === undefined) {
          setUncontrolledValue("");
        }

        onValueChange?.("");
      }
    }, [
      controlledValue,
      onValueChange,
      options,
      value,
    ]);

    useEffect(() => {
      if (!open) {
        return;
      }

      inputRef.current?.focus();
    }, [open]);

    const invalid = error != null;

    const activeOption =
      activeIndex >= 0
        ? filteredOptions[activeIndex]
        : undefined;

    const rootClassName = classNames(
      "aui-combobox-field",
      invalid && "aui-combobox-field--invalid",
      disabled && "aui-combobox-field--disabled",
      className,
    );

    return (
      <div
        {...props}
        ref={(node) => {
          rootRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={rootClassName}
      >
        {label != null && (
          <label
            className="aui-combobox-field__label"
            htmlFor={inputId}
          >
            {label}
            {required && (
              <span aria-hidden="true"> *</span>
            )}
          </label>
        )}

        <div className="aui-combobox">
          <input
            ref={inputRef}
            id={inputId}
            className="aui-combobox__input"
            type="text"
            role="combobox"
            value={inputValue}
            placeholder={
              selectedOption == null
                ? placeholder
                : undefined
            }
            disabled={disabled}
            required={required}
            autoComplete="off"
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            aria-haspopup="listbox"
            aria-activedescendant={
              open && activeOption
                ? `${listboxId}-${activeOption.id}`
                : undefined
            }
            aria-invalid={ariaInvalid}
            aria-describedby={describedBy}
            onChange={handleInputChange}
            onFocus={() => {
              if (!disabled) {
                setOpen(true);
              }
            }}
            onKeyDown={handleInputKeyDown}
          />

          {open && (
            <ul
              id={listboxId}
              className="aui-combobox__listbox"
              role="listbox"
              aria-labelledby={
                label != null ? inputId : undefined
              }
            >
              {filteredOptions.length === 0 ? (
                <li
                  className="aui-combobox__empty"
                  role="presentation"
                >
                  {noResultsText}
                </li>
              ) : (
                filteredOptions.map(
                  (option, index) => (
                    <li
                      key={option.id}
                      id={`${listboxId}-${option.id}`}
                      className={classNames(
                        "aui-combobox__option",
                        index === activeIndex &&
                          "aui-combobox__option--active",
                        option.id === value &&
                          "aui-combobox__option--selected",
                        option.disabled &&
                          "aui-combobox__option--disabled",
                      )}
                      role="option"
                      aria-selected={
                        option.id === value
                      }
                      aria-disabled={
                        option.disabled || undefined
                      }
                      onMouseDown={(event) =>
                        handleOptionMouseDown(
                          event,
                          option,
                        )
                      }
                    >
                      {option.label}
                    </li>
                  ),
                )
              )}
            </ul>
          )}
        </div>

        {description != null && error == null && (
          <div
            className="aui-combobox-field__description"
            id={descriptionId}
          >
            {description}
          </div>
        )}

        {error != null && (
          <div
            className="aui-combobox-field__error"
            id={errorId}
            role="alert"
          >
            {error}
          </div>
        )}

        <span className="aui-combobox__value" aria-hidden="true">
          {selectedOption?.label}
        </span>
      </div>
    );
  },
);

Combobox.displayName = "Combobox";

export { Combobox };
