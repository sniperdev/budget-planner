import { GuestGuard } from '../../features/auth/components/guest-guard';
import { RegisterForm } from '../../features/auth/components/register-form';

export default function RegisterPage() {
  return (
    <GuestGuard>
      <RegisterForm />
    </GuestGuard>
  );
}