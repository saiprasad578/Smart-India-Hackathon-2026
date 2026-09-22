# Design System

> DESIGN.md = **how it should look and feel**. A farmer, not a tech-savvy user, is the primary persona.

## Principles

1. **Voice and icons first, text second.** Every key action has a microphone option and an icon.
2. **One task per screen.** Short flows, big buttons.
3. **Regional language first.** English is secondary for farmer screens.
4. **Show the money.** Price, payment status and "where your rupee went" are always visible and simple.
5. **Trust is visible.** Verified badges, escrow status, delivery confirmation steps.

## Users and views

| View | Primary need | Design notes |
| --- | --- | --- |
| Farmer | List produce, see payment status | Very large buttons, voice, minimal text, low-bandwidth friendly |
| FPO agent | List for many farmers, review flags | Fast repeat entry, batch actions, clear queue |
| Buyer | Browse, order, confirm delivery | Clear grades, quantities, price band, escrow status |
| Admin / demo dashboard | Forecasts, routes, price breakup | Charts, map, explainable numbers |

## Typography

- Font: a clean sans-serif with good Indic script support (e.g. Noto Sans family).
- Base size 18px minimum on farmer screens; headings semibold.

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Primary | `#2E7D32` | Main actions (green) |
| Accent | `#F9A825` | Highlights, warnings |
| Background | `#FAFAF5` | Page background |
| Text | `#1B1B1B` | Main text |
| Muted | `#5F6B5F` | Secondary text |
| Error | `#C62828` | Errors, price-outlier flags |
| Success | `#2E7D32` | Confirmed, released |

Never rely on color alone; pair with icons and text.

## Components

- **Voice button**: large, persistent on listing screens, shows listening state and transcript for confirmation.
- **Listing card**: photo, crop, grade, quantity, ask price vs mandi price band, verification badge.
- **Price-band indicator**: within band / high / low with simple icon.
- **Escrow tracker**: steps (Paid → Held → Delivered → Released) with plain-language labels.
- **Price-breakup bar**: farmer share vs logistics vs platform, with an "assumptions" link.
- **Route map**: pickup and delivery stops, total km and cost-per-kg saving.
- **Synthetic-data badge**: visible label on any simulated data.

## Forms

- Visible labels, inline validation, confirm-by-voice option.
- Photo capture with automatic geo/time stamp and a clear "photo taken" confirmation.
- Numeric input with large steppers for quantity.

## UX requirements

- Mobile-first (375px), also tested at 768px and 1440px.
- Loading, empty, error and offline-tolerant states.
- Accessible: labels, keyboard navigation, contrast, screen-reader support.
- Multilingual with language switcher on first screen.
- Test with at least one real user from the target group where possible.
