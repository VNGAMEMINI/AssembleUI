import { useEffect, useState } from "react";

import { getDemoRegistry } from "../demo-system/registry";
import { buildDemoNavigation } from "../demo-system/navigation";
import { resolveDemo } from "../demo-system/resolve";

import { AppSidebar } from "./_components/_AppSidebar";
import { AppTopbar } from "./_components/_AppTopbar";
import { DemoPreview } from "./_components/_DemoPreview";
import { DemoDetails } from "./_components/_DemoDetails";
import { formatType, getCurrentPath } from "./_utils/_appUtils";

import "./App.scss";

export function App() {
  const [path, setPath] = useState(getCurrentPath);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const demos = getDemoRegistry();
  const demoNavigation = buildDemoNavigation(demos);
  const demo = resolveDemo(path);
  const DemoComponent = demo.component;

  const importCode = `import { ${demo.name} } from "@vnallmini/react";`;

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="demo-app">
      <AppSidebar
        demos={demos}
        demoNavigation={demoNavigation}
        path={path}
        search={search}
        setSearch={setSearch}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="demo-main">
        <AppTopbar
          demo={demo}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

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

          <DemoPreview
            key={demo.name}
            DemoComponent={DemoComponent}
            importCode={importCode}
          />

          <DemoDetails demo={demo} />
        </div>
      </main>
    </div>
  );
}
