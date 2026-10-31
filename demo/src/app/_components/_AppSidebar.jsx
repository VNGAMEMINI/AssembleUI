import { useMemo } from "react";
import { useTheme } from "@vnallmini/react";

export function AppSidebar({
  demos,
  demoNavigation,
  path,
  search,
  setSearch,
  sidebarOpen,
  setSidebarOpen,
}) {
  const { theme, setTheme } = useTheme();

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

  return (
    <>
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
              onChange={(event) => setSearch(event.target.value)}
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
            onClick={() =>
              setTheme((current) => (current === "light" ? "dark" : "light"))
            }
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
    </>
  );
}
