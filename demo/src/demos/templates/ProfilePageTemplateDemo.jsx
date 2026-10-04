import {
  ActionMenu,
  Badge,
  Button,
  ProfileHeader,
  ProfilePageTemplate,
} from "@assemble-ui/react";

export function ProfilePageTemplateDemo() {
  const actions = [
    {
      id: "edit",
      type: "action",
      label: "Edit profile",
      onClick: () => {},
    },
    {
      id: "settings",
      type: "link",
      label: "Settings",
      href: "#settings",
    },
  ];

  return (
    <ProfilePageTemplate
      profile={
        <ProfileHeader
          name="Alex Morgan"
          description="Frontend developer and UI designer"
          badge="Pro"
          avatarFallback="AM"
        />
      }
      actions={
        <ActionMenu items={actions} />
      }
      content={
        <div className="aui-demo-profile-page">
          <section className="aui-demo-profile-page__section">
            <div className="aui-demo-profile-page__section-header">
              <div>
                <h2>About</h2>
                <p>
                  Building accessible and scalable interfaces
                  with React and modern web technologies.
                </p>
              </div>

              <Badge variant="success">
                Available
              </Badge>
            </div>
          </section>

          <section className="aui-demo-profile-page__section">
            <h2>Activity</h2>

            <div className="aui-demo-profile-page__activity">
              <article>
                <strong>Updated profile</strong>
                <span>2 hours ago</span>
              </article>

              <article>
                <strong>Published a new project</strong>
                <span>Yesterday</span>
              </article>

              <article>
                <strong>Joined AssembleUI community</strong>
                <span>3 days ago</span>
              </article>
            </div>
          </section>

          <section className="aui-demo-profile-page__section">
            <div className="aui-demo-profile-page__section-header">
              <div>
                <h2>Projects</h2>
                <p>
                  Recent projects created by this profile.
                </p>
              </div>

              <Button>
                View all
              </Button>
            </div>
          </section>
        </div>
      }
      sidebar={
        <div className="aui-demo-profile-page__sidebar">
          <section className="aui-demo-profile-page__section">
            <h2>Profile details</h2>

            <dl className="aui-demo-profile-page__details">
              <div>
                <dt>Location</dt>
                <dd>Vietnam</dd>
              </div>

              <div>
                <dt>Experience</dt>
                <dd>5 years</dd>
              </div>

              <div>
                <dt>Projects</dt>
                <dd>24</dd>
              </div>

              <div>
                <dt>Joined</dt>
                <dd>2024</dd>
              </div>
            </dl>
          </section>

          <section className="aui-demo-profile-page__section">
            <h2>Quick actions</h2>

            <div className="aui-demo-profile-page__quick-actions">
              <Button variant="secondary">
                Message
              </Button>

              <Button variant="secondary">
                Share profile
              </Button>
            </div>
          </section>
        </div>
      }
    />
  );
}
