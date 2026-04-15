import { AuthGuard } from '../../features/auth/components/auth-guard';
import { DashboardView } from '../../features/dashboard/components/dashboard-view';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardView />
    </AuthGuard>
  );
}

