import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { getToolById } from '@/lib/tools/catalog';
import { apiKeyStore } from '@/lib/storage/apiKeyStore';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { ApiKeyStatusBanner } from '@/components/tools/ApiKeyStatusBanner';
import { CsvUploader } from '@/components/tools/CsvUploader';
import { CsvValidationSummary } from '@/components/tools/CsvValidationSummary';
import { CsvPreviewTable } from '@/components/tools/CsvPreviewTable';
import { DynamicFieldRenderer } from '@/components/tools/DynamicFieldRenderer';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ConfirmationModal } from '@/components/tools/ConfirmationModal';
import { ExecutionSummary } from '@/components/tools/ExecutionSummary';
import { ResultTable } from '@/components/tools/ResultTable';
import { parseAndValidateCsv, type CsvParseResult } from '@/lib/csv';
import { addHistoryRecord } from '@/lib/storage/historyStore';
import { buildHistoryInputSummary } from '@/lib/execution/inputSummary';

export default function ToolPage() {
  const router = useRouter();
  const toolId = typeof router.query.toolId === 'string' ? router.query.toolId : '';

  const tool = useMemo(() => (toolId ? getToolById(toolId) : undefined), [toolId]);

  const [csv, setCsv] = useState<CsvParseResult | null>(null);
  const [fields, setFields] = useState<Record<string, unknown>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<NonNullable<typeof tool>['execute']>> | null>(null);

  if (!tool) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="text-xl font-semibold">Tool not found</div>
        </div>
        <div className="rounded border bg-white p-4 text-sm">
          <p className="text-slate-700">No tool with id: {toolId || '(missing)'}</p>
          <div className="mt-3">
            <Link className="text-blue-700 underline" href="/">
              Back to catalog
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const apiKeyStatus = apiKeyStore.status();
  const csvOk = !tool.requiresCsv || (csv && csv.errors.length === 0 && csv.rowCount > 0);
  const apiKeyOk = !tool.requiresApiKey || apiKeyStatus.present;
  const canRun = Boolean(csvOk && apiKeyOk && !running);

  async function runTool() {
    setErrorMsg(null);
    setRunning(true);
    setResult(null);
    try {
      const apiKey = tool.requiresApiKey ? apiKeyStore.get() ?? undefined : undefined;
      const exec = await tool.execute({
        apiKey,
        csv: csv
          ? { filename: csv.filename, rowCount: csv.rowCount, rows: csv.rows }
          : undefined,
        fields
      });
      setResult(exec);
      addHistoryRecord({
        toolId: tool.id,
        toolName: tool.name,
        timestamp: new Date().toISOString(),
        csvFilename: csv?.filename,
        rowCount: csv?.rowCount,
        inputSummary: buildHistoryInputSummary({
          apiKey,
          csv: csv ? { filename: csv.filename, rowCount: csv.rowCount, rows: csv.rows } : undefined,
          fields
        }),
        status: exec.status,
        resultSummary: exec.summary
      });
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Failed to execute tool.');
    } finally {
      setRunning(false);
    }
  }

  return (
    <AdminLayout>
      <ToolPageLayout tool={tool}>
        <div className="space-y-4">
          <ApiKeyStatusBanner requiresApiKey={tool.requiresApiKey} />

          {tool.requiresCsv && tool.csvSchema ? (
            <Card title="CSV Input" subtitle="Upload a CSV matching this tool’s schema.">
              <div className="space-y-3">
                <CsvUploader
                  onLoaded={({ filename, text }) => {
                    const parsed = parseAndValidateCsv({ filename, text, schema: tool.csvSchema! });
                    setCsv(parsed);
                    setResult(null);
                    setErrorMsg(null);
                  }}
                />
                {csv ? (
                  <>
                    <CsvValidationSummary parse={csv} />
                    <CsvPreviewTable headers={csv.headers} rows={csv.previewRows} />
                  </>
                ) : (
                  <div className="text-sm text-slate-600">No CSV loaded yet.</div>
                )}
              </div>
            </Card>
          ) : null}

          {tool.additionalFields && tool.additionalFields.length > 0 ? (
            <DynamicFieldRenderer fields={tool.additionalFields} values={fields} onChange={setFields} />
          ) : null}

          <Card title="Run">
            <div className="space-y-3">
              {!apiKeyOk ? (
                <div className="text-sm text-amber-800">This tool requires an API key. Add one in Settings.</div>
              ) : null}
              {tool.requiresCsv && !csvOk ? (
                <div className="text-sm text-amber-800">Please upload a valid CSV before running.</div>
              ) : null}
              {errorMsg ? <div className="text-sm text-red-700">{errorMsg}</div> : null}

              <div className="flex items-center gap-2">
                <Button
                  variant={tool.riskLevel === 'high' ? 'danger' : 'primary'}
                  disabled={!canRun}
                  onClick={() => {
                    if (tool.riskLevel === 'high' || tool.riskLevel === 'medium') setConfirmOpen(true);
                    else void runTool();
                  }}
                >
                  {running ? 'Running…' : 'Run Tool'}
                </Button>
                <Link className="text-sm text-slate-700 hover:underline" href="/history">
                  View History →
                </Link>
              </div>
              <div className="text-xs text-slate-500">
                This is a mock executor and local-only history. API keys are never stored in history records.
              </div>
            </div>
          </Card>

          {result ? (
            <>
              <ExecutionSummary result={result} />
              <ResultTable tool={tool} result={result} />
            </>
          ) : null}

          <ConfirmationModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => {
              setConfirmOpen(false);
              void runTool();
            }}
            riskLevel={tool.riskLevel}
            title={`Confirm: ${tool.name}`}
            body={
              <div className="space-y-2">
                <div>
                  CSV file: <span className="font-mono">{csv?.filename ?? '(none)'}</span>
                </div>
                <div>Rows: {csv?.rowCount ?? 0}</div>
              </div>
            }
          />
        </div>
      </ToolPageLayout>
    </AdminLayout>
  );
}

