import Link from 'next/link';
import type { ReactNode } from 'react';

import type { ToolDefinition } from '@/lib/tools/types';
import { PageHeader } from '@/components/layout/PageHeader';

export function ToolPageLayout(props: { tool: ToolDefinition; children: ReactNode }) {
  const { tool, children } = props;
  return (
    <div className="space-y-4">
      <PageHeader
        title={tool.name}
        subtitle={
          <div className="space-y-1">
            <div className="text-sm text-slate-700">{tool.description}</div>
            <div className="text-xs text-slate-500">
              Category: {tool.category} · Risk: {tool.riskLevel.toUpperCase()}
            </div>
          </div>
        }
        actions={
          <Link href="/" className="text-sm text-slate-700 hover:underline">
            ← Back to catalog
          </Link>
        }
      />
      {children}
    </div>
  );
}

