# 18. Architecture

> Architecture mô tả toàn bộ kiến trúc của AssembleUI, từ tầng thấp nhất (Foundation) đến tầng cao nhất (Application). Đây là tài liệu quan trọng nhất của dự án, giúp mọi Contributor và người sử dụng hiểu cách toàn bộ thư viện được tổ chức và cách các tầng tương tác với nhau.

---

# Mục tiêu

Architecture được xây dựng để:

- Chuẩn hóa toàn bộ kiến trúc.
- Tách biệt trách nhiệm của từng tầng.
- Giảm sự phụ thuộc giữa các Module.
- Dễ mở rộng.
- Dễ bảo trì.
- Dễ kiểm thử.
- Đảm bảo hiệu năng.

---

# Triết lý

AssembleUI được xây dựng theo nguyên tắc:

```
Small

↓

Reusable

↓

Composable

↓

Scalable

↓

Maintainable
```

Mỗi tầng chỉ làm **một nhiệm vụ duy nhất**.

---

# Kiến trúc tổng thể

```
                           Application
                                │
                                ▼
                           Templates
                                │
                                ▼
                            Patterns
                                │
                                ▼
                           Components
                                │
               ┌────────────────┴────────────────┐
               ▼                                 ▼
            Core                         Style Engine
               │                                 │
               └────────────────┬────────────────┘
                                ▼
                         Design System
                                │
                                ▼
                           Foundation
```

---

# Foundation

Foundation là nền móng của thư viện.

Bao gồm

```
Reset

Normalize

Typography

Globals
```

Foundation chỉ thiết lập môi trường CSS.

Không chứa Component.

---

# Design System

Design System định nghĩa toàn bộ dữ liệu thiết kế.

Bao gồm

```
Design Tokens

Themes

Icons
```

Design System không Render UI.

---

# Style Engine

Style Engine sinh toàn bộ CSS.

Bao gồm

```
Functions

Mixins

Layouts

Responsive

Utilities
```

Style Engine chỉ tạo Style.

---

# Core

Core chứa logic dùng chung.

Bao gồm

```
Hooks

Utils

Contexts

Providers
```

Core không chứa giao diện.

---

# Components

Components là các phần tử UI nhỏ nhất.

Ví dụ

```
Button

Input

Modal

Card

Table

Avatar
```

Component chỉ giải quyết một nhiệm vụ.

---

# Patterns

Pattern là tập hợp nhiều Component.

Ví dụ

```
Hero

Navbar

Pricing

FAQ

Footer
```

Pattern giúp giảm việc lặp giao diện.

---

# Templates

Template là trang hoàn chỉnh.

Ví dụ

```
Landing

Dashboard

Portfolio

Store

Documentation
```

Template chỉ ghép Pattern.

---

# Application

Người dùng AssembleUI.

Ví dụ

```
React Project

↓

Install

↓

Import Styles

↓

Import Components

↓

Deploy
```

---

# Quan hệ giữa các tầng

```
Foundation

↓

Design System

↓

Style Engine

↓

Components

↓

Patterns

↓

Templates

↓

Application
```

Dữ liệu chỉ đi theo **một chiều**.

---

# Dependency Graph

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

Không có tầng nào được phụ thuộc ngược.

---

# Dependency Rules

Đúng

```
Component

↓

Core
```

Sai

```
Core

↓

Component
```

---

Đúng

```
Pattern

↓

Components
```

Sai

```
Components

↓

Patterns
```

---

Đúng

```
Template

↓

Patterns
```

Sai

```
Pattern

↓

Template
```

---

# Luồng Style

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
```

Component không tự sinh CSS.

---

# Luồng Logic

```
Provider

↓

Context

↓

Hook

↓

Component
```

Component không thao tác trực tiếp với Context nếu đã có Hook.

---

# Luồng Render

```
Application

↓

Template

↓

Pattern

↓

Component

↓

DOM
```

Render luôn đi từ trên xuống.

---

# Luồng Theme

```
Theme

↓

Override Tokens

↓

Style Engine

↓

Component

↓

Browser
```

Component không biết Theme nào đang hoạt động.

---

# Luồng Build

```
Source

↓

TypeScript

↓

SCSS

↓

Bundle

↓

dist/

↓

npm
```

---

# Luồng Runtime

```
Browser

↓

Theme

↓

Component

↓

Interaction

↓

Re-render
```

Chỉ Component bị ảnh hưởng mới được Render lại.

---

# Luồng phát triển

```
Design

↓

Design Tokens

↓

Component

↓

Pattern

↓

Template

↓

Application
```

Không phát triển ngược từ Template xuống Component.

---

# Quy tắc kiến trúc

## Một chiều

```
Foundation

↓

Design System

↓

Style Engine

↓

Core

↓

Components

↓

Patterns

↓

Templates
```

Không import ngược.

---

## Một nhiệm vụ

Mỗi tầng chỉ làm một việc.

Ví dụ

```
Core

↓

Logic
```

```
Style Engine

↓

CSS
```

```
Component

↓

UI
```

---

## Tái sử dụng

Component nhỏ.

↓

Pattern.

↓

Template.

↓

Application.

Không viết lại cùng một UI nhiều lần.

---

## Không Hardcode

Sai

```scss
background:#2563eb;
```

Đúng

```scss
background:var(--aui-color-primary);
```

---

## Không phá vỡ kiến trúc

Sai

```
Button

↓

Import Hero
```

Đúng

```
Hero

↓

Import Button
```

---

# Kiến trúc thư mục

```
assembleui/

├── docs/
├── packages/
│   └── react/
│       ├── foundation/
│       ├── design-system/
│       ├── styles/
│       ├── core/
│       ├── components/
│       ├── patterns/
│       ├── templates/
│       └── index.ts
├── demo/
├── playground/
├── tests/
└── scripts/
```

---

# Checklist

Mỗi tầng phải đảm bảo:

- Chỉ có một trách nhiệm.
- Không phụ thuộc ngược.
- Có tài liệu.
- Có kiểm thử.
- Có TypeScript.
- Có khả năng mở rộng.
- Có khả năng tái sử dụng.

---

# Best Practices

✔ Kiến trúc phân tầng rõ ràng.

✔ Luồng phụ thuộc một chiều.

✔ UI và Logic tách biệt.

✔ Style và Theme tách biệt.

✔ Component nhỏ và độc lập.

✔ Pattern chỉ lắp ráp Component.

✔ Template chỉ lắp ráp Pattern.

✔ Foundation và Design System là nền tảng chung.

---

# Tóm tắt

Architecture là nền móng của AssembleUI, định nghĩa cách mọi thành phần được tổ chức và tương tác.

```
Foundation
      ↓
Design System
      ↓
Style Engine
      ↓
Core
      ↓
Components
      ↓
Patterns
      ↓
Templates
      ↓
Application
```

Với kiến trúc phân tầng và luồng phụ thuộc một chiều, AssembleUI đảm bảo khả năng mở rộng, tái sử dụng và bảo trì lâu dài. Mỗi tầng có trách nhiệm rõ ràng, giúp thư viện luôn nhất quán, dễ phát triển và phù hợp với các dự án từ nhỏ đến lớn.
