import { useState } from "react";

export function useDisclosure(
  defaultOpen = false
) {
  const [open, setOpen] =
    useState(defaultOpen);

  return {
    open,
    openHandler: () => setOpen(true),
    closeHandler: () => setOpen(false),
    toggleHandler: () =>
      setOpen((v) => !v)
  };
}
