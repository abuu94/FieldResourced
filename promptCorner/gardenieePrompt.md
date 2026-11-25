Hapa nimekuandalia **Super Master Prompt** ya kutumia kwenye Google Antigravity ili ikujengee project yako ya Indoor Plants E-commerce kuanzia backend mpaka frontend, kwa kufuata architecture uliyochagua.

Prompt hii imeandaliwa kwa Kiingereza kwa sababu AI coding agents mara nyingi hufuata technical specifications kwa usahihi zaidi zinapoelezwa kwa English.

Imejumuisha Django REST Framework, React + TypeScript, Snippe, Africa’s Talking, Gmail SMTP, PDF receipts, delivery management, admin dashboard, security, testing na deployment.

## **Super Master Prompt — Indoor Plants E-commerce Platform**

# SUPER MASTER PROMPT

## Full-Stack Indoor Plants E-Commerce Platform

You are a Senior Full-Stack Software Architect, Django REST Framework Engineer, React TypeScript Engineer, UI/UX Designer, Database Architect, and DevOps Engineer.

Your task is to design, implement, test, and complete a production-ready full-stack e-commerce platform for selling indoor plants, flowers, trees, pots, and plant accessories.

You must develop BOTH the backend and frontend, integrate all required third-party services, and deliver a fully functional application.

Do not stop after creating a project structure, generating boilerplate, or building a static UI. Implement the actual business logic, database models, API endpoints, frontend pages, authentication, integrations, validation, and workflows.

---

# 1. PROJECT OVERVIEW

Build a modern, responsive, secure, and scalable e-commerce platform for an indoor plants business.

The platform allows customers to:

- Create an account and log in.
- Browse indoor plants and related products.
- Search, filter, and sort products.
- View detailed product information and plant care requirements.
- Add products to a shopping cart.
- Manage cart quantities.
- Checkout and place orders.
- Pay using supported Tanzanian mobile money payment methods through Snippe.
- Receive payment confirmations through email and SMS.
- Track order and delivery status.
- View order history and order details.
- Download or receive PDF payment receipts.
- Manage their profile and delivery addresses.
- Submit product reviews and ratings.

The platform also provides a comprehensive administration dashboard for managing products, categories, inventory, orders, payments, customers, delivery operations, coupons, reviews, and notifications.

The business uses its own in-house delivery team.

All customer-facing content and application interfaces must use English.

---

# 2. NON-NEGOTIABLE ARCHITECTURAL PRINCIPLES

The application MUST follow these architectural styles:

1. Feature-oriented modular architecture.
2. Service Layer Pattern.
3. Modular Monolith architecture.

Do not build a microservices architecture.

The backend must be a single Django project with independently organized Django apps.

The frontend must be organized by business features rather than placing all components, hooks, and services into large shared folders.

## Backend architecture

Each Django app should encapsulate a specific business domain.

Each feature should contain its own:

- Models
- Serializers
- Views or API controllers
- URLs
- Services
- Selectors or query services where appropriate
- Permissions
- Tasks
- Tests

Use the Service Layer Pattern to separate business logic from HTTP views and serializers.

Views should primarily:

1. Validate and receive requests.
2. Call the appropriate service.
3. Return standardized API responses.

Services should handle:

- Business rules.
- Database transactions.
- Order creation.
- Payment initiation.
- Payment confirmation.
- Inventory updates.
- Delivery assignment.
- Notification orchestration.

Serializers should handle input validation and output representation, not complex business workflows.

Use Django ORM and PostgreSQL.

Avoid circular dependencies between apps. Use clear interfaces and event-driven service calls where appropriate.

## Frontend architecture

Use a feature-oriented React architecture.

Each feature should encapsulate:

- Pages
- Components
- Hooks
- Services
- Types
- Schemas
- Feature-specific utilities

Use shared components only for genuinely reusable UI elements.

Avoid giant components, duplicated business logic, and direct API calls inside page components.

---

# 3. TECHNOLOGY STACK

## Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- Simple JWT authentication
- Redis
- Celery
- Django Filter
- Pillow
- ReportLab for PDF generation
- Requests or an appropriate official SDK for external API integrations
- OpenAPI documentation using drf-spectacular

