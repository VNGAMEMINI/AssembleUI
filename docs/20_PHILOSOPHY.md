# 20. Philosophy

> Philosophy là tài liệu mô tả tư tưởng cốt lõi của AssembleUI. Đây không phải là tài liệu kỹ thuật, mà là kim chỉ nam cho mọi quyết định về kiến trúc, API, Component, Style và toàn bộ hệ sinh thái. Nếu một tính năng mới đi ngược lại các nguyên tắc trong tài liệu này, tính năng đó nên được xem xét lại.

---

# Mục tiêu

Philosophy được xây dựng để:

- Định hướng phát triển lâu dài.
- Giữ sự nhất quán trong toàn bộ dự án.
- Hỗ trợ Contributor đưa ra quyết định đúng.
- Tránh mở rộng thư viện thiếu kiểm soát.
- Xây dựng một hệ sinh thái có khả năng phát triển trong nhiều năm.

---

# Tầm nhìn

AssembleUI không chỉ là một thư viện Component.

AssembleUI hướng tới việc trở thành một **UI Platform** hoàn chỉnh.

```
Developer

↓

Design System

↓

Components

↓

Patterns

↓

Templates

↓

Application

↓

Production
```

Người dùng chỉ tập trung xây dựng sản phẩm, không phải xây dựng lại hệ thống giao diện.

---

# Sứ mệnh

AssembleUI giúp lập trình viên:

- Xây dựng giao diện nhanh hơn.
- Dễ bảo trì hơn.
- Dễ mở rộng hơn.
- Dễ tái sử dụng hơn.
- Đồng bộ giữa Design và Development.

---

# Giá trị cốt lõi

```
Simple

↓

Reusable

↓

Composable

↓

Flexible

↓

Performant

↓

Scalable
```

Đây là sáu giá trị quan trọng nhất của AssembleUI.

---

# 1. Simplicity

Mọi API đều phải đơn giản.

Ví dụ

Đúng

```tsx
<Button>

Save

</Button>
```

Sai

```tsx
<Button

text="Save"

content="Save"

label="Save"

/>
```

Nếu có hai cách làm.

Luôn chọn cách đơn giản hơn.

---

# 2. Reusability

Không viết lại cùng một giao diện nhiều lần.

```
Button

↓

Pattern

↓

Template

↓

Application
```

Mọi thành phần đều phải có khả năng tái sử dụng.

---

# 3. Composition

AssembleUI không xây dựng các Component khổng lồ.

Mọi thứ đều được ghép từ các phần nhỏ.

```
Button

↓

Card

↓

Form

↓

Authentication

↓

Dashboard
```

Mỗi tầng chỉ lắp ráp tầng phía dưới.

---

# 4. Flexibility

Người dùng phải có quyền tùy biến.

Ví dụ

```
Theme

↓

Tokens

↓

Component

↓

Application
```

Không ép buộc:

- Màu sắc.
- Typography.
- Khoảng cách.
- Border.
- Shadow.

Mọi thứ đều có thể thay đổi thông qua Design Tokens.

---

# 5. Performance

Hiệu năng không phải bước tối ưu cuối cùng.

Hiệu năng được thiết kế ngay từ đầu.

```
Foundation

↓

Design Tokens

↓

Style Engine

↓

Component

↓

Render
```

Mỗi tầng đều phải tối ưu.

---

# 6. Scalability

Một dự án nhỏ.

↓

Có thể phát triển thành.

↓

Một hệ thống lớn.

↓

Mà không cần thay đổi kiến trúc.

---

# Một chiều

AssembleUI chỉ cho phép Dependency một chiều.

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

Không import ngược.

---

# Một nhiệm vụ

Mỗi tầng chỉ giải quyết một nhiệm vụ.

Ví dụ

```
Foundation

↓

CSS Foundation
```

```
Design System

↓

Tokens
```

```
Style Engine

↓

CSS
```

```
Core

↓

Logic
```

```
Components

↓

UI
```

---

# Không Hardcode

Sai

```scss
color:#2563eb;
```

Đúng

```scss
color:var(--aui-color-primary);
```

Mọi giá trị đều phải đi qua Design Tokens.

---

# Style không thuộc Component

Component không quản lý Style.

```
Design Tokens

↓

Theme

↓

Style Engine

↓

Component
```

Component chỉ Render giao diện.

