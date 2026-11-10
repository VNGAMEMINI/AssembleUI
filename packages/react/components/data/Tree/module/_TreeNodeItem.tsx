import { classNames } from "../../../../core/utils";
import type { TreeNode } from "../Tree.types";

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  expandedIds: Set<string>;
  selectedId?: string;
  onToggle: (id: string) => void;
  onSelect?: (node: TreeNode) => void;
}

export const TreeNodeItem = ({
  node,
  level,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
}: TreeNodeItemProps) => {
  const children = node.children ?? [];
  const hasChildren = children.length > 0;
  const expanded = expandedIds.has(node.id);
  const selected = selectedId === node.id;

  const handleToggle = () => {
    if (hasChildren && !node.disabled) {
      onToggle(node.id);
    }
  };

  const handleSelect = () => {
    if (!node.disabled) {
      onSelect?.(node);
    }
  };

  return (
    <li
      className={classNames(
        "aui-tree__item",
        node.disabled && "aui-tree__item--disabled",
      )}
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-selected={selected}
      aria-disabled={node.disabled || undefined}
    >
      <div
        className="aui-tree__row"
        style={{
          paddingInlineStart: `${level * 1.25}rem`,
        }}
      >
        <button
          type="button"
          className="aui-tree__toggle"
          aria-label={
            hasChildren
              ? expanded
                ? `Collapse ${String(node.label)}`
                : `Expand ${String(node.label)}`
              : undefined
          }
          disabled={!hasChildren || node.disabled}
          onClick={handleToggle}
        >
          {hasChildren ? (
            <span
              aria-hidden="true"
              className={classNames(
                "aui-tree__chevron",
                expanded && "aui-tree__chevron--expanded",
              )}
            >
              ›
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="aui-tree__spacer"
            />
          )}
        </button>

        <button
          type="button"
          className={classNames(
            "aui-tree__label",
            selected && "aui-tree__label--selected",
          )}
          disabled={node.disabled}
          aria-selected={selected}
          onClick={handleSelect}
        >
          {node.label}
        </button>
      </div>

      {hasChildren && expanded && (
        <ul className="aui-tree__children" role="group">
          {children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};