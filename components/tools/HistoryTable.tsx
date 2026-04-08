import type { ExecutionHistoryRecord } from '@/lib/storage/historyStore';
import Link from 'next/link';

export function HistoryTable({ items }: { items: ExecutionHistoryRecord[] }) {
  if (items.length === 0) {
    return <div className="text-sm text-gray-600">No executions yet.</div>;
  }

  return (
    <div className="overflow-auto rounded border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-3 py-2">When</th>
            <th className="px-3 py-2">Tool</th>
            <th className="px-3 py-2">CSV</th>
            <th className="px-3 py-2">Rows</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Totals</th>
            <th className="px-3 py-2">Auth</th>
            <th className="px-3 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {items.map((h) => (
            <tr key={h.id} className="border-t">
              <td className="px-3 py-2 whitespace-nowrap">{new Date(h.timestamp).toLocaleString()}</td>
              <td className="px-3 py-2">
                <Link className="text-blue-700 hover:underline" href={`/tools/${h.toolId}`}>
                  {h.toolName}
                </Link>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{h.csvFilename ?? '—'}</td>
              <td className="px-3 py-2 whitespace-nowrap">{h.rowCount ?? '—'}</td>
              <td className="px-3 py-2 whitespace-nowrap">{h.status}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className="text-emerald-700">{h.resultSummary.success}</span> /
                <span className="text-slate-700"> {h.resultSummary.total}</span> ok ·{' '}
                <span className="text-rose-700">{h.resultSummary.failed}</span> failed ·{' '}
                <span className="text-amber-700">{h.resultSummary.skipped}</span> skipped
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{h.auth.apiKeyUsed ? 'Yes' : 'No'}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <Link className="text-blue-700 hover:underline" href={`/history/${h.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