---

# Logic không thuộc UI

```
Hook

↓

Logic
```

```
Component

↓

Render
```

Không trộn lẫn hai nhiệm vụ.

---

# Theme là dữ liệu

Theme không phải CSS.

Theme chỉ Override Token.

```
Default Tokens

↓

Dark Theme

↓

Corporate Theme

↓

Custom Theme
```

---

# Component là Lego

Component giống như các khối Lego.

```
Button

Input

Card

Avatar

↓

Pattern

↓

Template

↓

Application
```

Có thể ghép theo vô số cách.

---

# Pattern là giải pháp

Pattern không phải Component lớn.

Pattern chỉ là cách kết hợp các Component.

Ví dụ

```
Hero

↓

Heading

↓

Button

↓

Image
```

---

# Template là sản phẩm

Template là một trang hoàn chỉnh.

Ví dụ

```
Landing

Dashboard

Store

Portfolio
```

Template không chứa Business Logic.

---

# Documentation là một phần của mã nguồn

Nếu một Component chưa có tài liệu.

=> Component chưa hoàn thành.

Documentation phải phát triển song song với Code.

---

# Testing là bắt buộc

Nếu chưa có Test.

=> Chưa Merge.

---

# Accessibility không phải tùy chọn

Mọi Component đều phải:

- Keyboard Friendly.
- Screen Reader Friendly.
- Semantic HTML.
- Focus Management.

Không được hy sinh Accessibility để đổi lấy giao diện.

---

# Performance không được đánh đổi

Không thêm tính năng nếu:

- Làm Bundle lớn.
- Làm Render chậm.
- Làm API phức tạp.

---

# API phải ổn định

Nếu đã phát hành.

Không thay đổi API khi không thật sự cần.

Ưu tiên:

```
Backward Compatible
```

---

# Contributor

Mọi Contributor đều phải hiểu:

```
Tại sao

↓

Mới đến

↓

Làm như thế nào
```

Không chỉ viết Code.

Mà còn phải hiểu triết lý của dự án.

---

# Những điều AssembleUI không theo đuổi

AssembleUI không hướng tới:

- Framework Fullstack.
- State Management.
- Router.
- Backend.
- CMS.
- ORM.
- UI Builder độc quyền.

AssembleUI chỉ tập trung vào **UI**.

---

# Nguyên tắc ra quyết định

Khi xuất hiện nhiều lựa chọn.

Luôn ưu tiên theo thứ tự:

```
Đơn giản

↓

Nhất quán

↓

Tái sử dụng

↓

Hiệu năng

↓

Khả năng mở rộng

↓

Tính năng mới
```

Nếu một tính năng làm giảm ba nguyên tắc đầu.

=> Không nên thêm.

---

# Triết lý phát triển

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

↓

Ecosystem
```

Không bỏ qua bất kỳ tầng nào.

---

# Tầm nhìn dài hạn

```
AssembleUI

↓

Library

↓

Platform

↓

Ecosystem

↓

Community
```

Mục tiêu cuối cùng không phải có nhiều Component nhất.

Mà là xây dựng một nền tảng UI có thể sử dụng trong nhiều năm, dễ mở rộng, dễ bảo trì và đủ linh hoạt để thích ứng với các nhu cầu phát triển của cộng đồng.

---

# Checklist

Mọi quyết định trong AssembleUI nên trả lời được các câu hỏi sau:

- Có đơn giản hơn không?
- Có thể tái sử dụng không?
- Có tuân thủ kiến trúc không?
- Có làm API nhất quán hơn không?
- Có ảnh hưởng đến hiệu năng không?
- Có tăng khả năng mở rộng không?
- Có dễ bảo trì trong tương lai không?

Nếu câu trả lời là **không**, quyết định đó cần được xem xét lại.

---

# Tóm tắt

Philosophy là nền tảng tư duy của AssembleUI.

```
Simple
      ↓
Reusable
      ↓
Composable
      ↓
Flexible
      ↓
Performant
      ↓
Scalable
```

Toàn bộ Foundation, Design System, Style Engine, Core, Components, Patterns, Templates và Ecosystem đều được xây dựng dựa trên sáu giá trị này. Chúng không chỉ định hình cách viết mã nguồn mà còn định hướng mọi quyết định về kiến trúc, API và sự phát triển lâu dài của AssembleUI.
