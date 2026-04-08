import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/layout/PageHeader';

export default function NotFoundPage() {
  return (
    <AdminLayout>
      <PageHeader title="Not Found" subtitle="That page doesn’t exist." />
      <div className="rounded border bg-white p-4 text-sm">
        <Link href="/" className="text-blue-700 hover:underline">
          Back to dashboard
        </Link>
      </div>
    </AdminLayout>
  );
}

