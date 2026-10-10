import { describe, expect, it } from "vitest";

import {
  buildDemoNavigation,
} from "./navigation";

describe("Demo Navigation", () => {
  it("creates navigation groups from registry entries", () => {
    const demos = [
      {
        type: "components",
        name: "Button",
        title: "Button",
        path: "/components/button",
        component: () => null,
      },
      {
        type: "patterns",
        name: "UserCard",
        title: "UserCard",
        path: "/patterns/user-card",
        component: () => null,
      },
      {
        type: "templates",
        name: "ProfilePageTemplate",
        title: "ProfilePageTemplate",
        path: "/templates/profile-page-template",
        component: () => null,
      },
    ];

    const navigation = buildDemoNavigation(demos);

    expect(navigation).toEqual([
      {
        group: "Components",
        items: [
          {
            id: "/components/button",
            label: "Button",
            path: "#/components/button",
          },
        ],
      },
      {
        group: "Patterns",
        items: [
          {
            id: "/patterns/user-card",
            label: "UserCard",
            path: "#/patterns/user-card",
          },
        ],
      },
      {
        group: "Templates",
        items: [
          {
            id: "/templates/profile-page-template",
            label: "ProfilePageTemplate",
            path: "#/templates/profile-page-template",
          },
        ],
      },
    ]);
  });

  it("does not create empty groups", () => {
    const demos = [
      {
        type: "templates",
        name: "ProfilePageTemplate",
        title: "ProfilePageTemplate",
        path: "/templates/profile-page-template",
        component: () => null,
      },
    ];

    const navigation = buildDemoNavigation(demos);

    expect(navigation).toHaveLength(1);
    expect(navigation[0].group).toBe("Templates");
  });
});
