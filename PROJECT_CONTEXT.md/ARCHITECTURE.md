# Tory's Treats — System & Frontend Architecture Specification (Order Request Model)

**System:** Tory's Treats Platform  
**Language/Runtime:** React JS (ECMAScript 2022+, Pure JavaScript, No TypeScript)  
**Build System:** Vite  
**Backend & Database:** Supabase (PostgreSQL 15+, Supabase Auth, Storage, RLS)  
**Order & Payment Model:** Direct Order-Request System with Offline Confirmation & Settlement  

---

## 1. High-Level System Architecture

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT TIER                                        |
|                                                                                       |
|  +-----------------------------------+    +----------------------------------------+  |
|  |     Customer Web Experience       |    |        Admin Management Portal         |  |
|  |  - Catalog & Search               |    |  - Product & Inventory Management      |  |
|  |  - Cart & Order Request           |    |  - Order Request Lifecycle & Tracking  |  |
|  |  - Delivery / Pickup Preferences  |    |  - Catering Quote & Booking Workflow   |  |
|  |  - Event / Catering Inquiries     |    |  - Contract Creation & Publishing      |  |
|  |  - Contract Jobs & Application    |    |  - Staff Application Review / Scoring  |  |
|  |  - Account & Activity Hub         |    |  - Customers Directory & Store Config  |  |
|  |  - WhatsApp Direct Action         |    +----------------------------------------+  |
|  +-----------------------------------+                       |                        |
|                                                              |                        |
|                 +--------------------------------------------+                        |
|                 |       Design System Tokens & UI Atoms                               |
|                 |  (Tory Pink, Soft Cream, Charcoal, Rounded)                         |
|                 +---------------------------------------------------------------------+
+------------------------------------------+--------------------------------------------+
                                           |
                                HTTPS / WSS |
                                           v
+---------------------------------------------------------------------------------------+
|                                 SERVICES & BACKEND                                    |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                             Supabase BaaS / Backend                             |  |
|  |  - PostgreSQL 15+ Relational Database (Orders, Bookings, Contracts, Products)  |  |
|  |  - Row Level Security (RLS) Engine                                              |  |
|  |  - Supabase Auth (JWT & Session Management)                                     |  |
|  |  - Supabase Storage (Public bucket: assets; Private bucket: CVs)                |  |
|  +---------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------+
```

---

## 2. Frontend React Folder Structure

```
torys-treats/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       ├── index.css
│   │       └── tokens.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   ├── WhatsAppFloatingButton.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── layout/
│   │   │   ├── CustomerNavbar.jsx
│   │   │   ├── CustomerFooter.jsx
│   │   │   ├── CustomerLayout.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   └── AccountLayout.jsx
│   │   └── ui/
│   │       ├── Alert.jsx
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Dropdown.jsx
│   │       ├── EmptyState.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       ├── ProductCard.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── Select.jsx
│   │       ├── Skeleton.jsx
│   │       ├── Textarea.jsx
│   │       └── Toast.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useToast.js
│   │   ├── useProducts.js
│   │   ├── useCategories.js
│   │   ├── useOrders.js
│   │   ├── useBookings.js
│   │   ├── useContracts.js
│   │   └── useApplications.js
│   ├── lib/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── utils.js
│   │   └── validators.js
│   ├── pages/
│   │   ├── customer/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── Catering.jsx
│   │   │   ├── CateringConfirmation.jsx
│   │   │   ├── Contracts.jsx
│   │   │   ├── ContractDetails.jsx
│   │   │   ├── ContractApply.jsx
│   │   │   ├── ApplicationConfirmation.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── DesignSystemShowcase.jsx
│   │   │   └── account/
│   │   │       ├── AccountOverview.jsx
│   │   │       ├── AccountOrders.jsx
│   │   │       ├── AccountOrderDetails.jsx
│   │   │       ├── AccountBookings.jsx
│   │   │       ├── AccountApplications.jsx
│   │   │       └── AccountProfile.jsx
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products/
│   │   │   │   ├── ProductList.jsx
│   │   │   │   └── ProductForm.jsx
│   │   │   ├── Categories/
│   │   │   │   └── CategoryManager.jsx
│   │   │   ├── Orders/
│   │   │   │   ├── OrderList.jsx
│   │   │   │   └── OrderDetails.jsx
│   │   │   ├── Bookings/
│   │   │   │   ├── BookingList.jsx
│   │   │   │   └── BookingDetails.jsx
│   │   │   ├── Contracts/
│   │   │   │   ├── ContractList.jsx
│   │   │   │   ├── ContractForm.jsx
│   │   │   │   ├── ApplicationList.jsx
│   │   │   │   └── ApplicationDetails.jsx
│   │   │   ├── Customers/
│   │   │   │   └── CustomerList.jsx
│   │   │   ├── Analytics/
│   │   │   │   └── AnalyticsOverview.jsx
│   │   │   └── Settings/
│   │   │       └── StoreSettings.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   └── NotFound.jsx
│   ├── routes/
│   │   └── index.jsx
│   ├── services/
│   │   ├── supabase.js
│   │   ├── auth.service.js
│   │   ├── products.service.js
│   │   ├── categories.service.js
│   │   ├── orders.service.js
│   │   ├── bookings.service.js
│   │   ├── contracts.service.js
│   │   ├── applications.service.js
│   │   └── storage.service.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 3. Order Request Workflow

