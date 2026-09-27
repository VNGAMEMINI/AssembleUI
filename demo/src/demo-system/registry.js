const demoModules = import.meta.glob(
  "../demos/**/*Demo.jsx",
  {
    eager: true,
  },
);

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function createDemoEntry(filePath, module) {
  const match = filePath.match(
    /^\.\.\/demos\/(components|patterns|templates)\/([^/]+)Demo\.jsx$/,
  );

  if (!match) {
    return null;
  }

  const [, type, fileName] = match;
  const name = fileName;

  const componentName = `${name}Demo`;
  const component = module[componentName];

  if (typeof component !== "function") {
    throw new Error(
      `[Demo Registry] ${filePath} must export ${componentName}.`,
    );
  }

  return {
    type,
    name,
    path: `/${type}/${toKebabCase(name)}`,
    title: name,
    component,
  };
}

export function getDemoRegistry() {
  return Object.entries(demoModules)
    .map(([filePath, module]) =>
      createDemoEntry(filePath, module),
    )
    .filter(Boolean)
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type);
      }

      return a.name.localeCompare(b.name);
    });
}

export function getDemoByPath(path) {
  return getDemoRegistry().find(
    (demo) => demo.path === path,
  );
}
