# 04. Design System

## 1. Mục tiêu

Design System là hệ thống quản lý các giá trị thiết kế dùng chung trong AssembleUI.

Nó cung cấp:

- Primitives: các giá trị nền tảng được định nghĩa bằng Sass.
- Design Tokens: các giá trị thiết kế mặc định được công bố qua CSS Custom Properties.
- Themes: các Theme roles thay đổi theo Theme đang hoạt động.

Design System giúp Components, Patterns và Templates sử dụng chung một hệ thống giá trị, hạn chế việc định nghĩa trùng lặp và giữ giao diện nhất quán.

Design System không chịu trách nhiệm chứa React Components, Hooks, Business Logic hoặc logic nghiệp vụ của ứng dụng.

---

## 2. Vị trí trong kiến trúc

```text
Foundation
    |
    v
Design System
    |
    +-----------------------+
    |                       |
    v                       v
Design Tokens             Themes
    |                       |
    |                       |
    +-----------+-----------+
                |
                v
           Style Engine
                |
                v
            Components
                |
                v
             Patterns
                |
                v
             Templates
```

Design Tokens và Themes là hai nhánh độc lập trong Design System.

- Design Tokens cung cấp các giá trị thiết kế mặc định ổn định.
- Themes cung cấp các giá trị giao diện phụ thuộc Theme.

Hai hệ thống cùng phục vụ Style Engine và các tầng UI phía trên. Theme switching không làm thay đổi Design Tokens.

---

## 3. Cấu trúc thư mục

Cấu trúc hiện tại trong `packages/react/design/`:

```text
design/
├── index.scss
│
├── primitives/
│   ├── animation.scss
│   ├── aspect.scss
│   ├── border.scss
│   ├── breakpoint.scss
│   ├── colors.scss
│   ├── effect.scss
│   ├── filter.scss
│   ├── index.scss
│   ├── motion.scss
│   ├── neo.scss
│   ├── opacity.scss
│   ├── radius.scss
│   ├── shadows.scss
│   ├── sizing.scss
│   ├── spacing.scss
│   ├── states.scss
│   ├── typography.scss
│   └── z-index.scss
│
├── tokens/
│   ├── index.scss
│   ├── semantic/
│   └── synthetic/
│
└── themes/
    ├── index.scss
    ├── light/
    ├── dark/
    └── custom/
```

### Entry point

`design/index.scss` nạp hai hệ thống độc lập:

```scss
@use "./tokens";
@use "./themes";
```

Tokens và Themes được tổng hợp tại Design System entry point, không phụ thuộc lẫn nhau.

---

## 4. Primitives

Primitives là những giá trị nền tảng được định nghĩa bằng Sass và được sử dụng làm cơ sở xây dựng Design Tokens.

Các nhóm Primitives hiện có:

| Nhóm       | Vai trò                        |
| ---------- | ------------------------------ |
| Animation  | Giá trị nền tảng cho animation |
| Aspect     | Tỷ lệ khung hình               |
| Border     | Độ rộng và kiểu đường viền     |
| Breakpoint | Các mốc responsive             |
| Colors     | Bảng màu nền tảng              |
| Effect     | Các giá trị hiệu ứng           |
| Filter     | Giá trị filter                 |
| Motion     | Duration và easing             |
| Neo        | Các màu neon                   |
| Opacity    | Giá trị độ trong suốt          |
| Radius     | Giá trị bo góc                 |
| Shadows    | Giá trị đổ bóng                |
| Sizing     | Giá trị kích thước             |
| Spacing    | Giá trị khoảng cách            |
| States     | Giá trị trạng thái             |
| Typography | Giá trị kiểu chữ               |
| Z-index    | Giá trị phân lớp               |

Primitives là nguồn giá trị nền tảng cho Token definitions.

Primitives không phải Theme roles và không được thay đổi theo Theme switching.

---

## 5. Design Tokens

Design Tokens là các giá trị thiết kế mặc định được công bố dưới dạng CSS Custom Properties với namespace:

```css
--aui-token-*
```

Token cung cấp một hợp đồng giá trị ổn định để Components và các tầng UI có thể sử dụng thống nhất.

### 5.1. Nguyên tắc

- Token có giá trị mặc định ổn định.
- Token không phụ thuộc Theme đang hoạt động.
- Theme không được định nghĩa lại Token.
- Token không được tham chiếu Theme roles.
- Synthetic Tokens có thể kết hợp hoặc tái sử dụng các Token cố định khác.
- Không tạo Token trùng lặp khi đã có Token phù hợp.

