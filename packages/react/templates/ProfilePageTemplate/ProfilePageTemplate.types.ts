import type { HTMLAttributes } from "react";

export interface ProfilePageProfileData {
  name: string;
  description?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: string;
  badge?: string;
}

export interface ProfilePageStatData {
  id: string;
  label: string;
  value: string | number;
}

export interface ProfilePageItemData {
  id: string;
  label: string;
  value: string;
}

export interface ProfilePageSectionData {
  id: string;
  title: string;
  description?: string;
  items?: ProfilePageItemData[];
}

export interface ProfilePageDetailData {
  id: string;
  label: string;
  value: string;
}

export interface ProfilePageActionData {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface ProfilePageData {
  profile: ProfilePageProfileData;
  actions?: ProfilePageActionData[];
  stats?: ProfilePageStatData[];
  sections?: ProfilePageSectionData[];
  details?: ProfilePageDetailData[];
}

export interface ProfilePageTemplateProps
  extends HTMLAttributes<HTMLElement> {
  data: ProfilePageData;
}
