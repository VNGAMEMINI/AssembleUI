export interface UseDisclosureProps {
    defaultIsOpen?: boolean;
}
export interface UseDisclosureReturn {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}
declare function useDisclosure({ defaultIsOpen, }?: UseDisclosureProps): UseDisclosureReturn;
export { useDisclosure };
