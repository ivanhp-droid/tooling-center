import Link from 'next/link';
import type { ToolDefinition } from '@/lib/tools/types';
import { Card } from '@/components/common/Card';

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">{tool.category}</div>
          <div className="font-semibold">{tool.name}</div>
          <div className="mt-1 text-sm text-slate-600">{tool.description}</div>
          <div className="mt-2 text-xs text-slate-500">
            Risk: <span className="font-medium">{tool.riskLevel}</span> ·{' '}
            {tool.requiresApiKey ? 'API key required' : 'No API key required'} ·{' '}
            {tool.requiresCsv ? 'CSV required' : 'No CSV required'}
          </div>
        </div>
        <Link
          href={`/tools/${tool.id}`}
          className="shrink-0 rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Open
        </Link>
      </div>
    </Card>
  );
}

