import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WithAuthProps {
  requiredRole?: 'admin' | 'barber' | 'customer';
  redirectTo?: string;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthProps = {}
) {
  const AuthenticatedComponent = (props: P) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const { requiredRole, redirectTo = '/login' } = options;

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
    }, [isAuthenticated, user, isLoading, router]);

    // Show loading while checking auth
    if (isLoading || !isAuthenticated) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      );
    }

    // Show unauthorized if wrong role
    if (requiredRole && user?.role !== requiredRole) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don&apos;t have permission to view this page.</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return AuthenticatedComponent;
}

// Usage examples:
// export default withAuth(AdminDashboard, { requiredRole: 'admin', redirectTo: '/admin/login' });
// export default withAuth(BarberDashboard, { requiredRole: 'barber' });
// export default withAuth(CustomerDashboard, { requiredRole: 'customer' });