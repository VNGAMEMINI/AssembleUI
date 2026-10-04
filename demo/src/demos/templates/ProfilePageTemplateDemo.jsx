import { ProfilePageTemplate } from "@assemble-ui/react";

export function ProfilePageTemplateDemo() {
  const data = {
    profile: {
      name: "Alex Morgan",
      description:
        "Frontend developer and UI designer building accessible and scalable interfaces.",
      avatarFallback: "AM",
      badge: "Pro",
    },

    actions: [
      {
        id: "edit",
        label: "Edit profile",
        href: "#edit",
      },
      {
        id: "settings",
        label: "Settings",
        href: "#settings",
      },
    ],

    stats: [
      {
        id: "projects",
        label: "Projects",
        value: 24,
      },
      {
        id: "followers",
        label: "Followers",
        value: 1280,
      },
      {
        id: "experience",
        label: "Experience",
        value: "5 years",
      },
    ],

    sections: [
      {
        id: "about",
        title: "About",
        description:
          "Building accessible and scalable interfaces with React and modern web technologies.",
        items: [
          {
            id: "role",
            label: "Role",
            value: "Frontend Developer",
          },
          {
            id: "location",
            label: "Location",
            value: "Vietnam",
          },
          {
            id: "availability",
            label: "Availability",
            value: "Available",
          },
        ],
      },
      {
        id: "activity",
        title: "Activity",
        items: [
          {
            id: "profile-update",
            label: "Updated profile",
            value: "2 hours ago",
          },
          {
            id: "new-project",
            label: "Published a new project",
            value: "Yesterday",
          },
          {
            id: "community",
            label: "Joined AssembleUI community",
            value: "3 days ago",
          },
        ],
      },
      {
        id: "projects",
        title: "Projects",
        description:
          "Recent projects created by this profile.",
        items: [
          {
            id: "assemble-ui",
            label: "AssembleUI",
            value: "React UI library",
          },
          {
            id: "examination",
            label: "Examination",
            value: "Quiz data-processing library",
          },
        ],
      },
    ],

    details: [
      {
        id: "location",
        label: "Location",
        value: "Vietnam",
      },
      {
        id: "experience",
        label: "Experience",
        value: "5 years",
      },
      {
        id: "projects",
        label: "Projects",
        value: "24",
      },
      {
        id: "joined",
        label: "Joined",
        value: "2024",
      },
    ],
  };

  return <ProfilePageTemplate data={data} />;
}
