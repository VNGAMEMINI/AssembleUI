# 12. Build & Distribution

> Build là quá trình biên dịch AssembleUI thành một thư viện có thể cài đặt, import và sử dụng trong các dự án React. Mục tiêu của quá trình Build là tạo ra **bundle nhỏ, tối ưu, hỗ trợ Tree Shaking và dễ mở rộng**.

---

# Mục tiêu

Hệ thống Build của AssembleUI phải đảm bảo:

- Bundle nhỏ.
- Tree Shaking.
- ES Modules.
- TypeScript Declaration.
- CSS tối ưu.
- Source Map.
- Production Ready.
- Dễ Publish lên npm.

---

# Vai trò trong kiến trúc

```
Source Code

↓

Build

↓

Distribution

↓

npm

↓

Application
```

Build là cầu nối giữa mã nguồn và người sử dụng.

---

# Cấu trúc Build

```
packages/

react/

↓

Source

↓

Build

↓

dist/

├── index.js
├── index.mjs
├── index.d.ts
├── styles.css
├── themes/
└── components/
```

Sau khi Build chỉ còn các file cần thiết.

---

# Build Pipeline

```
TypeScript

↓

React

↓

SCSS

↓

Bundler

↓

Optimization

↓

Output
```

---

# Source

```
packages/

react/

foundation/

design-system/

styles/

core/

components/

patterns/

templates/
```

Đây là toàn bộ mã nguồn.

---

# Output

Sau khi Build

```
dist/

├── index.js
├── index.mjs
├── index.d.ts
├── styles.css
├── themes/
├── components/
├── patterns/
└── templates/
```

Người dùng chỉ sử dụng thư mục `dist`.

---

# Module Format

AssembleUI hỗ trợ

```
ES Module

CommonJS

TypeScript
```

Ví dụ

```
index.js

↓

CommonJS
```

```
index.mjs

↓

ES Module
```

```
index.d.ts

↓

Type Definition
```

---

# Tree Shaking

Mỗi Component được Build độc lập.

Ví dụ

```
Button

↓

dist/components/Button
```

```
Input

↓

dist/components/Input
```

Nếu người dùng chỉ import Button

```tsx
import {

Button

} from "@assembleui/react";
```

Bundle sẽ không chứa Input.

---

# CSS Build

Toàn bộ SCSS sẽ được Build thành CSS.

```
foundation/

↓

design-system/

↓

styles/

↓

components/

↓

styles.css
```

Người dùng chỉ cần

```tsx
import "@assembleui/react/styles";
```

Không cần import CSS của từng Component.

---

# Theme Build

Mỗi Theme được Build riêng.

Ví dụ

```
themes/

↓

light.css

dark.css

corporate.css
```

Người dùng có thể import

```tsx
import "@assembleui/react/themes/dark";
```

---

# TypeScript

Toàn bộ Type Definition sẽ được sinh tự động.

Ví dụ

```
Button.tsx

↓

Button.d.ts
```

IDE sẽ tự động hỗ trợ

- Auto Complete
- IntelliSense
- Type Checking

---

# Source Map

Build nên tạo Source Map.

Ví dụ

```
styles.css.map

index.js.map
```

Giúp Debug dễ dàng.

---

# Minification

Build Production sẽ:

- Xóa Comment.
- Rút gọn tên.
- Loại bỏ Dead Code.
- Tối ưu Bundle.

---

# Side Effects

Package cần khai báo

```json
{
  "sideEffects": [
    "*.css"
  ]
}
```

Điều này giúp Bundler loại bỏ mã không sử dụng nhưng vẫn giữ CSS cần thiết.

---

# Package Exports

Nên định nghĩa rõ các Entry Point.

Ví dụ

```json
{
  "exports": {

    ".": "./dist/index.js",

    "./styles": "./dist/styles.css",

    "./themes/dark": "./dist/themes/dark.css",

    "./themes/light": "./dist/themes/light.css"

  }
}
```

Điều này giúp import rõ ràng và hỗ trợ Tree Shaking tốt hơn.

---

# Quy trình Publish

```
Source

↓

Test

↓

Build

↓

Type Check

↓

Lint

↓

Version

↓

Publish npm
```

Chỉ Publish sau khi toàn bộ bước đều thành công.

---

# Phiên bản

AssembleUI sử dụng Semantic Versioning.

```
MAJOR.MINOR.PATCH
```

Ví dụ

```
1.0.0

↓

1.1.0

↓

1.1.1

↓

2.0.0
```

---

# Build Checklist

Trước khi Publish cần kiểm tra:

- TypeScript không lỗi.
- Test thành công.
- Lint thành công.
- Build thành công.
- Tree Shaking hoạt động.
- CSS được tạo.
- Type Definition được tạo.
- Source Map được tạo.
- Không có Warning nghiêm trọng.

---

# Build Tools

Khuyến nghị

```
Vite

Rollup

TypeScript

Sass

PostCSS
```

Những công cụ này giúp Build nhanh, Bundle nhỏ và tương thích tốt với hệ sinh thái React.

---

# Best Practices

✔ Build chỉ sinh các file cần thiết.

✔ Mỗi Component có thể Tree Shake.

✔ Chỉ import một file styles.

✔ Theme Build riêng.

✔ Tự động sinh Type Definition.

✔ Có Source Map.

✔ Có Minification.

✔ Có Semantic Versioning.

✔ Có CI/CD tự động.

---

# Tóm tắt

Build là bước chuyển đổi mã nguồn của AssembleUI thành một thư viện sẵn sàng phân phối.

```
Source

↓

Build

↓

Optimize

↓

dist/

↓

npm

↓

Application
```

Một hệ thống Build tốt giúp AssembleUI có bundle nhỏ, hỗ trợ Tree Shaking, tương thích với nhiều công cụ build hiện đại và mang lại trải nghiệm phát triển ổn định cho người sử dụng.
