import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { SkeletonAdminDashboard } from '../ui/Skeleton';

export default function AdminRoute({ children }) {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <SkeletonAdminDashboard />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}
