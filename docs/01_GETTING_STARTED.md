# 01. Getting Started

> Hướng dẫn cài đặt, cấu hình và sử dụng AssembleUI trong dự án React.

---

# Yêu cầu hệ thống

Khuyến nghị sử dụng phiên bản mới nhất của các công cụ sau.

| Software | Version              |
| -------- | -------------------- |
| Node.js  | >= 20                |
| npm      | >= 10                |
| pnpm     | >= 9 _(Khuyến nghị)_ |
| React    | >= 19                |
| Vite     | >= 6                 |

---

# Cài đặt

Sử dụng npm

```bash
npm install @assembleui/react
```

Hoặc

```bash
pnpm add @assembleui/react
```

Hoặc

```bash
yarn add @assembleui/react
```

---

# Import Style

AssembleUI chỉ cần import **một lần** trong file gốc của ứng dụng.

Ví dụ:

```jsx
// main.jsx

import "@assembleui/react/styles";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

> Không import file `.scss` trong từng Component.

---

# Sử dụng Component

Ví dụ

```jsx
import { Button } from "@assembleui/react";

export default function App() {
  return <Button>Hello AssembleUI</Button>;
}
```

---

# Sử dụng nhiều Component

```jsx
import { Button, Input, Card } from "@assembleui/react";

export default function App() {
  return (
    <Card>
      <Input placeholder="Username" />

      <Button>Login</Button>
    </Card>
  );
}
```

---

# Cấu trúc hoạt động

```
Application

↓

main.jsx

↓

@assembleui/react/styles

↓

Theme

↓

Components

↓

Browser
```

---

# Theme

Mặc định AssembleUI sử dụng Theme mặc định.

```jsx
import "@assembleui/react/styles";
```

Sau này có thể chuyển Theme.

Ví dụ

```jsx
import "@assembleui/react/themes/dark";
```

Hoặc

```jsx
import "@assembleui/react/themes/light";
```

Theme chỉ thay đổi Design Tokens.

Không thay đổi Component.

---

# Tùy chỉnh Design Tokens

Người dùng có thể ghi đè CSS Variables.

```css
:root {
  --aui-color-primary: #2563eb;

  --aui-radius-md: 10px;

  --aui-space-md: 20px;
}
```

Toàn bộ Component sẽ tự động cập nhật giao diện.

Không cần sửa Component.

---

# Tree Shaking

AssembleUI hỗ trợ Tree Shaking.

Chỉ Component được import mới được đưa vào Bundle.

Ví dụ

```jsx
import { Button } from "@assembleui/react";
```

Bundle sẽ không chứa

- Table
- Modal
- Carousel
- Timeline

nếu chúng không được sử dụng.

---

# Cấu trúc dự án

Ví dụ với Vite

```
my-app/

src/
│
├── assets/
│
├── pages/
│
├── App.jsx
│
├── main.jsx
│
└── index.css

package.json
```

---

# Ví dụ hoàn chỉnh

```jsx
import "@assembleui/react/styles";

import { Button, Card, Input } from "@assembleui/react";

export default function App() {
  return (
    <Card>
      <Input placeholder="Email" />

      <Button>Login</Button>
    </Card>
  );
}
```

---

# Cách AssembleUI hoạt động

```
Import Styles

↓

Foundation

↓

Design Tokens

↓

Theme

↓

Style Engine

↓

Components

↓

Render
```

Styles chỉ được import **một lần**.

Component không tự import CSS.

Điều này giúp:

- Bundle nhỏ hơn.
- Không bị import trùng.
- Không phát sinh xung đột Style.
- Dễ ghi đè Design Tokens.

---

# Nguyên tắc sử dụng

## Nên

✔ Import `@assembleui/react/styles` một lần trong `main.jsx`.

✔ Sử dụng Component thông qua package chính.

✔ Tùy chỉnh giao diện bằng Design Tokens.

✔ Kết hợp nhiều Component để tạo Pattern.

✔ Kết hợp nhiều Pattern để tạo Template.

---

## Không nên

✘ Import CSS trong từng Component.

✘ Chỉnh sửa trực tiếp mã nguồn của Component.

✘ Hardcode màu sắc hoặc khoảng cách trong dự án.

✘ Ghi đè Style bằng `!important` nếu có thể sử dụng Design Tokens.

---

# Tiếp theo

Sau khi hoàn tất cài đặt, hãy tìm hiểu kiến trúc của AssembleUI trong:

**02_ARCHITECTURE.md**

Tài liệu này giải thích toàn bộ các tầng của hệ thống, mối quan hệ giữa Foundation, Design System, Style Engine, Core, Components, Patterns và Templates.

# 01. Getting Started

> Hướng dẫn cài đặt, cấu hình và sử dụng AssembleUI trong dự án React.

---

# Yêu cầu hệ thống

Khuyến nghị sử dụng phiên bản mới nhất của các công cụ sau.

| Software | Version              |
| -------- | -------------------- |
| Node.js  | >= 20                |
| npm      | >= 10                |
| pnpm     | >= 9 _(Khuyến nghị)_ |
| React    | >= 19                |
| Vite     | >= 6                 |

---

# Cài đặt

Sử dụng npm

```bash
npm install @assembleui/react
```

Hoặc

```bash
pnpm add @assembleui/react
```

Hoặc

```bash
yarn add @assembleui/react
```

---

# Import Style

AssembleUI chỉ cần import **một lần** trong file gốc của ứng dụng.

Ví dụ:

```jsx
// main.jsx

