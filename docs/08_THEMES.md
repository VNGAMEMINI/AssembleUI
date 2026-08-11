# 08. Themes

> Theme là cơ chế thay đổi giao diện của AssembleUI mà **không cần sửa bất kỳ Component nào**. Theme chỉ có một nhiệm vụ duy nhất: **ghi đè (Override) Design Tokens**.

---

# Mục tiêu

Theme được xây dựng để:

- Thay đổi giao diện toàn bộ ứng dụng.
- Không thay đổi Component.
- Không thay đổi Logic.
- Không thay đổi API.
- Cho phép tạo nhiều giao diện khác nhau.
- Hỗ trợ Dark Mode.
- Hỗ trợ White Label.
- Hỗ trợ Brand Customization.

---

# Vai trò trong kiến trúc

```
Foundation
      │
      ▼
Design System
      │
      ▼
Themes
      │
      ▼
Style Engine
      │
      ▼
Components
```

Theme chỉ tác động đến **Design Tokens**.

---

# Nguyên lý hoạt động

Component không biết Theme.

Component chỉ biết Token.

Ví dụ

```
Button

↓

background

↓

var(--aui-color-primary)
```

Khi đổi Theme

```
Theme

↓

--aui-color-primary

↓

Button tự đổi màu
```

Component không thay đổi.

---

# Cấu trúc thư mục

```
themes/

├── default.scss
├── light.scss
├── dark.scss
├── corporate.scss
├── custom.scss
└── index.scss
```

---

# Theme mặc định

Theme mặc định được sử dụng nếu người dùng không cấu hình.

Ví dụ

```scss
:root {

    --aui-color-primary: #2563eb;

    --aui-color-surface: #ffffff;

    --aui-color-text: #111827;

}
```

---

# Dark Theme

Ví dụ

```scss
:root {

    --aui-color-primary: #60a5fa;

    --aui-color-surface: #18181b;

    --aui-color-text: #f8fafc;

}
```

Mọi Component sẽ tự cập nhật giao diện.

---

# Corporate Theme

Ví dụ

```scss
:root {

    --aui-color-primary: #0057b8;

    --aui-color-radius-md: 2px;

}
```

Theme có thể thay đổi:

- Brand Color
- Radius
- Shadow
- Font
- Motion
- Spacing

---

# Theme không chứa

Theme không được chứa

- Component
- JSX
- React
- Hook
- Utility
- Business Logic

Theme chỉ ghi đè Design Tokens.

---

# Những gì Theme được phép thay đổi

Ví dụ

```
Color

Spacing

Radius

Shadow

Typography

Opacity

Motion

Border

Surface
```

---

# Những gì Theme KHÔNG được thay đổi

Sai

```scss
.aui-button{

padding:20px;

}
```

Sai

```scss
.aui-card{

display:flex;

}
```

Sai

```scss
.aui-modal{

position:fixed;

}
```

Theme không được sửa Component.

---

# Quy trình hoạt động

```
Theme

↓

Override Tokens

↓

Style Engine

↓

Components

↓

Browser
```

---

# Ví dụ

Button

```scss
background:

var(--aui-color-primary);
```

Light Theme

```css
--aui-color-primary:#2563eb;
```

Dark Theme

```css
--aui-color-primary:#60a5fa;
```

Button sẽ đổi màu mà không cần sửa CSS.

---

# Theme Switching

Có thể chuyển Theme động.

Ví dụ

```
Light

↓

Dark

↓

Corporate

↓

Custom
```

Toàn bộ Component sẽ cập nhật giao diện.

---

# White Label

Theme cho phép nhiều thương hiệu sử dụng cùng một Component.

Ví dụ

```
Brand A

↓

Blue

↓

Rounded
```

```
Brand B

↓

Green

↓

Square
```

Logic hoàn toàn giống nhau.

---

# Custom Theme

Người dùng có thể tự tạo Theme.

Ví dụ

```scss
:root {

    --aui-color-primary: #ff5722;

    --aui-radius-md: 20px;

    --aui-font-family: Inter;

}
```

Không cần sửa Component.

---

# Import Theme

Mặc định

```scss
import "@assembleui/react/styles";
```

Dark

```scss
import "@assembleui/react/themes/dark";
```

Corporate

```scss
import "@assembleui/react/themes/corporate";
```

---

# Theme Provider

Khi cần đổi Theme trong thời gian chạy.

Ví dụ

```jsx
<ThemeProvider
    theme="dark"
>

    <App/>

</ThemeProvider>
```

ThemeProvider chỉ thay đổi Tokens.

Không Render lại Component nếu không cần thiết.

---

# Mối quan hệ

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

↓

Patterns

↓

Templates
```

---

# Quy tắc

## Chỉ Override Token

Đúng

```scss
:root{

--aui-color-primary:#3b82f6;

}
```

Sai

```scss
.button{

background:red;

}
```

---

## Không sửa Component

Sai

```scss
.card{

padding:40px;

}
```

Đúng

```scss
:root{

--aui-space-xl:40px;

}
```

---

## Không chứa CSS Layout

Sai

```scss
.container{

max-width:1200px;

}
```

Layout thuộc Style Engine.

---

## Không Hardcode trong Component

Sai

```scss
background:#2563eb;
```

Đúng

```scss
background:

var(--aui-color-primary);
```

---

# Best Practices

✔ Theme chỉ Override Design Tokens.

✔ Không sửa CSS của Component.

✔ Không thay đổi Logic.

✔ Không chứa JSX.

✔ Có thể tạo nhiều Theme khác nhau.

✔ Hỗ trợ White Label.

✔ Hỗ trợ Dark Mode.

✔ Hỗ trợ Runtime Switching.

---

# Tóm tắt

Theme là tầng chịu trách nhiệm thay đổi giao diện của AssembleUI.

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

Nhờ tách Theme khỏi Component, AssembleUI có thể thay đổi toàn bộ giao diện của ứng dụng chỉ bằng cách thay đổi Design Tokens. Điều này giúp hệ thống dễ bảo trì, dễ mở rộng và phù hợp với nhiều thương hiệu, nhiều sản phẩm mà vẫn sử dụng chung một bộ Component.