Chuyển Light sang Dark hoặc Custom không được làm thay đổi giá trị của `--aui-token-*`.

### 5.2. Cấu trúc Design Tokens

```text
tokens/
├── index.scss
│
├── semantic/
│   ├── animation.scss
│   ├── aspect.scss
│   ├── border.scss
│   ├── breakpoints.scss
│   ├── colors.scss
│   ├── effects.scss
│   ├── filters.scss
│   ├── motion.scss
│   ├── neo.scss
│   ├── opacity.scss
│   ├── radius.scss
│   ├── rgb.scss
│   ├── shadows.scss
│   ├── sizing.scss
│   ├── spacing.scss
│   ├── states.scss
│   ├── typography.scss
│   └── z-index.scss
│
└── synthetic/
    ├── border.scss
    ├── glow.scss
    ├── gradients.scss
    ├── shadow.scss
    └── transitions.scss
```

Design Tokens được chia thành hai nhóm có trách nhiệm riêng biệt:

- **Semantic Tokens:** định nghĩa các giá trị đơn theo từng thuộc tính thiết kế.
- **Synthetic Tokens:** tổng hợp nhiều giá trị thuộc tính thành một cấu hình hoặc hiệu ứng hoàn chỉnh.

Không đưa các giá trị đơn, alias hoặc bản sao của Semantic Tokens vào Synthetic Tokens.

### 5.3. Semantic Tokens

Semantic Tokens định nghĩa các giá trị thiết kế đơn lẻ, được đặt tên theo mục đích sử dụng và cung cấp giá trị mặc định ổn định.

Mỗi Semantic Token đại diện cho một giá trị thuộc tính, không phải một cấu hình tổng hợp từ nhiều thuộc tính.

Các nhóm Semantic Tokens:

| Nhóm        | Nội dung                                                           |
| ----------- | ------------------------------------------------------------------ |
| Animation   | Các giá trị animation như iteration, direction và fill             |
| Aspect      | Các tỷ lệ khung hình                                               |
| Border      | Border width và border style                                       |
| Breakpoints | Các mốc responsive                                                 |
| Colors      | Các màu theo ngữ nghĩa                                             |
| Effects     | Các giá trị blend effect                                           |
| Filters     | Blur, brightness, saturation và các filter khác                    |
| Motion      | Duration và easing                                                 |
| Neo         | Các màu neon                                                       |
| Opacity     | Các mức độ trong suốt                                              |
| Radius      | Các mức bo góc                                                     |
| RGB         | Các giá trị kênh màu                                               |
| Shadows     | Các giá trị shadow cơ sở                                           |
| Sizing      | Các giá trị kích thước                                             |
| Spacing     | Các giá trị khoảng cách                                            |
| States      | Các giá trị trạng thái                                             |
| Typography  | Font family, font size, font weight, line height và letter spacing |
| Z-index     | Các cấp độ phân lớp                                                |

Ví dụ:

```scss
:root {
  --aui-token-color-primary: /* fixed default */;
  --aui-token-space-4: /* fixed default */;
  --aui-token-radius-md: /* fixed default */;
  --aui-token-border-width-default: /* fixed default */;
  --aui-token-border-style-solid: /* fixed default */;
  --aui-token-font-size-md: /* fixed default */;
  --aui-token-motion-duration-fast: /* fixed default */;
}
```

Các giá trị trên minh họa những Token đại diện cho từng thuộc tính riêng biệt.

**Nguyên tắc Semantic Tokens:**

- Mỗi Token đại diện cho một giá trị thuộc tính.
- Giá trị được định nghĩa ổn định, không phụ thuộc Theme.
- Không chứa cấu hình tổng hợp thuộc nhiều thuộc tính.
- Không tham chiếu Synthetic Tokens.
- Không tham chiếu Theme roles.
- Không tạo nhiều Token khác tên nhưng cùng biểu diễn một giá trị nếu không có mục đích ngữ nghĩa riêng.

### 5.4. Synthetic Tokens

Synthetic Tokens là các giá trị tổng hợp từ ít nhất hai giá trị thuộc tính để tạo thành một cấu hình thiết kế hoàn chỉnh hoặc một hiệu ứng có thể tái sử dụng.

Synthetic Tokens không đại diện cho một thuộc tính đơn lẻ. Chúng kết hợp các giá trị từ Primitives hoặc Semantic Tokens để tạo ra giá trị có ý nghĩa ở cấp độ sử dụng cao hơn.

**Điều kiện để một giá trị được phân loại là Synthetic Token:**

