import fs from "node:fs";
import path from "node:path";

const root = path.resolve("packages/react/dist");

if (!fs.existsSync(root)) {
  console.error(`Không tìm thấy thư mục: ${root}`);
  process.exit(1);
}

let updated = 0;
let failed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(file);
      continue;
    }

    if (!file.endsWith(".d.ts")) continue;

    const original = fs.readFileSync(file, "utf8");

    const result = original.replace(
      /((?:from\s*|import\s*\()\s*["'])(\.{1,2}\/[^"']+)(["'])/g,
      (match, prefix, specifier, suffix) => {
        if (/\.(?:js|mjs|cjs|json|node)$/.test(specifier)) return match;

        const base = path.resolve(path.dirname(file), specifier);
        const fileTarget = `${base}.d.ts`;
        const indexTarget = path.join(base, "index.d.ts");

        if (fs.existsSync(fileTarget)) {
          return `${prefix}${specifier}.js${suffix}`;
        }

        if (fs.existsSync(indexTarget)) {
          return `${prefix}${specifier}/index.js${suffix}`;
        }

        failed++;
        console.error(`Không xác định được đích: ${file} -> ${specifier}`);
        return match;
      },
    );

    if (result !== original) {
      fs.writeFileSync(file, result);
      updated++;
    }
  }
}

walk(root);

if (failed > 0) {
  console.error(`Thất bại: ${failed} đường dẫn.`);
  process.exit(1);
}

console.log(`Đã chuẩn hóa ${updated} file declaration.`);
