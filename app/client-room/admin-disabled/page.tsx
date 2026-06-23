import { PageShell } from '@/components/PageShell';
import { AdminDashboardClient } from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <PageShell>
      <AdminDashboardClient />
    </PageShell>
  );
}
