'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppSelector } from '../store/hooks';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (status !== 'unknown' && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router, status]);

  if (status === 'unknown') {
    return null;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Budget Planner</h1>
        <p>Manage budgets, transactions, and reports in one place.</p>
        <div className={styles.ctas}>
          <Link href="/login" className={styles.primary}>
            Sign in
          </Link>
          <Link href="/register" className={styles.secondary}>
            Create account
          </Link>
        </div>
        <Button
          component={Link}
          href="/dashboard"
          variant="outlined"
          className={styles.secondary}
        >
          Go to dashboard
        </Button>
      </main>
    </div>
  );
}
