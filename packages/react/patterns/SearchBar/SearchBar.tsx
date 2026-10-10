import { forwardRef } from "react";

import { Button } from "../../components/forms/Button";
import { Input } from "../../components/forms/Input";
import { classNames } from "../../core/utils";

import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = forwardRef<HTMLFormElement, SearchBarProps>(
  (
    {
      inputProps,
      buttonProps,
      buttonLabel = "Search",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <form
        {...props}
        ref={ref}
        role="search"
        className={classNames("aui-search-bar", className)}
      >
        <Input
          {...inputProps}
          type="search"
          className={classNames(
            "aui-search-bar__input",
            inputProps?.className,
          )}
        />

        <Button
          {...buttonProps}
          type="submit"
          className={classNames(
            "aui-search-bar__button",
            buttonProps?.className,
          )}
        >
          {buttonLabel}
        </Button>
      </form>
    );
  },
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
