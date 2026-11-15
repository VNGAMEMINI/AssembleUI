import { useState } from "react";

import { classNames } from "../../../core/utils";
import { TreeNodeItem } from "./module/_TreeNodeItem";
import type { TreeProps } from "./Tree.types";

export const Tree = ({
  data,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  selectedId,
  onSelect,
  className,
  style: rootStyle,
  role = "tree",
  ...rootProps
}: TreeProps) => {
  const [internalExpandedIds, setInternalExpandedIds] =
    useState(defaultExpandedIds);

  const isControlled = expandedIds !== undefined;

  const currentExpandedIds = isControlled ? expandedIds : internalExpandedIds;

  const expandedIdSet = new Set(currentExpandedIds);

  const handleToggle = (id: string) => {
    const nextExpandedIds = currentExpandedIds.includes(id)
      ? currentExpandedIds.filter((item) => item !== id)
      : [...currentExpandedIds, id];

    if (!isControlled) {
      setInternalExpandedIds(nextExpandedIds);
    }

    onExpandedChange?.(nextExpandedIds);
  };

  return (
    <ul
      {...rootProps}
      className={classNames("aui-tree", className)}
      style={rootStyle}
      role={role}
    >
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          expandedIds={expandedIdSet}
          selectedId={selectedId}
          onToggle={handleToggle}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};
