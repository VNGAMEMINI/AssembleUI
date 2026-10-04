import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ProfilePageTemplateProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  profile: ReactNode;
  content: ReactNode;
  sidebar?: ReactNode;
  actions?: ReactNode;
}
