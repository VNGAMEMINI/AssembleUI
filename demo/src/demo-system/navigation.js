const GROUPS = {
  components: "Component",
  patterns: "Pattern",
  templates: "Template",
};

export function buildDemoNavigation(demos) {
  return Object.entries(GROUPS)
    .map(([type, group]) => {
      const items = demos
        .filter((demo) => demo.type === type)
        .map((demo) => ({
          id: demo.path,
          label: demo.title,
          path: `#${demo.path}`,
        }));

      return {
        group,
        items,
      };
    })
    .filter((group) => group.items.length > 0);
}
