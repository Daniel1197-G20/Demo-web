# Tory's Treats — Quality Assurance & Testing Strategy (Order Request Model)

**Framework:** Playwright (End-to-End Automation) & Vitest (Unit/Integration)  
**Language:** JavaScript (ESM, No TypeScript)  
**Coverage Target:** Core Business Workflows (Order Requests, Catering Inquiries, Recruitment, Admin Ops)  

---

## 1. Test Suite Architecture

```
torys-treats/
├── tests/
│   ├── e2e/
│   │   ├── 01_auth_registration.spec.js
│   │   ├── 02_auth_login.spec.js
│   │   ├── 03_product_browsing.spec.js
│   │   ├── 04_cart_management.spec.js
│   │   ├── 05_order_request_submit.spec.js
│   │   ├── 06_catering_booking_submit.spec.js
│   │   ├── 07_contract_browsing.spec.js
│   │   ├── 08_contract_application.spec.js
│   │   ├── 09_admin_auth_guard.spec.js
│   │   ├── 10_admin_product_create_edit.spec.js
│   │   ├── 11_admin_contract_lifecycle.spec.js
│   │   ├── 12_admin_application_review.spec.js
│   │   ├── 13_admin_order_workflow.spec.js
│   │   └── 14_admin_booking_quote.spec.js
│   ├── fixtures/
│   │   ├── auth.fixture.js
│   │   └── testFiles/
│   │       ├── sample_cv.pdf
│   │       └── sample_treat.jpg
│   └── helpers/
│       └── selectors.js
├── playwright.config.js
```

---

## 2. Detailed Test Scenarios

### Customer Order Request Flow:
1. **Product Browsing & Selection:** User navigates `/shop`, applies category filter, opens product detail, specifies quantity, and adds item to cart.
2. **Cart Management:** User opens cart, verifies estimated subtotal, and proceeds to Order Request form.
3. **Order Request Submission:** User selects fulfillment type (Delivery or Pickup), inputs preferred delivery date/time, recipient address, and special notes. User clicks **"Submit Order Request"**.
4. **Order Receipt & Tracking:** User receives order confirmation with reference number (e.g. `TT-ORD-202608-XXXX`) and WhatsApp concierge shortcut. User views order in `/account/orders`.

### Catering Inquiry Flow:
5. **Catering Booking Submission:** User completes catering form (event type, date, guest count, location, treat specifications) and submits.
6. **Booking Confirmation:** User receives reference (e.g. `TT-BK-202608-XXXX`) and reviews status in `/account/bookings`.

### Contract Staff Flow:
7. **Contract Browsing:** User browses open, published contracts on `/contracts`.
8. **Contract Application Submission:** User fills candidate details, uploads CV resume document, submits, and verifies review status under `/account/applications`.

### Admin Operations Flow:
9. **Admin Auth Guard:** Unauthenticated and standard customer accounts are restricted from `/admin`. Admin access granted for `role = 'ADMIN'`.
10. **Admin Product Management:** Admin creates new bakery item, updates pricing, toggles availability and featured status.
11. **Admin Contract Lifecycle:** Admin creates contract role, publishes, toggles public visibility, and marks as closed.
12. **Admin Application Review:** Admin reviews candidate applications, inspects CV document, records feedback notes, and transitions status (`UNDER_REVIEW` -> `SHORTLISTED` -> `APPROVED` / `REJECTED`).
13. **Admin Order Fulfillment:** Admin reviews incoming order request, confirms details, and transitions status: `PENDING` -> `CONFIRMED` -> `PROCESSING` -> `READY` -> `DELIVERED`.
14. **Admin Catering Quote Formulation:** Admin reviews event inquiry, enters informational quote amount and menu breakdown, and updates status to `QUOTED`.
