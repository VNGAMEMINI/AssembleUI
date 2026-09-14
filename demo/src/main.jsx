import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Input,
  Radio,
  Select,
  Switch,
  Textarea,
} from "@assemble-ui/react";

import "@assemble-ui/react/styles";

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
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState("one");
  const [radio, setRadio] = useState("first");
  const [switched, setSwitched] = useState(false);
  const [text, setText] = useState("");

  return (
    <main className="demo-page">
      <header className="demo-header">
        <p className="demo-eyebrow">AssembleUI</p>
        <h1>Component Showcase</h1>
        <p>
          Visual and interactive verification of the AssembleUI component layer.
        </p>
      </header>

      <div className="demo-grid">
        <Section title="Avatar" description="Basic identity representation.">
          <div className="demo-row">
            <Avatar />
            <Avatar />
            <Avatar />
          </div>
        </Section>

        <Section title="Badge" description="Compact status and metadata.">
          <div className="demo-row">
            <Badge>Default</Badge>
            <Badge>New</Badge>
            <Badge>Active</Badge>
          </div>
        </Section>

        <Section title="Button" description="Interactive action control.">
          <div className="demo-row">
            <Button>Primary action</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section
          title="Chip"
          description="Compact selectable or removable item."
        >
          <div className="demo-row">
            <Chip>React</Chip>
            <Chip>AssembleUI</Chip>
          </div>
        </Section>

        <Section title="Input" description="Text input and controlled value.">
          <Input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type something..."
          />

          <p className="demo-value">Value: {text || "empty"}</p>
        </Section>

        <Section title="Textarea" description="Multiline text input.">
          <Textarea placeholder="Write a message..." />
        </Section>

        <Section title="Checkbox" description="Controlled selection state.">
          <Checkbox
            label="Accept option"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />

          <p className="demo-value">
            State: {checked ? "checked" : "unchecked"}
          </p>
        </Section>

        <Section title="Radio" description="Single selection from a group.">
          <div className="demo-stack">
            <Radio
              label="First"
              name="demo-radio"
              value="first"
              checked={radio === "first"}
              onChange={(event) => setRadio(event.target.value)}
            />

            <Radio
              label="Second"
              name="demo-radio"
              value="second"
              checked={radio === "second"}
              onChange={(event) => setRadio(event.target.value)}
            />
          </div>

          <p className="demo-value">Selected: {radio}</p>
        </Section>

        <Section title="Select" description="Controlled option selection.">
          <Select
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            <option value="one">Option one</option>
            <option value="two">Option two</option>
            <option value="three">Option three</option>
          </Select>

          <p className="demo-value">Selected: {selected}</p>
        </Section>

        <Section title="Switch" description="Boolean state control.">
          <Switch
            label="Enable feature"
            checked={switched}
            onChange={(event) => setSwitched(event.target.checked)}
          />

          <p className="demo-value">State: {switched ? "on" : "off"}</p>
        </Section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
