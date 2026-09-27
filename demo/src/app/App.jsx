import {
  useEffect,
  useState,
} from "react";

import {
  ActionMenu,
  Container,
} from "@assemble-ui/react";

import {
  ContainerDemo,
} from "../demos/components/ContainerDemo";

import {
  ActionMenuDemo,
} from "../demos/patterns/ActionMenuDemo";

import {
  UserCardDemo,
} from "../demos/patterns/UserCardDemo";

import {
  demoNavigation,
} from "./navigation";

import "./App.scss";

const demos = {
  "/components/container": {
    title: "Container",
    description:
      "Layout component kiểm tra giới hạn chiều rộng và căn giữa.",
    category: "Component",
    component: ContainerDemo,
  },

  "/patterns/action-menu": {
    title: "ActionMenu",
    description:
      "Pattern kiểm tra nhóm link và action.",
    category: "Pattern",
    component: ActionMenuDemo,
  },

  "/patterns/user-card": {
    title: "UserCard",
    description:
      "Pattern kiểm tra thông tin người dùng và action.",
    category: "Pattern",
    component: UserCardDemo,
  },
};

function getCurrentPath() {
  const path = window.location.hash.replace(
    /^#/,
    "",
  );

  return path || "/components/container";
}

export function App() {
  const [path, setPath] = useState(
    getCurrentPath,
  );

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener(
      "hashchange",
      handleHashChange,
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.demoTheme =
      theme;
  }, [theme]);

  const demo = demos[path] ?? demos["/components/container"];

  const DemoComponent = demo.component;

  return (
    <div className="demo-layout">
      <aside className="demo-sidebar">
        <div className="demo-brand">
          <strong>AssembleUI</strong>
          <span>Demo Playground</span>
        </div>

        <ActionMenu
          aria-label="Demo navigation"
          items={[
            {
              type: "action",
              label:
                theme === "light"
                  ? "Dark mode"
                  : "Light mode",
              onClick: () => {
                setTheme((current) =>
                  current === "light"
                    ? "dark"
                    : "light",
                );
              },
            },
          ]}
        />

        <nav
          className="demo-nav"
          aria-label="Demo sections"
        >
          {demoNavigation.map((group) => (
            <div
              className="demo-nav__group"
              key={group.group}
            >
              <div className="demo-nav__title">
                {group.group}
              </div>

              {group.items.map((item) => (
                <a
                  className={[
                    "demo-nav__link",
                    path ===
                      item.path.replace(/^#/, "")
                      ? "demo-nav__link--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href={item.path}
                  key={item.id}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="demo-content">
        <Container size="xl">
          <header className="demo-header">
            <div>
              <span className="demo-header__category">
                {demo.category}
              </span>

              <h1>{demo.title}</h1>

              <p>{demo.description}</p>
            </div>

            <span className="demo-status">
              Demo
            </span>
          </header>

          <section
            className="demo-stage"
            aria-label={`${demo.title} preview`}
          >
            <DemoComponent />
          </section>
        </Container>
      </main>
    </div>
  );
}
