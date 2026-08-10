# Noun Wiki — Design System & Component Architecture Documentation

Welcome to the **Noun Wiki Design System**, an editorial, professional, minimal, and accessible design system for Iran's premier workplace and technology encyclopedia.

---

## 1. Design Philosophy
Noun Wiki is designed as a **Modern Digital Encyclopedia / Reference Platform**.
- **Editorial & Clean**: Content-first hierarchy with comfortable line lengths, generous white space, and clear typography.
- **Calm & Professional**: Free of noisy background animations, heavy glassmorphism, or artificial SaaS dashboard widgets.
- **RTL & Bilingual Native**: Engineered specifically for Persian text with pristine LTR isolations for English terms, acronyms, and technical formulas.
- **Accessible (WCAG AA)**: High contrast, keyboard operable, clear focus indicators, touch-friendly interactives.

---

## 2. Design Tokens

### Color Tokens (Semantic CSS Scale)
Noun Wiki uses semantic CSS variables in Light and Dark mode to ensure zero hard-coded theme logic.

```css
:root {
  /* Surface & Base */
  --bg-app: #fafafa;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #f4f4f5;
  --bg-muted: #f4f4f5;

  /* Borders */
  --border-subtle: #e4e4e7;
  --border-medium: #d4d4d8;

  /* Typography */
  --text-primary: #18181b;
  --text-secondary: #52525b;
  --text-muted: #71717a;

  /* Accent & Semantic Brand (Zinc / Indigo Editorial) */
  --accent-primary: #18181b;
  --accent-primary-fg: #ffffff;
  --accent-brand: #4f46e5;
  --accent-amber: #d97706;
  --accent-emerald: #059669;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.dark {
  /* Dark Surface Scale */
  --bg-app: #09090b;
  --bg-surface: #121215;
  --bg-surface-elevated: #18181b;
  --bg-muted: #27272a;

  /* Borders */
  --border-subtle: #27272a;
  --border-medium: #3f3f46;

  /* Typography */
  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;

  /* Accent & Brand */
  --accent-primary: #f4f4f5;
  --accent-primary-fg: #18181b;
  --accent-brand: #6366f1;
  --accent-amber: #f59e0b;
  --accent-emerald: #10b981;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
}
```

---

## 3. Typography System
- **Primary Persian Font**: IRANYekanX / Vazirmatn variable font family with balanced line-heights for Persian (`line-height: 1.6` for body text).
- **English / Formula Font**: Clean system font stack (`system-ui, -apple-system, sans-serif`) applied with class `.font-english` or `dir="ltr"`.

### Scale
- **Display**: 44px - 52px (Extra bold, reserved for home header)
- **H1**: 32px - 38px (Bold, term titles & section headers)
- **H2**: 24px - 28px (Bold, sub-sections)
- **H3**: 18px - 20px (Semi-bold, card headers)
- **Body Large**: 17px - 18px (Comfortable definition text, `max-width: 68ch`)
- **Body Regular**: 15px - 16px (Standard description text)
- **Small**: 13px - 14px (Meta labels, badges)
- **Caption**: 12px (Footnotes, metadata tags)

---

## 4. Spacing, Radius & Elevation Scale

### Spacing Token Scale
`4px | 8px | 12px | 16px | 20px | 24px | 32px | 48px | 64px`

### Border Radius
- `sm`: 6px (Badges, small tags)
- `md`: 8px (Form fields, buttons)
- `lg`: 12px (Standard cards, dropdowns)
- `xl`: 16px (Large feature containers, tables)
- `2xl`: 24px (Hero banners, modals)
- `full`: 9999px (Pills, avatar icons)

---

## 5. Component Patterns & Guidelines

### Search Bar (`SearchBox` & `SearchModal`)
- Primary visual element on Home and Header.
- Height: 52px (desktop), 48px (mobile).
- Immediate autocomplete with exact match highlight & category badges.
- Keyboard navigation supported (`ArrowDown`, `ArrowUp`, `Enter`, `Escape`).

### Term Cards (`TermCard`)
- Clean, minimal border cards.
- Contains English term, Persian translation, category pill, and 2-line definition snippet.
- Hover state: Subtle border darkening, zero heavy tilt/3D effects.

### Comparison Table (`ComparisonView`)
- Side-by-side structured comparison matrix for two terms.
- Mobile friendly: Smooth horizontal scroll container with fixed headers or responsive card stack fallback.
- Clear visual distinction between primary term and comparison target.

### Buttons & Inputs
- Primary: High contrast solid background (`--accent-primary`).
- Secondary: Soft background with subtle border.
- Touch target minimum: `44px x 44px` on touch devices.

---

## 6. Accessibility & Motion Rules
- **Contrast**: Complies with WCAG 2.2 AA standards across both themes.
- **Keyboard Navigation**: Native `outline-ring` focus indicators for inputs, buttons, and links.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` for smooth fallback transitions.
- **Motion Duration**: Functional micro-interactions constrained between `120ms` and `200ms`.

---

## 7. RTL & English Term Isolation
- Global `dir="rtl"` applied at document element level.
- English terms, formulas, and URLs isolated using `dir="ltr" unicode-bidi="isolate"` to prevent word-order flipping.