import "@assembleui/react/styles";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

> Không import file `.scss` trong từng Component.

---

# Sử dụng Component

Ví dụ

```jsx
import { Button } from "@assembleui/react";

export default function App() {
  return <Button>Hello AssembleUI</Button>;
}
```

---

# Sử dụng nhiều Component

```jsx
import { Button, Input, Card } from "@assembleui/react";

export default function App() {
  return (
    <Card>
      <Input placeholder="Username" />

      <Button>Login</Button>
    </Card>
  );
}
```

---

# Cấu trúc hoạt động

```
Application

↓

main.jsx

↓

@assembleui/react/styles

↓

Theme

↓

Components

↓

Browser
```

---

# Theme

Mặc định AssembleUI sử dụng Theme mặc định.

```jsx
import "@assembleui/react/styles";
```

Sau này có thể chuyển Theme.

Ví dụ

```jsx
import "@assembleui/react/themes/dark";
```

Hoặc

```jsx
import "@assembleui/react/themes/light";
```

Theme chỉ thay đổi Design Tokens.

Không thay đổi Component.

---

# Tùy chỉnh Design Tokens

Người dùng có thể ghi đè CSS Variables.

```css
:root {
  --aui-color-primary: #2563eb;

  --aui-radius-md: 10px;

  --aui-space-md: 20px;
}
```

Toàn bộ Component sẽ tự động cập nhật giao diện.

Không cần sửa Component.

---

# Tree Shaking

AssembleUI hỗ trợ Tree Shaking.

Chỉ Component được import mới được đưa vào Bundle.

Ví dụ

```jsx
import { Button } from "@assembleui/react";
```

Bundle sẽ không chứa

- Table
- Modal
- Carousel
- Timeline

nếu chúng không được sử dụng.

---

# Cấu trúc dự án

Ví dụ với Vite

```
my-app/

src/
│
├── assets/
│
├── pages/
│
├── App.jsx
│
├── main.jsx
│
└── index.css

package.json
```

---

# Ví dụ hoàn chỉnh

```jsx
import "@assembleui/react/styles";

import { Button, Card, Input } from "@assembleui/react";

export default function App() {
  return (
    <Card>
      <Input placeholder="Email" />

      <Button>Login</Button>
    </Card>
  );
}
```

---

# Cách AssembleUI hoạt động

```
Import Styles

↓

Foundation

↓

Design Tokens

↓

Theme

↓

Style Engine

↓

Components

↓

Render
```

Styles chỉ được import **một lần**.

Component không tự import CSS.

Điều này giúp:

- Bundle nhỏ hơn.
- Không bị import trùng.
- Không phát sinh xung đột Style.
- Dễ ghi đè Design Tokens.

---

# Nguyên tắc sử dụng

## Nên

✔ Import `@assembleui/react/styles` một lần trong `main.jsx`.

✔ Sử dụng Component thông qua package chính.

✔ Tùy chỉnh giao diện bằng Design Tokens.

✔ Kết hợp nhiều Component để tạo Pattern.

✔ Kết hợp nhiều Pattern để tạo Template.

---

## Không nên

✘ Import CSS trong từng Component.

✘ Chỉnh sửa trực tiếp mã nguồn của Component.

✘ Hardcode màu sắc hoặc khoảng cách trong dự án.

✘ Ghi đè Style bằng `!important` nếu có thể sử dụng Design Tokens.

---

# Tiếp theo

Sau khi hoàn tất cài đặt, hãy tìm hiểu kiến trúc của AssembleUI trong:

**02_ARCHITECTURE.md**

Tài liệu này giải thích toàn bộ các tầng của hệ thống, mối quan hệ giữa Foundation, Design System, Style Engine, Core, Components, Patterns và Templates.
