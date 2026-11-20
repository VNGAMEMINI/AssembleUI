# 08. Themes

Theme là hệ thống cung cấp các giá trị giao diện phụ thuộc vào chế độ hiển thị
đang hoạt động của AssembleUI.

Theme sử dụng CSS Custom Properties với namespace `--aui-theme-*`, tách biệt
hoàn toàn với Design Tokens có namespace `--aui-token-*`.

Theme switching chỉ thay đổi Theme roles. Nó không thay đổi, ghi đè hoặc
ánh xạ lại Design Tokens.

---

## 1. Mục tiêu

Themes chịu trách nhiệm:

- Cung cấp các giá trị giao diện cho Light Theme và Dark Theme.
- Cho phép thay đổi giao diện trong thời gian chạy.
- Hỗ trợ tùy chỉnh Theme theo thương hiệu.
- Hỗ trợ White Label thông qua Theme roles.
- Giữ nguyên Component API và Business Logic khi chuyển Theme.
- Tách các giá trị giao diện phụ thuộc Theme khỏi Design Tokens.

Themes không chịu trách nhiệm:

- Định nghĩa hoặc thay đổi Design Tokens.
- Chứa React Components, Hooks hoặc Business Logic.
- Quy định cấu trúc và hành vi của Components.
- Định nghĩa CSS layout cho Components.

---

## 2. Vị trí trong kiến trúc

```text
Foundation
    |
    v
Design System
    |
    +--------------------+
    |                    |
    v                    v
Design Tokens          Themes
    |                    |
    +----------+---------+
               |
               v
          Style Engine
               |
               v
          Components
               |
               v
            Patterns
               |
               v
           Templates
```

Design Tokens và Themes là hai hệ thống độc lập trong Design System.

- Design Tokens cung cấp các giá trị thiết kế mặc định ổn định.
- Themes cung cấp các giá trị giao diện thay đổi theo Theme đang hoạt động.
- Style Engine và các tầng UI phía trên có thể sử dụng cả hai hệ thống.

Hai hệ thống không phụ thuộc hoặc ánh xạ giá trị cho nhau.

## 3. Namespace

### Design Tokens

Design Tokens sử dụng namespace:

```scss
--aui-token-\*
```

Đây là các giá trị thiết kế mặc định của thư viện.

Theme switching không được thay đổi các giá trị này.

### Theme roles

Themes sử dụng namespace:

```scss
--aui-theme-\*
```

Đây là các giá trị giao diện có thể thay đổi giữa Light, Dark và Custom Theme.

Ví dụ:

```scss
background: var(--aui-theme-bg);
color: var(--aui-theme-text);
border-color: var(--aui-theme-border);
```

Component có thể sử dụng Theme roles cho những thuộc tính cần thay đổi theo Theme.

## 4. Cấu trúc thư mục

Cấu trúc hiện tại trong `packages/react/design/themes/`:

```
themes/
├── index.scss
├── custom/
│ └── index.scss
├── dark/
│ ├── alert.scss
│ ├── background.scss
│ ├── border.scss
│ ├── chart.scss
│ ├── index.scss
│ ├── interact.scss
│ ├── selection-area.scss
│ ├── shadow.scss
│ └── text.scss
└── light/
├── alert.scss
├── background.scss
├── border.scss
├── chart.scss
├── index.scss
├── interact.scss
├── selection-area.scss
├── shadow.scss
└── text.scss
```

`themes/index.scss` tổng hợp các Theme:

```scss
@forward "./light";
@forward "./dark";
@forward "./custom";
```

Theme stylesheets được build và export riêng, không được nạp thông qua
`design/index.scss`.

## 5. Theme roles

Các Theme roles được tổ chức theo nhóm thuộc tính giao diện.

| Nhóm       | Vai trò                                |
| ---------- | -------------------------------------- |
| Alert      | Màu sắc và trạng thái của Alert        |
| Background | Background, Surface và Foreground      |
| Border     | Border, Divider và các đường phân cách |
| Chart      | Màu sắc dành cho biểu đồ               |
| Interact   | Hover, Active, Selected và Input       |
| Selection  | Area Selection và Scrollbar            |
| Shadow     | Shadow theo từng cấp độ                |
| Text       | Text, Placeholder, Link và Code        |

Các nhóm này cung cấp giá trị giao diện dùng chung. Chúng không định nghĩa
cấu trúc hoặc layout của Components.

## 6. Light Theme và Dark Theme

AssembleUI cung cấp hai Theme được định nghĩa sẵn:

- Light Theme: giao diện sáng.
- Dark Theme: giao diện tối.

Mỗi Theme cung cấp các giá trị cho cùng hệ thống Theme roles.

Ví dụ sử dụng:

```scss
.example {
  background: var(--aui-theme-bg);
  color: var(--aui-theme-text);
  border: 1px solid var(--aui-theme-border);
}
```

Component sử dụng cùng một Theme role. Giá trị hiển thị phụ thuộc vào Theme
được áp dụng tại thời điểm render.

## 7. Custom Theme

Custom Theme là điểm mở rộng để người dùng định nghĩa các Theme roles riêng.

File `themes/custom/index.scss` cung cấp selector:

```scss
[data-aui-theme="custom"] {
  // Custom Theme roles
}
```

Người dùng có thể định nghĩa các giá trị cần thiết:

