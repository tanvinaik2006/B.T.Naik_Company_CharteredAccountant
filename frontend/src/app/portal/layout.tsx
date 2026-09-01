'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname?.startsWith('/portal/login');
  const isAuthPage = isLoginPage || pathname?.startsWith('/portal/signup');

  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push('/portal/login');
    }
  }, [user, loading, router, isAuthPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-navy-primary" />
      </div>
    );
  }

  // Render children directly on the login page (or once authenticated)
  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!user) {
    // Guard – should not reach here because of redirect above
    return null;
  }

  return (
    <div className="bg-bg-secondary min-h-screen route-transition">
      {children}
    </div>
  );
}
