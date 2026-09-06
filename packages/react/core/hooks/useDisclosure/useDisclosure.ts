import { useCallback, useState } from "react";

export interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function useDisclosure({
  defaultIsOpen = false,
}: UseDisclosureProps = {}): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((value) => !value), []);

  return { isOpen, onOpen, onClose, onToggle };
}

export { useDisclosure };
