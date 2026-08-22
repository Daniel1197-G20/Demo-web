# Tory's Treats — Security & Row Level Security (RLS) Architecture

**Security Philosophy:** Zero-Trust Defense-in-Depth  
**Database Security:** 100% PostgreSQL Row Level Security (RLS) Enforcement  
**Storage Isolation:** Granular Multi-Tenant & Signed Private Bucket Policies  
**Payment Model:** Offline Order Confirmation (Zero Online Payment Exposure)  

---

## 1. Supabase Row Level Security (RLS) Policies

All tables in the `public` schema have Row Level Security enabled. Below is the complete policy specification:

```sql
-- 1. ENABLE RLS ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 2. PROFILES POLICIES
-- ==============================================================================
CREATE POLICY "Users view own profile, admins view all"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins manage all profiles"
ON public.profiles FOR ALL
USING (public.is_admin());

-- ==============================================================================
-- 3. CATEGORIES POLICIES
-- ==============================================================================
CREATE POLICY "Public view active categories"
ON public.categories FOR SELECT
USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins manage categories"
ON public.categories FOR ALL
USING (public.is_admin());

-- ==============================================================================
-- 4. PRODUCTS POLICIES
-- ==============================================================================
CREATE POLICY "Public view active products"
ON public.products FOR SELECT
USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins manage products"
ON public.products FOR ALL
USING (public.is_admin());

-- ==============================================================================
-- 5. ORDERS & ORDER ITEMS POLICIES
-- ==============================================================================
CREATE POLICY "Customers view own orders, admins view all"
ON public.orders FOR SELECT
USING (auth.uid() = customer_id OR public.is_admin());

CREATE POLICY "Anyone can submit order requests"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = customer_id OR customer_id IS NULL);

CREATE POLICY "Admins update orders"
ON public.orders FOR UPDATE
USING (public.is_admin());

CREATE POLICY "View order items"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
      AND (orders.customer_id = auth.uid() OR public.is_admin())
  )
);

CREATE POLICY "Insert order items"
ON public.order_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
      AND (orders.customer_id = auth.uid() OR orders.customer_id IS NULL)
  )
);

-- ==============================================================================
-- 6. BOOKINGS POLICIES
-- ==============================================================================
CREATE POLICY "Customers view own bookings, admins view all"
ON public.bookings FOR SELECT
USING (auth.uid() = customer_id OR public.is_admin());

CREATE POLICY "Customers submit bookings"
ON public.bookings FOR INSERT
WITH CHECK (auth.uid() = customer_id OR customer_id IS NULL);

CREATE POLICY "Admins update bookings"
ON public.bookings FOR UPDATE
USING (public.is_admin());

-- ==============================================================================
-- 7. CONTRACTS POLICIES
-- ==============================================================================
CREATE POLICY "Public view active published contracts"
ON public.contracts FOR SELECT
USING (
  (is_published = TRUE AND is_closed = FALSE AND is_archived = FALSE AND is_public_visible = TRUE)
  OR public.is_admin()
);

CREATE POLICY "Admins manage contracts"
ON public.contracts FOR ALL
USING (public.is_admin());

-- ==============================================================================
-- 8. CONTRACT APPLICATIONS POLICIES
-- ==============================================================================
CREATE POLICY "Applicants view own applications, admins view all"
ON public.contract_applications FOR SELECT
USING (auth.uid() = applicant_id OR public.is_admin());

CREATE POLICY "Applicants submit application"
ON public.contract_applications FOR INSERT
WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Admins update application status"
ON public.contract_applications FOR UPDATE
USING (public.is_admin());

-- ==============================================================================
-- 9. SYSTEM SETTINGS POLICIES
-- ==============================================================================
CREATE POLICY "Public view system settings"
ON public.system_settings FOR SELECT
TO PUBLIC USING (TRUE);

CREATE POLICY "Admins manage system settings"
ON public.system_settings FOR ALL
USING (public.is_admin());
```

---

## 2. Role Escalation Prevention

To guarantee that users cannot elevate their role to `ADMIN` via client-side metadata tampering or direct database updates:
1. The `role` column in `public.profiles` cannot be modified by non-admin callers. A PostgreSQL trigger enforces this check:
```sql
CREATE OR REPLACE FUNCTION protect_profile_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
        IF NOT public.is_admin() THEN
            RAISE EXCEPTION 'Unauthorized: Only an administrator can modify user roles.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER enforce_profile_role_integrity
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION protect_profile_role();
```

---

## 3. Storage Bucket Security Policies

```sql
-- 1. Product Images Bucket: Public Read, Admin Write
CREATE POLICY "Public read product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admin write product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

-- 2. Contract Documents Bucket: Private Access (CV Resumes)
CREATE POLICY "Applicant or Admin read contract documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'contract-documents'
  AND (auth.uid()::TEXT = (storage.foldername(name))[1] OR public.is_admin())
);

CREATE POLICY "Authenticated users upload contract documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'contract-documents'
  AND auth.uid() IS NOT NULL
  AND auth.uid()::TEXT = (storage.foldername(name))[1]
);
```

---

## 4. Frontend Security Checklist

- **No Secret Leaks:** Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are exposed to the client. All administrative operations execute under strict RLS policies.
- **XSS Immunity:** Standard JSX encoding eliminates injection risks. Raw HTML string rendering is strictly forbidden.
- **File Validation:** Upload inputs validate file extensions and mime types (`application/pdf`, `image/png`, `image/jpeg`) prior to storage transmission, with a hard 10MB ceiling.
