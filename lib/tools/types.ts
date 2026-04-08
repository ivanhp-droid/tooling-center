export type RiskLevel = 'low' | 'medium' | 'high';

export type CsvColumnType = 'string' | 'number' | 'boolean';

export type CsvColumnSchema = {
  key: string;
  label: string;
  required: boolean;
  type: CsvColumnType;
  description?: string;
  example?: string;
  allowedValues?: string[];
  pattern?: string;
};

export type CsvSchema = {
  columns: CsvColumnSchema[];
  allowUnknownColumns?: boolean;
  unknownColumnsSeverity?: 'warning' | 'error';
  keyColumns?: string[];
  templateCsv?: {
    filename: string;
    content: string;
  };
  notes?: string[];
};

export type DynamicFieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'number';

export type DynamicFieldDefinition = {
  key: string;
  label: string;
  type: DynamicFieldType;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string | number | boolean;
};

export type ToolExecutionInput = {
  apiKey?: string;
  csv?: {
    filename: string;
    rowCount: number;
    rows: Record<string, string>[];
  };
  fields: Record<string, unknown>;
};

export type RowOutcome = 'success' | 'failed' | 'skipped';

export type ToolExecutionRowResult = {
  rowIndex: number;
  outcome: RowOutcome;
  message?: string;
  data?: Record<string, unknown>;
};

export type ToolExecutionResult = {
  status: 'success' | 'partial_success' | 'failed';
  startedAt: string;
  finishedAt: string;
  durationMs?: number;
  summary: {
    total: number;
    success: number;
    failed: number;
    skipped: number;
  };
  rows: ToolExecutionRowResult[];
};

export type ToolOutputConfig = {
  columns: { key: string; label: string }[];
};

export type ToolDefinition = {
  id: string;
  name: string;
  description: string;
  category: string;
  riskLevel: RiskLevel;
  requiresApiKey: boolean;
  requiresCsv: boolean;
  csvSchema?: CsvSchema;
  additionalFields?: DynamicFieldDefinition[];
  helpText?: {
    overview?: string;
    csvTips?: string[];
    reversibility?: string;
  };
  confirmation?: {
    mode: 'none' | 'standard' | 'strong';
    strongRequiresCheckbox?: boolean;
    strongRequiresTyped?: string;
    warningText?: string;
  };
  output: ToolOutputConfig;
  execute: (input: ToolExecutionInput) => Promise<ToolExecutionResult>;
};

