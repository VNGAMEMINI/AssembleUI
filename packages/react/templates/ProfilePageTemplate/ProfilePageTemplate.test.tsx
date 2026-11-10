import {
  describe,
  expect,
  it,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import {
  ProfilePageTemplate,
} from "./ProfilePageTemplate";

const profile = {
  name: "Alex Morgan",
  description: "Frontend developer",
  avatarFallback: "AM",
  badge: "Pro",
};

const stats = [
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
];

const sections = [
  {
    id: "about",
    title: "About",
    description: "Frontend developer and UI designer.",
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
    ],
  },
];

const details = [
  {
    id: "email",
    label: "Email",
    value: "alex@example.com",
  },
  {
    id: "website",
    label: "Website",
    value: "example.com",
  },
];

const actions = [
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
];

const data = {
  profile,
  stats,
  sections,
  details,
  actions,
};

describe("ProfilePageTemplate", () => {
  it("renders profile data", () => {
    render(
      <ProfilePageTemplate
        data={{ profile }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Alex Morgan",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Frontend developer"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Pro"),
    ).toBeInTheDocument();
  });

  it("renders statistics from data", () => {
    render(
      <ProfilePageTemplate
        data={{
          profile,
          stats,
        }}
      />,
    );

    expect(
      screen.getByText("Projects"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("24"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Followers"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("1280"),
    ).toBeInTheDocument();
  });

  it("renders sections and section items from data", () => {
    render(
      <ProfilePageTemplate
        data={{
          profile,
          sections,
        }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "About",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Frontend developer and UI designer.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Role"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Frontend Developer"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Location"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vietnam"),
    ).toBeInTheDocument();
  });

  it("renders profile details from data", () => {
    render(
      <ProfilePageTemplate
        data={{
          profile,
          details,
        }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Details",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Email"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("alex@example.com"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Website"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("example.com"),
    ).toBeInTheDocument();
  });

  it("renders actions from data", () => {
    render(
      <ProfilePageTemplate
        data={{
          profile,
          actions,
        }}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "Edit profile",
      }),
    ).toHaveAttribute("href", "#edit");

    expect(
      screen.getByRole("link", {
        name: "Settings",
      }),
    ).toHaveAttribute("href", "#settings");
  });

  it("renders all supported data regions together", () => {
    render(
      <ProfilePageTemplate
        data={data}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Alex Morgan",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("24"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "About",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Details",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Edit profile",
      }),
    ).toBeInTheDocument();
  });

  it("supports native main attributes", () => {
    render(
      <ProfilePageTemplate
        data={{ profile }}
        id="profile-page"
        aria-label="Profile page"
      />,
    );

    const main = screen.getByRole("main", {
      name: "Profile page",
    });

    expect(main).toHaveAttribute(
      "id",
      "profile-page",
    );
  });

  it("supports className", () => {
    render(
      <ProfilePageTemplate
        data={{ profile }}
        className="custom-profile-page"
      />,
    );

    expect(
      screen.getByRole("main"),
    ).toHaveClass(
      "aui-profile-page-template",
      "custom-profile-page",
    );
  });

  it("forwards ref", () => {
    const ref = {
      current: null,
    } as {
      current: HTMLElement | null;
    };

    render(
      <ProfilePageTemplate
        ref={ref}
        data={{ profile }}
      />,
    );

    expect(ref.current).toBe(
      screen.getByRole("main"),
    );
  });
});
