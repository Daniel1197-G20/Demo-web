import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import CustomerLayout from '../components/layout/CustomerLayout';
import AdminLayout from '../components/layout/AdminLayout';
import AuthLayout from '../components/layout/AuthLayout';
import AccountLayout from '../components/layout/AccountLayout';

// Route Guards
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';

// Customer Pages
import Home from '../pages/customer/Home';
import Shop from '../pages/customer/Shop';
import ProductDetails from '../pages/customer/ProductDetails';
import Categories from '../pages/customer/Categories';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import OrderConfirmation from '../pages/customer/OrderConfirmation';
import Catering from '../pages/customer/Catering';
import CateringConfirmation from '../pages/customer/CateringConfirmation';
import Contracts from '../pages/customer/Contracts';
import ContractDetails from '../pages/customer/ContractDetails';
import ContractApply from '../pages/customer/ContractApply';
import ApplicationConfirmation from '../pages/customer/ApplicationConfirmation';
import Events from '../pages/customer/Events';
import EventDetails from '../pages/customer/EventDetails';
import Contact from '../pages/customer/Contact';
import DesignSystemShowcase from '../pages/customer/DesignSystemShowcase';

// Customer Account Pages
import AccountOverview from '../pages/customer/account/AccountOverview';
import AccountOrders from '../pages/customer/account/AccountOrders';
import AccountOrderDetails from '../pages/customer/account/AccountOrderDetails';
import AccountBookings from '../pages/customer/account/AccountBookings';
import AccountApplications from '../pages/customer/account/AccountApplications';
import AccountProfile from '../pages/customer/account/AccountProfile';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import ProductList from '../pages/admin/Products/ProductList';
import ProductForm from '../pages/admin/Products/ProductForm';
import CategoryManager from '../pages/admin/Categories/CategoryManager';
import OrderList from '../pages/admin/Orders/OrderList';
import OrderDetails from '../pages/admin/Orders/OrderDetails';
import BookingList from '../pages/admin/Bookings/BookingList';
import BookingDetails from '../pages/admin/Bookings/BookingDetails';
import ContractList from '../pages/admin/Contracts/ContractList';
import ContractForm from '../pages/admin/Contracts/ContractForm';
import ApplicationList from '../pages/admin/Contracts/ApplicationList';
import ApplicationDetails from '../pages/admin/Contracts/ApplicationDetails';
import CustomerList from '../pages/admin/Customers/CustomerList';
import AnalyticsOverview from '../pages/admin/Analytics/AnalyticsOverview';
import StoreSettings from '../pages/admin/Settings/StoreSettings';

// Not Found
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
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

      {/* 3. ADMIN PLATFORM ROUTES (ROLE-GUARDED) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
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

      {/* 4. CATCH-ALL 404 */}
      <Route element={<CustomerLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