Use stable, compatible package versions. Check compatibility before installing dependencies.

## Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack React Query
- Axios
- Tailwind CSS
- shadcn/ui-inspired reusable components
- React Hook Form
- Zod
- Sonner for toast notifications
- Lucide React icons

Use strict TypeScript. Avoid `any` unless absolutely necessary and justified.

## Infrastructure

- PostgreSQL
- Redis
- Celery worker
- Celery Beat only when scheduled jobs are required
- Docker and Docker Compose for local development and deployment
- Nginx or an appropriate production reverse proxy

---

# 4. PROJECT STRUCTURE

Use a structure similar to the following.

## Backend

```
backend/
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── apps/
│   ├── accounts/
│   ├── catalog/
│   ├── cart/
│   ├── orders/
│   ├── payments/
│   ├── delivery/
│   ├── coupons/
│   ├── notifications/
│   ├── reviews/
│   └── wishlist/
│
├── common/
│   ├── permissions/
│   ├── pagination/
│   ├── exceptions/
│   ├── utils/
│   └── constants/
│
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
│
├── .env.example
├── manage.py
└── Dockerfile
```

Each app should have a clear internal structure.

Example:

```
apps/payments/
├── models.py
├── serializers.py
├── views.py
├── urls.py
├── permissions.py
├── services/
│   ├── __init__.py
│   └── snippe.py
├── tasks.py
├── webhooks.py
├── selectors.py
├── admin.py
└── tests/
```

Do not create unnecessary layers that add complexity without value.

## Frontend

```
frontend/
├── src/
│   ├── app/
│   │   ├── router/
│   │   ├── providers/
│   │   └── layouts/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── catalog/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── delivery/
│   │   ├── profile/
│   │   ├── wishlist/
│   │   ├── reviews/
│   │   └── admin/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── shared/
│   │   └── navigation/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   ├── schemas/
│   ├── utils/
│   ├── assets/
│   └── main.tsx
│
├── .env.example
├── package.json
└── Dockerfile
```

Feature-specific services, hooks, types, and schemas should remain inside their respective feature folders whenever practical.

---

# 5. USER ROLES AND ACCESS CONTROL

Implement the following roles:

## Customer

- Register and log in.
- Browse products.
- Manage personal profile.
- Manage delivery addresses.
- Manage cart and wishlist.
- Checkout and pay.
- View only their own orders.
- View their own payment history.
- Track their own deliveries.
- Submit reviews for eligible purchased products.

## Admin

- Access the administration dashboard.
- Manage products and categories.
- Manage inventory.
- Manage customer accounts.
- View and manage orders.
- View payment records.
- Manage delivery assignments.
- Manage delivery staff.
- Manage coupons.
- Moderate reviews.
- View notification logs and reports.

## Delivery Staff

- Access their own delivery dashboard.
- View only deliveries assigned to them.
- View delivery details.
- Update delivery status.
- Record delivery notes.
- Mark orders as delivered.
- Report failed delivery attempts.

## Superuser

Use Django's built-in superuser privileges for full system administration.

Enforce permissions on the backend. Hiding frontend buttons is not sufficient security.

---

# 6. ACCOUNTS AND AUTHENTICATION

Implement a custom Django User model before creating other migrations.

Use email as the primary login identifier.

User fields should include:

- Email
- First name
- Last name
- Phone number
- Role
- Profile image
- Is active
- Date joined
- Last login

Implement:

- Customer registration.
- Login.
- JWT access and refresh tokens.
- Token refresh.
- Logout.
- Profile retrieval and update.
- Password change.
- Password reset using Gmail email.
- Email verification if appropriate.

Use secure password hashing.

Do not expose password hashes or sensitive authentication information in API responses.

Configure secure token storage and refresh behavior on the frontend.

---

# 7. PRODUCT CATALOG

Implement the following models.

## Category

Fields:

- Name
- Slug
- Description
- Image
- Is active
- Created at
- Updated at

Support hierarchical categories if useful.

## Product

