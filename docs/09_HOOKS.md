# 09. Core

> Core là tầng chứa toàn bộ logic dùng chung của AssembleUI. Đây là nơi tập trung các **Hooks**, **Utilities**, **Contexts** và **Providers**, giúp Components luôn đơn giản, nhất quán và dễ bảo trì.

---

# Mục tiêu

Core được xây dựng để:

- Tái sử dụng logic.
- Giảm lặp mã.
- Tách UI khỏi Logic.
- Dễ kiểm thử.
- Dễ mở rộng.
- Dễ bảo trì.
- Không phụ thuộc vào Component.

Core **không chứa**:

- JSX
- CSS
- SCSS
- Component
- Pattern
- Template

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

Core cung cấp các chức năng chung cho toàn bộ thư viện.

---

# Cấu trúc thư mục

```
core/

├── hooks/
│
├── utils/
│
├── contexts/
│
├── providers/
│
└── index.ts
```

---

# Tổng quan

```
Core

├── Hooks
├── Utils
├── Contexts
└── Providers
```

Mỗi phần chỉ có một nhiệm vụ.

---

# Hooks

Hooks chứa các Custom Hooks dùng chung.

Ví dụ

```
hooks/

├── useTheme.ts
├── useDisclosure.ts
├── useMediaQuery.ts
├── useClickOutside.ts
├── useFocusTrap.ts
├── useClipboard.ts
├── useDebounce.ts
├── useThrottle.ts
└── index.ts
```

Ví dụ

```tsx
const {

    open,

    close,

    toggle

} = useDisclosure();
```

Hooks không được Render UI.

---

# Utils

Utilities là các hàm thuần (Pure Functions).

Ví dụ

```
utils/

├── classNames.ts
├── mergeRefs.ts
├── debounce.ts
├── throttle.ts
├── clamp.ts
├── uniqueId.ts
├── isNumber.ts
├── isString.ts
└── index.ts
```

Ví dụ

```tsx
classNames(

    "button",

    active && "active"

);
```

Utilities không phụ thuộc React.

---

# Contexts

Contexts dùng để chia sẻ trạng thái toàn cục.

Ví dụ

```
contexts/

├── ThemeContext.ts
├── ConfigContext.ts
├── LocaleContext.ts
├── DirectionContext.ts
└── index.ts
```

Ví dụ

```tsx
const theme = useContext(
    ThemeContext
);
```

Contexts không chứa giao diện.

---

# Providers

Providers khởi tạo và cung cấp Context.

Ví dụ

```
providers/

├── ThemeProvider.tsx
├── ConfigProvider.tsx
├── LocaleProvider.tsx
└── index.ts
```

Ví dụ

```tsx
<ThemeProvider>

    <App/>

</ThemeProvider>
```

Provider chỉ quản lý dữ liệu.

Không hiển thị giao diện.

---

# Quan hệ giữa các thành phần

```
Provider

↓

Context

↓

Hook

↓

Component
```

Ví dụ

```
ThemeProvider

↓

ThemeContext

↓

useTheme()

↓

Button
```

---

# Luồng hoạt động

```
Application

↓

Provider

↓

Context

↓

Hook

↓

Component
```

---

# Nguyên tắc thiết kế

## Hooks

Hooks chỉ chứa logic.

Đúng

```tsx
const open = useDisclosure();
```

Sai

```tsx
function useModal(){

    return <Modal/>

}
```

---

## Utils

Utils phải là Pure Function.

Đúng

```ts
mergeRefs();
```

Sai

```ts
document.body.style...
```

---

## Context

Context chỉ lưu trạng thái dùng chung.

Ví dụ

```
Theme

Locale

Direction

Config
```

Không lưu State của từng Component.

---

## Provider

Provider chỉ khởi tạo Context.

Không chứa Business Logic.

Không Render UI.

---

# Mối quan hệ với Components

```
Component

↓

Hook

↓

Context

↓

Provider
```

Component không truy cập Context trực tiếp nếu đã có Hook tương ứng.

Ví dụ

Đúng

```tsx
const theme = useTheme();
```

Sai

```tsx
const theme = useContext(
    ThemeContext
);
```

---

# Mối quan hệ với Design System

```
Design Tokens

↓

Theme

↓

ThemeProvider

↓

useTheme()

↓

Component
```

Core không biết Design Tokens.

Core chỉ quản lý trạng thái.

---

# Mối quan hệ với Style Engine

```
Style Engine

↓

Component

↓

Hook
```

Core không sinh CSS.

Core không import SCSS.

---

# Quy tắc

## Không import Component

Sai

```
useTheme

↓

Button
```

Đúng

```
Button

↓

useTheme
```

---

## Không import SCSS

Sai

```ts
import "./button.scss";
```

Core không chứa CSS.

---

## Không chứa JSX

Sai

```tsx
return <Button/>
```

Core không Render Component.

---

## Không chứa Business Logic

Core chỉ giải quyết các vấn đề chung.

Ví dụ

- Theme
- Responsive
- Clipboard
- Focus
- Toggle

Không xử lý:

- Login
- Payment
- API
- Database

---

# Best Practices

✔ Hooks chỉ chứa logic.

✔ Utils là Pure Functions.

✔ Context chỉ lưu trạng thái toàn cục.

✔ Provider chỉ khởi tạo Context.

✔ Không phụ thuộc Component.

✔ Không chứa CSS.

✔ Không chứa JSX.

✔ Có Unit Test.

✔ Có Documentation.

---

# Tóm tắt

Core là tầng chứa toàn bộ logic dùng chung của AssembleUI.

```
Core

├── Hooks
├── Utils
├── Contexts
└── Providers

↓

Components

↓

Patterns

↓

Templates

↓

Application
```

Nhờ tách riêng logic khỏi giao diện, Components trong AssembleUI luôn tập trung vào việc hiển thị UI, trong khi Core chịu trách nhiệm cung cấp các chức năng dùng chung. Điều này giúp thư viện có kiến trúc rõ ràng, dễ mở rộng và dễ bảo trì trong thời gian dài.
