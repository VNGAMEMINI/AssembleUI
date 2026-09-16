import { forwardRef } from "react";
import { Avatar } from "../../components/data/Avatar";
import { Badge } from "../../components/data/Badge";
import { Button } from "../../components/forms/Button";
import type { UserCardProps } from "./UserCard.types";
import { classNames } from "../../core/utils";

const UserCard = forwardRef<HTMLElement, UserCardProps>(
  (
    {
      name,
      description,
      avatarSrc,
      avatarAlt,
      badge,
      actionLabel,
      onAction,
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
      <Avatar src={avatarSrc} alt={avatarAlt ?? name} size="lg" />

      <div className="aui-user-card__content">
        <div className="aui-user-card__header">
          <h3 className="aui-user-card__name">{name}</h3>

          {badge != null && <Badge>{badge}</Badge>}
        </div>

        {description != null && (
          <div className="aui-user-card__description">
            {description}
          </div>
        )}

        {actionLabel != null && (
          <Button type="button" size="small" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </article>
  ),
);

UserCard.displayName = "UserCard";

export { UserCard };