Fields:

- Name
- Slug
- Description
- Category
- Price
- Discount price where applicable
- SKU
- Stock quantity
- Main image
- Is active
- Is featured
- Created at
- Updated at

Plant-specific fields:

- Scientific name
- Plant height
- Light requirement
- Watering frequency
- Humidity requirement
- Pet-friendly indicator
- Difficulty level
- Indoor/outdoor suitability
- Care instructions

## ProductImage

Support multiple product images.

Implement:

- Product listing.
- Product detail.
- Category filtering.
- Search.
- Sorting.
- Price filtering.
- Featured products.
- Related products.
- Pagination.
- Stock availability.

Validate uploaded images and prevent unsafe file uploads.

---

# 8. SHOPPING CART

Implement a database-backed cart for authenticated customers.

Models:

- Cart
- CartItem

Requirements:

- Add product to cart.
- Update quantity.
- Remove item.
- Clear cart.
- View cart.
- Calculate subtotal.
- Validate stock.
- Prevent duplicate cart items for the same product.

The backend must calculate all prices.

Never trust product prices or totals submitted by the frontend.

Cart data must be associated with the authenticated customer.

---

# 9. CHECKOUT AND ORDER MANAGEMENT

Implement a secure checkout workflow.

Customers must be registered and authenticated. Guest checkout is not required.

Checkout must collect:

- Customer name
- Phone number
- Delivery address
- City or area
- Delivery instructions
- Selected delivery address

The backend must:

1. Validate the cart.
2. Recalculate product prices.
3. Validate stock.
4. Calculate subtotal.
5. Apply eligible coupon.
6. Calculate delivery fee.
7. Calculate final total.
8. Create an order.
9. Create order items using product and price snapshots.
10. Create a payment record.
11. Initiate payment through Snippe.

## Order model

Include:

- Customer
- Order number
- Status
- Subtotal
- Discount amount
- Delivery fee
- Total
- Shipping details
- Delivery notes
- Created at
- Updated at

## OrderItem model

Include:

- Order
- Product
- Product name snapshot
- SKU snapshot
- Unit price snapshot
- Quantity
- Line total

Order items must preserve historical product names and prices even if the product is later updated.

## Order statuses

Use controlled choices:

- Pending payment
- Confirmed
- Processing
- Ready for delivery
- Out for delivery
- Delivered
- Cancelled

Implement valid status transitions.

Do not allow arbitrary status changes from customers.

---

# 10. SNIPPE PAYMENT INTEGRATION

Integrate Snippe for mobile money payments in Tanzania.

Official documentation:

