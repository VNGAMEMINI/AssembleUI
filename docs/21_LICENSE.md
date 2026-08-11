# 21. Internal Standards

> Internal Standards định nghĩa các quy chuẩn kỹ thuật được sử dụng trong toàn bộ mã nguồn AssembleUI. Tài liệu này dành cho Contributor và Maintainer nhằm đảm bảo mọi Component, Hook, Utility, Pattern và Template đều được phát triển theo cùng một tiêu chuẩn, giữ cho thư viện nhất quán, dễ bảo trì và dễ mở rộng.

---

# Mục tiêu

Internal Standards được xây dựng để:

- Chuẩn hóa mã nguồn.
- Đồng nhất cách viết Component.
- Đồng nhất API.
- Đồng nhất Style.
- Đồng nhất cấu trúc thư mục.
- Giảm Technical Debt.
- Dễ Review.
- Dễ mở rộng.

---

# Phạm vi

```
Internal Standards

├── Folder Structure
├── Naming Convention
├── Code Style
├── Component Standard
├── Hook Standard
├── Utility Standard
├── Style Standard
├── Documentation Standard
├── Testing Standard
└── Release Standard
```

---

# Folder Structure

Mọi Component phải có cùng cấu trúc.

```
Button/

Button.tsx

Button.scss

Button.test.tsx

Button.docs.md

index.ts
```

Không thêm file không cần thiết.

---

# Naming Convention

## Components

PascalCase

```
Button

Input

Modal

Avatar
```

---

## Hooks

Luôn bắt đầu bằng

```
use
```

Ví dụ

```
useTheme

useDisclosure

useClipboard
```

---

## Utils

camelCase

```
mergeRefs

debounce

classNames

formatDate
```

---

## Constants

UPPER_SNAKE_CASE

```
DEFAULT_SIZE

BUTTON_VARIANTS

BREAKPOINTS
```

---

## Files

Tên file trùng với tên Module.

Ví dụ

```
Button.tsx

Button.scss

Button.test.tsx
```

---

# Import Rules

Thứ tự Import

```tsx
// React

// External Libraries

// Internal Modules

// Styles
```

Ví dụ

```tsx
import React from "react";

import clsx from "clsx";

import { useTheme } from "@/core";

import "./Button.scss";
```

---

# Component Standard

Một Component phải:

- Một nhiệm vụ.
- Có TypeScript.
- Có Ref.
- Có Accessibility.
- Có Documentation.
- Có Test.

Không chứa Business Logic.

---

# Hook Standard

Hook chỉ chứa Logic.

Ví dụ

```
useDisclosure()

↓

State

↓

Functions

↓

Return
```

Không Render UI.

---

# Utility Standard

Utility phải là Pure Function.

Ví dụ

```
Input

↓

Output
```

Không truy cập DOM.

Không sử dụng React.

---

# Style Standard

Component không Hardcode.

Sai

```scss
padding: 16px;
```

Đúng

```scss
padding: spacing(md);
```

Chỉ sử dụng:

- Design Tokens
- Mixins
- Functions

---

# Theme Standard

Không viết

```scss
background: #ffffff;
```

Đúng

```scss
background: var(--aui-color-background);
```

---

# API Standard

Mọi Component nên có:

```
variant

size

className

children

ref
```

Nếu phù hợp.

---

# Event Standard

Tên Event

```
onClick

onChange

onOpen

onClose

onSelect
```

Không dùng tên khác.

---

# TypeScript Standard

Không dùng

```ts
any;
```

Ưu tiên

```ts
unknown;

generic;

union;

interface;
```

---

# Documentation Standard

Mỗi Component phải có

```
Overview

Props

Examples

Accessibility

Best Practices
```

---

# Testing Standard

Mỗi Component phải có

```
Render Test

Props Test

Event Test

Accessibility Test
```

---

# Comment Standard

Comment chỉ dùng khi cần.

Đúng

```ts
// Merge duplicate class names.
```

Sai

```ts
// Increment i.

i++;
```

Không viết Comment mô tả điều hiển nhiên.

---

# Error Handling

Thông báo lỗi phải rõ ràng.

Đúng

```
Button requires children.
```

Sai

```
Unknown Error.
```

---

# Logging

Không để lại

```ts
console.log();
```

trong Production.

---

# Performance Standard

Không được:

- Render dư.
- Import dư.
- CSS dư.
- Bundle dư.

Ưu tiên:

- Tree Shaking.
- Memoization.
- Lazy Loading.

---

# Accessibility Standard

Mọi Component phải:

- Keyboard Friendly.
- Semantic HTML.
- Focus Visible.
- ARIA phù hợp.

---

# Git Standard

Branch

```
feature/

fix/

docs/

test/

build/

refactor/
```

Commit

```
feat:

fix:

docs:

test:

build:

refactor:
```

---

# Review Standard

Reviewer kiểm tra:

- Architecture.
- API.
- Style.
- Accessibility.
- Performance.
- Documentation.
- Testing.

---

# Release Standard

Không Release nếu:

- Có lỗi TypeScript.
- Có Test Fail.
- Có Accessibility Issue.
- Có Breaking Change chưa ghi nhận.

---

# Quy tắc vàng

## Một Module = Một trách nhiệm

```
Component

↓

UI
```

```
Hook

↓

Logic
```

```
Utility

↓

Function
```

---

## Không phụ thuộc ngược

Đúng

```
Pattern

↓

Component
```

Sai

```
Component

↓

Pattern
```

---

## Không Hardcode

Mọi giá trị phải đi qua:

```
Design Tokens
```

---

## Không phá API

Nếu cần thay đổi.

↓

Có Migration Guide.

↓

Có Version mới.

---

## Không tạo ngoại lệ

Không có Component nào được phép phá vỡ quy chuẩn.

Nếu cần ngoại lệ.

↓

Cập nhật Standard trước.

↓

Sau đó mới cập nhật Component.

---

# Checklist

Mỗi Pull Request cần đảm bảo:

- Đúng cấu trúc thư mục.
- Đúng Naming Convention.
- Đúng API.
- Đúng Style.
- Có Documentation.
- Có Test.
- Có Accessibility.
- Có TypeScript.
- Không Hardcode.
- Không phá Architecture.

---

# Best Practices

✔ Viết mã nguồn dễ đọc.

✔ Viết Component nhỏ.

✔ Viết Hook độc lập.

✔ Viết Utility thuần.

✔ Tái sử dụng Style.

✔ Tuân thủ Design Tokens.

✔ Không tạo ngoại lệ.

✔ Luôn cập nhật tài liệu.

---

# Tóm tắt

Internal Standards là bộ quy chuẩn nội bộ của AssembleUI.

```
Architecture
      ↓
Standards
      ↓
Components
      ↓
Patterns
      ↓
Templates
      ↓
Application
```

Nhờ các tiêu chuẩn thống nhất về cấu trúc, đặt tên, API, Style, Testing và Documentation, AssembleUI có thể phát triển lâu dài với chất lượng ổn định, dễ mở rộng và dễ bảo trì, đồng thời giúp mọi Contributor làm việc trên cùng một nền tảng kỹ thuật và triết lý phát triển.
