# AssembleUI React

AssembleUI is an open-source React UI library for building interfaces
from reusable components, composed patterns, and page templates.

Its public API follows three composition levels:

- **Components** — reusable interface building blocks.
- **Patterns** — composed UI sections that combine interface elements.
- **Templates** — page-level structures assembled from reusable UI.

## Requirements

- React 19
- React DOM 19
- A JavaScript or TypeScript project with npm-compatible package management

## Installation

Install the package and its React peer dependencies:

```bash
npm install @assemble-ui/react react react-dom
```

## Importing the public API

### Import from the root entry

```tsx
import {
  Button,
  UserCard,
  ProfilePageTemplate,
  ThemeProvider,
  useTheme,
} from "@assemble-ui/react";
```

Use names that are exported by the library. The example illustrates
the import structure; check each component's props before using it.

### Import from a specific entry

Import components, patterns, or templates separately when that makes
your application imports easier to organize.

```tsx
import { Button } from "@assemble-ui/react/components";
import { UserCard } from "@assemble-ui/react/patterns";
import { ProfilePageTemplate } from "@assemble-ui/react/templates";
```

The root entry also exports the public theme API:

```tsx
import { ThemeProvider, useTheme } from "@assemble-ui/react";
```

Theme configuration and component props should follow the API
definitions provided by the installed package.

## Styles and themes

Import the compiled component stylesheet once in your application's entry point:

```tsx
import "@assemble-ui/react/styles";
```

The component stylesheet provides the styles used by AssembleUI components.
It does not automatically import theme definitions.

### Theme stylesheets

Import the combined theme stylesheet:

```tsx
import "@assemble-ui/react/themes";
```

Or import only one built-in theme:

```tsx
import "@assemble-ui/react/themes/light";
```

```tsx
import "@assemble-ui/react/themes/dark";
```

The theme stylesheets define CSS custom properties for the corresponding
`data-aui-theme` values.

### ThemeProvider

`ThemeProvider` manages the active theme attribute. It does not import
component or theme stylesheets automatically.

```tsx
import {
  ThemeProvider,
  useTheme,
} from "@assemble-ui/react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Switch theme
    </button>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

By default, `ThemeProvider` uses global scope and applies the theme to
the document root. Set `scope="local"` to apply it to a wrapper around
its children instead.

### Custom theme

The `custom` theme is an extension point. The package provides the
`data-aui-theme="custom"` selector but does not define a complete custom
color palette.

Define the CSS variables your application needs:

```scss
[data-aui-theme="custom"] {
  --aui-theme-bg: #ffffff;
  --aui-theme-fg: #111111;
  --aui-theme-border: #dddddd;
  --aui-theme-primary: #2563eb;
}
```

Then activate it with:

```tsx
<ThemeProvider defaultTheme="custom">
  {children}
</ThemeProvider>
```

### Design tokens and Sass primitives

Import compiled design tokens when you need the library's CSS custom properties:

```tsx
import "@assemble-ui/react/tokens";
```

For advanced Sass customization, use the primitives entry:

```scss
@use "pkg:@assemble-ui/react/primitives" as *;
```

Dart Sass supports the `pkg:` importer through `--pkg-importer=node`.
Most applications only need the compiled component and theme stylesheets.


## Quick start

Import the components you need and the compiled stylesheet.

```tsx
// src/main.tsx
import "@assemble-ui/react/styles";
```

Create a simple profile interface:

```tsx
import { Button, ThemeProvider, UserCard } from "@assemble-ui/react";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <UserCard
        name="Alex Morgan"
        description="Frontend developer"
        badge="Member"
        action={
          <Button
            variant="primary"
            onClick={() => console.log("Profile opened")}
          >
            View profile
          </Button>
        }
      />
    </ThemeProvider>
  );
}
```

`Button` is a reusable component. `UserCard` is a composed pattern. `ThemeProvider` supplies the theme context and applies the active theme to the document.

## Template example

For page-level composition, use `ProfilePageTemplate` and provide a `data` object that follows the exported `ProfilePageData` type.

```tsx
import {
  Button,
  UserCard,
  ProfilePageTemplate,
  ThemeProvider,
} from "@assemble-ui/react";

function ProfileExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div>
        <Button variant="primary" onClick={() => console.log("Button clicked")}>
          Say hello
        </Button>

        <UserCard
          name="Alex Morgan"
          description="Frontend developer"
          badge="Member"
          action={
            <Button
              variant="secondary"
              onClick={() => console.log("Profile opened")}
            >
              View profile
            </Button>
          }
        />

        <ProfilePageTemplate
          data={{
            profile: {
              name: "Alex Morgan",
              description: "Frontend developer",
              badge: "Member",
            },
            stats: [
              { id: "projects", label: "Projects", value: 12 },
              { id: "contributions", label: "Contributions", value: 48 },
            ],
            sections: [
              {
                id: "about",
                title: "About",
                description: "A short introduction.",
                items: [{ id: "role", label: "Role", value: "Developer" }],
              },
            ],
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default ProfileExample;
```

## Public API structure

### Components

The components entry groups exports into these categories:

- Forms
- Data
- Typography
- Layout
- Feedback
- Interaction
- Navigation

Import a component from the root entry or from
`@assemble-ui/react/components`.

### Patterns

The patterns entry currently exports:

- `UserCard`
- `ActionMenu`
- `SearchBar`
- `ProfileHeader`
- `EmptyState`
- `FilterBar`
- `PaginationBar`
- `DataToolbar`
- `ListHeader`
- `FormSection`
- `ContentHeader`
- `StatsOverview`

Import patterns from `@assemble-ui/react/patterns` or the root entry.

### Templates

The templates entry currently exports:

- `ProfilePageTemplate`
- `DashboardPageTemplate`

Import templates from `@assemble-ui/react/templates` or the root entry.

### Theme API

The root entry exports:

- `ThemeProvider`
- `useTheme`
- `Theme`
- `ThemeContextValue`

`Theme` and `ThemeContextValue` are TypeScript types. Refer to their
declarations for the supported theme configuration and context shape.

## TypeScript

TypeScript declarations are included in the published package.
The root, components, patterns, and templates entries provide
declaration files for their public exports.

## Package exports

| Import path | Purpose |
| --- | --- |
| `@assemble-ui/react` | Root public API |
| `@assemble-ui/react/components` | Components |
| `@assemble-ui/react/patterns` | Composed patterns |
| `@assemble-ui/react/templates` | Page templates |
| `@assemble-ui/react/core` | Core runtime exports |
| `@assemble-ui/react/styles` | Compiled component stylesheet |
| `@assemble-ui/react/themes` | Combined theme stylesheet |
| `@assemble-ui/react/themes/light` | Light theme stylesheet |
| `@assemble-ui/react/themes/dark` | Dark theme stylesheet |
| `@assemble-ui/react/tokens` | Compiled design tokens |
| `@assemble-ui/react/primitives` | Sass design primitives |

## Development

The AssembleUI repository contains the library source, tests, and build
configuration. To work on the library itself, clone the repository and
follow its development scripts and project documentation.

## License

MIT. See the `LICENSE` file for details.
