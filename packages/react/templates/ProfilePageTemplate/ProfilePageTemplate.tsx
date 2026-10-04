import {
  forwardRef,
  type ReactElement,
} from "react";

import {
  Heading,
  Text,
} from "../../components";

import {
  ActionMenu,
  ProfileHeader,
} from "../../patterns";

import { classNames } from "../../core/utils";

import type {
  ProfilePageTemplateProps,
} from "./ProfilePageTemplate.types";

export const ProfilePageTemplate = forwardRef<
  HTMLElement,
  ProfilePageTemplateProps
>(function ProfilePageTemplate(
  {
    profile,
    stats,
    sections,
    details,
    actions,
    className,
    ...props
  },
  ref,
): ReactElement {
  return (
    <main
      ref={ref}
      className={classNames(
        "aui-profile-page-template",
        className,
      )}
      {...props}
    >
      <header className="aui-profile-page-template__header">
        <ProfileHeader
          name={profile.name}
          description={profile.description}
          avatarSrc={profile.avatarSrc}
          avatarAlt={profile.avatarAlt}
          avatarFallback={profile.avatarFallback}
          badge={profile.badge}
        />

        {actions != null && actions.length > 0 && (
          <ActionMenu
            items={actions.map((action) => ({
              id: action.id,
              type: "link",
              label: action.label,
              href: action.href,
              external: action.external,
            }))}
          />
        )}
      </header>

      <div className="aui-profile-page-template__body">
        <div className="aui-profile-page-template__main">
          {stats != null && stats.length > 0 && (
            <section
              className="aui-profile-page-template__stats"
              aria-label="Profile statistics"
            >
              {stats.map((stat) => (
                <div
                  className="aui-profile-page-template__stat"
                  key={stat.id}
                >
                  <Text
                    size="sm"
                    tone="muted"
                  >
                    {stat.label}
                  </Text>

                  <Heading
                    level={3}
                    size="lg"
                  >
                    {stat.value}
                  </Heading>
                </div>
              ))}
            </section>
          )}

          {sections != null && sections.length > 0 && (
            <div className="aui-profile-page-template__sections">
              {sections.map((section) => (
                <section
                  className="aui-profile-page-template__section"
                  key={section.id}
                >
                  <Heading level={2}>
                    {section.title}
                  </Heading>

                  {section.description != null && (
                    <Text tone="muted">
                      {section.description}
                    </Text>
                  )}

                  {section.items != null &&
                    section.items.length > 0 && (
                      <dl className="aui-profile-page-template__items">
                        {section.items.map((item) => (
                          <div
                            className="aui-profile-page-template__item"
                            key={item.id}
                          >
                            <dt>{item.label}</dt>
                            <dd>{item.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                </section>
              ))}
            </div>
          )}
        </div>

        {details != null && details.length > 0 && (
          <aside className="aui-profile-page-template__sidebar">
            <section className="aui-profile-page-template__section">
              <Heading level={2}>
                Profile details
              </Heading>

              <dl className="aui-profile-page-template__details">
                {details.map((detail) => (
                  <div
                    className="aui-profile-page-template__detail"
                    key={detail.id}
                  >
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        )}
      </div>
    </main>
  );
});

ProfilePageTemplate.displayName = "ProfilePageTemplate";
