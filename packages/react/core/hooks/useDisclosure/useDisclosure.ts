import { useCallback, useState } from "react";

export interface UseDisclosureProps {
  defaultIsOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function useDisclosure({
  defaultIsOpen = false,
  open,
  onOpenChange,
}: UseDisclosureProps = {}): UseDisclosureReturn {
  const [internalIsOpen, setInternalIsOpen] =
    useState(defaultIsOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalIsOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalIsOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onToggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

export { useDisclosure };
