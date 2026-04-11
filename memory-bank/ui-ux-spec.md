# UI/UX Design Specification & Tokens

**Project**: Fit Renov
**Role**: UI/UX Designer

## 1. Design Tokens

### Colors (Dark Mode Compatible)

- **Primary (專業與信賴感 - 深木/金屬灰)**:
  - Base: `#2C3E50` (Slate Navy) -> _Dark Mode: `#34495E`_
  - Hover: `#1A252F` -> _Dark Mode: `#2C3E50`_
- **Accent (行動呼籲 CTA - 暖白/淺木色)**:
  - Base: `#D4AF37` (Soft Gold/Wood) -> _Dark Mode: `#F1C40F`_
  - Hover: `#B5952F` -> _Dark Mode: `#D4AF37`_
- **Backgrounds (極簡視覺)**:
  - Page: `#F8F9FA` (Off-white) -> _Dark Mode: `#121212`_
  - Card: `#FFFFFF` -> _Dark Mode: `#1E1E1E`_
- **Typography (高對比度 WCAG AA)**:
  - Heading: `#212529` -> _Dark Mode: `#F8F9FA`_
  - Body: `#495057` -> _Dark Mode: `#CED4DA`_

### Typography

- **Font Family**: Inter, sans-serif (搭配 Noto Sans HK 呈現繁體中文)
- **Scale**:
  - H1 (Hero Title): `3.5rem` / Line-height `1.2` / Bold
  - H2 (Section Title): `2.5rem` / Line-height `1.3` / SemiBold
  - Body (Text): `1rem` / Line-height `1.6` / Regular
  - Small (Helper): `0.875rem` / Line-height `1.5`

### Spacing (8px grid)

- `xs`: 8px
- `sm`: 16px
- `md`: 24px
- `lg`: 32px
- `xl`: 48px
- `2xl`: 64px

### Shadows & Effects

- **Card Shadow**: `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`
- **Hover Transitions**: `transform 0.2s ease-in-out, opacity 0.2s ease-in-out`

---

## 2. 組件狀態矩陣 (Component State Matrix)

### Primary Button (CTA)

| State    | Visual                         | CSS                                                                     |
| -------- | ------------------------------ | ----------------------------------------------------------------------- |
| Default  | Accent Background, White Text  | `bg-accent text-white shadow-md`                                        |
| Hover    | Darker Accent, Slightly Raised | `hover:bg-accent-hover hover:-translate-y-1 hover:shadow-lg`            |
| Focus    | Accent Ring                    | `focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2` |
| Disabled | Gray Background, Lower Opacity | `bg-gray-300 text-gray-500 cursor-not-allowed opacity-70`               |

### Lead Form Input Fields

| State   | Visual                      | CSS                                                  |
| ------- | --------------------------- | ---------------------------------------------------- |
| Default | Border Gray, White BG       | `border-gray-300 bg-white`                           |
| Focus   | Border Accent, Accent Ring  | `focus:border-accent focus:ring-1 focus:ring-accent` |
| Error   | Border Red, Red helper text | `border-red-500 focus:ring-red-500 text-red-600`     |

### Timeline Process Card

| State   | Visual                        | CSS                                                           |
| ------- | ----------------------------- | ------------------------------------------------------------- |
| Default | Flat Card, Subdued Border     | `border-gray-100 bg-white`                                    |
| Hover   | Slight Elevate, Accent Border | `hover:border-accent/50 hover:shadow-md hover:-translate-y-1` |

---

## 3. 轉化路徑分析 (Conversion Path Analysis)

1. **Awareness (注意)**: User lands on **Hero Section**.
   - _Hook_: 高畫質職人工藝背景 + Slogan "以匠人之手，築你所想之居"。
   - _Action_: Primary CTA "立即獲取免費初步估價" anchors to Form.
2. **Consideration (考慮)**: User scrolls to **6 Steps Timeline**.
   - _Psychology_: 降低對「黑店、隱藏收費」的恐懼，強調「透明」與「品質」。
   - _Visual_: 垂直或橫向的時間軸設計，減少認知負荷，一步步引導閱讀。
3. **Action (轉化)**: User reaches **Lead Generation Form**.
   - _Friction Reduction_: 採用分步或緊湊的漸進式設計。第一步先拿「聯絡資訊」，第二步再拿「屋苑與預算」，確保最低門檻。
   - _Confirmation_: 提交後呈現友善的 Success State 與 WhatsApp 快速連結。