```scss
[data-aui-theme="custom"] {
  --aui-theme-bg: #ffffff;
  --aui-theme-text: #172033;
  --aui-theme-border: #d8deea;
  --aui-theme-primary: #2563eb;
}
```

Đây là ví dụ về cách mở rộng Theme roles. Người dùng chỉ cần định nghĩa
những roles mà giao diện của họ cần tùy chỉnh.

Custom Theme không được ghi đè hoặc ánh xạ sang `--aui-token-\*`.

## 8. Theme Provider

`ThemeProvider` quản lý Theme state và áp dụng Theme thông qua thuộc tính
`data-aui-theme`.

Props hiện tại:

| Prop           | Type                  | Default    | Mô tả                       |
| -------------- | --------------------- | ---------- | --------------------------- |
| `defaultTheme` | `Theme`               | `"light"`  | Theme ban đầu               |
| `scope`        | `"global" \| "local"` | `"global"` | Phạm vi áp dụng Theme       |
| `children`     | `ReactNode`           | -          | Nội dung bên trong Provider |

Theme type:

```ts
type Theme = "light" | "dark" | "custom";
```

### Global scope

Mặc định, `ThemeProvider` sử dụng global scope.

Theme được áp dụng lên phần tử `document.documentElement` thông qua
`data-aui-theme`.

```tsx
<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>
```

Khi Provider bị tháo khỏi cây React, thuộc tính Theme trước đó của document
được khôi phục.

### Local scope

Local scope áp dụng Theme lên một wrapper element thay vì document root.

```tsx
<ThemeProvider defaultTheme="dark" scope="local">
  <App />
</ThemeProvider>
```

Phạm vi CSS của Theme được giới hạn theo phần tử wrapper và các phần tử con
của nó.

## 9. Runtime Theme Switching

Có thể thay đổi Theme trong thời gian chạy thông qua `useTheme`.

Hook trả về:

- `theme`: Theme hiện tại.
- `setTheme`: Hàm cập nhật Theme.

Ví dụ:

```tsx
import { useTheme } from "@assemble-ui/react";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      Current theme: {theme}
    </button>
  );
}
```

`useTheme` phải được sử dụng bên trong `ThemeProvider`.

ThemeProvider quản lý state và thuộc tính `data-aui-theme`. Việc cập nhật
React state vẫn tuân theo cơ chế render thông thường của React.

## 10. Import Theme

Theme stylesheets được export độc lập với component styles.

### Import toàn bộ Themes

```ts
import "@assemble-ui/react/themes";
```

### Import riêng Light Theme

```ts
import "@assemble-ui/react/themes/light";
```

### Import riêng Dark Theme

```ts
import "@assemble-ui/react/themes/dark";
```

### Import Component styles

```ts
import "@assemble-ui/react/styles";
```

ThemeProvider chỉ quản lý Theme state và thuộc tính `data-aui-theme`.
Provider không tự động import stylesheet.

Ứng dụng cần import stylesheet tương ứng để các Theme roles có hiệu lực.

## 11. White Label và Brand Customization

White Label được thực hiện bằng cách tùy chỉnh Theme roles.

Các thương hiệu có thể sử dụng chung Components, Patterns và Templates
nhưng cung cấp các giá trị Theme khác nhau.

Ví dụ, mỗi thương hiệu có thể định nghĩa:

- Primary và các màu trạng thái.
- Background và Surface.
- Text và Border.
- Shadow và các giá trị giao diện khác đã được hỗ trợ bởi Theme roles.

Việc tùy chỉnh chỉ tác động đến các Theme roles được định nghĩa.
Không thay đổi Design Tokens hoặc Component API.

## 12. Quy tắc kiến trúc

### Tách biệt Tokens và Themes

Đúng:

```scss
.component {
  padding: var(--aui-token-space-4);
  background: var(--aui-theme-bg);
}
```

Không được ánh xạ Theme roles sang Design Tokens:

```scss
// Không sử dụng cách ánh xạ này.
:root {
  --aui-token-color-primary: var(--aui-theme-primary);
}
```

### Không định nghĩa Component layout trong Theme

Theme không chịu trách nhiệm định nghĩa:

- Display và Position.
- Width và Height của Component.
- Padding và Margin của Component.
- Cấu trúc layout.
- Component behavior.

Các trách nhiệm này thuộc các tầng Style Engine và Component tương ứng.

### Không chứa React hoặc Business Logic

Theme chỉ cung cấp các giá trị giao diện thông qua CSS Custom Properties.

Không đặt JSX, React Hooks, Utility hoặc Business Logic trong Theme.

### Không phụ thuộc Theme trong Design Tokens

Design Tokens phải giữ nguyên giá trị mặc định và không được phụ thuộc vào
Theme đang hoạt động.

## 13. Tóm tắt

Themes cung cấp các giá trị giao diện có thể thay đổi theo chế độ hiển thị
của ứng dụng.

- Design Tokens là các giá trị mặc định ổn định.
- Themes là hệ thống Theme roles độc lập.
- Theme switching thay đổi `--aui-theme-\*`.
- Theme switching không thay đổi `--aui-token-\*`.
- ThemeProvider quản lý Theme state và phạm vi áp dụng.
- Components, Patterns và Templates có thể sử dụng Theme roles mà không
  cần thay đổi API hoặc Business Logic.
