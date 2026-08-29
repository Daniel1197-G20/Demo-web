import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import CustomerLayout from '../components/layout/CustomerLayout';
import AdminLayout from '../components/layout/AdminLayout';
import AuthLayout from '../components/layout/AuthLayout';
import AccountLayout from '../components/layout/AccountLayout';
import DeveloperLayout from '../components/developer/DeveloperLayout';

// Route Guards
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';
import DeveloperRoute from '../components/common/DeveloperRoute';

// Route Skeleton Fallback System
import { RouteSkeletonFallback } from '../components/ui/Skeleton';

// Customer Pages (Lazy Loaded)
const Home = lazy(() => import('../pages/customer/Home'));
const Shop = lazy(() => import('../pages/customer/Shop'));
const ProductDetails = lazy(() => import('../pages/customer/ProductDetails'));
const Categories = lazy(() => import('../pages/customer/Categories'));
const Cart = lazy(() => import('../pages/customer/Cart'));
const Checkout = lazy(() => import('../pages/customer/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/customer/OrderConfirmation'));
const Catering = lazy(() => import('../pages/customer/Catering'));
const CateringConfirmation = lazy(() => import('../pages/customer/CateringConfirmation'));
const Contracts = lazy(() => import('../pages/customer/Contracts'));
const ContractDetails = lazy(() => import('../pages/customer/ContractDetails'));
const ContractApply = lazy(() => import('../pages/customer/ContractApply'));
const ApplicationConfirmation = lazy(() => import('../pages/customer/ApplicationConfirmation'));
const Events = lazy(() => import('../pages/customer/Events'));
const EventDetails = lazy(() => import('../pages/customer/EventDetails'));
const Contact = lazy(() => import('../pages/customer/Contact'));
const DesignSystemShowcase = lazy(() => import('../pages/customer/DesignSystemShowcase'));

// Customer Account Pages (Lazy Loaded)
const AccountOverview = lazy(() => import('../pages/customer/account/AccountOverview'));
const AccountOrders = lazy(() => import('../pages/customer/account/AccountOrders'));
const AccountOrderDetails = lazy(() => import('../pages/customer/account/AccountOrderDetails'));
const AccountBookings = lazy(() => import('../pages/customer/account/AccountBookings'));
const AccountApplications = lazy(() => import('../pages/customer/account/AccountApplications'));
const AccountProfile = lazy(() => import('../pages/customer/account/AccountProfile'));

// Auth Pages (Lazy Loaded)
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// Admin Pages (Lazy Loaded)
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const ProductList = lazy(() => import('../pages/admin/Products/ProductList'));
const ProductForm = lazy(() => import('../pages/admin/Products/ProductForm'));
const CategoryManager = lazy(() => import('../pages/admin/Categories/CategoryManager'));
const OrderList = lazy(() => import('../pages/admin/Orders/OrderList'));
const OrderDetails = lazy(() => import('../pages/admin/Orders/OrderDetails'));
const BookingList = lazy(() => import('../pages/admin/Bookings/BookingList'));
const BookingDetails = lazy(() => import('../pages/admin/Bookings/BookingDetails'));
const ContractList = lazy(() => import('../pages/admin/Contracts/ContractList'));
const ContractForm = lazy(() => import('../pages/admin/Contracts/ContractForm'));
const ApplicationList = lazy(() => import('../pages/admin/Contracts/ApplicationList'));
const ApplicationDetails = lazy(() => import('../pages/admin/Contracts/ApplicationDetails'));
const CustomerList = lazy(() => import('../pages/admin/Customers/CustomerList'));
const AnalyticsOverview = lazy(() => import('../pages/admin/Analytics/AnalyticsOverview'));
const StoreSettings = lazy(() => import('../pages/admin/Settings/StoreSettings'));

// Developer Console Pages (Lazy Loaded)
const DeveloperOverview = lazy(() => import('../pages/developer/DeveloperOverview'));
const DeveloperPerformance = lazy(() => import('../pages/developer/DeveloperPerformance'));
const DeveloperTraffic = lazy(() => import('../pages/developer/DeveloperTraffic'));
const DeveloperSecurity = lazy(() => import('../pages/developer/DeveloperSecurity'));
const DeveloperIpAnomaly = lazy(() => import('../pages/developer/DeveloperIpAnomaly'));
const DeveloperErrors = lazy(() => import('../pages/developer/DeveloperErrors'));
const DeveloperApi = lazy(() => import('../pages/developer/DeveloperApi'));
const DeveloperDatabase = lazy(() => import('../pages/developer/DeveloperDatabase'));
const DeveloperDeployments = lazy(() => import('../pages/developer/DeveloperDeployments'));
const DeveloperAuditLogs = lazy(() => import('../pages/developer/DeveloperAuditLogs'));
const DeveloperSystemHealth = lazy(() => import('../pages/developer/DeveloperSystemHealth'));

// Not Found (Lazy Loaded)
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteSkeletonFallback />}>
      <Routes>
        {/* 1. CUSTOMER PLATFORM ROUTES */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/confirmation/:orderNumber" element={<OrderConfirmation />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/catering/confirmation/:bookingNumber" element={<CateringConfirmation />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetails />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contracts/:slug" element={<ContractDetails />} />
          <Route path="/contracts/:slug/apply" element={<ContractApply />} />
          <Route path="/contracts/application-success" element={<ApplicationConfirmation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/design-system" element={<DesignSystemShowcase />} />

          {/* Protected Customer Account Sub-Routes */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AccountOverview />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="orders/:orderNumber" element={<AccountOrderDetails />} />
            <Route path="bookings" element={<AccountBookings />} />
            <Route path="applications" element={<AccountApplications />} />
            <Route path="profile" element={<AccountProfile />} />
          </Route>
        </Route>

        {/* 2. AUTH PLATFORM ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>

        {/* 3. ADMIN ENTRY POINT (LOGIN PAGE) */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* 4. ADMIN PLATFORM PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:orderNumber" element={<OrderDetails />} />
          <Route path="bookings" element={<BookingList />} />
          <Route path="bookings/:bookingNumber" element={<BookingDetails />} />
          <Route path="contracts" element={<ContractList />} />
          <Route path="contracts/new" element={<ContractForm />} />
          <Route path="contracts/:id/edit" element={<ContractForm />} />
          <Route path="contracts/applications" element={<ApplicationList />} />
          <Route path="contracts/applications/:id" element={<ApplicationDetails />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="analytics" element={<AnalyticsOverview />} />
          <Route path="settings" element={<StoreSettings />} />
        </Route>

        {/* 5. DEVELOPER CONSOLE PROTECTED ROUTES */}
        <Route
          path="/developer"
          element={
            <DeveloperRoute>
              <DeveloperLayout />
            </DeveloperRoute>
          }
        >
          <Route index element={<DeveloperOverview />} />
          <Route path="performance" element={<DeveloperPerformance />} />
          <Route path="traffic" element={<DeveloperTraffic />} />
          <Route path="security" element={<DeveloperSecurity />} />
          <Route path="ip-anomaly" element={<DeveloperIpAnomaly />} />
          <Route path="errors" element={<DeveloperErrors />} />
          <Route path="api" element={<DeveloperApi />} />
          <Route path="database" element={<DeveloperDatabase />} />
          <Route path="deployments" element={<DeveloperDeployments />} />
          <Route path="audit-logs" element={<DeveloperAuditLogs />} />
          <Route path="system-health" element={<DeveloperSystemHealth />} />
        </Route>

        {/* 6. CATCH-ALL 404 */}
        <Route element={<CustomerLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
