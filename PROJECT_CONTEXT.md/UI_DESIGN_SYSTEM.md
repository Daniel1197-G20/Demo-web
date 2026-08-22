# Tory's Treats — UI/UX Design System Specification (Order Request Model)

**Brand Identity:** Luxury Artisanal Bakery & Bespoke Event Catering  
**Visual Ethos:** Delightful, Warm, Professional, High-Converting & Accessible  
**Tone:** Playful luxury — vibrant Tory pink accents balanced by rich cream canvases, rounded organic geometries, crisp charcoal typography, and luscious food imagery.

---

## 1. Color Palette Tokens

```css
:root {
  /* Brand Primary & Accents */
  --color-tory-pink-50:  #FFF1F5;
  --color-tory-pink-100: #FFE4EC;
  --color-tory-pink-200: #FDCEDC;
  --color-tory-pink-300: #FB9BB8;
  --color-tory-pink-400: #F75A8E;
  --color-tory-pink-500: #E82C7C; /* CORE BRAND TORY PINK */
  --color-tory-pink-600: #D31665;
  --color-tory-pink-700: #B10C51;
  --color-tory-pink-800: #930D43;
  --color-tory-pink-900: #7B0E3B;

  /* Canvases, Surfaces & Warm Creams */
  --color-cream-base:    #FFFDF9; /* Main Customer Page Canvas */
  --color-cream-surface: #FAF6EE; /* Elevated Card / Section Canvas */
  --color-cream-border:  #F0E8D9;
  --color-surface-white: #FFFFFF;

  /* Typography & Dark Contrasts */
  --color-charcoal-900:  #1C1917; /* Primary Headings & High Contrast Body */
  --color-charcoal-700:  #44403C; /* Secondary Body / Labels */
  --color-charcoal-500:  #78716C; /* Muted Captions / Placeholders */
  --color-charcoal-300:  #D6D3D1; /* Borders & Dividers */

  /* Luxury Accents */
  --color-gold-400:      #FBBF24;
  --color-gold-500:      #F59E0B;
  --color-gold-600:      #D97706;

  /* Semantic Feedback Colors */
  --color-success:       #10B981;
  --color-success-bg:    #ECFDF5;
  --color-warning:       #F59E0B;
  --color-warning-bg:    #FFFBEB;
  --color-error:         #EF4444;
  --color-error-bg:      #FEF2F2;
  --color-info:          #3B82F6;
  --color-info-bg:       #EFF6FF;
}
```

---

## 2. Typography Scale

- **Display Font:** `Outfit` / `Playfair Display` (Expressive, warm, premium)
- **Body Font:** `Plus Jakarta Sans` / `Inter` (Ultra-legible, clean, modern)

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-display` | 48px – 60px | 1.1 | Bold / ExtraBold (800) | Hero Headline on Desktop |
| `text-h1` | 36px – 42px | 1.2 | Bold (700) | Section Headlines, Category Headers |
| `text-h2` | 28px – 32px | 1.25 | SemiBold (600) | Product Names, Modal Titles |
| `text-h3` | 22px – 24px | 1.3 | SemiBold (600) | Card Titles, Subheaders |
| `text-h4` | 18px – 20px | 1.4 | Medium (500) | Group Headers, Form Step Headers |
| `text-body-lg` | 16px – 18px | 1.5 | Regular (400) / Medium (500) | Hero lead paragraphs, Key callouts |
| `text-body` | 14px – 15px | 1.5 | Regular (400) | Primary text, descriptions, table data |
| `text-small` | 12px – 13px | 1.4 | Medium (500) | Badges, tags, form input hints |
| `text-caption` | 10px – 11px | 1.3 | SemiBold (600) | Micro-labels, date stamps, status tags |

---

## 3. Border Radii & Soft Shadows

### Border Radii
- **`rounded-sm` (6px):** Form input controls, dropdown menu items.
- **`rounded-md` (12px):** Compact buttons, badges, toast notifications.
- **`rounded-lg` (18px):** Category cards, feature callouts.
- **`rounded-xl` (24px):** Product cards, hero banners, modal dialogs.
- **`rounded-2xl` (32px):** Major container sections, catering promo blocks.
- **`rounded-full` (9999px):** Pill action buttons, cart quantity toggles, avatar badges.

### Ambient Shadow Tokens
```css
--shadow-tory-sm: 0 2px 8px -2px rgba(232, 44, 124, 0.08), 0 1px 4px -1px rgba(28, 25, 23, 0.05);
--shadow-tory-md: 0 8px 24px -4px rgba(232, 44, 124, 0.12), 0 4px 12px -2px rgba(28, 25, 23, 0.06);
--shadow-tory-lg: 0 16px 40px -8px rgba(232, 44, 124, 0.16), 0 8px 20px -4px rgba(28, 25, 23, 0.08);
--shadow-tory-hover: 0 20px 48px -10px rgba(232, 44, 124, 0.22);
```

---

## 4. Reusable UI Component Specifications

### 4.1 Buttons (`<Button />`)
- **Variants:** `primary` (Tory Pink), `secondary` (Soft Pink), `outline`, `ghost`, `danger`, `gold`.
- **Sizes:** `sm`, `md`, `lg`, `icon`.

### 4.2 Product Card (`<ProductCard />`)
- Rounded corners (`rounded-xl`), cream background, image zoom transition, chef pick badges, pricing, and pill add-to-basket button.

### 4.3 Form Inputs (`<Input />`, `<Select />`, `<Textarea />`)
- Cream base background, focus ring with Tory Pink glow, clear inline error text.

### 4.4 Status Badges (`<Badge />`)
- **Order Request Statuses:**
  - `PENDING`: Amber (`bg-amber-100 text-amber-800`) — Request Received
  - `CONFIRMED`: Sky Blue (`bg-sky-100 text-sky-800`) — Order Confirmed
  - `PROCESSING`: Purple (`bg-purple-100 text-purple-800`) — In Preparation / Oven
  - `READY`: Cyan (`bg-cyan-100 text-cyan-800`) — Ready for Pickup / Dispatch
  - `DELIVERED`: Emerald Green (`bg-emerald-100 text-emerald-800`) — Delivered / Picked Up
  - `CANCELLED`: Stone Gray (`bg-stone-100 text-stone-700`) — Cancelled
- **Catering Booking Statuses:**
  - `PENDING` / `REVIEWING`: Amber / Indigo
  - `QUOTED`: Sky Blue (Quote Ready)
  - `CONFIRMED` / `COMPLETED`: Emerald Green
  - `REJECTED`: Rose Red
- **Contract & Application Status:**
  - `PUBLISHED` / `APPROVED`: Emerald Green
  - `UNDER_REVIEW` / `SHORTLISTED`: Amber / Sky Blue
  - `CLOSED` / `REJECTED`: Rose Red
  - `DRAFT` / `ARCHIVED`: Neutral Stone

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout Adaptations |
|---|---|---|
| `xs` | `< 640px` | Single column grid, bottom cart summary, sticky WhatsApp concierge |
| `sm` | `640px` | 2-column product grid, compact navigation |
| `md` | `768px` | 2/3-column product grid, modal dialogs |
| `lg` | `1024px` | 4-column product grid, full admin sidebar |
| `xl` | `1280px` | Max container 1280px centered |
