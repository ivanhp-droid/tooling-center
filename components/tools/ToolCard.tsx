import Link from 'next/link';
import type { ToolDefinition } from '@/lib/tools/types';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { riskBadgeTone, riskLabel } from '@/lib/tools/risk';

/**
 * Single outer Link — avoids nested anchors (invalid HTML / hydration issues).
 */
export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <Card className="h-full transition-shadow duration-150 group-hover:shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">{tool.category}</div>
            <div className="mt-1 font-semibold text-ink">{tool.name}</div>
            <div className="mt-2 text-sm leading-relaxed text-ink-secondary">{tool.description}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone={riskBadgeTone(tool.riskLevel)}>{riskLabel(tool.riskLevel)}</Badge>
              <Badge tone={tool.requiresApiKey ? 'info' : 'neutral'}>
                {tool.requiresApiKey ? 'API key required' : 'No API key'}
              </Badge>
              <Badge tone={tool.requiresCsv ? 'neutral' : 'neutral'}>{tool.requiresCsv ? 'CSV required' : 'No CSV'}</Badge>
            </div>
          </div>
          <span className="shrink-0 rounded-md border border-border bg-canvas-muted px-3 py-2 text-sm font-medium text-ink transition-colors group-hover:border-border group-hover:bg-surface">
            Open
          </span>
        </div>
      </Card>
    </Link>
  );
}
