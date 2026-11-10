# 13. Testing

> Testing đảm bảo mọi thành phần của AssembleUI hoạt động ổn định, nhất quán và không bị ảnh hưởng khi thư viện phát triển. Mỗi Component, Hook, Utility và Pattern đều phải có chiến lược kiểm thử rõ ràng.

---

# Mục tiêu

Hệ thống Testing được xây dựng để:

- Đảm bảo chất lượng mã nguồn.
- Phát hiện lỗi sớm.
- Ngăn Regression.
- Hỗ trợ Refactoring.
- Kiểm tra Accessibility.
- Đảm bảo API ổn định.
- Tăng độ tin cậy của thư viện.

---

# Vai trò trong kiến trúc

```
Source Code

↓

Testing

↓

Build

↓

Release

↓

Application
```

Không có Component nào được phát hành nếu chưa được kiểm thử.

---

# Phạm vi kiểm thử

```
Testing

├── Unit Test
├── Integration Test
├── Accessibility Test
├── Visual Test
├── Performance Test
└── Manual Test
```

---

# Unit Test

Kiểm tra từng thành phần riêng lẻ.

Ví dụ

```
Button

↓

Render

↓

Click

↓

Disabled

↓

Loading
```

Một Unit Test chỉ kiểm tra **một hành vi**.

---

# Integration Test

Kiểm tra nhiều Component hoạt động cùng nhau.

Ví dụ

```
Form

↓

Input

↓

Button

↓

Validation
```

Hoặc

```
Modal

↓

Overlay

↓

Button

↓

Close
```

---

# Accessibility Test

Kiểm tra khả năng truy cập.

Ví dụ

- Keyboard Navigation
- Focus
- ARIA
- Semantic HTML
- Screen Reader

Ví dụ

```
Button

↓

Tab

↓

Enter

↓

Click
```

---

# Visual Test

Kiểm tra giao diện.

Ví dụ

```
Button

↓

Primary

↓

Secondary

↓

Outline

↓

Disabled
```

Mỗi Variant phải hiển thị đúng.

---

# Performance Test

Đánh giá hiệu năng.

Ví dụ

- Render Time
- Re-render
- Bundle Size
- Memory Usage

---

# Manual Test

Một số hành vi vẫn cần kiểm tra thủ công.

Ví dụ

- Responsive
- Animation
- Theme Switching
- Browser Compatibility

---

# Cấu trúc thư mục

Ví dụ

```
Button/

Button.tsx

Button.scss

Button.test.tsx

Button.docs.md

index.ts
```

Hoặc

```
tests/

components/

patterns/

hooks/

utils/
```

---

# Kiểm thử Components

Mỗi Component cần kiểm tra:

- Render thành công.
- Props hoạt động.
- Event hoạt động.
- Style thay đổi đúng.
- Accessibility.

Ví dụ

```
<Button>

↓

Render

↓

Click

↓

Disabled

↓

Loading

↓

Focus
```

---

# Kiểm thử Hooks

Ví dụ

```
useDisclosure()

↓

Open

↓

Close

↓

Toggle
```

Hook không cần kiểm tra giao diện.

Chỉ kiểm tra logic.

---

# Kiểm thử Utils

Utils phải là Pure Function.

Ví dụ

```
merge()

↓

Input

↓

Output
```

Không kiểm tra DOM.

Không kiểm tra React.

---

# Kiểm thử Patterns

Ví dụ

```
Hero

↓

Button

↓

Image

↓

Heading
```

Kiểm tra:

- Render đầy đủ.
- Props hoạt động.
- Responsive.
- Theme.

---

# Kiểm thử Templates

Ví dụ

```
Landing

↓

Header

↓

Hero

↓

Pricing

↓

Footer
```

Đảm bảo mọi Pattern hoạt động cùng nhau.

---

# Kiểm thử Theme

Ví dụ

```
Light

↓

Button

↓

Card

↓

Input
```

```
Dark

↓

Button

↓

Card

↓

Input
```

Component không được thay đổi API khi đổi Theme.

---

# Kiểm thử Responsive

Ví dụ

```
Mobile

↓

Tablet

↓

Desktop
```

Đảm bảo Layout không bị vỡ.

---

# Browser Testing

Hỗ trợ tối thiểu:

- Chrome
- Edge
- Firefox
- Safari

Mọi Component phải có hành vi nhất quán.

---

# Quy trình kiểm thử

```
Source Code

↓

Lint

↓

Unit Test

↓

Integration Test

↓

Accessibility Test

↓

Performance Test

↓

Build
```

Chỉ Build khi tất cả bước đều thành công.

---

# Công cụ khuyến nghị

```
Vitest

React Testing Library

Playwright

Storybook

ESLint

TypeScript
```

Mỗi công cụ phục vụ một mục đích khác nhau.

---

# Quy tắc

## Một Test chỉ kiểm tra một hành vi

Đúng

```
Click

↓

Expect
```

Sai

```
Click

↓

Theme

↓

Animation

↓

API
```

---

## Không kiểm tra Implementation

Đúng

```
Button

↓

Render
```

Sai

```
useState()

↓

State Variable
```

Chỉ kiểm tra hành vi.

---

## Không phụ thuộc Test khác

Mỗi Test phải độc lập.

Có thể chạy riêng.

---

## Test phải có thể lặp lại

Một Test phải cho cùng kết quả ở mọi lần chạy.

Không phụ thuộc:

- Thời gian.
- Internet.
- API bên ngoài.

---

# Coverage

Khuyến nghị:

```
Statements

≥ 90%
```

```
Branches

≥ 85%
```

```
Functions

≥ 90%
```

```
Lines

≥ 90%
```

Coverage cao không thay thế chất lượng Test.

---

# Best Practices

✔ Mỗi Component có Unit Test.

✔ Mỗi Hook có Logic Test.

✔ Mỗi Utility có Pure Function Test.

✔ Mỗi Pattern có Integration Test.

✔ Kiểm tra Accessibility.

✔ Kiểm tra Responsive.

✔ Kiểm tra Theme.

✔ Test độc lập.

✔ Test dễ đọc.

---

# Tóm tắt

Testing là lớp bảo vệ chất lượng của AssembleUI.

```
Source Code

↓

Testing

↓

Build

↓

Release

↓

Application
```

Nhờ chiến lược kiểm thử rõ ràng, AssembleUI có thể phát triển lâu dài mà vẫn giữ được tính ổn định, khả năng mở rộng và sự tin cậy. Mỗi thay đổi đều được xác minh trước khi phát hành, giúp giảm lỗi và đảm bảo trải nghiệm nhất quán cho người sử dụng.