```
+------------------+         +--------------------+         +--------------------+
|  Customer Cart   |         | Order Request Form |         |  Supabase Database |
+--------+---------+         +---------+----------+         +---------+----------+
         |                             |                              |
         | 1. Proceed to Order Request |                              |
         |---------------------------->|                              |
         |                             | 2. Input Fulfillment Info    |
         |                             |    - Delivery / Pickup       |
         |                             |    - Date & Preferred Time   |
         |                             |    - Address & Notes         |
         |                             |                              |
         |                             | 3. Submit Order Request      |
         |                             |----------------------------->|
         |                             |                              | 4. Create Order Record
         |                             |                              |    (status: PENDING)
         |                             | 5. Return Order Reference    |
         |                             |<-----------------------------|
         |                             |
         | 6. Render Confirmation & WhatsApp Shortcut
         |<----------------------------|
         |
         v
+------------------+         +--------------------+         +--------------------+
|   Customer UI    |         | Tory's Treats Team |         |   Admin Backoffice |
+--------+---------+         +---------+----------+         +---------+----------+
         |                             |                              |
         |                             | 7. Review Order Request      |<-----------------+
         |                             | 8. Call / WhatsApp Customer  |                  |
         |                             |    to confirm details        |                  |
         |                             | 9. Transition Status:        |                  |
         |                             |    CONFIRMED -> PROCESSING   |------------------+
         | 10. Live Status Update      |    -> READY -> DELIVERED     |
         |<-----------------------------------------------------------+
```

---

## 4. Catering / Event Booking Workflow

```
Customer Submits Inquiry Form
  (Event Type, Date, Guest Count, Location, Treat Needs, Theme Notes)
  │
  ▼
Supabase Database Records Booking (`status = PENDING`)
  │
  ▼
Admin Reviews Inquiry in `/admin/bookings/:bookingNumber`
  │
  ▼
Admin Formulates Informational Quote Amount & Menu Breakdown (`status = QUOTED`)
  │
  ▼
Bakery Team Consults Customer via WhatsApp / Phone
  │
  ▼
Admin Marks Booking as `CONFIRMED` -> `IN_PROGRESS` -> `COMPLETED`
```

---

## 5. Storage Architecture

| Bucket Name | Visibility | File Types | Max Size | Allowed Uploaders | Intended Use |
|---|---|---|---|---|---|
| `product-images` | Public Read | `.jpg`, `.jpeg`, `.png`, `.webp` | 5 MB | `ADMIN` only | Bakery products, category banners, promo cards |
| `contract-documents` | Private Read/Write | `.pdf`, `.docx` | 10 MB | Authenticated Applicants | Resumes & portfolios (Accessible only by applicant & Admins) |
| `avatars` | Public Read | `.jpg`, `.png`, `.webp` | 2 MB | Authenticated User | Customer & Staff profile avatars |
