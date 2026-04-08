import type { ToolDefinition, ToolExecutionResult } from '@/lib/tools/types';
import { Card } from '@/components/common/Card';

export function ResultTable(props: { tool: ToolDefinition; result: ToolExecutionResult }) {
  const { tool, result } = props;
  const columns = tool.output.columns;

  return (
    <Card title="Row Results">
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600">
            <tr>
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4">Outcome</th>
              {columns.map((c) => (
                <th key={c.key} className="py-2 pr-4">
                  {c.label}
                </th>
              ))}
              <th className="py-2 pr-4">Message</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((r) => (
              <tr key={r.rowIndex} className="border-t">
                <td className="py-2 pr-4 text-gray-500">{r.rowIndex + 1}</td>
                <td className="py-2 pr-4">
                  <span
                    className={
                      r.outcome === 'success'
                        ? 'text-green-700'
                        : r.outcome === 'failed'
                          ? 'text-red-700'
                          : 'text-amber-700'
                    }
                  >
                    {r.outcome}
                  </span>
                </td>
                {columns.map((c) => (
                  <td key={c.key} className="py-2 pr-4">
                    {String((r.data as any)?.[c.key] ?? '')}
                  </td>
                ))}
                <td className="py-2 pr-4">{r.message ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

