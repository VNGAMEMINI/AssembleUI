# 15. Contributing

> Contributing mô tả quy trình đóng góp vào AssembleUI. Mục tiêu là giúp mọi Contributor phát triển thư viện theo cùng một tiêu chuẩn về kiến trúc, chất lượng mã nguồn và tài liệu, đảm bảo AssembleUI luôn nhất quán và dễ bảo trì.

---

# Mục tiêu

Contributing được xây dựng để:

- Chuẩn hóa quy trình phát triển.
- Đảm bảo kiến trúc thống nhất.
- Dễ Review.
- Dễ mở rộng.
- Dễ bảo trì.
- Giảm lỗi khi Merge.
- Đảm bảo chất lượng trước khi phát hành.

---

# Vai trò trong kiến trúc

```
Contributor

↓

Issue

↓

Development

↓

Testing

↓

Review

↓

Merge

↓

Release
```

Mọi thay đổi đều phải đi qua quy trình này.

---

# Triết lý

AssembleUI ưu tiên:

- Chất lượng hơn số lượng.
- Đơn giản hơn phức tạp.
- Có thể mở rộng.
- Có thể tái sử dụng.
- Có tài liệu.
- Có kiểm thử.

Không chấp nhận mã nguồn chỉ hoạt động mà không tuân theo kiến trúc của thư viện.

---

# Quy trình đóng góp

```
Fork

↓

Clone

↓

Create Branch

↓

Develop

↓

Test

↓

Documentation

↓

Pull Request

↓

Review

↓

Merge
```

---

# Fork Repository

Đầu tiên tạo Fork của AssembleUI.

```
GitHub

↓

Fork

↓

Repository của bạn
```

---

# Clone

Ví dụ

```bash
git clone https://github.com/your-name/assembleui.git
```

---

# Tạo Branch

Không làm việc trực tiếp trên `main`.

Ví dụ

```bash
git checkout -b feature/button-loading
```

Hoặc

```bash
git checkout -b fix/input-focus
```

---

# Quy ước đặt tên Branch

```
feature/

fix/

docs/

test/

refactor/

build/

release/
```

Ví dụ

```
feature/modal

feature/button-loading

fix/dropdown

docs/components

refactor/style-engine
```

---

# Coding Standards

Mọi mã nguồn phải tuân thủ:

- TypeScript.
- ESLint.
- Prettier.
- Kiến trúc của AssembleUI.
- Quy ước đặt tên.

---

# Quy ước đặt tên

## Components

```
Button

Input

Modal

Card
```

PascalCase.

---

## Hooks

```
useTheme

useDisclosure

useMediaQuery
```

Luôn bắt đầu bằng `use`.

---

## Utils

```
merge

classNames

debounce
```

camelCase.

---

## Files

```
Button.tsx

Button.scss

Button.test.tsx

Button.docs.md
```

Tên file thống nhất với tên Component.

---

# Kiến trúc

Không thay đổi cấu trúc thư mục.

Ví dụ

```
components/

↓

Button/

↓

Button.tsx

↓

Button.scss

↓

index.ts
```

---

# Component mới

Mỗi Component mới phải có:

```
Component

↓

Style

↓

Test

↓

Documentation

↓

Export
```

Ví dụ

```
Alert/

Alert.tsx

Alert.scss

Alert.test.tsx

Alert.docs.md

index.ts
```

---

# Documentation

Mọi Component phải có tài liệu.

Bao gồm:

- Giới thiệu.
- Props.
- Ví dụ.
- Accessibility.
- Best Practices.

---

# Testing

Mỗi thay đổi phải có kiểm thử.

Ví dụ

```
Button

↓

Render

↓

Props

↓

Events

↓

Accessibility
```

Không Merge nếu Test thất bại.

---

# Style

Không Hardcode.

Sai

```scss
padding:16px;
```

Đúng

```scss
padding:spacing(md);
```

Chỉ sử dụng Design Tokens.

---

# API

Không thay đổi API công khai nếu không cần thiết.

Nếu bắt buộc thay đổi:

- Cập nhật tài liệu.
- Thêm Migration Guide.
- Tăng Major Version nếu phá vỡ tương thích.

---

# Commit Message

Khuyến nghị theo chuẩn Conventional Commits.

Ví dụ

```
feat(button): add loading state

fix(modal): restore focus after close

docs(patterns): update hero example

test(input): add keyboard navigation tests

refactor(core): simplify mergeRefs

build: optimize bundle size
```

---

# Pull Request

Mỗi Pull Request nên:

- Chỉ giải quyết một vấn đề.
- Có mô tả rõ ràng.
- Có hình ảnh nếu thay đổi giao diện.
- Có tài liệu.
- Có kiểm thử.

---

# Code Review

Reviewer kiểm tra:

- Kiến trúc.
- Hiệu năng.
- Accessibility.
- API.
- Style.
- Documentation.
- Testing.

Nếu chưa đạt tiêu chuẩn, Pull Request sẽ được yêu cầu chỉnh sửa.

---

# Những điều không nên làm

Không nên:

- Hardcode giá trị.
- Viết CSS trùng lặp.
- Import Component lẫn nhau.
- Thêm Business Logic vào Component.
- Thay đổi Design Tokens tùy ý.
- Thay đổi API mà không có tài liệu.

---

# Checklist trước khi Merge

Trước khi Merge cần đảm bảo:

- Code Build thành công.
- Không có lỗi TypeScript.
- Không có lỗi ESLint.
- Test thành công.
- Documentation được cập nhật.
- Không phá vỡ API hiện có.
- Đã Review.

---

# Quy trình Release

```
Issue

↓

Development

↓

Testing

↓

Review

↓

Merge

↓

Release

↓

npm
```

---

# Best Practices

✔ Một Pull Request chỉ giải quyết một vấn đề.

✔ Viết Component nhỏ và độc lập.

✔ Luôn sử dụng Design Tokens.

✔ Luôn có Unit Test.

✔ Luôn cập nhật Documentation.

✔ Không phá vỡ kiến trúc của AssembleUI.

✔ Sử dụng Conventional Commits.

✔ Tôn trọng Code Review.

---

# Tóm tắt

Contributing giúp mọi Contributor phát triển AssembleUI theo cùng một tiêu chuẩn kỹ thuật và quy trình làm việc.

```
Contributor

↓

Development

↓

Testing

↓

Documentation

↓

Review

↓

Merge

↓

Release
```

Nhờ quy trình đóng góp rõ ràng, AssembleUI có thể phát triển lâu dài với chất lượng ổn định, kiến trúc nhất quán và khả năng mở rộng cao, đồng thời tạo điều kiện để cộng đồng tham gia phát triển thư viện một cách hiệu quả.
