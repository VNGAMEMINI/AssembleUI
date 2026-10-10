import { forwardRef, type ReactElement } from "react";
import { Heading, Text } from "../../components";
import { ActionMenu, ProfileHeader } from "../../patterns";
import { classNames } from "../../core/utils";
import type { ProfilePageTemplateProps } from "./ProfilePageTemplate.types";

export const ProfilePageTemplate = forwardRef<
  HTMLElement,
  ProfilePageTemplateProps
>(function ProfilePageTemplate(
  { data, className, ...props },
  ref,
): ReactElement {
  const {
    profile,
    actions = [],
    stats = [],
    sections = [],
    details = [],
  } = data;

  const hasStats = stats.length > 0;
  const hasSections = sections.length > 0;
  const hasDetails = details.length > 0;
  const hasActions = actions.length > 0;

  return (
    <main
      ref={ref}
      className={classNames("aui-profile-page-template", className)}
      {...props}
    >
      <header className="aui-profile-page-template__hero">
        <div className="aui-profile-page-template__hero-main">
          <div className="aui-profile-page-template__hero-label">
            <span className="aui-profile-page-template__hero-dot" />
            Profile
          </div>

          <ProfileHeader
            name={profile.name}
            description={profile.description}
            avatarSrc={profile.avatarSrc}
            avatarAlt={profile.avatarAlt}
            avatarFallback={profile.avatarFallback}
            badge={
              profile.badge != null ? (
                <span>{profile.badge}</span>
              ) : undefined
            }
          />
        </div>

        {hasActions && (
          <div className="aui-profile-page-template__actions">
            <ActionMenu
              items={actions.map((action) => ({
                id: action.id,
                type: "link",
                label: action.label,
                href: action.href,
                external: action.external,
              }))}
            />
          </div>
        )}
      </header>

      {hasStats && (
        <section
          className="aui-profile-page-template__stats"
          aria-label="Profile statistics"
        >
          {stats.map((stat) => (
            <article
              className="aui-profile-page-template__stat"
              key={stat.id}
            >
              <Text
                as="span"
                size="sm"
                tone="muted"
                className="aui-profile-page-template__stat-label"
              >
                {stat.label}
              </Text>

              <strong className="aui-profile-page-template__stat-value">
                {stat.value}
              </strong>
            </article>
          ))}
        </section>
      )}

      {(hasSections || hasDetails) && (
        <div className="aui-profile-page-template__content">
          {hasSections && (
            <div className="aui-profile-page-template__main">
              {sections.map((section) => (
                <section
                  className="aui-profile-page-template__section"
                  key={section.id}
                >
                  <div className="aui-profile-page-template__section-header">
                    <div>
                      <Heading level={2}>
                        {section.title}
                      </Heading>

                      {section.description != null && (
                        <Text
                          tone="muted"
                          className="aui-profile-page-template__section-description"
                        >
                          {section.description}
                        </Text>
                      )}
                    </div>
                  </div>

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

          {hasDetails && (
            <aside className="aui-profile-page-template__aside">
              <section className="aui-profile-page-template__details">
                <div className="aui-profile-page-template__details-heading">
                  <Text
                    as="span"
                    size="sm"
                    tone="muted"
                  >
                    Profile
                  </Text>

                  <Heading level={2}>
                    Details
                  </Heading>
                </div>

                <dl className="aui-profile-page-template__detail-list">
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
      )}
    </main>
  );
});

ProfilePageTemplate.displayName = "ProfilePageTemplate";
