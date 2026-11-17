import type {
  DashboardPageCellValue,
  DashboardPageColumnData,
  DashboardPageData,
  DashboardPagePaginationData,
  DashboardPageRowData,
  DashboardPageStatData,
  DashboardPageTemplateProps,
  DashboardPageToolbarData,
  ProfilePageActionData,
  ProfilePageData,
  ProfilePageDetailData,
  ProfilePageItemData,
  ProfilePageProfileData,
  ProfilePageSectionData,
  ProfilePageStatData,
  ProfilePageTemplateProps,
} from "@assemble-ui/react";

import type {
  DashboardPageData as DashboardDataFromTemplates,
  ProfilePageData as ProfileDataFromTemplates,
} from "@assemble-ui/react/templates";

const profile: ProfilePageData = {
  profile: { name: "Alex Morgan" },
};

const dashboard: DashboardPageData = {
  title: "Overview",
  columns: [{ key: "name", header: "Name" }],
  rows: [{ id: "row-1", name: "Alex Morgan" }],
};

const cell: DashboardPageCellValue = "value";
const column: DashboardPageColumnData = {
  key: "name",
  header: "Name",
};
const row: DashboardPageRowData = { id: "row-1", count: 3 };
const stat: DashboardPageStatData = {
  id: "users",
  label: "Users",
  value: 10,
};
const pagination: DashboardPagePaginationData = {
  page: 1,
  totalPages: 2,
};
const toolbar: DashboardPageToolbarData = {
  title: "Overview",
};

const profileAction: ProfilePageActionData = {
  id: "edit",
  label: "Edit",
  href: "/profile/edit",
};
const profileDetail: ProfilePageDetailData = {
  id: "email",
  label: "Email",
  value: "alex@example.com",
};
const profileItem: ProfilePageItemData = {
  id: "role",
  label: "Role",
  value: "Member",
};
const profileSection: ProfilePageSectionData = {
  id: "details",
  title: "Details",
  items: [profileItem],
};
const profileStat: ProfilePageStatData = {
  id: "projects",
  label: "Projects",
  value: 3,
};
const profileInfo: ProfilePageProfileData = {
  name: "Alex Morgan",
  badge: "Member",
};

const profileProps: ProfilePageTemplateProps = { data: profile };
const dashboardProps: DashboardPageTemplateProps = {
  data: dashboard,
};

const profileFromTemplates: ProfileDataFromTemplates = profile;
const dashboardFromTemplates: DashboardDataFromTemplates = dashboard;

// Keep all exported types referenced so TypeScript validates each import.
void [
  cell,
  column,
  row,
  stat,
  pagination,
  toolbar,
  profileAction,
  profileDetail,
  profileItem,
  profileSection,
  profileStat,
  profileInfo,
  profileProps,
  dashboardProps,
  profileFromTemplates,
  dashboardFromTemplates,
];
