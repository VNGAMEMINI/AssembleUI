# 03. Foundation

> Foundation là tầng thấp nhất của AssembleUI. Nó xây dựng một nền tảng CSS nhất quán trước khi bất kỳ Theme, Component hay Pattern nào được sử dụng.

---

# Mục tiêu

Foundation giải quyết các vấn đề cơ bản của trình duyệt và cung cấp nền móng thống nhất cho toàn bộ thư viện.

Foundation chịu trách nhiệm:

- Chuẩn hóa CSS giữa các trình duyệt.
- Thiết lập Typography mặc định.
- Thiết lập Global Style.
- Khởi tạo CSS Variables.
- Thiết lập các quy tắc nền cho toàn bộ hệ thống.

Foundation **không chứa**:

- Component
- Theme
- Hook
- Utility JavaScript
- Logic React

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

Foundation là tầng đầu tiên được tải.

---

# Cấu trúc thư mục

```
foundation/

├── reset.scss
├── normalize.scss
├── typography.scss
├── globals.scss
└── index.scss
```

---

# reset.scss

## Mục đích

Loại bỏ sự khác biệt mặc định giữa các trình duyệt.

Ví dụ:

- Margin
- Padding
- Border
- Box sizing

Foundation chỉ Reset những gì cần thiết.

Không sử dụng Reset quá mạnh làm phá vỡ HTML mặc định.

---

# normalize.scss

## Mục đích

Chuẩn hóa cách trình duyệt hiển thị các phần tử HTML.

Ví dụ:

- Button
- Input
- Table
- Heading
- Form
- Image

Điều này giúp AssembleUI hoạt động giống nhau trên:

- Chrome
- Edge
- Firefox
- Safari

---

# typography.scss

## Mục đích

Thiết lập hệ thống chữ.

Bao gồm:

```
Font Family

↓

Font Size

↓

Font Weight

↓

Line Height

↓

Letter Spacing
```

Typography chỉ định nghĩa quy tắc chung.

Không định nghĩa giao diện của Component.

---

# globals.scss

## Mục đích

Thiết lập các quy tắc dùng chung cho toàn bộ ứng dụng.

Ví dụ:

- html
- body
- img
- svg
- button
- input

Đồng thời khai báo các CSS Variables mặc định.

Ví dụ

```css
:root {
  --aui-font-family: system-ui;
}
```

---

# index.scss

Đây là điểm vào (Entry Point) của Foundation.

Nó chỉ có nhiệm vụ import các file còn lại.

Ví dụ

```scss
@use "./reset";
@use "./normalize";
@use "./typography";
@use "./globals";
```

Người dùng không import Foundation trực tiếp.

Foundation sẽ được import thông qua:

```scss
@assembleui/react/styles;
```

---

# Quy trình tải

```
styles

↓

foundation/index.scss

↓

reset

↓

normalize

↓

typography

↓

globals
```

Foundation luôn được tải trước các tầng khác.

---

# Quan hệ với Design System

Foundation không biết Theme.

Foundation không biết Design Tokens.

Foundation chỉ tạo môi trường CSS ổn định.

```
Foundation

↓

Design System

↓

Theme

↓

Component
```

---

# Nguyên tắc thiết kế

## Không chứa Component

Sai

```
.button {

}
```

Đúng

```
button {

}
```

Foundation chỉ làm việc với HTML gốc.

---

## Không chứa Theme

Sai

```
body{

background:black;

}
```

Đúng

```
body{

margin:0;

}
```

Theme sẽ quyết định màu sắc.

---

## Không chứa Layout

Sai

```
.container{

}
```

Đúng

```
html{

box-sizing:border-box;

}
```

Layout thuộc Style Engine.

---

## Không Hardcode giao diện

Foundation không được quyết định:

- Màu Primary
- Border Radius
- Shadow
- Spacing

Các giá trị này thuộc Design System.

---

# Luồng hoạt động

```
Browser

↓

Foundation

↓

Design System

↓

Theme

↓

Style Engine

↓

Component
```

---

# Ví dụ

Khi người dùng import

```scss
@assembleui/react/styles;
```

AssembleUI sẽ thực hiện

```
foundation/index.scss

↓

reset.scss

↓

normalize.scss

↓

typography.scss

↓

globals.scss
```

Sau khi Foundation hoàn thành, hệ thống mới tiếp tục tải Design System.

---

# Best Practices

✔ Foundation chỉ xử lý HTML cơ bản.

✔ Không import Component.

✔ Không import Theme.

✔ Không import Design Tokens.

✔ Không chứa JavaScript.

✔ Luôn được tải đầu tiên.

---

# Tóm tắt

Foundation là nền móng của AssembleUI.

Nó chịu trách nhiệm chuẩn hóa CSS và tạo môi trường thống nhất cho toàn bộ hệ thống.

```
Foundation

↓

Browser Ready

↓

Design System

↓

Style Engine

↓

Components
```

Mọi Component trong AssembleUI đều hoạt động trên cùng một nền tảng CSS do Foundation cung cấp, giúp đảm bảo tính nhất quán, khả năng mở rộng và khả năng tương thích giữa các trình duyệt.