1. Phải kết hợp ít nhất hai giá trị thuộc tính.
2. Phải tạo thành một cấu hình hoặc hiệu ứng có ý nghĩa sử dụng.
3. Có thể tái sử dụng các Semantic Tokens phù hợp.
4. Không được chỉ sao chép, đổi tên hoặc alias một Semantic Token.
5. Không được phụ thuộc Theme hoặc tham chiếu `--aui-theme-*`.

Các nhóm Synthetic Tokens:

| Nhóm        | Nội dung tổng hợp                                           |
| ----------- | ----------------------------------------------------------- |
| Border      | Kết hợp border width, border style và border color          |
| Glow        | Kết hợp nhiều lớp shadow, màu sắc và thông số hiệu ứng      |
| Gradients   | Kết hợp màu sắc, hướng và các điểm chuyển màu               |
| Shadow      | Kết hợp offset, blur, spread và màu sắc thành shadow recipe |
| Transitions | Kết hợp transition property, duration và easing             |

Ví dụ:

```scss
:root {
  // Border: width + style + color
  --aui-token-border-default: var(--aui-token-border-width-default)
    var(--aui-token-border-style-solid) var(--aui-token-color-border);

  // Transition: property + duration + easing
  --aui-token-transition-colors: color var(--aui-token-motion-duration-fast)
    var(--aui-token-motion-ease-standard);

  // Shadow: multiple layers + offset + blur + color
  --aui-token-shadow-card:
    0 1px 2px rgb(var(--aui-token-rgb-black) / 0.08),
    0 4px 12px rgb(var(--aui-token-rgb-black) / 0.06);
}
```

Các ví dụ trên minh họa cách kết hợp nhiều giá trị thuộc tính. Giá trị thực tế phải tuân theo các Semantic Tokens và Primitives đang được định nghĩa trong source.

**Không được phân loại những trường hợp sau thành Synthetic Tokens:**

| Trường hợp                            | Phân loại đúng               |
| ------------------------------------- | ---------------------------- |
| Một giá trị màu đơn                   | Semantic Colors              |
| Một giá trị font size                 | Semantic Typography          |
| Một giá trị opacity                   | Semantic Opacity hoặc States |
| Một giá trị border width              | Semantic Border              |
| Một giá trị duration                  | Semantic Motion              |
| Alias của Semantic Token              | Không cần tạo Token mới      |
| Một cấu hình kết hợp nhiều thuộc tính | Synthetic Tokens             |

Synthetic Tokens có thể tham chiếu Semantic Tokens để tái sử dụng những giá trị thiết kế đã được định nghĩa. Đây là quan hệ tổng hợp bên trong hệ thống Design Tokens.

Chiều phụ thuộc hợp lệ:

```text
Primitives
    |
    v
Semantic Tokens
    |
    v
Synthetic Tokens
```

Semantic Tokens không phụ thuộc Synthetic Tokens. Cả hai đều độc lập với Themes.

### 5.5. Token entry point

`tokens/index.scss` tổng hợp hai nhóm Token:

```scss
@use "./semantic";
@use "./synthetic";
```

Semantic và Synthetic cùng thuộc Design Tokens nhưng có trách nhiệm khác nhau.

- Semantic cung cấp các giá trị thuộc tính đơn.
- Synthetic cung cấp các cấu hình được tổng hợp từ nhiều giá trị thuộc tính.
- Synthetic có thể tái sử dụng Semantic.
- Không đưa Theme definitions vào Token entry point.

Design Tokens phải giữ nguyên giá trị khi chuyển đổi giữa Light, Dark và Custom Themes.

### 5.5. Token entry point

`tokens/index.scss` tổng hợp hai nhóm Token:

```scss
@use "./semantic";
@use "./synthetic";
```

Semantic và Synthetic cùng thuộc hệ thống Design Tokens.

Không đưa Theme definitions vào Token entry point.

---

## 6. Themes

Themes cung cấp các giá trị giao diện phụ thuộc vào Theme đang hoạt động.

Theme sử dụng namespace riêng:

```css
--aui-theme-*
```

Theme roles mô tả vai trò hiển thị của giao diện, chẳng hạn background, surface, text, accent, border và interaction.

### 6.1. Nguyên tắc

- Themes độc lập với Design Tokens.
- Theme chỉ định nghĩa Theme roles.
- Theme switching chỉ thay đổi các giá trị `--aui-theme-*`.
- Theme không được ghi đè `--aui-token-*`.
- Theme roles không được dùng làm nguồn định nghĩa Design Tokens.
- Components có thể sử dụng Theme roles cho những thuộc tính cần thay đổi theo Theme.

### 6.2. Cấu trúc

