import { AdminMatterDetailClient } from './AdminMatterDetailClient';

export const dynamic = 'force-dynamic';

type MatterPageProps = {
  params: { matterCode: string };
};

export default function AdminMatterPage({ params }: MatterPageProps) {
  return <AdminMatterDetailClient matterCode={params.matterCode} />;
}
