import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/common/Card';

export default function NotFoundPage() {
  return (
    <AdminLayout title="Not found" subtitle="That page does not exist or the link is outdated.">
      <Card>
        <p className="text-sm text-ink-secondary">
          Return to the dashboard to pick a tool or check the URL for typos.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-accent shadow-card hover:bg-canvas-muted hover:text-accent-hover"
          >
            Back to dashboard
          </Link>
        </div>
      </Card>
    </AdminLayout>
  );
}
