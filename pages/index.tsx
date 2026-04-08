import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ToolCatalog } from '@/components/tools/ToolCatalog';
import { toolCatalog } from '@/lib/tools';

export default function DashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle={
        <>
          Tool catalog for internal bulk operations. Head to{' '}
          <Link className="underline" href="/settings">
            Settings
          </Link>{' '}
          to set your API key.
        </>
      }
    >
      <ToolCatalog tools={toolCatalog} />
    </AdminLayout>
  );
}