```text
themes/
├── index.scss
│
├── light/
│   ├── alert.scss
│   ├── background.scss
│   ├── border.scss
│   ├── chart.scss
│   ├── index.scss
│   ├── interact.scss
│   ├── selection-area.scss
│   ├── shadow.scss
│   └── text.scss
│
├── dark/
│   ├── alert.scss
│   ├── background.scss
│   ├── border.scss
│   ├── chart.scss
│   ├── index.scss
│   ├── interact.scss
│   ├── selection-area.scss
│   ├── shadow.scss
│   └── text.scss
│
└── custom/
    └── index.scss
```

### 6.3. Theme roles

Các nhóm Theme roles hiện có:

| Nhóm           | Trách nhiệm                                                        |
| -------------- | ------------------------------------------------------------------ |
| Alert          | Accent, secondary và các trạng thái success, warning, danger, info |
| Background     | Background, foreground, surface và overlay                         |
| Border         | Border, divider và các đường viền theo trạng thái                  |
| Chart          | Màu dùng cho biểu đồ                                               |
| Interact       | Hover, active, selected và input                                   |
| Selection Area | Text selection và scrollbar                                        |
| Shadow         | Shadow/elevation theo Theme |
| Text           | Text, placeholder, link và code                                    |

Các nhóm này thuộc Theme system, không phải Semantic Tokens.

### 6.4. Light và Dark

Light và Dark là hai Theme definitions được cung cấp sẵn.

Mỗi Theme khai báo các giá trị tương ứng bằng namespace `--aui-theme-*`.

Ví dụ:

```scss
[data-aui-theme="light"] {
  --aui-theme-primary: var(--aui-theme-accent);
  --aui-theme-bg: #f6f7f9;
  --aui-theme-surface: #ffffff;
  --aui-theme-text: #1a2230;
}

[data-aui-theme="dark"] {
  --aui-theme-primary: var(--aui-theme-accent);
  --aui-theme-bg: #0b1020;
  --aui-theme-surface: #161d27;
  --aui-theme-text: #e5e9ef;
}
```

Đây là ví dụ minh họa cách tổ chức Theme roles. Khi triển khai, sử dụng các giá trị thực tế trong source của từng Theme.

Light và Dark có thể cung cấp giá trị khác nhau cho cùng một Theme role. Việc thay đổi Theme không được thay đổi Design Tokens.

### 6.5. Custom Theme

Custom là extension point dành cho người sử dụng thư viện.

Source hiện tại cung cấp:

```scss
[data-aui-theme="custom"] {
  // Consumer-defined Theme roles
}
```

Người dùng có thể khai báo những Theme roles cần thiết mà không phải định nghĩa lại toàn bộ hệ thống.

Ví dụ:

```scss
[data-aui-theme="custom"] {
  --aui-theme-bg: #ffffff;
  --aui-theme-fg: #111111;
  --aui-theme-border: #dddddd;
  --aui-theme-primary: #2563eb;
}
```

Custom Theme chỉ sử dụng namespace `--aui-theme-*`.

Không khai báo hoặc ghi đè `--aui-token-*` trong Custom Theme.

### 6.6. Theme entry point

`themes/index.scss` tổng hợp các Theme definitions:

```scss
@forward "./light";
@forward "./dark";
@forward "./custom";
```

Theme entry point không phụ thuộc vào Token definitions.

---

## 7. Phân biệt Design Tokens và Themes

| Tiêu chí                           | Design Tokens                     | Themes                       |
| ---------------------------------- | --------------------------------- | ---------------------------- |
| Namespace                          | `--aui-token-*`                   | `--aui-theme-*`              |
| Vai trò                            | Giá trị thiết kế mặc định         | Giá trị giao diện theo Theme |
| Giá trị                            | Ổn định                           | Có thể thay đổi theo Theme   |
| Nguồn                              | Primitives và các Token liên quan | Theme definitions            |
| Cấu trúc                           | Semantic và Synthetic             | Light, Dark và Custom        |
| Theme switching                    | Không thay đổi                    | Thay đổi theo Theme          |
| Có thể tham chiếu hệ thống còn lại | Không tham chiếu Theme roles      | Không ghi đè Tokens          |

### Quy tắc phân loại

Sử dụng Design Token khi giá trị là một phần của hệ thống thiết kế mặc định và không cần thay đổi theo Theme.

Sử dụng Theme role khi giá trị đại diện cho một vai trò hiển thị có thể có cách thể hiện khác nhau giữa các Theme.

Không đưa một thuộc tính vào Theme chỉ vì muốn tăng khả năng tùy biến.

