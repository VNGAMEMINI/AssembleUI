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
npm install @vnallmini/react react react-dom
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
} from "@vnallmini/react";
```

Use names that are exported by the library. The example illustrates
the import structure; check each component's props before using it.

### Import from a specific entry

Import components, patterns, or templates separately when that makes
your application imports easier to organize.

```tsx
import { Button } from "@vnallmini/react/components";
import { UserCard } from "@vnallmini/react/patterns";
import {
  ProfilePageTemplate,
} from "@vnallmini/react/templates";
```

The root entry also exports the public theme API:

```tsx
import {
  ThemeProvider,
  useTheme,
} from "@vnallmini/react";
```

Theme configuration and component props should follow the API
definitions provided by the installed package.

## Styles

Import the compiled stylesheet once in your application's entry point.

For example, in a Vite React application:

```tsx
// src/main.tsx
import "@vnallmini/react/styles";
```

The `@vnallmini/react/styles` entry resolves to the package's
compiled stylesheet. Applications do not need to import internal
SCSS files from the library.

## Quick start

This example combines a button, a user card, and a profile page template.

```tsx
import {
  Button,
  UserCard,
  ProfilePageTemplate,
  ThemeProvider,
} from "@vnallmini/react";

function ProfileExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div>
        <Button
          variant="primary"
          onClick={() => console.log("Button clicked")}
        >
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
                items: [
                  { id: "role", label: "Role", value: "Developer" },
                ],
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
`@vnallmini/react/components`.

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

Import patterns from `@vnallmini/react/patterns` or the root entry.

### Templates

The templates entry currently exports:

- `ProfilePageTemplate`
- `DashboardPageTemplate`

Import templates from `@vnallmini/react/templates` or the root entry.

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
| `@vnallmini/react` | Root public API |
| `@vnallmini/react/components` | Components |
| `@vnallmini/react/patterns` | Composed patterns |
| `@vnallmini/react/templates` | Page templates |
| `@vnallmini/react/styles` | Compiled stylesheet |

## Development

The AssembleUI repository contains the library source, tests, and build
configuration. To work on the library itself, clone the repository and
follow its development scripts and project documentation.

## License

MIT. See the `LICENSE` file for details.
