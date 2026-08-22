# Tory's Treats — Master Project Plan & Roadmap (Order Request Architecture)

**Project Name:** Tory's Treats Full-Stack Platform  
**Architecture Version:** 1.1.0 (Direct Order Request & Offline Confirmation Model)  
**Lead Architect:** Antigravity  
**Tech Stack:** React JS (Vite, JavaScript only, No TypeScript) + Supabase (PostgreSQL, Auth, Storage, RLS)  
**Payment Model:** Offline Order Confirmation & Direct Client Settlement (No Online Payment Gateway)  
**Date:** August 2026  

---

## 1. Executive Summary & Vision

**Tory's Treats** is an artisanal, luxury bakery and premium catering enterprise requiring a modern, full-stack digital platform. The platform operates on a **direct order-request and catering inquiry model**:
1. **Customers:** Seeking to browse artisanal treats, assemble treat baskets, submit fulfillment order requests (delivery or pickup with preferred date/time), request bespoke event catering, apply for contract staffing opportunities, track order and booking lifecycles, and communicate directly with the bakery team via WhatsApp and phone.
2. **Administrators & Staff:** Managing product catalogs, menu items, order requests, fulfillment workflow stages, catering quotes, database-driven contract recruitment pipelines, customer accounts, and store settings.

### Strategic Objectives
- **Brand Elevation:** Deliver a responsive, high-converting digital storefront reflecting the warm, playful, and luxury Tory's Treats visual identity (bright Tory pink, soft pink, rich cream, charcoal typography, rounded geometries, and appetizing food presentation).
- **Direct Order Request Workflow:** Streamlined, frictionless order placement without online payment friction. Orders and catering bookings are submitted as requests, verified by the bakery team, and confirmed directly with the customer.
- **Dynamic Operations:** 100% database-driven contracts, products, orders, and bookings—ensuring zero hardcoding in frontend code.
- **Enterprise-Grade Security:** Row Level Security (RLS) across all PostgreSQL tables, secure role-based authorization (`CUSTOMER`, `ADMIN`, future-ready for `SUPER_ADMIN` and `STAFF`), and private storage buckets for sensitive candidate resumes.

---

## 2. Project Scope & Requirements Traceability

| Domain | Requirement ID | Requirement Summary | Implementation Mechanism |
|---|---|---|---|
| **Core Framework** | `REQ-01` | React JS + Vite + Pure JS (No TypeScript) | Vite project scaffold with standard `.js` and `.jsx` files, ESLint, React Router v6. |
| **Backend & DB** | `REQ-02` | Supabase, PostgreSQL, Auth, Storage, RLS | `@supabase/supabase-js`, PostgreSQL schema with RLS policies, custom trigger functions. |
| **Order Processing** | `REQ-03` | Order Request Architecture (Offline Payment) | Multi-field order request capture (Delivery/Pickup, preferred schedule, recipient info, special notes). |
| **Customer Store** | `REQ-04` | Catalog, Product Details, Search, Cart, Order Request | Dynamic category/product queries, local-storage synchronized Cart Context, order request submission. |
| **Event Catering** | `REQ-05` | Event/Catering booking management | Multi-field booking inquiry form, informational quote management, admin review, status transitions. |
| **Contract Staff** | `REQ-06` | Database-driven contract recruitment | `contracts` and `contract_applications` tables, file upload to secure Supabase storage, full admin lifecycle. |
| **Customer Portal** | `REQ-07` | Customer account dashboard | History views for Orders, Bookings, and Job Applications with live status updates. |
| **Admin Portal** | `REQ-08` | Backoffice management suite | Role-guarded `/admin/*` routes for Products, Categories, Orders, Bookings, Contracts, Applications, Customers, Settings. |
| **Authentication** | `REQ-09` | Registration, Login, Reset, RBAC | Supabase Auth integrated with `profiles` table; custom role-checking helper functions. |
| **Design System** | `REQ-10` | Unified UI tokens & reusable components | Brand-consistent token library (Tory Pink, Soft Pink, Cream, Charcoal) with zero ad-hoc component duplication. |
| **Testing** | `REQ-11` | Automated testing & validation | Comprehensive test suites covering all customer & admin journeys without payment dependencies. |

---

