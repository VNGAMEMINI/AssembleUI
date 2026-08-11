# 11. Performance

> Performance là một trong những nguyên tắc cốt lõi của AssembleUI. Mọi quyết định về kiến trúc, Component, CSS và API đều phải hướng đến mục tiêu **nhanh hơn, nhẹ hơn và ít tài nguyên hơn**.

---

# Mục tiêu

Performance hướng tới:

- Bundle nhỏ.
- Render nhanh.
- Re-render tối thiểu.
- CSS nhỏ.
- Tree Shaking hiệu quả.
- Lazy Loading.
- Runtime nhẹ.
- Trải nghiệm người dùng mượt mà.

---

# Triết lý

AssembleUI không theo hướng:

> Có nhiều Component nhất.

Mà theo hướng:

> Component nhỏ, tái sử dụng cao, ít chi phí nhất.

---

# Hiệu năng trong kiến trúc

```
Foundation
      │
      ▼
Design Tokens
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

Mỗi tầng đều phải tối ưu.

---

# Mục tiêu tối ưu

```
Performance

├── Bundle Size
├── CSS Size
├── Rendering
├── Runtime
├── Memory
├── Loading
└── Developer Experience
```

---

# Bundle Size

AssembleUI chỉ đóng gói những gì người dùng sử dụng.

Ví dụ

```tsx
import {

    Button

} from "@assembleui/react";
```

Bundle sẽ chỉ chứa

```
Button

+

Dependencies của Button
```

Không chứa

```
Modal

Table

Carousel

Timeline
```

---

# Tree Shaking

Mỗi Component phải độc lập.

Ví dụ

```
components/

Button/

Input/

Card/

Modal/
```

Nếu không import

```
Modal
```

thì Modal sẽ không xuất hiện trong Bundle.

---

# Code Splitting

Các Pattern và Template nên hỗ trợ Lazy Loading.

Ví dụ

```tsx
const Dashboard = lazy(() =>
    import("./Dashboard")
);
```

Chỉ tải khi cần.

---

# CSS tối ưu

AssembleUI chỉ import Style **một lần**.

```tsx
import "@assembleui/react/styles";
```

Không import

```tsx
import "./Button.scss";
```

trong từng Component.

Điều này giúp:

- Không trùng CSS.
- Bundle nhỏ hơn.
- Tăng tốc độ Build.

---

# Design Tokens

Component không Hardcode.

Ví dụ

Sai

```scss
padding:16px;
```

Đúng

```scss
padding:spacing(md);
```

Điều này giúp giảm CSS trùng lặp.

---

# Style Reuse

Style Engine sinh CSS dùng chung.

Ví dụ

```
Button

↓

@include flex()

↓

Button CSS
```

```
Input

↓

@include flex()

↓

Input CSS
```

Không viết Flex nhiều lần.

---

# Rendering

Component phải Render tối thiểu.

Ví dụ

```
Button

↓

State thay đổi

↓

Button Render
```

Không được

```
Button

↓

Toàn bộ Website Render
```

---

# Re-render

Hạn chế Re-render không cần thiết.

Ví dụ

```
Parent

↓

Button

↓

Input
```

Nếu Button thay đổi

Input không được Render lại.

---

# React.memo

Những Component phù hợp nên hỗ trợ

```tsx
memo(Button)
```

để tránh Render lại.

---

# Stable Props

Props nên ổn định.

Sai

```tsx
<Button

    style={{

        color:"red"

    }}

/>
```

Đúng

```tsx
const style = {

    color:"red"

};

<Button

    style={style}

/>
```

---

# Stable Callback

Sử dụng

```
useCallback()
```

khi cần.

Ví dụ

```tsx
const handleClick =
useCallback(

()=>{

},

[]);
```

---

# Memoization

Các phép tính lớn nên sử dụng

```
useMemo()
```

Ví dụ

```
Filter

↓

Sort

↓

Grouping
```

Không tính toán lại mỗi lần Render.

---

# DOM

Giảm số lượng DOM.

Ví dụ

Sai

```
<div>

<div>

<div>

<Button/>

</div>

</div>

</div>
```

Đúng

```
<Button/>
```

---

# State

State nên đặt gần nơi sử dụng.

Sai

```
App

↓

State

↓

100 Components
```

Đúng

```
Button

↓

State
```

---

# Event

Không tạo Function mới liên tục.

Sai

```tsx
<Button

onClick={()=>{

}}

/>
```

Đúng

```tsx
<Button

onClick={handleClick}

/>
```

---

# Hooks

Hook chỉ thực hiện một nhiệm vụ.

Ví dụ

```
useDisclosure()

useClipboard()

useTheme()
```

Không tạo Hook quá lớn.

---

# Lazy Loading

Pattern

```
Hero
```

không cần Lazy.

Template

```
Dashboard
```

nên Lazy.

---

# Icons

Chỉ import Icon cần dùng.

Đúng

```tsx
import {

    SearchIcon

} from "@assembleui/react";
```

Không import toàn bộ bộ Icon.

---

# Images

Không nhúng ảnh vào Component.

Component chỉ nhận

```
src
```

---

# Memory

Không lưu dữ liệu lớn trong Component.

Ví dụ

Sai

```
10000 records
```

trong State.

---

# Accessibility và Performance

Accessibility không được đánh đổi Performance.

Performance cũng không được làm giảm Accessibility.

Hai yếu tố này phải luôn song hành.

---

# Quy tắc

## Một Component = Một nhiệm vụ

Component nhỏ sẽ:

- Render nhanh hơn.
- Test dễ hơn.
- Tree Shake tốt hơn.

---

## Không Hardcode

Sai

```scss
padding:12px;
```

Đúng

```scss
padding:spacing(md);
```

---

## Không import thừa

Sai

```tsx
import * from "@assembleui/react";
```

Đúng

```tsx
import {

Button

} from "@assembleui/react";
```

---

## Không tạo CSS trùng

Sai

```
Button.scss

↓

Flex CSS
```

```
Input.scss

↓

Flex CSS
```

Đúng

```
Style Engine

↓

Flex()

↓

Button

↓

Input
```

---

# Checklist

Mỗi Component phải đảm bảo:

- Tree Shaking
- Memo hóa khi cần
- Props ổn định
- Callback ổn định
- CSS tái sử dụng
- Không Hardcode
- Không tạo DOM dư thừa
- Không Re-render không cần thiết
- Không tạo Side Effects

---

# Best Practices

✔ Component nhỏ.

✔ CSS dùng chung.

✔ Style chỉ import một lần.

✔ Tree Shaking.

✔ Lazy Loading.

✔ Stable Props.

✔ Stable Callback.

✔ Memoization khi cần.

✔ Không Render dư.

✔ Không tạo CSS dư.

---

# Tóm tắt

Performance không phải là bước tối ưu sau cùng, mà là nguyên tắc xuyên suốt toàn bộ AssembleUI.

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

Mỗi tầng đều được thiết kế để giảm chi phí tải, giảm kích thước Bundle, hạn chế CSS dư thừa và tối ưu quá trình Render. Nhờ đó, AssembleUI có thể xây dựng các ứng dụng lớn với hiệu năng ổn định, khả năng mở rộng cao và trải nghiệm người dùng mượt mà.
