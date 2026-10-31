# 04. Design System

> Design System là nguồn dữ liệu trung tâm của AssembleUI. Nó định nghĩa toàn bộ ngôn ngữ thiết kế thông qua **Design Tokens**, **Themes** và **Icons**, giúp mọi Component luôn nhất quán và dễ dàng tùy biến.

---

# Mục tiêu

Design System chịu trách nhiệm:

- Định nghĩa toàn bộ giá trị giao diện.
- Đảm bảo tính nhất quán của UI.
- Cho phép thay đổi Theme mà không sửa Component.
- Tách biệt dữ liệu thiết kế khỏi logic và CSS.
- Hỗ trợ mở rộng lâu dài.

Design System **không chứa**:

- React Component
- Hook
- Utility
- Business Logic
- CSS của Component

---

# Vai trò trong kiến trúc

```
Foundation
      │
      ▼
Design System
      │
      ▼
Style Engine
      │
      ▼
Components
```

Design System là tầng dữ liệu của toàn bộ thư viện.

---

# Cấu trúc thư mục

```
design-system/

├── tokens/
│
├── themes/
│
└── icons/
```

---

# Design Tokens

Design Tokens là các giá trị thiết kế được định nghĩa một lần và tái sử dụng ở mọi nơi.

Ví dụ

```
Color

Spacing

Radius

Shadow

Typography

Motion

Breakpoint

Opacity

Z-index
```

Không sử dụng

```
#2563eb

12px

8px

0 4px 10px
```

Mà luôn sử dụng Token.

Ví dụ

```css
var(--aui-token-color-primary)

var(--aui-token-space-4)

var(--aui-token-radius-lg)
```

---

# Cấu trúc Tokens

```
tokens/

├── colors.scss
├── spacing.scss
├── radius.scss
├── shadows.scss
├── typography.scss
├── motion.scss
├── breakpoints.scss
├── opacity.scss
├── z-index.scss
└── index.scss
```

---

# Colors

Định nghĩa toàn bộ hệ thống màu.

Ví dụ

```
Primary

Secondary

Success

Warning

Danger

Info

Surface

Background

Text

Border
```

Ví dụ

```css
--aui-token-color-primary

--aui-token-color-success

--aui-token-color-surface

--aui-token-color-text
```

---

# Spacing

Định nghĩa khoảng cách.

Ví dụ

```
XS

SM

MD

LG

XL
```

```css
--aui-token-space-2

--aui-token-space-4

--aui-token-space-8
```

---

# Radius

Quản lý bo góc.

```css
--aui-token-radius-none

--aui-token-radius-sm

--aui-token-radius-md

--aui-token-radius-lg

--aui-token-radius-full
```

---

# Shadows

Định nghĩa Shadow.

```css
--aui-token-shadow-xs

--aui-token-shadow-sm

--aui-token-shadow-md

--aui-token-shadow-lg
```

---

# Typography

Định nghĩa Font.

```
Font Family

↓

Font Size

↓

Font Weight

↓

Line Height
```

Ví dụ

```css
--aui-token-font-family-base

--aui-token-font-size-md

--aui-token-font-weight-bold
```

---

# Motion

Định nghĩa Animation.

Ví dụ

```css
--aui-token-motion-duration-fast

--aui-token-motion-duration-normal

--aui-token-motion-duration-slow

--aui-token-motion-ease-standard
```

---

# Breakpoints

Responsive của toàn bộ thư viện.

Ví dụ

```css
--aui-token-breakpoint-sm

--aui-token-breakpoint-md

--aui-token-breakpoint-lg

--aui-token-breakpoint-xl
```

---

# Opacity

Định nghĩa độ trong suốt.

```css
--aui-token-state-disabled-opacity

--aui-token-opacity-5

--aui-token-state-hover-opacity
```

---

# Z-index

Quản lý Layer.

Ví dụ

```css
--aui-token-z-index-dropdown

--aui-token-z-index-modal

--aui-token-z-index-popover

--aui-token-z-index-tooltip
```

---

# Themes

Theme chỉ có một nhiệm vụ:

**Override Design Tokens.**

Theme **không sửa Component**.

---

# Cấu trúc Themes

```
themes/

├── default.scss
├── light.scss
├── dark.scss
├── corporate.scss
└── index.scss
```

---

# Ví dụ

Theme Light

```css
:root {
  --aui-token-color-primary: #2563eb;
}
```

Theme Dark

```css
:root {
  --aui-token-color-primary: #60a5fa;
}
```

Component không thay đổi.

---

# Icons

Icons là tập hợp biểu tượng dùng chung.

```
icons/

├── Arrow/
├── Check/
├── Close/
├── Search/
├── User/
└── ...
```

Mọi Icon đều có cùng API.

Ví dụ

```jsx
<Icon name="search" size="md" />
```

---

# Luồng hoạt động

```
Foundation

↓

Design Tokens

↓

Theme

↓

Style Engine

↓

Components
```

---

# Ví dụ

Button

Không viết

```css
background: #2563eb;
```

Mà viết

```css
background: var(--aui-token-color-primary);
```

Khi đổi Theme

```
Primary

↓

Blue

↓

Green
```

Button tự đổi màu.

Không sửa Button.

---

# Quy tắc

## Chỉ sử dụng Token

Đúng

```css
padding: var(--aui-token-space-4);
```

Sai

```css
padding: 13px;
```

---

## Không Hardcode

Sai

```css
border-radius: 6px;
```

Đúng

```css
border-radius: var(--aui-token-radius-md);
```

---

## Không sửa Component trong Theme

Sai

```css
.aui-button {
  background: red;
}
```

Đúng

```css
:root {
  --aui-token-color-primary: red;
}
```

---

# Mối quan hệ

```
Design Tokens

↓

Theme

↓

Style Engine

↓

Components
```

Components không biết Theme.

Components chỉ biết Token.

---

# Best Practices

✔ Mọi giá trị giao diện đều phải đi qua Design Tokens.

✔ Theme chỉ Override Tokens.

✔ Không Hardcode giá trị trong Component.

✔ Icons phải có API thống nhất.

✔ Không chứa React Component trong Design System.

✔ Design System chỉ chứa dữ liệu thiết kế.

---

# Tóm tắt

Design System là trung tâm của toàn bộ hệ thống giao diện.

```
Design Tokens

↓

Themes

↓

Style Engine

↓

Components

↓

Patterns

↓

Templates
```

Nhờ Design System, AssembleUI có thể thay đổi toàn bộ giao diện của ứng dụng chỉ bằng cách thay đổi Theme hoặc Design Tokens, trong khi mọi Component vẫn giữ nguyên logic và API.
