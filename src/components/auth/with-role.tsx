'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ROLES, getRequiredRoles } from '@/lib/roles';
import { Loader2 } from 'lucide-react';

interface WithRoleProps {
  children: React.ReactNode;
  requiredRole?: keyof typeof ROLES;
}

export function withRole<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: { requiredRole?: keyof typeof ROLES }
) {
  return function WithRoleWrapper(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    }, [status, router, pathname]);

    if (status === 'loading') {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      );
    }

    if (status === 'unauthenticated') {
      return null;
    }

    const userRoles = session?.user?.roles || [];
    const requiredRoles = options?.requiredRole 
      ? [options.requiredRole] 
      : getRequiredRoles(pathname);

    const hasRequiredRole = requiredRoles.some(role => 
      userRoles.includes(ROLES[role as keyof typeof ROLES])
    );

    if (!hasRequiredRole) {
      router.push('/unauthorized');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
