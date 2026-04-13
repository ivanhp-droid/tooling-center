import type { CsvSchema } from '@/lib/tools/types';

function escapeCsv(value: string) {
  if (value.includes('"') || value.includes(',') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export function buildCsvTemplate(schema: CsvSchema): { filename: string; content: string } {
  const header = schema.columns.map((c) => c.key).join(',');
  const exampleRow = schema.columns
    .map((c) => escapeCsv(String(c.example ?? '')))
    .join(',');
  const content = `${header}\n${exampleRow}\n`;
  return { filename: 'template.csv', content };
}

