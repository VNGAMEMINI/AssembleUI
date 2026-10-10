import {
  forwardRef,
} from "react";

import {
  Avatar,
  Heading,
  Text,
} from "../../components";

import { classNames } from "../../core/utils";

import type { ProfileHeaderProps } from "./ProfileHeader.types";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const ProfileHeader = forwardRef<
  HTMLElement,
  ProfileHeaderProps
>(
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
    <section
      ref={ref}
      className={classNames(
        "aui-profile-header",
        className,
      )}
      {...props}
    >
      <div className="aui-profile-header__avatar">
        <Avatar
          src={avatarSrc}
          alt={avatarAlt ?? name}
          size="lg"
        >
          {avatarFallback ?? getInitials(name)}
        </Avatar>
      </div>

      <div className="aui-profile-header__content">
        <div className="aui-profile-header__identity">
          <Heading
            level={2}
            className="aui-profile-header__name"
          >
            {name}
          </Heading>

          {badge != null && (
            <div className="aui-profile-header__badge">
              {badge}
            </div>
          )}
        </div>

        {description != null && (
          <Text className="aui-profile-header__description">
            {description}
          </Text>
        )}

        {action != null && (
          <div className="aui-profile-header__action">
            {action}
          </div>
        )}
      </div>
    </section>
  ),
);

ProfileHeader.displayName = "ProfileHeader";

export { ProfileHeader };
