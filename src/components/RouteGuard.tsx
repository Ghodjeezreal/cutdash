import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface RouteGuardProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'barber' | 'customer';
  redirectTo?: string;
  fallback?: ReactNode;
}

export function RouteGuard({ 
  children, 
  requiredRole, 
  redirectTo = '/login',
  fallback 
}: RouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, router, redirectTo, requiredRole]);

  // Show loading while checking auth
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or wrong role
  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return fallback || null;
  }

  return <>{children}</>;
}

// Usage in pages:
// <RouteGuard requiredRole="admin" redirectTo="/admin/login">
//   <AdminDashboard />
// </RouteGuard>