## 3. Technology Stack & Tooling

```
+-----------------------------------------------------------------------+
|                              FRONTEND                                 |
|  - React 18+ (JavaScript / JSX, No TypeScript)                        |
|  - Vite (Build Tool & Dev Server)                                     |
|  - React Router DOM v6 (Declarative Client-Side Routing)               |
|  - Tailwind CSS + CSS Variables (Design Tokens & Responsive Styles)   |
|  - Lucide React (Standardized Iconography)                            |
+-----------------------------------------------------------------------+
                                   |
                                   v  (HTTPS / REST / Realtime)
+-----------------------------------------------------------------------+
|                              BACKEND & DATA                           |
|  - Supabase Database (PostgreSQL 15+)                                 |
|  - Supabase Auth (JWT-based Session & User Management)                |
|  - Supabase Storage (Public bucket: assets; Private bucket: CVs)      |
|  - PostgreSQL Row Level Security (RLS) & DB Triggers                  |
+-----------------------------------------------------------------------+
```

---

## 4. Phased Implementation Roadmap

### Phase 1: Architecture & Design System Foundation (COMPLETED)
- [x] Scaffold Vite React application (Pure JavaScript).
- [x] Configure Tailwind CSS with the Tory's Treats token system.
- [x] Build atomic design system components.
- [x] Implement responsive base layouts and routing shells.

### Phase 2: Supabase Data Layer, Storage & Security
- [ ] Create PostgreSQL schema (`profiles`, `categories`, `products`, `orders`, `order_items`, `bookings`, `contracts`, `contract_applications`).
- [ ] Implement database triggers (auto-profile creation on signup, `updated_at` timestamps, order/booking human-readable sequence generators).
- [ ] Configure Row Level Security (RLS) policies for all tables.
- [ ] Create storage buckets (`product-images`, `contract-documents`, `avatars`) and security policies.
- [ ] Implement Supabase client service wrappers in `/src/services/*`.

### Phase 3: Authentication & Customer Store Experience
- [ ] Implement Authentication Context & Auth pages (Login, Register, Forgot Password, Reset Password).
- [ ] Connect Home Page to live Supabase products & categories.
- [ ] Build Catalog & Product Detail Pages (Category filters, search, price ranges, product image carousel).
- [ ] Build Cart Management (Item addition, quantity controls, minimum order constraints, local storage persistence).
- [ ] Build Order Request Flow (Delivery/Pickup selection, date/time preference, recipient address, special instructions, confirmation receipt).

### Phase 4: Catering/Event Booking & Direct WhatsApp Integration
- [ ] Connect Catering Request page with event details form (event type, guest count, treat preferences, date picker).
- [ ] Implement booking confirmation flow with human-readable reference number generation.
- [ ] Integrate contextual WhatsApp action links with pre-filled inquiry messages.

### Phase 5: Contract Recruitment System (Customer & Admin)
- [ ] Connect public Contract Opportunities listing page (filtered by active & published status).
- [ ] Build Contract Details view with job specifications and "Apply" trigger.
- [ ] Build Application Form with CV file upload to Supabase Storage.
- [ ] Build Customer Account > "My Applications" view with live status tracking.
- [ ] Build Admin Contract Management: Create, Edit, Publish, Close, Reopen, Archive, Visibility toggle.
- [ ] Build Admin Application Review: Filter applications, download CVs, status transitions (Under Review, Shortlisted, Approved, Rejected, Archived).

### Phase 6: Admin Backoffice Operations
- [ ] Build Admin Dashboard with operational KPI cards, recent orders, pending bookings, and active contracts.
- [ ] Build Product & Category Management (CRUD, drag/drop image upload, stock toggle, featured toggle).
- [ ] Build Order Management (Order status workflow: `PENDING` -> `CONFIRMED` -> `PROCESSING` -> `READY` -> `DELIVERED` / `CANCELLED`).
- [ ] Build Booking Management (Informational quote editor, admin notes, status updates).
- [ ] Build Customer Management & Store Settings configuration.

### Phase 7: Polish, Quality Assurance & Validation
- [ ] End-to-end user journey verification across all devices.
- [ ] Responsive, accessibility (a11y), and security audits.
- [ ] Production build optimization and deployment checklist.
