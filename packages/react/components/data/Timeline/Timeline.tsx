import { classNames } from "../../../core/utils";
import type {
  TimelineItem,
  TimelineProps,
} from "./Timeline.types";

export const Timeline = ({
  items,
  className,
}: TimelineProps) => {
  return (
    <ol className={classNames("aui-timeline", className)}>
      {items.map((item: TimelineItem) => (
        <li
          key={item.id}
          className={classNames(
            "aui-timeline__item",
            item.status &&
              `aui-timeline__item--${item.status}`,
          )}
        >
          <div className="aui-timeline__marker">
            {item.icon ?? (
              <span
                aria-hidden="true"
                className="aui-timeline__dot"
              />
            )}
          </div>

          <div className="aui-timeline__body">
            <div className="aui-timeline__header">
              <h3 className="aui-timeline__title">
                {item.title}
              </h3>

              {item.time !== undefined && (
                <time className="aui-timeline__time">
                  {item.time}
                </time>
              )}
            </div>

            {item.content !== undefined && (
              <div className="aui-timeline__content">
                {item.content}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};
