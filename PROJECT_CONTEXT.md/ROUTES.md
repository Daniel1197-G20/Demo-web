# Tory's Treats — Routing & Navigation Architecture (Order Request Model)

**Router:** React Router DOM v6  
**Routing Paradigm:** Nested Layouts, Role-Based Route Guards, Code-Splitting Ready  
**Order Model:** Order Request & Inquiries (Zero Online Payment Gateways)  

---

## 1. Route Layout Hierarchy

```
<App>
├── <ToastProvider>
│   └── <AuthProvider>
│       └── <CartProvider>
│           └── <RouterProvider>
│               │
│               ├── [CUSTOMER LAYOUT] (CustomerNavbar + MainContent + CustomerFooter + WhatsAppFloatingButton)
│               │   ├── / (Home)
│               │   ├── /shop (Catalog & Filters)
│               │   ├── /shop/:slug (Product Details)
│               │   ├── /categories (Category Index)
│               │   ├── /categories/:slug (Category Filtered Catalog)
│               │   ├── /cart (Cart View)
│               │   ├── /checkout (Order Request Submission Flow)
│               │   ├── /checkout/confirmation/:orderNumber (Order Request Received)
│               │   ├── /catering (Event Catering Request Form)
│               │   ├── /catering/confirmation/:bookingNumber (Catering Inquiry Confirmation)
│               │   ├── /contracts (Contract Staff Opportunities)
│               │   ├── /contracts/:slug (Contract Details)
│               │   ├── /contracts/:slug/apply (Contract Application Form)
│               │   ├── /contracts/application-success (Application Confirmation)
│               │   ├── /contact (Contact & WhatsApp Direct)
│               │   ├── /design-system (Design Tokens & Component Lab)
│               │   │
│               │   └── [ACCOUNT SUB-LAYOUT] (AccountSidebar + Content) [PROTECTED]
│               │       ├── /account (Overview)
│               │       ├── /account/orders (Customer Order Requests)
│               │       ├── /account/orders/:orderNumber (Order Request Details & Tracking)
│               │       ├── /account/bookings (Customer Bookings)
│               │       ├── /account/bookings/:bookingNumber (Customer Booking Details)
│               │       ├── /account/applications (Customer Job Applications)
│               │       ├── /account/applications/:id (Application Details)
│               │       └── /account/profile (Profile & Address Settings)
│               │
│               ├── [AUTH LAYOUT] (Branded Split Screen) [PUBLIC ONLY]
│               │   ├── /auth/login
│               │   ├── /auth/register
│               │   ├── /auth/forgot-password
│               │   └── /auth/reset-password
│               │
│               ├── [ADMIN LAYOUT] (AdminSidebar + AdminHeader + Content) [ADMIN GUARD]
│               │   ├── /admin (Dashboard & Operational KPIs)
│               │   ├── /admin/products (Product Management)
│               │   ├── /admin/products/new (Create Product)
│               │   ├── /admin/products/:id/edit (Edit Product)
│               │   ├── /admin/categories (Category Management)
│               │   ├── /admin/orders (Order Requests Queue)
│               │   ├── /admin/orders/:orderNumber (Order Workflow & Fulfillment)
│               │   ├── /admin/bookings (Event Booking Inquiries)
│               │   ├── /admin/bookings/:bookingNumber (Booking Detail & Quotes)
│               │   ├── /admin/contracts (Contract Opportunities)
│               │   ├── /admin/contracts/new (Create Contract)
│               │   ├── /admin/contracts/:id/edit (Edit Contract)
│               │   ├── /admin/contracts/applications (Staff Applications)
│               │   ├── /admin/contracts/applications/:id (Review Application)
│               │   ├── /admin/customers (Customer Directory)
│               │   ├── /admin/analytics (Demand & Category Analytics)
│               │   └── /admin/settings (Store Settings)
│               │
│               └── * (404 Not Found Page)
```

---

## 2. Comprehensive Route Matrix

