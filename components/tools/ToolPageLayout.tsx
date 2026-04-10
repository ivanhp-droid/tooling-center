import Link from 'next/link';
import type { ReactNode } from 'react';

import type { ToolDefinition } from '@/lib/tools/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/common/Badge';
import { riskBadgeTone, riskLabel } from '@/lib/tools/risk';

export function ToolPageLayout(props: { tool: ToolDefinition; children: ReactNode }) {
  const { tool, children } = props;
  return (
    <div className="space-y-6">
      <PageHeader
        title={tool.name}
        subtitle={
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-slate-700">{tool.description}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">{tool.category}</Badge>
              <Badge tone={riskBadgeTone(tool.riskLevel)}>{riskLabel(tool.riskLevel)}</Badge>
              <Badge tone={tool.requiresApiKey ? 'info' : 'neutral'}>
                {tool.requiresApiKey ? 'Requires API key' : 'No API key'}
              </Badge>
              <Badge tone={tool.requiresCsv ? 'neutral' : 'neutral'}>{tool.requiresCsv ? 'Requires CSV' : 'No CSV'}</Badge>
            </div>
            {tool.helpText?.csvTips && tool.helpText.csvTips.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {tool.helpText.csvTips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            ) : null}
          </div>
        }
        actions={
          <Link
            href="/"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            ← Catalog
          </Link>
        }
      />
      {children}
    </div>
  );
}
