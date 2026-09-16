import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import { FormField, UserCard } from "@assemble-ui/react/patterns";

import "@assemble-ui/react/styles";
import "../styles/main.scss";

function Section({ title, description, children }) {
  return (
    <section className="demo-section">
      <div className="demo-section__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>

      <div className="demo-section__content">{children}</div>
    </section>
  );
}

function App() {
  const [action, setAction] = useState("Chưa thực hiện");

  return (
    <main className="demo-page">
      <div className="demo-shell">
        <header className="demo-header">
          <p className="demo-eyebrow">AssembleUI</p>

          <h1>Pattern Showcase</h1>

          <p>
            Visual and interactive verification of the AssembleUI Pattern
            layer.
          </p>
        </header>

        <div className="demo-grid">
          <Section
            title="FormField"
            description="Reusable field structure for form controls."
          >
            <FormField
              label="Username"
              description="Enter your public username."
              required
            >
              <input placeholder="username" />
            </FormField>

            <FormField
              label="Email"
              error="Please enter a valid email address."
              required
            >
              <input placeholder="name@example.com" />
            </FormField>
          </Section>

          <Section
            title="UserCard"
            description="Composed user presentation pattern."
          >
            <UserCard
              name="Nguyễn Văn A"
              description="Frontend Developer"
              badge="Active"
              actionLabel="View profile"
              onAction={() => setAction("Đã nhấn View profile")}
            />

            <p className="demo-value">
              Action: {action}
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
