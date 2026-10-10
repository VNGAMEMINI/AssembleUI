import { forwardRef } from "react";

import { Avatar } from "../../components/data/Avatar";
import { Badge } from "../../components/data/Badge";
import { classNames } from "../../core/utils";

import type { UserCardProps } from "./UserCard.types";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const UserCard = forwardRef<HTMLElement, UserCardProps>(
  (
    {
      name,
      description,
      avatarSrc,
      avatarAlt,
      avatarFallback,
      badge,
      action,
      className,
      ...props
    },
    ref,
  ) => (
    <article
      {...props}
      ref={ref}
      className={classNames("aui-user-card", className)}
    >
      <Avatar
        src={avatarSrc}
        alt={avatarAlt ?? name}
        size="lg"
      >
        {avatarFallback ?? getInitials(name)}
      </Avatar>

      <div className="aui-user-card__content">
        <div className="aui-user-card__header">
          <h3 className="aui-user-card__name">
            {name}
          </h3>

          {badge != null && (
            <Badge>{badge}</Badge>
          )}
        </div>

        {description != null && (
          <div className="aui-user-card__description">
            {description}
          </div>
        )}

        {action != null && (
          <div className="aui-user-card__action">
            {action}
          </div>
        )}
      </div>
    </article>
  ),
);

UserCard.displayName = "UserCard";

export { UserCard };