[https://docs.snippe.sh/docs/2026-01-25](https://docs.snippe.sh/docs/2026-01-25)

Before implementing the integration:

- Read the official documentation.
- Verify the current API endpoints.
- Verify the request payload.
- Verify authentication requirements.
- Verify supported payment methods.
- Verify payment response fields.
- Verify webhook event formats.
- Verify webhook signature verification requirements.
- Verify idempotency behavior.

Do not invent API endpoints, fields, headers, or signature algorithms.

Use the current official documentation as the source of truth.

## Payment model

Include:

- Order
- Provider
- Provider reference
- Amount
- Currency
- Payment method
- Customer phone number
- Status
- Raw provider response where appropriate
- Created at
- Updated at
- Completed at

Payment statuses:

- Pending
- Processing
- Completed
- Failed
- Cancelled
- Refunded

## Payment functionality

Implement:

- Initiate payment.
- Store provider reference.
- Retrieve payment status.
- Handle payment errors.
- Handle payment timeouts.
- Handle payment retries safely.
- Prevent duplicate payment initiation.
- Support payment reconciliation.

Use TZS as the default currency.

The backend must be authoritative for payment amounts.

## Snippe webhook

Create a dedicated webhook endpoint.

Requirements:

- Verify webhook authenticity according to current Snippe documentation.
- Validate timestamp/signature if required.
- Validate payment reference.
- Validate amount and currency.
- Validate the related order.
- Prevent duplicate processing.
- Use database transactions.
- Update payment and order statuses atomically.
- Trigger notifications only after successful payment confirmation.

Never allow the React frontend to mark a payment as completed.

Never trust a redirect or frontend success page as proof of payment.

Store webhook event identifiers or equivalent idempotency data.

---

# 11. AFRICA'S TALKING SMS INTEGRATION

Integrate Africa's Talking for transactional SMS.

Official documentation:

[https://developers.africastalking.com/docs/sms/overview](https://developers.africastalking.com/docs/sms/overview)

Read the official documentation and verify the current API requirements before implementation.

Use Africa's Talking for:

- Payment confirmation.
- Order confirmation.
- Order processing updates.
- Delivery assignment updates.
- Out-for-delivery notifications.
- Delivery completion.
- Important account notifications.

Use sandbox credentials during development.

Use live credentials only in production.

Implement:

- SMS service layer.
- Message templates.
- Phone number validation and normalization.
- SMS notification logs.
- Provider response handling.
- Retry handling.
- Error logging.
- Delivery report callbacks if supported and required.

Do not send marketing SMS without appropriate customer consent.

---

# 12. GMAIL EMAIL INTEGRATION

Use Gmail SMTP for transactional email.

Do not use Brevo or another email provider unless explicitly requested.

Use Gmail SMTP configuration:

- SMTP host: smtp.gmail.com
- Port: 587
- STARTTLS enabled
- Gmail address as username
- Google App Password as SMTP password

Read Django's official email documentation and implement the appropriate email backend.

Required email notifications:

- Registration confirmation.
- Password reset.
- Order confirmation.
- Payment confirmation.
- Payment receipt.
- Order processing.
- Delivery updates.
- Delivery completion.
- Admin new-order notification.

Use HTML email templates with a professional branded design.

Include plain-text email alternatives where practical.

Never store the Gmail account password in source code.

Never use a regular Gmail password in place of an App Password.

Store credentials in environment variables.

---

# 13. PDF RECEIPTS AND INVOICES

Use ReportLab to generate PDF documents on the backend.

Generate professional, readable PDF receipts.

A payment receipt should include:

- Business name and logo.
- Receipt number.
- Order number.
- Customer name.
- Customer email.
- Customer phone.
- Payment method.
- Snippe payment reference.
- Payment date.
- Product names.
- Quantities.
- Unit prices.
- Subtotal.
- Discount.
- Delivery fee.
- Total paid.
- Payment status.

Generate the PDF only after payment has been verified.

Attach the PDF to the payment confirmation email.

Provide a secure authenticated endpoint for customers to download their own receipts.

Customers must not be able to download receipts belonging to other customers.

Avoid generating duplicate receipts for the same completed payment.

---

# 14. IN-HOUSE DELIVERY MANAGEMENT

Implement a delivery management system for the business's own delivery team.

Models:

- DeliveryStaffProfile
- Delivery

Delivery fields:

- Order
- Assigned delivery staff
- Delivery status
- Recipient name
- Recipient phone
- Delivery address
- Delivery notes
- Assigned at
- Picked up at
- Delivered at
- Failed delivery reason

Delivery statuses:

- Pending
- Assigned
- Picked up
- Out for delivery
- Delivered
- Failed

Admin functionality:

- View delivery queue.
- Assign delivery staff.
- Reassign delivery.
- View delivery status.
- View delivery history.
- Manage delivery staff.

Delivery staff functionality:

- View assigned deliveries.
- View delivery details.
- Update delivery status.
- Record delivery notes.
- Mark delivery as completed.
- Report failed delivery.

Enforce strict permissions.

Delivery staff must only access deliveries assigned to them.

When an order is marked as delivered, update the appropriate order status and trigger customer notifications.

---

# 15. COUPONS AND DISCOUNTS

Implement a coupon system.

Coupon fields:

- Code
- Discount type
- Discount value
- Minimum order amount
- Maximum discount
- Valid from
- Valid until
- Usage limit
- Per-customer usage limit
- Is active

Support percentage and fixed discounts.

Validate coupons on the backend.

Prevent invalid, expired, or overused coupons.

Do not trust coupon calculations from the frontend.

---

# 16. REVIEWS AND WISHLIST

Implement product reviews and ratings.

Requirements:

- Customers can review eligible purchased products.
- One review per customer per product unless editing an existing review.
- Rating validation.
- Review moderation.
- Admin review management.
- Product average rating.

Implement wishlist functionality:

- Add product.
- Remove product.
- View wishlist.
- Prevent duplicate wishlist entries.

---

# 17. NOTIFICATION ARCHITECTURE

Implement a centralized notification system.

Use the Service Layer Pattern.

Create:

- NotificationLog
- Email service
- SMS service
- Notification dispatcher
- Email templates
- SMS templates
- Background notification tasks

The notification dispatcher should support:

- Email
- SMS

Use Celery and Redis for background tasks.

Do not send email or SMS synchronously inside checkout or webhook requests.

## Notification workflow

When a payment is confirmed:

1. Update payment status.
2. Update order status.
3. Commit database changes.
4. Queue email notification.
5. Queue SMS notification.
6. Generate payment receipt PDF.
7. Attach PDF to the email.
8. Record notification provider responses.

Use Django `transaction.on_commit()` or an equivalent reliable mechanism to prevent tasks from running before database transactions commit.

Implement retry policies and prevent duplicate notifications.

---

# 18. ADMIN DASHBOARD

Build a professional administration dashboard.

Dashboard metrics:

- Total sales.
- Total orders.
- Pending orders.
- Completed orders.
- Pending payments.
- Total customers.
- Products in stock.
- Low-stock products.
- Out-of-stock products.
- Delivery performance.

Admin pages:

- Dashboard.
- Products.
- Product create/edit.
- Categories.
- Inventory.
- Orders.
- Order details.
- Payments.
- Customers.
- Delivery staff.
- Deliveries.
- Coupons.
- Reviews.
- Notification logs.
- Reports.
- Admin profile.

Implement search, filtering, sorting, pagination, loading states, empty states, error states, and confirmation dialogs.

---

# 19. CUSTOMER FRONTEND

Create a polished, modern, responsive e-commerce frontend.

## Public pages

- Home.
- Shop.
- Category products.
- Product details.
- Search results.
- Login.
- Registration.
- Password reset.
- About.
- Contact.
- FAQ.
- Privacy policy.
- Terms and conditions.

## Customer pages

- Customer dashboard.
- Profile.
- Address management.
- Shopping cart.
- Checkout.
- Payment processing.
- Payment result.
- Order history.
- Order details.
- Delivery tracking.
- Wishlist.
- Product reviews.

## Design direction

Create a premium indoor plants shopping experience.

Use:

- Clean layouts.
- Natural botanical visual identity.
- Elegant typography.
- High-quality product imagery.
- Consistent spacing.
- Soft neutral backgrounds.
- Green botanical accent colors.
- Accessible contrast.
- Responsive layouts.

Do not use a generic dashboard template without adapting it to the business.

Use realistic product placeholders only when actual product data is unavailable.

Do not use copyrighted brand assets without permission.

---

# 20. FRONTEND API ARCHITECTURE

Use Axios with a centralized HTTP client.

Create:

- Public Axios instance.
- Authenticated Axios instance.
- JWT token refresh handling.
- Centralized API error handling.
- Feature-specific API services.

Use TanStack React Query for:

- Server state.
- Caching.
- Query invalidation.
- Mutations.
- Loading and error states.

Use React Hook Form and Zod for forms.

Use React Router for routing.

Implement:

- Protected routes.
- Role-based route guards.
- Customer layouts.
- Admin layouts.
- Delivery staff layouts.
- Responsive navigation.
- Logout.
- Authentication persistence.

Do not duplicate backend business rules in the frontend.

The frontend may display calculated totals, but the backend must recalculate and validate them.

---

# 21. API DESIGN

Use versioned REST API endpoints:

```
/api/v1/
```

Example endpoint groups:

```
/api/v1/auth/
/api/v1/accounts/
/api/v1/categories/
/api/v1/products/
/api/v1/cart/
/api/v1/orders/
/api/v1/payments/
/api/v1/delivery/
/api/v1/coupons/
/api/v1/reviews/
/api/v1/wishlist/
/api/v1/admin/
/api/v1/webhooks/
```

Use consistent API response formats.

Implement:

- Pagination.
- Filtering.
- Search.
- Sorting.
- Validation errors.
- Permission errors.
- Standard HTTP status codes.

Generate OpenAPI documentation.

Do not expose internal provider secrets or sensitive payment data.

---

# 22. DATABASE AND INVENTORY SAFETY

Use PostgreSQL.

Create appropriate:

- Foreign keys.
- Unique constraints.
- Database indexes.
- Check constraints where appropriate.
- Transaction boundaries.

Prevent overselling.

When creating orders or confirming payments, use safe inventory operations such as `select_for_update()` where appropriate.

Design an inventory reservation or stock deduction strategy.

Do not decrement stock multiple times when a webhook is received repeatedly.

Keep payment status, order status, and delivery status separate.

---

# 23. SECURITY REQUIREMENTS

Implement:

- Secure environment variable management.
- CORS configuration.
- CSRF configuration where applicable.
- Secure JWT handling.
- Role-based permissions.
- Object-level permissions.
- Input validation.
- File upload validation.
- Rate limiting for sensitive endpoints.
- Secure webhook verification.
- Protection against duplicate payment requests.
- Protection against unauthorized order access.
- Protection against unauthorized receipt downloads.
- Production DEBUG=False.
- Secure production settings.
- Proper logging without exposing secrets.

Never commit:

- `.env`
- API keys.
- Gmail App Password.
- Snippe secrets.
- Africa's Talking credentials.
- Database passwords.

---

# 24. TESTING REQUIREMENTS

Write automated tests for critical functionality.

Backend tests:

- Registration.
- Authentication.
- Permissions.
- Product API.
- Cart operations.
- Checkout.
- Order creation.
- Coupon validation.
- Payment initiation.
- Snippe webhook verification.
- Duplicate webhook handling.
- Inventory consistency.
- Delivery permissions.
- PDF receipt generation.
- Notification task behavior.

Frontend tests where practical:

- Forms.
- Authentication flows.
- Cart interactions.
- Checkout validation.
- API error states.
- Protected routes.

Use mocked external services for automated tests.

Do not require real payment transactions or real SMS/email delivery during tests.

---

# 25. DEVELOPMENT AND DEPLOYMENT

Create:

- Backend `.env.example`.
- Frontend `.env.example`.
- Dockerfiles.
- Docker Compose.
- PostgreSQL service.
- Redis service.
- Celery worker service.
- Backend service.
- Frontend service.

Include:

- Database migrations.
- Static file configuration.
- Media file configuration.
- Production environment settings.
- Health checks.
- Logging.
- Backup recommendations.

Document how to run the project locally on Windows using PowerShell.

The project must be easy to run locally and deploy to a production server.

---

# 26. IMPLEMENTATION STRATEGY

Work incrementally and complete each phase before moving to the next.

## Phase 1: Project foundation

- Inspect the existing workspace.
- Establish backend and frontend structure.
- Configure Django.
- Configure React and TypeScript.
- Configure PostgreSQL.
- Configure environment variables.
- Configure Docker.
- Create the custom User model.
- Run initial migrations.

## Phase 2: Accounts and authentication

- Registration.
- Login.
- JWT.
- Profile.
- Password reset.
- Permissions.

## Phase 3: Catalog

- Categories.
- Products.
- Product images.
- Product listing.
- Product details.
- Search and filtering.

## Phase 4: Cart and checkout

- Cart.
- Cart items.
- Checkout.
- Orders.
- Order items.
- Inventory validation.

## Phase 5: Payments

- Payment model.
- Snippe service.
- Payment initiation.
- Webhook verification.
- Payment status handling.
- Idempotency.

## Phase 6: Notifications

- Gmail SMTP.
- Africa's Talking SMS.
- Notification logs.
- Celery.
- Redis.
- PDF receipt generation.
- Email attachments.
- Retry handling.

## Phase 7: Delivery

- Delivery staff.
- Delivery assignment.
- Delivery tracking.
- Delivery status transitions.
- Customer notifications.

## Phase 8: Admin dashboard

- Dashboard metrics.
- Product management.
- Order management.
- Payment management.
- Delivery management.
- Customer management.
- Inventory management.

## Phase 9: Customer frontend

- Home.
- Shop.
- Product details.
- Cart.
- Checkout.
- Customer dashboard.
- Orders.
- Profile.
- Wishlist.
- Reviews.

## Phase 10: Testing and deployment

- Run backend tests.
- Run frontend tests.
- Fix errors.
- Verify API integration.
- Verify payment workflow.
- Verify email and SMS workflow.
- Verify permissions.
- Verify production configuration.
- Document deployment.

---

# 27. WORKING RULES FOR THE AI AGENT

Follow these rules throughout implementation.

1. First inspect the current workspace and existing files.
2. Do not overwrite existing working code without understanding it.
3. Reuse existing architecture where it follows the required principles.
4. Do not create a new project if one already exists and is usable.
5. Before implementing external integrations, inspect the official documentation.
6. Do not invent API request fields or webhook formats.
7. Keep business logic in service layers.
8. Keep frontend components small and reusable.
9. Use meaningful names and clear type definitions.
10. Avoid unnecessary abstractions.
11. Do not leave critical business logic as TODO comments.
12. Do not create fake payment success flows.
13. Do not use mock data as the final implementation.
14. Do not claim a feature is complete unless it works.
15. Run migrations and tests after implementation.
16. Fix errors before proceeding.
17. Keep the frontend and backend API contracts consistent.
18. Update documentation whenever architecture or environment configuration changes.
19. Explain important architectural decisions briefly.
20. Continue working until the complete application is implemented and verified.

If a requirement is ambiguous, make a reasonable, secure, documented decision and continue. Ask questions only when an essential business decision cannot safely be assumed.

---

# 28. FINAL ACCEPTANCE CRITERIA

The project is complete only when:

- Backend and frontend are implemented.
- Database migrations run successfully.
- Customer registration and login work.
- Product catalog works.
- Cart and checkout work.
- Orders are created correctly.
- Snippe payment initiation works according to official documentation.
- Snippe webhook verification works.
- Duplicate payment events are handled safely.
- Payment confirmation updates order status correctly.
- Gmail sends transactional emails.
- PDF receipts are generated and attached.
- Africa's Talking sends transactional SMS.
- Celery and Redis handle background tasks.
- Admin can manage products, orders, inventory, and deliveries.
- Delivery staff can manage their assigned deliveries.
- Customers can view their own orders and receipts.
- Permissions prevent unauthorized access.
- Responsive frontend works on desktop, tablet, and mobile.
- Critical automated tests pass.
- `.env.example` files are complete.
- Docker Compose runs the application.
- README includes setup, testing, integrations, and deployment instructions.

Deliver a complete, maintainable, secure, and production-oriented modular monolith.

Start by inspecting the workspace, presenting a concise implementation plan, and then begin Phase 1. Do not stop at the plan. Continue implementing the project phase by phase until the acceptance criteria are satisfied.

## **Namna ya kuitumia Antigravity**

1. Fungua Antigravity na uunde au ufungue folder ya project yako.
2. Hakikisha agent anaweza kuona na ku-edit files kwenye workspace.
3. Bandika prompt yote hapo juu.
4. Ruhusu agent aanze kwa kuchunguza workspace na kupanga implementation.
5. Baada ya kuanza, hakikisha inafanya kazi kwa phases na ina-run migrations/build/tests badala ya kutengeneza files nyingi bila kuzihakiki.

**Ushauri muhimu:** Kwa project kubwa kama hii, usimruhusu agent atengeneze backend na frontend zote kwa mara moja bila verification. Prompt imeelekeza afanye phase by phase, lakini wewe pia hakikisha kila phase inafanya kazi kabla ya kuendelea. Hii itapunguza bugs hasa kwenye Snippe webhook, stock management, payment confirmation na PDF/email notifications.
