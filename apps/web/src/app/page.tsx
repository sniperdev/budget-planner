import { Button } from '@mui/material';
import Link from 'next/link';

import styles from './page.module.css';

export default function Home() {
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
        <Button variant="outlined" className={styles.secondary}>
          Go to dashboard
        </Button>
      </main>
    </div>
  );
}
