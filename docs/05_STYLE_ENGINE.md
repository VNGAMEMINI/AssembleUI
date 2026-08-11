# 05. Style Engine

> Style Engine là tầng chịu trách nhiệm tạo, tổ chức và tái sử dụng toàn bộ hệ thống CSS của AssembleUI. Đây là cầu nối giữa **Design System** và **Components**, giúp mọi Component có giao diện nhất quán, linh hoạt và dễ mở rộng.

---

# Mục tiêu

Style Engine được xây dựng để giải quyết các vấn đề sau:

- Tái sử dụng CSS.
- Không lặp lại mã nguồn.
- Giảm kích thước CSS.
- Hỗ trợ Responsive.
- Hỗ trợ Theme.
- Hỗ trợ Design Tokens.
- Hỗ trợ Tree Shaking.
- Dễ mở rộng.

Style Engine **không chứa**:

- React Component
- Business Logic
- Hook
- State
- JSX

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

Style Engine chỉ sinh CSS.

Components chỉ sử dụng CSS đó.

---

# Cấu trúc thư mục

```
styles/

├── functions/
│
├── mixins/
│
├── layouts/
│
├── responsive/
│
├── utilities/
│
└── index.scss
```

---

# Tổng quan

```
Style Engine

├── Functions
├── Mixins
├── Layouts
├── Responsive
└── Utilities
```

Mỗi phần có một nhiệm vụ riêng.

---

# Functions

## Vai trò

Functions trả về giá trị.

Không sinh CSS.

Ví dụ

```
color()

spacing()

radius()

shadow()

font()

zindex()

duration()

breakpoint()
```

Ví dụ

```scss
padding: spacing(md);

border-radius: radius(lg);

color: color(primary);
```

Functions luôn lấy dữ liệu từ Design Tokens.

---

# Mixins

## Vai trò

Mixins sinh CSS có thể tái sử dụng.

Ví dụ

```
flex()

grid()

container()

surface()

scrollbar()

transition()

ellipsis()

focusRing()
```

Ví dụ

```scss
@include flex(center, center);
```

---

# Layouts

## Vai trò

Layouts cung cấp các hệ thống bố cục.

Ví dụ

```
Container

↓

Flex

↓

Grid

↓

Stack

↓

Cluster

↓

Sidebar

↓

Center
```

Layouts không phải React Component.

Layouts chỉ là các quy tắc CSS.

---

# Responsive

## Vai trò

Quản lý Responsive của toàn bộ hệ thống.

Ví dụ

```
mobile()

tablet()

desktop()

between()

only()

up()

down()
```

Ví dụ

```scss
@include up(md) {
}
```

Breakpoint luôn lấy từ Design Tokens.

---

# Utilities

## Vai trò

Utilities là các lớp CSS có thể sử dụng trực tiếp.

Ví dụ

```
display

spacing

flex

grid

text

background

border

shadow

visibility
```

Ví dụ

```html
<div class="aui-hidden">
  <div class="aui-flex">
    <div class="aui-text-center"></div>
  </div>
</div>
```

Utilities luôn được sinh từ Design Tokens.

---

# index.scss

Đây là điểm vào của Style Engine.

Ví dụ

```scss
@forward "./functions";
@forward "./mixins";
@forward "./layouts";
@forward "./responsive";
@forward "./utilities";
```

---

# Luồng hoạt động

```
Design Tokens

↓

Functions

↓

Mixins

↓

Layouts

↓

Utilities

↓

Components
```

Style Engine không tạo Component.

Style Engine chỉ tạo CSS.

---

# Mối quan hệ với Design System

```
Tokens

↓

Functions

↓

Mixins

↓

Components
```

Style Engine không lưu dữ liệu.

Nó chỉ đọc dữ liệu từ Design Tokens.

---

# Mối quan hệ với Components

```
Component

↓

SCSS

↓

Mixins

↓

Functions

↓

Tokens
```

Ví dụ

```
Button.scss

↓

@include flex()

↓

spacing(md)

↓

--aui-space-md
```

---

# Quy tắc

## Không Hardcode

Sai

```scss
padding: 16px;
```

Đúng

```scss
padding: spacing(md);
```

---

## Không sử dụng màu trực tiếp

Sai

```scss
background: #2563eb;
```

Đúng

```scss
background: color(primary);
```

---

## Không viết CSS trùng lặp

Sai

```scss
display: flex;

justify-content: center;

align-items: center;
```

Đúng

```scss
@include flex(center, center);
```

---

## Không import chéo

Sai

```
Button.scss

↓

import Card.scss
```

Đúng

```
Button.scss

↓

Mixins

↓

Functions

↓

Tokens
```

---

# Luồng tạo giao diện

```
Foundation

↓

Design Tokens

↓

Theme

↓

Style Engine

↓

Component

↓

Pattern

↓

Template
```

---

# Ví dụ

Button

```
Button.scss

↓

@include surface()

↓

@include flex()

↓

spacing(md)

↓

radius(md)

↓

color(primary)
```

Style Engine sẽ sinh toàn bộ CSS cần thiết.

---

# Best Practices

✔ Luôn sử dụng Functions để lấy Token.

✔ Luôn sử dụng Mixins để sinh CSS.

✔ Layout chỉ chứa quy tắc bố cục.

✔ Responsive luôn sử dụng Breakpoints.

✔ Utilities chỉ sinh từ Design Tokens.

✔ Không Hardcode giá trị.

✔ Không import Component vào Style Engine.

---

# Tóm tắt

Style Engine là trái tim của hệ thống CSS trong AssembleUI.

```
Design System

↓

Style Engine

↓

Components

↓

Patterns

↓

Templates
```

Nhờ Style Engine, mọi Component đều sử dụng cùng một hệ thống CSS thống nhất, giảm lặp mã, dễ bảo trì và dễ mở rộng. Điều này giúp AssembleUI giữ được hiệu năng cao, khả năng tùy biến mạnh và tính nhất quán trên toàn bộ thư viện.
