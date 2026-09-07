import fs from "node:fs";

const entries = [
  "@assemble-ui/react",
  "@assemble-ui/react/components",
  "@assemble-ui/react/patterns",
  "@assemble-ui/react/templates",
];

for (const entry of entries) {
  try {
    const module = await import(entry);

    if (!module || typeof module !== "object") {
      throw new Error("Invalid module namespace");
    }

    console.log(`✓ ${entry}`);
  } catch (error) {
    console.error(`✗ ${entry}`);
    console.error(error);
    process.exitCode = 1;
  }
}

const stylesPath = "packages/react/dist/styles.css";

if (!fs.existsSync(stylesPath)) {
  console.error(`✗ @assemble-ui/react/styles`);
  console.error(`${stylesPath} does not exist`);
  process.exitCode = 1;
} else {
  const css = fs.readFileSync(stylesPath, "utf8");

  if (!css.trim()) {
    console.error(`✗ @assemble-ui/react/styles`);
    console.error(`${stylesPath} is empty`);
    process.exitCode = 1;
  } else {
    console.log(`✓ @assemble-ui/react/styles`);
    console.log(`✓ styles.css: ${css.length} bytes`);
  }
}
