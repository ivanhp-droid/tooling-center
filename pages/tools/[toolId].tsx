import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { getToolById } from '@/lib/tools/catalog';
import { apiKeyStore, classifyApiKey } from '@/lib/storage/apiKeyStore';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { ApiKeyStatusBanner } from '@/components/tools/ApiKeyStatusBanner';
import { CsvUploader } from '@/components/tools/CsvUploader';
import { CsvValidationSummary } from '@/components/tools/CsvValidationSummary';
import { CsvPreviewTable } from '@/components/tools/CsvPreviewTable';
import { CsvSchemaDetails } from '@/components/tools/CsvSchemaDetails';
import { DynamicFieldRenderer } from '@/components/tools/DynamicFieldRenderer';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ConfirmationModal } from '@/components/tools/ConfirmationModal';
import { ExecutionSummary } from '@/components/tools/ExecutionSummary';
import { ResultTable } from '@/components/tools/ResultTable';
import { ToolRunStepper } from '@/components/tools/ToolRunStepper';
import { parseAndValidateCsv, type CsvParseResult } from '@/lib/csv';
import { addHistoryRecord } from '@/lib/storage/historyStore';
import { buildHistoryInputSummary } from '@/lib/execution/inputSummary';
import { Alert } from '@/components/common/Alert';
import { Spinner } from '@/components/common/Spinner';
import { Badge } from '@/components/common/Badge';
import { useClient } from '@/lib/hooks/useClient';