Spacing, radius, sizing, typography và motion mặc định thuộc hệ thống Tokens nếu chúng không thực sự phụ thuộc Theme.

---

## 8. Sử dụng trong Components

Một Component có thể sử dụng đồng thời Design Tokens và Theme roles.

```scss
.aui-button {
  padding: var(--aui-token-space-4);
  border-radius: var(--aui-token-radius-md);

  background: var(--aui-theme-primary);
  color: var(--aui-theme-on-primary);
  box-shadow: var(--aui-theme-shadow-sm);
}
```

Trong ví dụ:

- Spacing và radius sử dụng giá trị Token ổn định.
- Background, text color và shadow sử dụng Theme roles.
- Component không cần định nghĩa lại Light hoặc Dark Theme.
- Component không được thay đổi Token definitions khi Theme chuyển đổi.

Không bắt buộc mọi thuộc tính của Component đều phải sử dụng Theme role. Chỉ sử dụng Theme role cho những giá trị thực sự cần phụ thuộc Theme.

---

## 9. Luồng hoạt động

```text
                    Design System
                    /           \
                   /             \
          Design Tokens          Themes
          --aui-token-*          --aui-theme-*
                |                      |
                |                      |
          Semantic Tokens         Light / Dark
                |                      |
          Synthetic Tokens           Custom
                |                      |
                +----------+-----------+
                           |
                           v
                      Style Engine
                           |
                           v
                       Components
                           |
                           v
                        Patterns
                           |
                           v
                        Templates
```

Hai nhánh được tổng hợp tại Design System entry point và cùng cung cấp giá trị cho Style Engine.

Không có luồng Theme → Design Tokens hoặc Design Tokens → Theme.

---

## 10. Quy tắc kiến trúc

### 10.1. Quy tắc Design Tokens

- Giữ namespace `--aui-token-*` dành riêng cho Design Tokens.
- Token definitions không tham chiếu `--aui-theme-*`.
- Không định nghĩa lại Token bên trong Light, Dark hoặc Custom Theme.
- Synthetic Tokens chỉ tổng hợp từ Primitives và các giá trị Token phù hợp.
- Không tạo Token trùng lặp hoặc alias không cần thiết.
- Không thay đổi Token chỉ để thực hiện Theme switching.

### 10.2. Quy tắc Themes

- Giữ namespace `--aui-theme-*` dành riêng cho Theme roles.
- Light, Dark và Custom chỉ khai báo Theme roles.
- Các Theme cần cung cấp những role tương ứng để Components có thể hoạt động nhất quán.
- Custom Theme chỉ cần khai báo các role mà người dùng muốn tùy chỉnh, nhưng phải bảo đảm các role cần thiết cho giao diện.
- Không sử dụng Theme selector để sửa trực tiếp selector của từng Component.
- Không sử dụng Theme để thay đổi Design Tokens.

### 10.3. Quy tắc Components

- Components sử dụng Token cho giá trị thiết kế mặc định.
- Components sử dụng Theme roles cho giá trị giao diện phụ thuộc Theme.
- Không định nghĩa lại hệ thống Token hoặc Theme bên trong Component.
- Không viết logic riêng để phân biệt Light và Dark nếu CSS Theme roles có thể giải quyết.

---

## 11. Kiểm tra tính toàn vẹn

Các thay đổi liên quan Design Tokens và Themes phải giữ những điều kiện sau:

1. Token definitions không tham chiếu Theme roles.
2. Light và Dark không định nghĩa lại Design Tokens.
3. Custom Theme không định nghĩa lại Design Tokens.
4. Theme roles được sử dụng phải có định nghĩa tương ứng trong Theme phù hợp.
5. Các Theme giữ được hợp đồng role cần thiết cho Components.
6. Synthetic Tokens không phụ thuộc Theme.
7. Theme switching không làm thay đổi giá trị Design Tokens.

Các điều kiện này cần được duy trì bằng Architecture Tests, không chỉ bằng quy ước trong tài liệu.

---

## 12. Tóm tắt

Design System của AssembleUI có ba phần chính:

- **Primitives:** các giá trị nền tảng.
- **Design Tokens:** các giá trị thiết kế mặc định ổn định, gồm Semantic Tokens và Synthetic Tokens.
- **Themes:** các Theme roles độc lập, gồm Light, Dark và Custom.

Design Tokens và Themes là hai nhánh độc lập.

`--aui-token-*` không phụ thuộc Theme và không thay đổi khi chuyển Theme.

`--aui-theme-*` cung cấp các giá trị giao diện có thể thay đổi theo Theme.

Cả hai cùng phục vụ Style Engine, Components, Patterns và Templates.
