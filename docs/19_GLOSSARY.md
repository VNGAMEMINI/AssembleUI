# 19. API Design

> API Design định nghĩa cách người dùng tương tác với AssembleUI. Mục tiêu là tạo ra một API **đơn giản, nhất quán, dễ học, dễ mở rộng và ổn định trong thời gian dài**, giúp người dùng tập trung xây dựng giao diện thay vì ghi nhớ cách sử dụng của từng Component.

---

# Mục tiêu

API Design được xây dựng để:

- Đơn giản.
- Nhất quán.
- Dễ học.
- Dễ mở rộng.
- Dễ bảo trì.
- Có Type Safety.
- Không phá vỡ tương thích.

---

# Triết lý

AssembleUI tuân theo nguyên tắc:

```
Simple

↓

Consistent

↓

Composable

↓

Predictable

↓

Stable
```

Nếu hai Component làm cùng một nhiệm vụ, chúng phải có cách sử dụng giống nhau.

---

# Vai trò trong kiến trúc

```
Application

↓

Templates

↓

Patterns

↓

Components

↓

API
```

API là lớp giao tiếp giữa người dùng và thư viện.

---

# Nguyên tắc thiết kế

```
API

├── Naming
├── Props
├── Events
├── Composition
├── Accessibility
├── TypeScript
└── Consistency
```

---

# Naming

Tên Component sử dụng PascalCase.

Ví dụ

```tsx
<Button />

<Input />

<Modal />

<Card />
```

Không sử dụng

```tsx
<buttonUI />

<input_box />
```

---

# Props

Tên Props phải rõ nghĩa.

Đúng

```tsx
<Button

    disabled

    loading

    size="md"

    variant="primary"

/>
```

Sai

```tsx
<Button

    d

    l

    s

/>
```

---

# Variant

Mọi Component có giao diện đều nên hỗ trợ `variant`.

Ví dụ

```tsx
<Button

    variant="primary"
/>

<Button

    variant="secondary"
/>

<Button

    variant="outline"
/>
```

Variant phải thống nhất giữa các Component.

---

# Size

Các Component nên sử dụng cùng hệ thống kích thước.

```
xs

sm

md

lg

xl
```

Ví dụ

```tsx
<Input

    size="md"
/>
```

Không tạo hệ thống riêng cho từng Component.

---

# Color

Nếu hỗ trợ màu sắc.

Sử dụng

```
primary

secondary

success

warning

danger

info
```

Không dùng

```
blue

green

red
```

API phải độc lập với Theme.

---

# Children

Ưu tiên Composition.

Ví dụ

```tsx
<Button>

    Save

</Button>
```

Thay vì

```tsx
<Button

    text="Save"
/>
```

---

# Events

Tên Event sử dụng tiền tố `on`.

Ví dụ

```tsx
<Button

    onClick={handleClick}

/>
```

```tsx
<Input

    onChange={handleChange}

/>
```

Không dùng

```tsx
click

change
```

---

# Boolean Props

Boolean không cần gán `true`.

Đúng

```tsx
<Button

    disabled

/>
```

Sai

```tsx
<Button

    disabled={true}

/>
```

---

# Controlled Component

Các Component nhập liệu phải hỗ trợ Controlled Mode.

Ví dụ

```tsx
<Input

    value={value}

    onChange={setValue}

/>
```

---

# Uncontrolled Component

Đồng thời hỗ trợ Uncontrolled Mode.

Ví dụ

```tsx
<Input

    defaultValue="AssembleUI"
/>
```

---

# Composition

Ưu tiên ghép Component thay vì tạo Props phức tạp.

Đúng

```tsx
<Card>

    <Card.Header />

    <Card.Body />

    <Card.Footer />

</Card>
```

Không nên

```tsx
<Card

    header={...}

    footer={...}

    body={...}
/>
```

---

# Ref Forwarding

Các Component cần hỗ trợ `ref`.

Ví dụ

```tsx
const ref = useRef();

<Input

    ref={ref}

/>
```

Điều này giúp người dùng dễ tích hợp với React.

---

# Accessibility

API phải hỗ trợ Accessibility.

Ví dụ

```tsx
<Button

    aria-label="Search"
/>
```

Không ẩn các thuộc tính HTML chuẩn.

---

# Native Props

Component nên kế thừa các thuộc tính HTML tương ứng.

Ví dụ

```tsx
<Button

    type="submit"

    disabled

/>
```

```tsx
<Input

    placeholder="Email"

    autoComplete="email"
/>
```

Không cần tạo lại các Props đã có trong HTML.

---

# TypeScript

API phải có Type Definition đầy đủ.

Ví dụ

```tsx
interface ButtonProps {

    variant?: ButtonVariant;

    size?: ButtonSize;

    disabled?: boolean;

}
```

Không sử dụng kiểu `any`.

---

# Default Values

Component cần có giá trị mặc định hợp lý.

Ví dụ

```tsx
<Button />
```

Tương đương

```tsx
<Button

    variant="primary"

    size="md"
/>
```

Người dùng không cần cấu hình nhiều.

---

# API Stability

Không thay đổi API công khai nếu không cần thiết.

Nếu thay đổi:

- Cập nhật Documentation.
- Có Migration Guide.
- Tăng Version phù hợp.

---

# Mối quan hệ

```
Application

↓

Templates

↓

Patterns

↓

Components

↓

API
```

Người dùng chỉ tương tác với API của Component.

---

# Quy tắc

## Đơn giản

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

---

## Nhất quán

Nếu Button có

```tsx
size="md"
```

thì Input cũng phải có

```tsx
size="md"
```

Không dùng

```
medium
```

ở Component khác.

---

## Không tạo Props dư thừa

Sai

```tsx
<Button

    color="primary"

    background="blue"

    textColor="white"
/>
```

Đúng

```tsx
<Button

    variant="primary"
/>
```

---

## Ưu tiên Composition

Đúng

```tsx
<Card>

<Card.Header/>

<Card.Body/>

</Card>
```

Không tạo quá nhiều Props.

---

## Không phá vỡ API

Nếu đã phát hành.

Không đổi

```tsx
variant
```

thành

```tsx
type
```

trừ khi thật sự cần thiết.

---

# Checklist

Mỗi Component cần đảm bảo:

- API đơn giản.
- Tên Props rõ ràng.
- Có Variant.
- Có Size.
- Có Ref.
- Có TypeScript.
- Có Accessibility.
- Có Default Values.
- Có Documentation.

---

# Best Practices

✔ Một API cho một mục đích.

✔ Tên Props dễ hiểu.

✔ Composition thay vì cấu hình phức tạp.

✔ Hỗ trợ Ref.

✔ Kế thừa Native HTML Props.

✔ Có TypeScript.

✔ Có giá trị mặc định.

✔ API ổn định qua các phiên bản.

---

# Tóm tắt

API Design là giao diện lập trình của AssembleUI, quyết định cách người dùng xây dựng ứng dụng bằng thư viện.

```
Application
      ↓
Templates
      ↓
Patterns
      ↓
Components
      ↓
API
```

Một API tốt giúp AssembleUI dễ học, dễ sử dụng và dễ mở rộng. Bằng việc ưu tiên sự nhất quán, Composition và TypeScript, người dùng có thể kết hợp các Component một cách tự nhiên để tạo ra những giao diện phức tạp mà không cần học nhiều quy tắc khác nhau.
