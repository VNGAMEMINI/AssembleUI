import {
  forwardRef,
  type ReactElement,
} from "react";

import { classNames } from "../../core/utils";
import type { ProfilePageTemplateProps } from "./ProfilePageTemplate.types";

export const ProfilePageTemplate = forwardRef<
  HTMLElement,
  ProfilePageTemplateProps
>(function ProfilePageTemplate(
  {
    profile,
    content,
    sidebar,
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
        <div className="aui-profile-page-template__profile">
          {profile}
        </div>

        {actions != null && (
          <div className="aui-profile-page-template__actions">
            {actions}
          </div>
        )}
      </header>

      <div className="aui-profile-page-template__body">
        <section className="aui-profile-page-template__content">
          {content}
        </section>

        {sidebar != null && (
          <aside className="aui-profile-page-template__sidebar">
            {sidebar}
          </aside>
        )}
      </div>
    </main>
  );
});
