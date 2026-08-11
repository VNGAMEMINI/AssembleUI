# 02. Architecture

> Kiến trúc là nền tảng quan trọng nhất của AssembleUI. Mọi thành phần trong thư viện đều được xây dựng theo một kiến trúc phân tầng rõ ràng nhằm đảm bảo khả năng mở rộng, tái sử dụng và bảo trì lâu dài.

---

# Triết lý kiến trúc

AssembleUI được thiết kế theo nguyên tắc:

- Mỗi tầng chỉ có **một trách nhiệm duy nhất**.
- Mỗi tầng chỉ phụ thuộc vào tầng bên dưới.
- Không được phép phụ thuộc ngược.
- Thành phần cấp cao chỉ được xây dựng từ thành phần cấp thấp.

Kiến trúc này giúp:

- Dễ mở rộng.
- Dễ kiểm thử.
- Dễ thay thế.
- Dễ tái sử dụng.
- Không gây xung đột.

---

# Tổng quan

```
Application
      ▲
      │
Templates
      ▲
      │
Patterns
      ▲
      │
Components
      ▲
      │
Core
      ▲
      │
Style Engine
      ▲
      │
Design System
      ▲
      │
Foundation
```

Đây là luồng phụ thuộc của toàn bộ AssembleUI.

---

# Các tầng

## 1. Foundation

Đây là tầng thấp nhất của hệ thống.

Nhiệm vụ:

- CSS Reset
- Normalize
- Global Style
- Typography
- Root Variables

Không chứa:

- Component
- Theme
- Hook
- JavaScript

Ví dụ

```
foundation/

reset.scss
normalize.scss
globals.scss
typography.scss
index.scss
```

---

## 2. Design System

Đây là nơi quản lý toàn bộ dữ liệu giao diện.

Bao gồm:

```
Design System

├── Tokens
├── Themes
└── Icons
```

### Tokens

Lưu toàn bộ giá trị thiết kế.

Ví dụ

```
Color

Spacing

Radius

Shadow

Typography

Motion

Breakpoint

Z-index
```

### Themes

Theme chỉ ghi đè Design Tokens.

Không được sửa Component.

```
Light

↓

Primary = Blue
```

```
Dark

↓

Primary = Cyan
```

### Icons

Quản lý toàn bộ Icon của thư viện.

---

## 3. Style Engine

Style Engine chịu trách nhiệm sinh và quản lý CSS.

Không chứa giao diện.

Không chứa React Component.

Bao gồm

```
functions/

mixins/

layouts/

responsive/

utilities/
```

Ví dụ

```
flex()

grid()

stack()

container()

surface()

responsive()
```

Style Engine sử dụng Design Tokens để tạo CSS thống nhất.

---

## 4. Core

Core chứa toàn bộ logic dùng chung.

```
Core

├── Hooks
├── Utils
├── Contexts
└── Providers
```

### Hooks

Ví dụ

```
useTheme()

useToggle()

useDisclosure()

useMediaQuery()

useClickOutside()
```

### Utils

```
classNames()

mergeProps()

debounce()

throttle()
```

### Contexts

```
ThemeContext

LocaleContext

DirectionContext
```

### Providers

```
ThemeProvider

ConfigProvider

LocaleProvider
```

Core không chứa CSS.

Core không chứa Component.

---

## 5. Components

Đây là trái tim của AssembleUI.

Component là đơn vị giao diện có thể tái sử dụng.

```
Components

├── Base
├── Forms
├── Navigation
├── Feedback
├── Overlay
├── Data Display
└── Media
```

Ví dụ

```
Button

Input

Checkbox

Card

Modal

Navbar

Table
```

Component:

- Có Props.
- Có Logic.
- Có Style.
- Có Documentation.
- Có Test.

---

## 6. Patterns

Pattern là tập hợp nhiều Component.

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

Các Pattern phổ biến

```
Header

Hero

Features

Pricing

FAQ

Contact

Footer
```

Pattern không được chứa logic nghiệp vụ của ứng dụng.

Pattern chỉ phục vụ việc lắp ráp giao diện.

---

## 7. Templates

Template là tập hợp nhiều Pattern.

Ví dụ

```
Landing

=

Header

+

Hero

+

Features

+

Pricing

+

FAQ

+

Footer
```

Các Template

```
Landing

Dashboard

Portfolio

Blog

Authentication

Documentation

Admin

Ecommerce
```

Template giúp người dùng tạo nhanh một website hoàn chỉnh.

---

## 8. Application

Đây là dự án của người dùng.

Ví dụ

```
main.jsx

↓

<App/>

↓

LandingTemplate

↓

Browser
```

Application không nằm trong AssembleUI.

Application chỉ sử dụng AssembleUI.

---

# Mối quan hệ giữa các tầng

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

Mỗi tầng chỉ sử dụng API của tầng bên dưới.

---

# Quy tắc phụ thuộc

Được phép

```
Component

↓

Hook

↓

Utils
```

Được phép

```
Pattern

↓

Component
```

Được phép

```
Template

↓

Pattern
```

Không được phép

```
Foundation

↓

Component
```

Không được phép

```
Theme

↓

Button.scss
```

Không được phép

```
Component A

↓

Import Style của Component B
```

---

# Luồng tạo giao diện

```
Design Tokens

↓

Theme

↓

Style Engine

↓

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

Hook

↓

Style Engine

↓

Browser
```

---

# Kiến trúc thư mục

```
packages/
└── react/
    ├── foundation/
    ├── design-system/
    ├── styles/
    ├── core/
    ├── components/
    ├── patterns/
    ├── templates/
    └── index.ts
```

---

# Nguyên tắc thiết kế

Mọi phần của AssembleUI phải tuân thủ các nguyên tắc sau:

- **Single Responsibility**: Mỗi tầng chỉ có một nhiệm vụ.
- **Composition over Configuration**: Ưu tiên ghép các thành phần thay vì tạo cấu hình phức tạp.
- **Design Tokens First**: Không hardcode giá trị giao diện.
- **Theme Driven**: Theme chỉ thay đổi Tokens.
- **Reusable by Default**: Thành phần phải có khả năng tái sử dụng.
- **Performance First**: Tối ưu kích thước bundle và hiệu năng render.
- **Accessibility First**: Ưu tiên khả năng truy cập ngay từ khi thiết kế.

---

# Tóm tắt

Kiến trúc AssembleUI được xây dựng theo mô hình phân tầng:

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

Mỗi tầng có trách nhiệm rõ ràng, phụ thuộc một chiều và hoạt động độc lập. Nhờ đó, AssembleUI có thể phát triển lâu dài mà vẫn giữ được tính nhất quán, hiệu năng và khả năng mở rộng.
