# 10. Utils

> Utils là tập hợp các **Pure Functions** dùng chung trong AssembleUI. Chúng giải quyết các tác vụ nhỏ, độc lập, không phụ thuộc React và có thể được sử dụng ở bất kỳ đâu trong thư viện.

---

# Mục tiêu

Utils được xây dựng để:

- Giảm lặp mã.
- Tăng khả năng tái sử dụng.
- Dễ kiểm thử.
- Không phụ thuộc React.
- Không phụ thuộc Component.
- Có hiệu năng cao.

Utils **không chứa**:

- JSX
- Component
- Hook
- Context
- Provider
- CSS
- SCSS
- Business Logic

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
      ├── Hooks
      ├── Contexts
      ├── Providers
      └── Utils
      │
      ▼
Components
```

Utils là tầng thấp nhất trong Core.

---

# Cấu trúc thư mục

```
core/

utils/

├── classNames.ts
├── mergeRefs.ts
├── composeRefs.ts
├── debounce.ts
├── throttle.ts
├── uniqueId.ts
├── clamp.ts
├── isArray.ts
├── isBoolean.ts
├── isFunction.ts
├── isNumber.ts
├── isObject.ts
├── isString.ts
├── omit.ts
├── pick.ts
├── merge.ts
├── deepMerge.ts
├── sleep.ts
├── noop.ts
└── index.ts
```

---

# Phân loại Utils

```
Utils

├── Object
├── Array
├── String
├── Number
├── Function
├── DOM
├── React Helpers
└── General
```

---

# Object

Ví dụ

```
merge()

deepMerge()

pick()

omit()
```

Không làm thay đổi Object gốc.

Ví dụ

```ts
const result = merge(a, b);
```

---

# Array

Ví dụ

```
unique()

compact()

chunk()

flatten()

groupBy()
```

Các hàm luôn trả về Array mới.

---

# String

Ví dụ

```
capitalize()

camelCase()

kebabCase()

snakeCase()

trim()

truncate()
```

Không thay đổi String gốc.

---

# Number

Ví dụ

```
clamp()

round()

random()

between()
```

Ví dụ

```ts
clamp(value, 0, 100);
```

---

# Function

Ví dụ

```
debounce()

throttle()

once()

memoize()
```

Các hàm này tối ưu hiệu năng.

---

# DOM

Chỉ chứa các helper đơn giản.

Ví dụ

```
getScrollbarWidth()

isBrowser()

isTouchDevice()
```

Không thao tác trực tiếp với giao diện.

---

# React Helpers

Các helper hỗ trợ React nhưng không phụ thuộc React.

Ví dụ

```
mergeRefs()

composeRefs()

classNames()

createDisplayName()
```

Ví dụ

```ts
classNames(
  "button",

  active && "active",

  disabled && "disabled",
);
```

---

# General

Các hàm dùng chung.

Ví dụ

```
sleep()

noop()

uniqueId()

uuid()
```

Ví dụ

```ts
await sleep(300);
```

---

# index.ts

Điểm vào của toàn bộ Utils.

Ví dụ

```ts
export * from "./classNames";
export * from "./mergeRefs";
export * from "./debounce";
export * from "./throttle";
```

Người dùng chỉ import từ:

```ts
import { classNames, debounce } from "@assembleui/react";
```

---

# Luồng hoạt động

```
Utils

↓

Hooks

↓

Components

↓

Patterns

↓

Templates
```

Utils không phụ thuộc tầng nào phía trên.

---

# Ví dụ

Button

```
Button

↓

classNames()

↓

mergeRefs()

↓

debounce()
```

Component chỉ gọi Utils.

Không viết lại các hàm này.

---

# Nguyên tắc thiết kế

## Pure Function

Đúng

```ts
function clamp() {
  return value;
}
```

Sai

```ts
document.body.innerHTML = "...";
```

Utils không được tạo Side Effects.

---

## Immutable

Sai

```ts
array.push(...)
```

Đúng

```ts
return [...array];
```

Không thay đổi dữ liệu đầu vào.

---

## Không phụ thuộc React

Sai

```tsx
useState();
```

Đúng

```ts
function merge() {}
```

Utils phải có thể sử dụng trong JavaScript thuần.

---

## Một chức năng duy nhất

Đúng

```
debounce()
```

Sai

```
debounce()

↓

call API

↓

update DOM
```

Mỗi Utils chỉ làm một việc.

---

## Không chứa Business Logic

Sai

```
login()

payment()

checkout()
```

Đúng

```
merge()

debounce()

classNames()
```

---

# Mối quan hệ

```
Utils

↓

Hooks

↓

Components

↓

Patterns

↓

Templates
```

Hooks có thể sử dụng Utils.

Components có thể sử dụng Utils.

Utils không được import ngược.

---

# Best Practices

✔ Luôn viết Pure Function.

✔ Không thay đổi dữ liệu đầu vào.

✔ Không phụ thuộc React.

✔ Không chứa JSX.

✔ Không chứa CSS.

✔ Một Utils chỉ giải quyết một vấn đề.

✔ Có Unit Test.

✔ Có Documentation.

✔ Có TypeScript Definition.

---

# Ví dụ sử dụng

```tsx
import { classNames } from "@assembleui/react";

const classes = classNames(
  "aui-button",

  active && "is-active",

  disabled && "is-disabled",
);
```

---

# Tóm tắt

Utils là nền tảng cho toàn bộ logic dùng chung trong AssembleUI.

```
Utils

↓

Hooks

↓

Components

↓

Patterns

↓

Templates

↓

Application
```

Nhờ sử dụng các Pure Functions nhỏ gọn, AssembleUI giảm đáng kể mã lặp, tăng khả năng tái sử dụng và giữ cho Components luôn tập trung vào việc hiển thị giao diện thay vì xử lý các tác vụ hỗ trợ.
