# 06. Components

> Components là trung tâm của AssembleUI. Đây là các thành phần giao diện có thể tái sử dụng, được xây dựng dựa trên Foundation, Design System, Style Engine và Core để người dùng chỉ cần lắp ráp chúng thành Pattern và Template.

---

# Mục tiêu

Components được thiết kế để:

- Có khả năng tái sử dụng cao.
- Có API nhất quán.
- Hỗ trợ Theme.
- Hỗ trợ Design Tokens.
- Dễ mở rộng.
- Dễ kiểm thử.
- Dễ bảo trì.
- Có hiệu năng cao.

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

Components là cầu nối giữa hệ thống thiết kế và giao diện thực tế.

---

# Kiến trúc Components

```
Components
│
├── Base
│
├── Forms
│
├── Navigation
│
├── Feedback
│
├── Overlay
│
├── Data Display
│
└── Media
```

Mỗi nhóm có trách nhiệm riêng.

---

# 1. Base

Base là các Component nền tảng.

Chúng không mang ý nghĩa nghiệp vụ.

Chúng chỉ cung cấp khả năng bố cục.

Ví dụ

```
Base

├── Box
├── Flex
├── Grid
├── Stack
├── Container
├── Spacer
├── AspectRatio
└── Text
```

Ví dụ

```
<Box>

<Flex>

<Grid>

<Text>
```

Các Component khác đều có thể sử dụng Base.

---

# 2. Forms

Các Component nhập dữ liệu.

```
Forms

├── Button
├── IconButton
├── Input
├── Password
├── Textarea
├── Checkbox
├── Radio
├── Switch
├── Select
├── Slider
├── Search
└── Form
```

Ví dụ

```
<Button>

<Input>

<Select>
```

---

# 3. Navigation

Điều hướng.

```
Navigation

├── Navbar
├── Sidebar
├── Tabs
├── Breadcrumb
├── Pagination
├── Menu
├── Dropdown
└── Stepper
```

---

# 4. Feedback

Thông báo trạng thái.

```
Feedback

├── Alert
├── Toast
├── Progress
├── Spinner
├── Skeleton
└── EmptyState
```

---

# 5. Overlay

Các lớp phủ giao diện.

```
Overlay

├── Modal
├── Dialog
├── Drawer
├── Popover
├── Tooltip
└── ContextMenu
```

---

# 6. Data Display

Hiển thị dữ liệu.

```
Data Display

├── Card
├── Table
├── Accordion
├── Timeline
├── Tree
├── Statistic
├── List
└── DescriptionList
```

---

# 7. Media

Hiển thị phương tiện.

```
Media

├── Avatar
├── AvatarGroup
├── Image
├── Gallery
├── Carousel
├── Video
└── Icon
```

---

# Cấu trúc Component

Ví dụ Button

```
Button/

Button.tsx

Button.scss

Button.test.tsx

Button.docs.md

index.ts
```

Mỗi Component đều có cấu trúc giống nhau.

---

# Thành phần bên trong Component

```
Component
│
├── Props
├── Logic
├── Style
├── Accessibility
├── Documentation
└── Tests
```

---

## Props

Component phải có API rõ ràng.

Ví dụ

```tsx
<Button variant="primary" size="md" disabled>
  Save
</Button>
```

---

## Logic

Logic sử dụng Core.

Ví dụ

```
useTheme()

useDisclosure()

classNames()
```

Component không được tự tạo Utility riêng.

---

## Style

Style luôn lấy dữ liệu từ Style Engine.

```
Button.scss

↓

Mixins

↓

Functions

↓

Design Tokens
```

Không Hardcode.

Sai

```scss
padding: 12px;
```

Đúng

```scss
padding: spacing(md);
```

---

## Accessibility

Mọi Component đều phải hỗ trợ

- Keyboard
- Focus
- Screen Reader
- ARIA
- Semantic HTML

Ví dụ

```
Button

↓

<button>

↓

aria-disabled

↓

focus-visible
```

---

## Documentation

Mỗi Component đều có tài liệu riêng.

Ví dụ

```
Button.docs.md
```

Bao gồm

- Mục đích
- Props
- Ví dụ
- Accessibility
- Best Practices

---

## Tests

Mỗi Component đều có Unit Test.

Ví dụ

```
Button.test.tsx
```

Kiểm tra

- Render
- Props
- Events
- Accessibility

---

# Mối quan hệ

```
Foundation

↓

Design System

↓

Style Engine

↓

Core

↓

Component
```

Component không truy cập trực tiếp Theme.

Component không truy cập Foundation.

Component chỉ sử dụng API công khai.

---

# Quan hệ giữa các Component

```
Base

↓

Forms

↓

Navigation

↓

Feedback

↓

Overlay

↓

Data Display

↓

Media
```

Ví dụ

```
Card

↓

Button

↓

Text

↓

Image
```

---

# Component Composition

Component được tạo bằng cách ghép các Component nhỏ hơn.

Ví dụ

```
Card

↓

Box

↓

Text

↓

Button

↓

Image
```

Modal

```
Modal

↓

Overlay

↓

Card

↓

Button
```

Navbar

```
Navbar

↓

Container

↓

Flex

↓

Button
```

---

# Quy tắc thiết kế

## Một Component chỉ có một nhiệm vụ

Đúng

```
Button

↓

Click
```

Sai

```
Button

↓

Click

↓

Form Validation

↓

API Request
```

---

## Không phụ thuộc lẫn nhau

Sai

```
Button

↓

import Modal
```

Đúng

```
Pattern

↓

Button

↓

Modal
```

---

## Không Hardcode

Sai

```scss
background: #2563eb;
```

Đúng

```scss
background: color(primary);
```

---

## Không import CSS của Component khác

Sai

```
Button.scss

↓

Card.scss
```

Đúng

```
Button.scss

↓

Style Engine
```

---

# Luồng tạo giao diện

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

---

# Best Practices

✔ Component chỉ giải quyết một vấn đề.

✔ API ngắn gọn và nhất quán.

✔ Luôn sử dụng Design Tokens.

✔ Luôn sử dụng Style Engine.

✔ Không viết CSS trùng lặp.

✔ Không Hardcode.

✔ Không chứa Business Logic.

✔ Có Test.

✔ Có Documentation.

✔ Hỗ trợ Accessibility.

---

# Tóm tắt

Components là các khối xây dựng của AssembleUI.

```
Base Components

↓

UI Components

↓

Patterns

↓

Templates

↓

Application
```

Mỗi Component được xây dựng trên cùng một nền tảng gồm Foundation, Design System, Style Engine và Core. Nhờ đó, mọi Component đều có API nhất quán, giao diện đồng bộ, dễ tái sử dụng và có thể lắp ráp với nhau để tạo thành các Pattern và Template hoàn chỉnh.
