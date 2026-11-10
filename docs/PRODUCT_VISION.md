# AssembleUI Product Vision

## 1. Mission

AssembleUI is an open-source React UI library for building reusable,
composable, maintainable, and resource-efficient interfaces.

It provides a shared UI foundation that can be integrated into multiple
independent products.

## 2. Product Boundaries

### 2.1 AssembleUI

AssembleUI owns the reusable UI layer:

- Components: fundamental interface building blocks.
- Patterns: reusable compositions of components.
- Templates: page-level compositions built from lower layers.
- Design tokens, themes, Sass styles, and accessibility.
- UI utilities, public APIs, and documentation.
- Package distribution and compatibility.

The dependency direction is:

Component -> Pattern -> Template

Higher layers may depend on lower layers. Lower layers must not depend
on higher layers.

AssembleUI must not require API-AssembleUI to install, build, or run.

### 2.2 API-AssembleUI

API-AssembleUI is a separate commercial product for e-commerce services.

It owns its own:

- Business logic and service APIs.
- Authentication and authorization.
- Data models, storage, and retention policies.
- Deployment, configuration, and security controls.
- Commercial features and product-specific integrations.

API-AssembleUI may use AssembleUI for its frontend. Neither product
must require the other unless an explicit integration is configured.

Changes to API-AssembleUI should not require an AssembleUI release
unless a public UI API or compatibility change is necessary.

## 3. Installation Experience

The supported package installation is:

    npm install @vnallmini/react

Example:

    import { Button } from "@vnallmini/react";
    import "@vnallmini/react/styles";

    export function Example() {
      return <Button variant="primary">Continue</Button>;
    }

A future CLI may support adding individual components to a project.
Commands such as `npx assembleui add button` are planned only until
the CLI is implemented, tested, and documented.

The installation workflow should clearly explain dependencies,
styling, updates, and how user modifications are preserved.

## 4. Performance Principles

- Keep runtime dependencies minimal.
- Prefer explicit, modular, tree-shakeable public exports.
- Keep component dependencies predictable.
- Compile Sass during the build rather than requiring consumers to
  compile library source files.
- Measure bundle size and runtime costs before making performance claims.
- Avoid unnecessary work during rendering.

## 5. Data and Security Principles

- Do not transmit user data to external services by default.
- Do not add hidden telemetry.
- Make network access and integrations explicit.
- Never place private API credentials in frontend code.
- Enforce authentication, authorization, and input validation on the
  server in API-AssembleUI.
- Document data collection, storage, and retention where applicable.

A UI library cannot guarantee the security of the application that uses it.
Security also depends on the consuming application and its backend.

## 6. Open Source and Licensing

The intended license for AssembleUI is MIT, subject to verifying that
the project has the rights to distribute all included code and assets.

The MIT license permits commercial use and redistribution subject to
its terms. Do not promise that MIT-licensed code cannot be redistributed.

API-AssembleUI has a separate product and licensing policy. Its terms
must respect the licenses of AssembleUI and all other dependencies.

## 7. Release Requirements

Before publishing a release:

- TypeScript checks, automated tests, and builds pass.
- Package entry points, declarations, and styles resolve correctly.
- A clean consumer project can install and import the package.
- README, license files, and package metadata agree.
- Package contents are reviewed using `npm pack --dry-run`.
- Performance and security claims are supported by actual checks.
- Breaking changes and compatibility requirements are documented.

## 8. Non-Goals

AssembleUI is not:

- An e-commerce backend.
- An authentication server.
- A database or user-data storage service.
- A mandatory cloud service.
- A product that requires API-AssembleUI to function.
