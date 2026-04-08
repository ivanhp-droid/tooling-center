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
            <th className="px-3 py-2">Result</th>
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
                {h.resultSummary.success}/{h.resultSummary.total} ok
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

