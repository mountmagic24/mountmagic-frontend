'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Loading from './LoadingSpinner';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: string | string[];
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  if (requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      router.push('/');
      return null;
    }
  }

  return <>{children}</>;
}
