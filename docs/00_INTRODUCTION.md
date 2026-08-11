# AssembleUI

> **A modern React UI Library built for flexibility, composition, and long-term scalability.**

Version: 1.0.0

---

# Giới thiệu

AssembleUI là một thư viện giao diện (UI Library) dành cho React, được xây dựng với mục tiêu giúp nhà phát triển tạo giao diện nhanh chóng bằng cách **lắp ráp các Component giống như những khối Lego**.

Thay vì viết HTML, CSS và JavaScript từ đầu cho mỗi dự án, AssembleUI cung cấp một hệ sinh thái gồm:

- Foundation
- Design System
- Style Engine
- Core
- Components
- Patterns
- Templates

Mỗi tầng có trách nhiệm riêng, giúp mã nguồn rõ ràng, dễ bảo trì và dễ mở rộng.

---

# Tầm nhìn

AssembleUI không chỉ là một bộ Component.

Mục tiêu của dự án là xây dựng một **UI Ecosystem** hoàn chỉnh, nơi người dùng có thể:

- Xây dựng giao diện bằng cách ghép các Component.
- Tùy biến toàn bộ giao diện thông qua Design Tokens.
- Chuyển đổi Theme mà không sửa Component.
- Tái sử dụng Patterns và Templates cho nhiều dự án.
- Dễ dàng mở rộng mà không phá vỡ kiến trúc.

---

# Triết lý

AssembleUI được xây dựng dựa trên sáu nguyên tắc.

## 1. Composition First

Mọi giao diện đều được tạo bằng cách ghép các thành phần nhỏ hơn.

```
Button

↓

Card

↓

Hero

↓

Landing Page
```

---

## 2. Design Tokens First

Mọi giá trị giao diện đều được quản lý bằng Design Tokens.

Không Hardcode.

```
Sai

color: #2563eb;

Đúng

color: var(--aui-color-primary);
```

---

## 3. Theme First

Theme chỉ thay đổi Token.

Không sửa Component.

```
Theme

↓

Design Tokens

↓

Component
```

---

## 4. Performance First

Ưu tiên

- Bundle nhỏ.
- Tree Shaking.
- CSS tối ưu.
- Ít Render.
- Ít Re-render.

---

## 5. Accessibility First

Mọi Component đều phải hỗ trợ:

- Keyboard Navigation
- Screen Reader
- Focus Management
- Semantic HTML
- WCAG

---

## 6. Scalability First

Kiến trúc phải có khả năng mở rộng trong nhiều năm mà không cần thay đổi nền tảng.

---

# Kiến trúc tổng thể

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
        │
        ▼
Application
```

Mỗi tầng chỉ phụ thuộc vào tầng bên dưới.

---

# Các tầng của AssembleUI

## Foundation

Nền tảng CSS.

Bao gồm:

- Reset
- Normalize
- Globals
- Typography

---

## Design System

Nguồn dữ liệu của giao diện.

Bao gồm:

- Design Tokens
- Themes
- Icons

---

## Style Engine

Hệ thống sinh và tái sử dụng CSS.

Bao gồm:

- Functions
- Mixins
- Layout Helpers
- Responsive Helpers
- Utilities

---

## Core

Logic dùng chung.

Bao gồm:

- Hooks
- Utils
- Contexts
- Providers

---

## Components

Các thành phần giao diện độc lập.

Ví dụ:

- Button
- Input
- Card
- Modal
- Table

---

## Patterns

Tập hợp nhiều Component để tạo thành một phần giao diện hoàn chỉnh.

Ví dụ:

- Header
- Hero
- Features
- Pricing
- FAQ
- Footer

---

## Templates

Tập hợp nhiều Pattern để tạo thành một trang hoàn chỉnh.

Ví dụ:

- Landing
- Dashboard
- Portfolio
- Blog
- Documentation

---

# Quy trình xây dựng giao diện

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

↓

Website
```

---

# Ví dụ

## Button

```
<Button>
```

↓

## Card

```
<Card>

    <Button/>

</Card>
```

↓

## Hero

```
<Hero>

    <Card/>

    <Button/>

</Hero>
```

↓

## Landing

```
<LandingTemplate/>
```

↓

Website hoàn chỉnh.

---

# Cấu trúc dự án

```
assembleui/

docs/

packages/

demo/

playground/

tests/

scripts/
```

Chi tiết kiến trúc được trình bày trong:

- 02_ARCHITECTURE.md

---

# Đối tượng sử dụng

AssembleUI phù hợp với:

- Frontend Developer
- UI Engineer
- Design System Engineer
- React Developer
- Startup
- Enterprise
- Open Source Project

---

# Mục tiêu

AssembleUI hướng tới:

- API đơn giản.
- Kiến trúc rõ ràng.
- Khả năng tái sử dụng cao.
- Tùy biến linh hoạt.
- Hiệu năng tốt.
- Accessibility.
- Khả năng mở rộng lâu dài.

---

# Giá trị cốt lõi

Mỗi quyết định trong AssembleUI đều phải trả lời được bốn câu hỏi:

- Có đơn giản hơn không?
- Có dễ tái sử dụng hơn không?
- Có dễ mở rộng hơn không?
- Có giữ được tính nhất quán của hệ thống không?

Nếu câu trả lời là **không**, giải pháp đó cần được xem xét lại.

---

# Nguyên tắc bất biến

AssembleUI không hướng đến việc có nhiều Component nhất.

Mục tiêu là xây dựng một thư viện có:

- Kiến trúc rõ ràng.
- API nhất quán.
- Hiệu năng cao.
- Tùy biến mạnh.
- Dễ bảo trì.
- Dễ mở rộng.

Mỗi Component, Pattern và Template đều phải tuân thủ cùng một triết lý, để người dùng chỉ cần **ghép các khối giao diện** là có thể xây dựng một website hoàn chỉnh.