| Route Path | Component File | Layout | Access Guard | Description |
|---|---|---|---|---|
| `/` | `pages/customer/Home.jsx` | `CustomerLayout` | Public | Hero, featured treats, catering highlights, reviews |
| `/shop` | `pages/customer/Shop.jsx` | `CustomerLayout` | Public | Full product catalog, category tabs, price filter, search |
| `/shop/:slug` | `pages/customer/ProductDetails.jsx` | `CustomerLayout` | Public | Image gallery, pricing, stock, min quantity, add-to-cart |
| `/categories` | `pages/customer/Categories.jsx` | `CustomerLayout` | Public | Visual category grid |
| `/cart` | `pages/customer/Cart.jsx` | `CustomerLayout` | Public | Cart items table, quantity modifier, estimated total |
| `/checkout` | `pages/customer/Checkout.jsx` | `CustomerLayout` | Public | Fulfillment selection (Delivery/Pickup), date/time, recipient info, order request CTA |
| `/checkout/confirmation/:orderNumber` | `pages/customer/OrderConfirmation.jsx` | `CustomerLayout` | Public | Order request received receipt, next steps, WhatsApp tracking |
| `/catering` | `pages/customer/Catering.jsx` | `CustomerLayout` | Public | Event inquiry request form |
| `/catering/confirmation/:bookingNumber` | `pages/customer/CateringConfirmation.jsx` | `CustomerLayout` | Public | Booking request received confirmation |
| `/contracts` | `pages/customer/Contracts.jsx` | `CustomerLayout` | Public | Database-driven list of open job/contract opportunities |
| `/contracts/:slug` | `pages/customer/ContractDetails.jsx` | `CustomerLayout` | Public | Job duties, compensation, requirements & "Apply" CTA |
| `/contracts/:slug/apply` | `pages/customer/ContractApply.jsx` | `CustomerLayout` | Public/Auth | Multi-field application with CV upload |
| `/contracts/application-success` | `pages/customer/ApplicationConfirmation.jsx` | `CustomerLayout` | Public/Auth | Confirmation screen after application submission |
| `/contact` | `pages/customer/Contact.jsx` | `CustomerLayout` | Public | Bakery address, business hours, WhatsApp direct link |
| `/design-system` | `pages/customer/DesignSystemShowcase.jsx` | `CustomerLayout` | Public | Live component & token testing lab |
| `/account` | `pages/customer/account/AccountOverview.jsx` | `AccountLayout` | Protected | Recent activity, shortcuts to orders & applications |
| `/account/orders` | `pages/customer/account/AccountOrders.jsx` | `AccountLayout` | Protected | Customer order requests list with live status |
| `/account/orders/:orderNumber` | `pages/customer/account/AccountOrderDetails.jsx` | `AccountLayout` | Protected | Order request receipt and fulfillment progress |
| `/account/bookings` | `pages/customer/account/AccountBookings.jsx` | `AccountLayout` | Protected | Customer catering requests & quotes |
| `/account/bookings/:bookingNumber` | `pages/customer/account/AccountBookingDetails.jsx` | `AccountLayout` | Protected | Catering breakdown & quote review |
| `/account/applications` | `pages/customer/account/AccountApplications.jsx` | `AccountLayout` | Protected | Contract application list with real-time review status |
| `/account/profile` | `pages/customer/account/AccountProfile.jsx` | `AccountLayout` | Protected | Update name, phone, default delivery address |
| `/auth/login` | `pages/auth/Login.jsx` | `AuthLayout` | Public Only | Email/password login with redirect param support |
| `/auth/register` | `pages/auth/Register.jsx` | `AuthLayout` | Public Only | Customer account registration |
| `/auth/forgot-password` | `pages/auth/ForgotPassword.jsx` | `AuthLayout` | Public Only | Send password reset email link |
| `/auth/reset-password` | `pages/auth/ResetPassword.jsx` | `AuthLayout` | Public Only | Update password with reset token |
| `/admin` | `pages/admin/Dashboard.jsx` | `AdminLayout` | Admin Only | Operational KPI dashboard & queues |
| `/admin/products` | `pages/admin/Products/ProductList.jsx` | `AdminLayout` | Admin Only | Product catalog management |
| `/admin/products/new` | `pages/admin/Products/ProductForm.jsx` | `AdminLayout` | Admin Only | Create new product |
| `/admin/products/:id/edit` | `pages/admin/Products/ProductForm.jsx` | `AdminLayout` | Admin Only | Edit product, pricing, stock, active toggles |
| `/admin/categories` | `pages/admin/Categories/CategoryManager.jsx` | `AdminLayout` | Admin Only | Manage menu categories |
| `/admin/orders` | `pages/admin/Orders/OrderList.jsx` | `AdminLayout` | Admin Only | Order queue, filter by status & date |
| `/admin/orders/:orderNumber` | `pages/admin/Orders/OrderDetails.jsx` | `AdminLayout` | Admin Only | Order workflow management (Confirm, Process, Ready, Deliver) |
| `/admin/bookings` | `pages/admin/Bookings/BookingList.jsx` | `AdminLayout` | Admin Only | Catering booking inquiries list |
| `/admin/bookings/:bookingNumber` | `pages/admin/Bookings/BookingDetails.jsx` | `AdminLayout` | Admin Only | Review event, add notes, formulate informational quote |
| `/admin/contracts` | `pages/admin/Contracts/ContractList.jsx` | `AdminLayout` | Admin Only | All contracts: draft, published, closed, archived |
| `/admin/contracts/new` | `pages/admin/Contracts/ContractForm.jsx` | `AdminLayout` | Admin Only | Create contract opportunity |
| `/admin/contracts/:id/edit` | `pages/admin/Contracts/ContractForm.jsx` | `AdminLayout` | Admin Only | Edit contract details and change lifecycle state |
| `/admin/contracts/applications` | `pages/admin/Contracts/ApplicationList.jsx` | `AdminLayout` | Admin Only | Candidate applications queue |
| `/admin/contracts/applications/:id` | `pages/admin/Contracts/ApplicationDetails.jsx` | `AdminLayout` | Admin Only | Review candidate CV, add feedback, update hiring status |
| `/admin/customers` | `pages/admin/Customers/CustomerList.jsx` | `AdminLayout` | Admin Only | Customer directory & activity history |
| `/admin/analytics` | `pages/admin/Analytics/AnalyticsOverview.jsx` | `AdminLayout` | Admin Only | Demand analytics & category volume |
| `/admin/settings` | `pages/admin/Settings/StoreSettings.jsx` | `AdminLayout` | Admin Only | Store hours, Lagos delivery rates, contact info |