export default function ToolPage() {
  const router = useRouter();
  const toolId = typeof router.query.toolId === 'string' ? router.query.toolId : '';

  const tool = useMemo(() => (toolId ? getToolById(toolId) : undefined), [toolId]);

  const [csv, setCsv] = useState<CsvParseResult | null>(null);
  const [fields, setFields] = useState<Record<string, unknown>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [csvParsing, setCsvParsing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<NonNullable<typeof tool>['execute']>> | null>(null);
  const client = useClient();

  const additionalFieldsOk = useMemo(() => {
    if (!tool) return true;
    for (const f of tool.additionalFields ?? []) {
      if (!f.required) continue;
      const v = fields[f.key];
      if (f.type === 'checkbox') {
        if (typeof v !== 'boolean') return false;
        continue;
      }
      if (v === undefined || v === null || String(v).trim() === '') return false;
    }
    return true;
  }, [tool, fields]);

  if (!tool) {
    return (
      <AdminLayout>
        <Card title="Tool not found">
          <p className="text-sm text-ink-secondary">
            No tool matches <span className="font-mono">{toolId || '(missing id)'}</span>. Return to the catalog and
            pick a tool from the list.
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-canvas-muted"
            >
              ← Back to catalog
            </Link>
          </div>
        </Card>
      </AdminLayout>
    );
  }

  const activeTool = tool;

  const apiKeyStatus = client ? apiKeyStore.status() : { present: false };
  const apiKeyRaw = client ? apiKeyStore.get() : null;
  const apiKeyHealth = classifyApiKey(apiKeyRaw);
  const apiKeyOk = !activeTool.requiresApiKey || (client && apiKeyStatus.present && apiKeyHealth === 'ok');

  const csvBlocking =
    activeTool.requiresCsv &&
    (!csv || csv.issues.some((i) => i.severity === 'error') || csv.rowCount === 0 || csv.headers.length === 0);
  const csvOk =
    !activeTool.requiresCsv || Boolean(csv && csv.issues.every((i) => i.severity !== 'error') && csv.rowCount > 0);

  const readyToRun = Boolean(apiKeyOk && csvOk && additionalFieldsOk && !running && !csvParsing);

  const needsConfirm =
    activeTool.confirmation?.mode === 'none'
      ? false
      : Boolean(
          activeTool.confirmation?.mode === 'standard' ||
            activeTool.confirmation?.mode === 'strong' ||
            (!activeTool.confirmation &&
              (activeTool.riskLevel === 'high' || activeTool.riskLevel === 'medium'))
        );

  async function runTool() {
    setErrorMsg(null);
    setRunning(true);
    setResult(null);
    try {
      const apiKey = activeTool.requiresApiKey ? apiKeyStore.get() ?? undefined : undefined;
      const exec = await activeTool.execute({
        apiKey,
        csv: csv ? { filename: csv.filename, rowCount: csv.rowCount, rows: csv.rows } : undefined,
        fields
      });
      setResult(exec);
      addHistoryRecord({
        toolId: activeTool.id,
        toolName: activeTool.name,
        timestamp: new Date().toISOString(),
        auth: { apiKeyUsed: Boolean(apiKey) },
        csvFilename: csv?.filename,
        rowCount: csv?.rowCount,
        inputSummary: buildHistoryInputSummary({
          apiKey,
          csv: csv ? { filename: csv.filename, rowCount: csv.rowCount, rows: csv.rows } : undefined,
          fields
        }),
        status: exec.status,
        durationMs: exec.durationMs,
        resultSummary: exec.summary
      });
    } catch (e) {
      setErrorMsg(
        e instanceof Error
          ? e.message
          : 'The run could not be completed. Check your connection and try again, or contact the platform team if it keeps failing.'
      );
    } finally {
      setRunning(false);
    }
  }

  function onRequestRun() {
    setErrorMsg(null);
    if (!readyToRun) return;
    if (needsConfirm) setConfirmOpen(true);
    else void runTool();
  }

  const confirmBody = (
    <div className="space-y-3 text-sm text-ink">
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">Tool</div>
          <div className="font-medium text-ink">{activeTool.name}</div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">CSV file</div>
          <div className="font-mono text-sm">{csv?.filename ?? '—'}</div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">Rows in file</div>
          <div>{csv?.rowCount ?? 0}</div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">API key</div>
          <div>{activeTool.requiresApiKey ? (apiKeyOk ? 'Present (mock-valid)' : 'Missing or invalid') : 'Not required'}</div>
        </div>
      </div>
      {activeTool.helpText?.reversibility ? (
        <div className="rounded-md border border-border bg-canvas-muted p-2 text-xs text-ink-secondary">
          <span className="font-semibold text-ink">Reversibility: </span>
          {activeTool.helpText.reversibility}
        </div>
      ) : null}
    </div>
  );

  return (
    <AdminLayout>
      <ToolPageLayout tool={activeTool}>
        <ToolRunStepper
          requiresCsv={activeTool.requiresCsv}
          csvPresent={Boolean(csv)}
          csvOk={csvOk}
          apiKeyOk={apiKeyOk}
          readyToRun={readyToRun}
          ran={Boolean(result)}
        />

        <ApiKeyStatusBanner requiresApiKey={activeTool.requiresApiKey} />

        {activeTool.requiresCsv && activeTool.csvSchema ? (
          <Card
            title="1 · CSV"
            subtitle="Upload one file per run. Fix all blocking errors before execution is enabled."
          >
            <div className="space-y-4">
              {activeTool.helpText?.overview ? (
                <p className="text-sm leading-relaxed text-ink-secondary">{activeTool.helpText.overview}</p>
              ) : null}

              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="text-xs text-ink-secondary">
                  <span className="font-medium text-ink">Expected columns: </span>
                  <span className="font-mono">{activeTool.csvSchema.columns.map((c) => c.key).join(', ')}</span>
                </div>
                {activeTool.csvSchema.templateCsv ? (
                  <a
                    className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-canvas-muted"
                    href={`data:text/csv;charset=utf-8,${encodeURIComponent(activeTool.csvSchema.templateCsv.content)}`}
                    download={activeTool.csvSchema.templateCsv.filename}
                  >
                    Download template CSV
                  </a>
                ) : null}
              </div>

              <CsvUploader
                disabled={csvParsing || running}
                onLoaded={async ({ filename, text }) => {
                  setCsvParsing(true);
                  setErrorMsg(null);
                  setResult(null);
                  try {
                    await new Promise((r) => setTimeout(r, 0));
                    const parsed = parseAndValidateCsv({ filename, text, schema: activeTool.csvSchema! });
                    setCsv(parsed);
                  } catch {
                    setErrorMsg('We could not read that file. Try a UTF-8 `.csv` export and ensure the file is not empty.');
                    setCsv(null);
                  } finally {
                    setCsvParsing(false);
                  }
                }}
              />

              {csvParsing ? (
                <div className="flex items-center gap-2 text-sm text-ink-secondary">
                  <Spinner label="Parsing CSV" />
                  Parsing and validating CSV…
                </div>
              ) : null}

              {!csv && !csvParsing ? (
                <Alert variant="info" title="No file loaded">
                  Drag a CSV onto the drop zone or use <span className="font-medium">Choose file</span>. Row count and
                  validation appear after load.
                </Alert>
              ) : null}

              {csv ? (
                <>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-ink-secondary">
                    <Badge tone="neutral">File: {csv.filename}</Badge>
                    <Badge tone={csv.rowCount > 0 ? 'success' : 'warning'}>
                      {csv.rowCount} data {csv.rowCount === 1 ? 'row' : 'rows'}
                    </Badge>
                    {csv.rowCount === 0 ? (
                      <Badge tone="warning">No data rows — add rows or pick another file</Badge>
                    ) : null}
                  </div>
                  <CsvValidationSummary parse={csv} schema={activeTool.csvSchema} />
                  <CsvSchemaDetails schema={activeTool.csvSchema} />
                  <CsvPreviewTable headers={csv.headers} rows={csv.previewRows} />
                </>
              ) : null}
            </div>
          </Card>
        ) : null}

        {activeTool.additionalFields && activeTool.additionalFields.length > 0 ? (
          <Card title="2 · Tool options" subtitle="These apply to every row in this run unless noted otherwise.">
            <DynamicFieldRenderer
              withCard={false}
              fields={activeTool.additionalFields}
              values={fields}
              onChange={setFields}
            />
            {!additionalFieldsOk ? (
              <Alert variant="warning" className="mt-4" title="Required fields missing" role="alert">
                Fill all required fields above before running. Required items are marked in the form.
              </Alert>
            ) : null}
          </Card>
        ) : null}

        <Card
          title={`${activeTool.additionalFields?.length ? '3' : activeTool.requiresCsv ? '2' : '1'} · Run`}
          subtitle="Execution uses the mock service in this build. Results and history stay in this browser."
        >
          <div className="space-y-4">
            {!apiKeyOk && activeTool.requiresApiKey ? (
              <Alert variant="error" title="Cannot run yet" role="alert">
                {apiKeyStatus.present && apiKeyHealth !== 'ok'
                  ? 'Your saved API key failed the local format check. Open Settings and paste a valid key, then return here.'
                  : 'Save an API key in Settings. Execution stays disabled until a key is on file.'}
              </Alert>
            ) : null}

            {activeTool.requiresCsv && csv && csv.rowCount === 0 ? (
              <Alert variant="warning" title="No rows to process" role="alert">
                The file has headers but no data rows. Add at least one row or choose a different CSV.
              </Alert>
            ) : null}

            {activeTool.requiresCsv && csvBlocking && csv && csv.rowCount > 0 ? (
              <Alert variant="error" title="Validation blocking run" role="alert">
                Fix all blocking errors in the validation panel above. Warnings alone do not block execution.
              </Alert>
            ) : null}

            {errorMsg ? (
              <Alert variant="error" title="Run failed" role="alert">
                {errorMsg}
              </Alert>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant={activeTool.riskLevel === 'high' ? 'danger' : 'primary'}
                disabled={!readyToRun}
                onClick={onRequestRun}
              >
                {running ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner label="Running tool" />
                    Running…
                  </span>
                ) : (
                  'Run tool'
                )}
              </Button>
              <Link
                className="text-sm font-medium text-accent underline decoration-border underline-offset-2 hover:text-accent-hover hover:decoration-accent-hover"
                href="/history"
              >
                View history
              </Link>
            </div>
            <p className="text-xs leading-relaxed text-ink-muted">
              The Run button stays disabled while a run is in progress so you cannot double-submit by accident.
            </p>
          </div>
        </Card>

        {result ? (
          <div className="space-y-4">
            <ExecutionSummary result={result} />
            {result.summary.success === 0 && result.summary.total > 0 ? (
              <Alert variant="warning" title="No successful rows" role="status">
                Every row failed or was skipped. Review row messages, fix the CSV or inputs, and run again. Export the
                results CSV to share with your team.
              </Alert>
            ) : null}
            {result.status === 'partial_success' ? (
              <Alert variant="warning" title="Partial success" role="status">
                Some rows failed or were skipped. Filter the table by outcome and download the CSV for follow-up.
              </Alert>
            ) : null}
            <ResultTable tool={activeTool} result={result} />
          </div>
        ) : null}

        <ConfirmationModal
          key={`confirm-${activeTool.id}-${confirmOpen ? 'open' : 'closed'}`}
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            void runTool();
          }}
          riskLevel={activeTool.riskLevel}
          title={`Confirm run: ${activeTool.name}`}
          mode={
            activeTool.confirmation?.mode === 'none'
              ? 'standard'
              : activeTool.confirmation?.mode ?? (activeTool.riskLevel === 'high' ? 'strong' : 'standard')
          }
          warningText={activeTool.confirmation?.warningText}
          requireCheckbox={activeTool.confirmation?.strongRequiresCheckbox}
          typedConfirmText={activeTool.confirmation?.strongRequiresTyped}
          confirmLabel="Confirm and run tool"
          body={confirmBody}
        />
      </ToolPageLayout>
    </AdminLayout>
  );
}
