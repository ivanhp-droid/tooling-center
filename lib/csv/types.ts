export type CsvValidationIssue = {
  severity: 'error' | 'warning';
  scope: 'file' | 'schema' | 'row';
  message: string;
  code?: string;
  rowIndex?: number;
  columnKey?: string;
};

export type CsvParseResult = {
  filename: string;
  headers: string[];
  rowCount: number;
  rows: Record<string, string>[];
  previewRows: Record<string, string>[];
  issues: CsvValidationIssue[];
  requiredColumnsMissing: string[];
};

