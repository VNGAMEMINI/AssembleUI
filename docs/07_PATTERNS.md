# 07. Patterns

> Pattern là tập hợp nhiều Components được ghép lại để tạo thành một phần giao diện hoàn chỉnh. Đây là tầng giúp AssembleUI chuyển từ **UI Components** sang **UI Sections**, cho phép xây dựng website nhanh hơn mà vẫn giữ được khả năng tùy biến.

---

# Mục tiêu

Patterns được thiết kế để:

- Tái sử dụng các phần giao diện phổ biến.
- Giảm việc lặp lại khi xây dựng website.
- Chuẩn hóa bố cục.
- Đảm bảo tính nhất quán.
- Có thể tùy biến thông qua Props.
- Có thể thay thế từng Component bên trong.

Pattern không phải Template.

Pattern không phải Page.

Pattern chỉ là **một phần của giao diện**.

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
Core
      │
      ▼
Components
      │
      ▼
Patterns
      │
      ▼
Templates
```

---

# Pattern là gì?

Pattern được tạo từ nhiều Component.

Ví dụ

```
Hero

=

Container

+

Grid

+

Heading

+

Text

+

Button

+

Image
```

Hoặc

```
Pricing

=

Section

+

Card

+

Button

+

Badge
```

Pattern chỉ lắp ráp Component.

Không viết lại Component.

---

# Cấu trúc thư mục

```
patterns/

├── Header/
├── Hero/
├── Features/
├── Statistics/
├── Pricing/
├── FAQ/
├── Testimonials/
├── CTA/
├── Contact/
├── Footer/
└── index.ts
```

---

# Cấu trúc một Pattern

Ví dụ

```
Hero/

Hero.tsx

Hero.scss

Hero.test.tsx

Hero.docs.md

index.ts
```

Pattern có cấu trúc giống Component.

---

# Quan hệ giữa Pattern và Component

```
Pattern

↓

Components

↓

Base

↓

Style Engine

↓

Design Tokens
```

Ví dụ

```
Hero

↓

Container

↓

Grid

↓

Text

↓

Button

↓

Image
```

---

# Header

Ví dụ

```
Header

↓

Container

↓

Flex

↓

Logo

↓

Navigation

↓

Button
```

---

# Hero

Ví dụ

```
Hero

↓

Container

↓

Grid

↓

Heading

↓

Paragraph

↓

Button

↓

Image
```

---

# Features

Ví dụ

```
Features

↓

Section

↓

Grid

↓

Card

↓

Icon

↓

Text
```

---

# Pricing

Ví dụ

```
Pricing

↓

Container

↓

Grid

↓

Card

↓

Badge

↓

Button
```

---

# FAQ

Ví dụ

```
FAQ

↓

Section

↓

Accordion

↓

Button
```

---

# Contact

Ví dụ

```
Contact

↓

Container

↓

Grid

↓

Input

↓

Textarea

↓

Button
```

---

# Footer

Ví dụ

```
Footer

↓

Container

↓

Grid

↓

Navigation

↓

Text

↓

Social Icons
```

---

# Pattern Composition

Pattern có thể sử dụng nhiều Component khác nhau.

Ví dụ

```
Hero

↓

Container

↓

Grid

↓

Heading

↓

Text

↓

Button

↓

Image
```

Hoặc

```
Dashboard Header

↓

Container

↓

Flex

↓

Avatar

↓

Search

↓

Notification

↓

Menu
```

---

# Props

Pattern vẫn có Props.

Ví dụ

```tsx
<Hero

    title="Build Faster"

    description="Create beautiful websites."

    image="/hero.png"

    actions={[
        {
            label: "Get Started"
        }
    ]}

/>
```

Pattern không nên có quá nhiều Props.

Nếu số lượng Props quá lớn, hãy tách thành nhiều Pattern nhỏ hơn.

---

# Pattern Variants

Một Pattern có thể có nhiều biến thể.

Ví dụ

```
Hero

├── Default

├── Center

├── Split

├── Image Left

└── Video
```

Hoặc

```
Pricing

├── Simple

├── Three Columns

├── Enterprise

└── Comparison
```

---

# Pattern không chứa

Không được chứa

- API Request
- Database
- Authentication
- Business Logic
- Routing

Pattern chỉ quản lý giao diện.

---

# Pattern và Theme

Pattern không biết Theme.

Pattern chỉ sử dụng Component.

Component sẽ tự lấy Design Tokens.

```
Theme

↓

Design Tokens

↓

Components

↓

Patterns
```

---

# Pattern và Template

Pattern là một phần của Template.

Ví dụ

```
Landing

↓

Header

↓

Hero

↓

Features

↓

Pricing

↓

FAQ

↓

Footer
```

Mỗi Pattern có thể tái sử dụng trong nhiều Template khác nhau.

---

# Luồng xây dựng

```
Base Components

↓

UI Components

↓

Patterns

↓

Templates

↓

Website
```

---

# Quy tắc thiết kế

## Chỉ lắp ráp

Pattern chỉ được ghép từ Component.

Không viết lại Button.

Không viết lại Card.

Không viết lại Input.

---

## Không phụ thuộc Pattern khác

Đúng

```
Hero

↓

Components
```

Sai

```
Hero

↓

Pricing
```

Nếu cần nhiều Pattern, hãy sử dụng Template.

---

## Không chứa Business Logic

Sai

```
Hero

↓

Fetch API
```

Đúng

```
Hero

↓

Render UI
```

---

## Có khả năng thay thế

Ví dụ

```
Hero

↓

Button

↓

IconButton
```

Hoặc

```
Hero

↓

Image

↓

Video
```

Không cần sửa Hero.

---

# Best Practices

✔ Pattern chỉ giải quyết một phần giao diện.

✔ Luôn sử dụng Component.

✔ Không viết CSS trùng lặp.

✔ Không Hardcode giao diện.

✔ Không chứa Business Logic.

✔ Có Documentation.

✔ Có Test.

✔ Có khả năng tái sử dụng.

---

# Ví dụ

```
Landing

↓

Header

↓

Hero

↓

Features

↓

Pricing

↓

Testimonials

↓

FAQ

↓

Contact

↓

Footer
```

Mỗi phần đều là một Pattern độc lập.

---

# Tóm tắt

Pattern là tầng trung gian giữa **Components** và **Templates**.

```
Components

↓

Patterns

↓

Templates

↓

Application
```

Pattern giúp AssembleUI chuyển từ các Component đơn lẻ sang các **khối giao diện hoàn chỉnh**, giúp người dùng xây dựng website nhanh hơn, đồng thời vẫn giữ được khả năng tùy biến, tái sử dụng và mở rộng lâu dài.
