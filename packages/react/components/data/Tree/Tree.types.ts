import type { HTMLAttributes, ReactNode } from "react";

export interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLUListElement>, "children" | "onSelect"> {
  data: TreeNode[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
}
