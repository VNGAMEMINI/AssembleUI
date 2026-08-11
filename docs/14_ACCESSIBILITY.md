# 14. Accessibility

> Accessibility (A11y) là một nguyên tắc cốt lõi của AssembleUI. Mọi Component đều phải có khả năng sử dụng bởi **mọi người**, bao gồm người dùng bàn phím, trình đọc màn hình (Screen Reader) và các thiết bị hỗ trợ khác, mà không làm giảm hiệu năng hay khả năng tùy biến của thư viện.

---

# Mục tiêu

Accessibility được xây dựng nhằm:

- Tuân thủ các tiêu chuẩn Web Accessibility.
- Hỗ trợ Screen Reader.
- Hỗ trợ Keyboard Navigation.
- Hỗ trợ Focus Management.
- Sử dụng Semantic HTML.
- Không ảnh hưởng đến hiệu năng.
- Không yêu cầu người dùng cấu hình phức tạp.

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

Accessibility được tích hợp xuyên suốt toàn bộ hệ thống, không phải là một tính năng bổ sung.

---

# Nguyên tắc

```
Accessibility

├── Semantic HTML
├── Keyboard Navigation
├── Focus Management
├── Screen Reader
├── ARIA
├── Color Contrast
├── Motion
└── Responsive
```

---

# Semantic HTML

Luôn sử dụng đúng phần tử HTML.

Đúng

```html
<button>Save</button>

<nav>...</nav>

<header>...</header>

<main>...</main>

<footer>...</footer>
```

Sai

```html
<div onclick="...">
  <div class="button"></div>
</div>
```

Component phải ưu tiên Semantic HTML trước khi sử dụng ARIA.

---

# Keyboard Navigation

Toàn bộ Component phải hoạt động bằng bàn phím.

Ví dụ

```
Tab

↓

Focus

↓

Enter

↓

Space

↓

Esc
```

Ví dụ

```
Modal

↓

Esc

↓

Close
```

```
Menu

↓

Arrow Keys
```

```
Tabs

↓

Left

↓

Right
```

---

# Focus Management

Focus luôn phải rõ ràng.

Ví dụ

```
Button

↓

Focus Visible
```

Modal

```
Open

↓

Focus Modal

↓

Close

↓

Return Focus
```

Không được làm mất Focus của người dùng.

---

# Screen Reader

Mọi Component phải có nội dung đọc được.

Ví dụ

Đúng

```html
<button aria-label="Search"></button>
```

Sai

```html
<button>
  <Icon />
</button>
```

Icon không được là nội dung duy nhất nếu không có nhãn.

---

# ARIA

ARIA chỉ sử dụng khi Semantic HTML không đủ.

Ví dụ

```
aria-label

aria-labelledby

aria-describedby

aria-expanded

aria-hidden

aria-disabled

aria-current

aria-live
```

Không lạm dụng ARIA.

---

# Color Contrast

Theme phải đảm bảo độ tương phản phù hợp.

Ví dụ

```
Text

↓

Background

↓

Đủ độ tương phản
```

Không dùng màu quá nhạt làm nội dung chính.

---

# Motion

Animation không được gây khó chịu.

Ví dụ

```
Fade

↓

Slide

↓

Scale
```

Người dùng nên có thể giảm hoặc tắt Animation thông qua tùy chọn hệ điều hành (`prefers-reduced-motion`).

---

# Responsive

Accessibility phải hoạt động trên mọi thiết bị.

```
Desktop

Tablet

Mobile
```

Không làm mất khả năng sử dụng khi thay đổi kích thước màn hình.

---

# Components

Mỗi Component cần hỗ trợ:

```
Semantic HTML

↓

Keyboard

↓

Focus

↓

ARIA

↓

Screen Reader
```

Ví dụ

```
Button

↓

button

↓

Tab

↓

Enter

↓

Space
```

---

# Forms

Các Component nhập liệu phải có nhãn.

Đúng

```html
<label for="email"> Email </label>

<input id="email" />
```

Sai

```html
<input placeholder="Email" />
```

Placeholder không thay thế Label.

---

# Modal

Modal phải:

```
Open

↓

Trap Focus

↓

Esc

↓

Close

↓

Restore Focus
```

---

# Dropdown

Dropdown phải hỗ trợ:

```
Enter

↓

Open

↓

Arrow Keys

↓

Select

↓

Esc
```

---

# Tooltip

Tooltip không được chỉ xuất hiện khi Hover.

Người dùng bàn phím cũng phải truy cập được.

---

# Loading

Spinner hoặc Progress cần cung cấp trạng thái.

Ví dụ

```
Loading

↓

aria-live
```

Người dùng Screen Reader phải biết ứng dụng đang xử lý.

---

# Theme

Theme không được làm mất khả năng truy cập.

Ví dụ

Sai

```
Text

↓

Gray

↓

Gray Background
```

Đúng

```
Text

↓

Đủ Contrast
```

---

# Testing

Accessibility phải được kiểm thử.

Kiểm tra:

- Keyboard Navigation
- Focus Order
- ARIA
- Semantic HTML
- Screen Reader
- Contrast
- Responsive

---

# Quy tắc

## Ưu tiên Semantic HTML

Đúng

```html
<button></button>
```

Sai

```html
<div role="button"></div>
```

---

## Không loại bỏ Focus

Sai

```css
outline: none;
```

Đúng

```css
:focus-visible {
  outline: 2px solid var(--aui-color-primary);
}
```

---

## Label luôn rõ ràng

Đúng

```html
<label>Password</label>
```

Sai

```html
<input placeholder="Password" />
```

---

## Không phụ thuộc chuột

Mọi chức năng phải sử dụng được bằng:

- Keyboard
- Touch
- Screen Reader

---

## Không dùng màu làm tín hiệu duy nhất

Sai

```
Đỏ

↓

Lỗi
```

Đúng

```
Đỏ

+

Icon

+

Thông báo
```

---

# Checklist

Mỗi Component phải đảm bảo:

- Semantic HTML
- Keyboard Navigation
- Focus Management
- ARIA phù hợp
- Screen Reader
- Contrast đạt yêu cầu
- Responsive
- Motion an toàn
- Không mất Focus

---

# Best Practices

✔ Ưu tiên Semantic HTML.

✔ Chỉ dùng ARIA khi cần.

✔ Hỗ trợ Keyboard đầy đủ.

✔ Focus luôn hiển thị rõ ràng.

✔ Có Label cho Form.

✔ Theme đảm bảo Contrast.

✔ Hỗ trợ `prefers-reduced-motion`.

✔ Kiểm thử Accessibility thường xuyên.

---

# Tóm tắt

Accessibility không phải là một tính năng riêng biệt mà là một nguyên tắc thiết kế xuyên suốt AssembleUI.

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

Nhờ tích hợp Accessibility ngay từ đầu, AssembleUI giúp mọi Component có thể sử dụng bởi nhiều đối tượng người dùng khác nhau, đáp ứng các tiêu chuẩn hiện đại về khả năng truy cập, đồng thời vẫn giữ được hiệu năng, tính linh hoạt và khả năng tùy biến của thư viện.
