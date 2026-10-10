import { classNames } from "../../../core/utils";
import type {
  DescriptionListItem,
  DescriptionListProps,
} from "./DescriptionList.types";

export const DescriptionList = ({
  items,
  columns = 1,
  className,
}: DescriptionListProps) => {
  return (
    <dl
      className={classNames(
        "aui-description-list",
        `aui-description-list--columns-${columns}`,
        className,
      )}
    >
      {items.map((item: DescriptionListItem) => (
        <div
          key={item.id}
          className="aui-description-list__item"
        >
          <dt className="aui-description-list__label">
            {item.label}
          </dt>

          <dd className="aui-description-list__value">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
