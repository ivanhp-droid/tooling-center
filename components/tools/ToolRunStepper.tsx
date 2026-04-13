import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils/cn';

type StepState = 'pending' | 'current' | 'done' | 'warning' | 'blocked';

function badgeTone(state: StepState): 'neutral' | 'success' | 'warning' | 'danger' | 'info' {
  if (state === 'done') return 'success';
  if (state === 'current') return 'info';
  if (state === 'warning') return 'warning';
  if (state === 'blocked') return 'danger';
  return 'neutral';
}

function badgeLabel(state: StepState) {
  if (state === 'done') return 'Done';
  if (state === 'current') return 'Action needed';
  if (state === 'warning') return 'Fix issues';
  if (state === 'blocked') return 'Blocked';
  return 'Pending';
}

export function ToolRunStepper(props: {
  requiresCsv: boolean;
  csvPresent: boolean;
  csvOk: boolean;
  apiKeyOk: boolean;
  readyToRun: boolean;
  ran: boolean;
}) {
  const { requiresCsv, csvPresent, csvOk, apiKeyOk, readyToRun, ran } = props;

  const keyState: StepState = apiKeyOk ? 'done' : 'current';
  const keyDetail = apiKeyOk ? 'Key on file — you can run authenticated tools.' : 'Add your API key in Settings to unlock execution.';

  let csvState: StepState = 'pending';
  let csvDetail = 'This tool does not use a CSV.';
  if (requiresCsv) {
    if (!csvPresent) {
      csvState = apiKeyOk ? 'current' : 'pending';
      csvDetail = apiKeyOk ? 'Upload a CSV that matches the schema below.' : 'Upload a CSV after your API key is set.';
    } else if (!csvOk) {
      csvState = 'warning';
      csvDetail = 'Fix blocking validation errors before you can run.';
    } else {
      csvState = 'done';
      csvDetail = 'CSV looks valid — review warnings if any, then run.';
    }
  }

  let runState: StepState = 'pending';
  let runDetail = 'Complete the steps above.';
  if (ran) {
    runState = 'done';
    runDetail = 'Last run finished — see summary and row results below.';
  } else if (readyToRun) {
    runState = 'current';
    runDetail = 'Ready to run — confirm in the modal if prompted.';
  } else if (!apiKeyOk) {
    runState = 'blocked';
    runDetail = 'Blocked until an API key is saved.';
  } else if (requiresCsv && (!csvPresent || !csvOk)) {
    runState = 'blocked';
    runDetail = requiresCsv && !csvPresent ? 'Blocked until a CSV is uploaded.' : 'Blocked until validation passes.';
  }

  const steps = [
    { key: 'key', title: 'API key', state: keyState, detail: keyDetail },
    { key: 'csv', title: requiresCsv ? 'CSV' : 'Inputs', state: csvState, detail: csvDetail },
    { key: 'run', title: 'Run', state: runState, detail: runDetail }
  ];

  return (
    <ol className="grid gap-3 sm:grid-cols-3" aria-label="Run checklist">
      {steps.map((s, idx) => (
        <li
          key={s.key}
          className={cn(
            'rounded-lg border border-border bg-surface p-3 text-sm shadow-card',
            s.state === 'current' && 'border-accent-border ring-1 ring-accent-border',
            s.state === 'warning' && 'border-warning-border ring-1 ring-warning-border',
            s.state === 'blocked' && 'border-danger-border bg-danger-soft/40'
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-ink">
              {idx + 1}. {s.title}
            </span>
            <Badge tone={badgeTone(s.state)}>{badgeLabel(s.state)}</Badge>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-ink-secondary">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}
