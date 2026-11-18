import { Marquee } from "@assemble-ui/react";

const items = [
  "React",
  "TypeScript",
  "JavaScript",
  "Vite",
  "Sass",
  "Node.js",
];

const sectionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--aui-token-space-3)",
};

const previewStyle = {
  width: "100%",
  overflow: "hidden",
  border: "1px solid var(--aui-theme-border)",
  borderRadius: "var(--aui-token-radius-lg)",
  padding: "var(--aui-token-space-4)",
};

const itemStyle = {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  padding: "var(--aui-token-space-3) var(--aui-token-space-5)",
  border: "1px solid var(--aui-theme-border)",
  borderRadius: "var(--aui-token-radius-full)",
  background: "var(--aui-theme-surface)",
  color: "var(--aui-theme-text)",
  fontWeight: 600,
};

function Items() {
  return items.map((item) => (
    <span key={item} style={itemStyle}>
      {item}
    </span>
  ));
}

function Section({ title, children }) {
  return (
    <section style={sectionStyle}>
      <h2
        style={{
          margin: 0,
          fontSize: "var(--aui-token-font-size-lg)",
          fontWeight: 600,
        }}
      >
        {title}
      </h2>

      <div style={previewStyle}>
        {children}
      </div>
    </section>
  );
}

export function MarqueeDemo() {
  return (
    <div
      className="demo-preview"
      data-demo-full
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--aui-token-space-6)",
      }}
    >
      <Section title="Basic">
        <Marquee speed={30} gap={20}>
          <Items />
        </Marquee>
      </Section>

      <Section title="Direction & Pause">
        <Marquee
          direction="right"
          speed={45}
          gap={16}
          pauseOnHover
        >
          <Items />
        </Marquee>
      </Section>
    </div>
  );
}
