'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode,useEffect } from 'react';

import { useAppSelector } from '../../../store/hooks';

type GuestGuardProps = {
  children: ReactNode;
  redirectTo?: string;
};

export function GuestGuard({ children, redirectTo = '/dashboard' }: GuestGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (status !== 'unknown' && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router, status]);

  if (status === 'unknown' || isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

