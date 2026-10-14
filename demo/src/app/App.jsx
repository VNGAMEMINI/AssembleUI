import { useEffect, useMemo, useState } from "react";

import { useTheme } from "@vnallmini/react";

import { getDemoRegistry } from "../demo-system/registry";

import { buildDemoNavigation } from "../demo-system/navigation";

import { resolveDemo } from "../demo-system/resolve";

import "./App.scss";

function getCurrentPath() {
  const path = window.location.hash.replace(/^#/, "");

  return path || "/components/container";
}

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function App() {
  const [path, setPath] = useState(getCurrentPath);

  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("idle");

  async function handleCopyUsage() {
    try {
      await navigator.clipboard.writeText(importCode);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  const { theme, setTheme } = useTheme();

  const demos = getDemoRegistry();

  const demoNavigation = buildDemoNavigation(demos);

  const filteredNavigation = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return demoNavigation;
    }

    return demoNavigation
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.label.toLowerCase().includes(value),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [demoNavigation, search]);

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const demo = resolveDemo(path);

  const DemoComponent = demo.component;

  const importCode = `import { ${demo.name} } from "@vnallmini/react";`;

  return (
    <div className="demo-app">
      {sidebarOpen && (
        <button
          className="demo-sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`demo-sidebar${sidebarOpen ? " demo-sidebar--open" : ""}`}
      >
        <header className="demo-sidebar-header">
          <a
            className="demo-logo"
            href="#/components/container"
            aria-label="AssembleUI home"
          >
            <span className="demo-logo__symbol">A</span>

            <span className="demo-logo__content">
              <strong>AssembleUI</strong>
              <small>Component Explorer</small>
            </span>
          </a>
        </header>

        <div className="demo-sidebar-body">
          <label className="demo-search" htmlFor="demo-search">
            <span className="demo-search__icon" aria-hidden="true">
              ⌕
            </span>

            <input
              id="demo-search"
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              placeholder="Search demos..."
            />

            <kbd>/</kbd>
          </label>

          <nav className="demo-navigation" aria-label="Demo navigation">
            {filteredNavigation.map((group) => (
              <section className="demo-navigation__group" key={group.group}>
                <h2>{group.group}</h2>

                <div>
                  {group.items.map((item) => {
                    const itemPath = item.path.replace(/^#/, "");

                    const active = path === itemPath;

                    return (
                      <a
                        className={[
                          "demo-navigation__item",
                          active ? "demo-navigation__item--active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        href={item.path}
                        key={item.id}
                        onClick={() => setSidebarOpen(false)}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="demo-navigation__indicator" />

                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </section>
            ))}

            {filteredNavigation.length === 0 && (
              <div className="demo-navigation__empty">No demos found.</div>
            )}
          </nav>
        </div>

        <footer className="demo-sidebar-footer">
          <button
            className="demo-theme"
            type="button"
            onClick={() => {
              setTheme((current) => (current === "light" ? "dark" : "light"));
            }}
            aria-label="Toggle theme"
          >
            <span className="demo-theme__icon">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span className="demo-theme__text">
              <strong>{theme === "light" ? "Light" : "Dark"}</strong>

              <small>Switch appearance</small>
            </span>

            <span className="demo-theme__state">
              {theme === "light" ? "LIGHT" : "DARK"}
            </span>
          </button>

          <div className="demo-sidebar-footer__meta">
            <span>{demos.length} demos</span>

            <span>AssembleUI</span>
          </div>
        </footer>
      </aside>

      <main className="demo-main">
        <header className="demo-topbar">
          <button
            className="demo-mobile-menu"
            type="button"
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <span aria-hidden="true">{sidebarOpen ? "×" : "☰"}</span>
          </button>

          <div className="demo-topbar__path">
            <span>Explorer</span>
            <span>/</span>
            <strong>{formatType(demo.type)}</strong>
            <span>/</span>
            <strong>{demo.title}</strong>
          </div>

          <a
            className="demo-source"
            href="https://github.com/VNGAMEMINI/AssembleUI"
            target="_blank"
            rel="noreferrer"
          >
            <span>GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="demo-page">
          <header className="demo-page-header">
            <div>
              <span className="demo-page-header__eyebrow">
                {formatType(demo.type)}
              </span>

              <h1>{demo.title}</h1>

              <p>
                Interactive example and visual reference for this AssembleUI
                {` ${demo.type}`}.
              </p>
            </div>

            <div className="demo-page-header__badge">
              <span />
              Live
            </div>
          </header>

          <section className="demo-preview-section">
            <div className="demo-section-heading">
              <div>
                <h2>Preview</h2>
                <p>This example is rendered directly from the library.</p>
              </div>
            </div>

            <div className="demo-preview">
              <div className="demo-preview__toolbar">
                <span>Interactive preview</span>

                <button
                  className="demo-copy-button"
                  type="button"
                  onClick={handleCopyUsage}
                  aria-live="polite"
                >
                  {copyStatus === "copied"
                    ? "Copied!"
                    : copyStatus === "error"
                      ? "Copy failed"
                      : "Copy import"}
                </button>
              </div>

              <div className="demo-preview__canvas">
                <DemoComponent />
              </div>
            </div>
          </section>

          <section className="demo-details">
            <div className="demo-detail">
              <span>Category</span>
              <strong>{formatType(demo.type)}</strong>
            </div>

            <div className="demo-detail">
              <span>Element</span>
              <strong>&lt;{demo.name}/&gt;</strong>
            </div>

            <div className="demo-detail">
              <span>Export</span>
              <strong>{demo.name}</strong>
            </div>

            <div className="demo-detail">
              <span>Package</span>
              <strong>@vnallmini/react</strong>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
