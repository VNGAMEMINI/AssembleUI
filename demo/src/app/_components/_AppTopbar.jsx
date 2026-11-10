import { formatType } from "../_utils/_appUtils";

export function AppTopbar({ demo, sidebarOpen, setSidebarOpen }) {
  return (
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
  );
}
