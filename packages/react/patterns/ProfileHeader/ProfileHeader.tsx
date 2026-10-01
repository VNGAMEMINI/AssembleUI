import {
  forwardRef,
  type ReactElement,
} from "react";

import {
  Avatar,
  Badge,
  Heading,
  Text,
} from "../../components";

import type { ProfileHeaderProps } from "./ProfileHeader.types";

export const ProfileHeader = forwardRef<
  HTMLElement,
  ProfileHeaderProps
>(function ProfileHeader(
  {
    name,
    description,
    avatarSrc,
    avatarAlt,
    badge,
    action,
    className,
    ...props
  },
  ref,
): ReactElement {
  const classes = [
    "aui-profile-header",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={ref}
      className={classes}
      {...props}
    >
      <div className="aui-profile-header__avatar">
        <Avatar
          src={avatarSrc}
          alt={avatarAlt ?? name}
        />
      </div>

      <div className="aui-profile-header__content">
        <div className="aui-profile-header__identity">
          <Heading
            level={2}
            className="aui-profile-header__name"
          >
            {name}
          </Heading>

          {badge ? (
            <div className="aui-profile-header__badge">
              {badge}
            </div>
          ) : null}
        </div>

        {description ? (
          <Text className="aui-profile-header__description">
            {description}
          </Text>
        ) : null}

        {action ? (
          <div className="aui-profile-header__action">
            {action}
          </div>
        ) : null}
      </div>
    </section>
  );
});
