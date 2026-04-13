import Link from 'next/link';
import type { ReactNode } from 'react';

import type { ToolDefinition } from '@/lib/tools/types';
import { Badge } from '@/components/common/Badge';
import { riskBadgeTone, riskLabel } from '@/lib/tools/risk';

export function ToolPageLayout(props: { tool: ToolDefinition; children: ReactNode }) {
  const { tool, children } = props;
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              <Link href="/" className="text-ink-muted hover:text-accent">
                Tooling Center
              </Link>
              <span className="text-ink-faint"> / </span>
              <span className="text-ink-muted">Tools</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-[1.65rem]">{tool.name}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-secondary">{tool.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="neutral">{tool.category}</Badge>
              <Badge tone={riskBadgeTone(tool.riskLevel)}>{riskLabel(tool.riskLevel)}</Badge>
              <Badge tone={tool.requiresApiKey ? 'info' : 'neutral'}>
                {tool.requiresApiKey ? 'API key required' : 'No API key'}
              </Badge>
              <Badge tone="neutral">{tool.requiresCsv ? 'CSV required' : 'No CSV'}</Badge>
            </div>
            {tool.helpText?.csvTips && tool.helpText.csvTips.length > 0 ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-secondary">
                {tool.helpText.csvTips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink-secondary shadow-card transition-colors hover:border-border hover:bg-canvas-muted hover:text-ink"
          >
            ← Back to catalog
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
