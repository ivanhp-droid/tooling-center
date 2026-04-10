import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ToolCatalog } from '@/components/tools/ToolCatalog';
import { toolCatalog } from '@/lib/tools';
import { Alert } from '@/components/common/Alert';

export default function DashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle={
        <>
          Pick a bulk tool, upload a CSV, validate, then run. Configure your API key in{' '}
          <Link className="font-medium text-slate-900 underline decoration-slate-400 underline-offset-2 hover:decoration-slate-700" href="/settings">
            Settings
          </Link>{' '}
          first if you have not already.
        </>
      }
    >
      <Alert variant="info" title="Local session">
        History and API keys are stored in this browser only. Clear site data if you need a clean slate or are on a
        shared machine.
      </Alert>
      <ToolCatalog tools={toolCatalog} />
    </AdminLayout>
  );
}
