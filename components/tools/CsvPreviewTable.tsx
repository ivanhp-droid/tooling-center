import { Card } from '@/components/common/Card';

export function CsvPreviewTable(props: { headers: string[]; rows: Record<string, string>[] }) {
  const { headers, rows } = props;
  if (headers.length === 0) return null;

  return (
    <Card title="CSV Preview">
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr>
              {headers.map((h) => (
                <th key={h} className="border-b px-2 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-slate-50">
                {headers.map((h) => (
                  <td key={h} className="border-b px-2 py-2 align-top">
                    {row[h] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

