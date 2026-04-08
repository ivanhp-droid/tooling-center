export type CsvValidationError = {
  type: 'file' | 'schema' | 'cell';
  message: string;
  rowIndex?: number;
  columnKey?: string;
};

export type CsvParseResult = {
  filename: string;
  headers: string[];
  rowCount: number;
  rows: Record<string, string>[];
  previewRows: Record<string, string>[];
  errors: CsvValidationError[];
  requiredColumnsMissing: string[];
};

