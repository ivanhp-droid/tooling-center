import type { ToolExecutionInput, ToolExecutionRowResult, ToolExecutionResult } from '@/lib/tools/types';
import { SnorkelRequestError, createSnorkelRemoveTagsAdapter } from '@/lib/server/snorkelClient';
import { buildToolExecutionResult } from '@/lib/server/toolExecutionResult';

type RuntimeEnv = 'staging' | 'prod';

type RemoveTagsRowData = {
  email: string;
  project_name: string;
  tag: string;
  status: 'success' | 'dry_run' | 'skipped' | 'failed';
  message: string;
  environment: RuntimeEnv;
};

type ApiValidationResult =
  | {
      ok: true;
      env: RuntimeEnv;
      dryRun: boolean;
      rows: Record<string, string>[];
      tagHeaders: string[];
    }
  | {
      ok: false;
      statusCode: number;
      message: string;
    };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ROWS = 10000;
const MAX_TAG_COLUMNS = 100;

function normalizeString(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function isTagHeader(header: string) {
  return header.trim().toLowerCase().startsWith('tag');
}

function allHeaders(rows: Record<string, string>[]) {
  const set = new Set<string>();
  for (const row of rows) {
    for (const key of Object.keys(row)) set.add(key);
  }
  return Array.from(set);
}

function toOutcome(status: RemoveTagsRowData['status']): ToolExecutionRowResult['outcome'] {
  if (status === 'success') return 'success';
  if (status === 'failed') return 'failed';
  return 'skipped';
}

function makeRow(args: { rowIndex: number; data: RemoveTagsRowData }): ToolExecutionRowResult {
  return {
    rowIndex: args.rowIndex,
    outcome: toOutcome(args.data.status),
    message: args.data.message,
    data: args.data
  };
}

function validateRequestPayload(input: ToolExecutionInput): ApiValidationResult {
  if (!input.csv) {
    return {
      ok: false,
      statusCode: 400,
      message: 'CSV is required.'
    };
  }
  if (!Array.isArray(input.csv.rows)) {
    return {
      ok: false,
      statusCode: 400,
      message: 'CSV rows must be an array.'
    };
  }
  if (input.csv.rows.length === 0) {
    return {
      ok: false,
      statusCode: 400,
      message: 'CSV has no rows to process.'
    };
  }
  if (input.csv.rows.length > MAX_ROWS) {
    return {
      ok: false,
      statusCode: 413,
      message: `CSV row limit exceeded. Maximum supported rows per run: ${MAX_ROWS}.`
    };
  }
  const rawEnv = normalizeString(input.fields.env ?? 'staging');
  if (rawEnv !== 'staging' && rawEnv !== 'prod') {
    return {
      ok: false,
      statusCode: 400,
      message: 'Invalid environment. Use "staging" or "prod".'
    };
  }
  const headers = allHeaders(input.csv.rows);
  const tagHeaders = headers.filter(isTagHeader);
  if (tagHeaders.length === 0) {
    return {
      ok: false,
      statusCode: 400,
      message: 'CSV must include at least one column whose header starts with "tag".'
    };
  }
  if (tagHeaders.length > MAX_TAG_COLUMNS) {
    return {
      ok: false,
      statusCode: 400,
      message: `Too many tag columns. Maximum supported tag columns: ${MAX_TAG_COLUMNS}.`
    };
  }

  return {
    ok: true,
    env: rawEnv,
    dryRun: Boolean(input.fields.dryRun ?? true),
    rows: input.csv.rows,
    tagHeaders
  };
}

function describeSnorkelError(error: unknown): string {
  if (error instanceof SnorkelRequestError) {
    if (error.code === 'rate_limited') return 'Rate limited by upstream API.';
    if (error.code === 'not_found') return 'Resource not found in upstream API.';
    if (error.code === 'invalid_response') return 'Invalid response from upstream API.';
    if (error.code === 'network_error') return 'Network error while calling upstream API.';
    return 'Upstream API request failed.';
  }
  return 'Unexpected server error during remove tags execution.';
}

function collectRowTags(row: Record<string, string>, tagHeaders: string[]) {
  return tagHeaders
    .map((header) => normalizeString(row[header]))
    .filter((tag) => tag.length > 0);
}

export function validateRemoveTagsInput(input: ToolExecutionInput): ApiValidationResult {
  return validateRequestPayload(input);
}

export async function executeRemoveTagsFromUsersServer(input: ToolExecutionInput): Promise<ToolExecutionResult> {
  const startedAt = new Date().toISOString();
  const validation = validateRequestPayload(input);

  if (!validation.ok) {
    const finishedAt = new Date().toISOString();
    return {
      status: 'failed',
      startedAt,
      finishedAt,
      durationMs: Math.max(0, new Date(finishedAt).getTime() - new Date(startedAt).getTime()),
      summary: {
        total: 0,
        success: 0,
        failed: 0,
        skipped: 0
      },
      rows: []
    };
  }

  const { env, dryRun, rows: csvRows, tagHeaders } = validation;
  const adapter = createSnorkelRemoveTagsAdapter(env);
  const configured = adapter.isConfigured();
  if (!configured.ok) {
    throw new Error(configured.reason);
  }

  const rowResults: ToolExecutionRowResult[] = [];
  let emittedRowIndex = 0;

  for (const csvRow of csvRows) {
    const email = normalizeString(csvRow.email).toLowerCase();
    const projectName = normalizeString(csvRow.project_name);
    const tags = collectRowTags(csvRow, tagHeaders);

    if (!email) {
      rowResults.push(
        makeRow({
          rowIndex: emittedRowIndex++,
          data: {
            email: '',
            project_name: projectName,
            tag: '',
            status: 'failed',
            message: 'Missing required email.',
            environment: env
          }
        })
      );
      continue;
    }

    if (!EMAIL_REGEX.test(email)) {
      rowResults.push(
        makeRow({
          rowIndex: emittedRowIndex++,
          data: {
            email,
            project_name: projectName,
            tag: '',
            status: 'failed',
            message: 'Invalid email format.',
            environment: env
          }
        })
      );
      continue;
    }

    if (!projectName) {
      rowResults.push(
        makeRow({
          rowIndex: emittedRowIndex++,
          data: {
            email,
            project_name: '',
            tag: '',
            status: 'failed',
            message: 'Missing required project_name.',
            environment: env
          }
        })
      );
      continue;
    }

    if (tags.length === 0) {
      rowResults.push(
        makeRow({
          rowIndex: emittedRowIndex++,
          data: {
            email,
            project_name: projectName,
            tag: '',
            status: 'failed',
            message: 'No tag values found on row.',
            environment: env
          }
        })
      );
      continue;
    }

    let userId: string | null = null;
    let projectId: string | null = null;

    try {
      const user = await adapter.findUserByEmail(email);
      if (!user) {
        for (const tag of tags) {
          rowResults.push(
            makeRow({
              rowIndex: emittedRowIndex++,
              data: {
                email,
                project_name: projectName,
                tag,
                status: 'skipped',
                message: 'User not found.',
                environment: env
              }
            })
          );
        }
        continue;
      }
      userId = user.id;
    } catch (error) {
      const message = describeSnorkelError(error);
      for (const tag of tags) {
        rowResults.push(
          makeRow({
            rowIndex: emittedRowIndex++,
            data: {
              email,
              project_name: projectName,
              tag,
              status: 'failed',
              message,
              environment: env
            }
          })
        );
      }
      continue;
    }

    try {
      const project = await adapter.findProjectByName(projectName);
      if (!project) {
        for (const tag of tags) {
          rowResults.push(
            makeRow({
              rowIndex: emittedRowIndex++,
              data: {
                email,
                project_name: projectName,
                tag,
                status: 'skipped',
                message: 'Project not found.',
                environment: env
              }
            })
          );
        }
        continue;
      }
      projectId = project.id;
    } catch (error) {
      const message = describeSnorkelError(error);
      for (const tag of tags) {
        rowResults.push(
          makeRow({
            rowIndex: emittedRowIndex++,
            data: {
              email,
              project_name: projectName,
              tag,
              status: 'failed',
              message,
              environment: env
            }
          })
        );
      }
      continue;
    }

    for (const tag of tags) {
      try {
        const hasTag = await adapter.hasUserTagInProject({
          userId,
          projectId,
          tag
        });

        if (!hasTag) {
          rowResults.push(
            makeRow({
              rowIndex: emittedRowIndex++,
              data: {
                email,
                project_name: projectName,
                tag,
                status: 'skipped',
                message: 'Tag not found for user in project.',
                environment: env
              }
            })
          );
          continue;
        }

        if (dryRun) {
          rowResults.push(
            makeRow({
              rowIndex: emittedRowIndex++,
              data: {
                email,
                project_name: projectName,
                tag,
                status: 'dry_run',
                message: 'Would remove tag.',
                environment: env
              }
            })
          );
          continue;
        }

        // Destructive operation: only execute when dryRun is false.
        await adapter.removeUserTagFromProject({
          userId,
          projectId,
          tag
        });

        rowResults.push(
          makeRow({
            rowIndex: emittedRowIndex++,
            data: {
              email,
              project_name: projectName,
              tag,
              status: 'success',
              message: 'Tag removed.',
              environment: env
            }
          })
        );
      } catch (error) {
        rowResults.push(
          makeRow({
            rowIndex: emittedRowIndex++,
            data: {
              email,
              project_name: projectName,
              tag,
              status: 'failed',
              message: describeSnorkelError(error),
              environment: env
            }
          })
        );
      }
    }
  }

  const finishedAt = new Date().toISOString();
  return buildToolExecutionResult({
    rows: rowResults,
    startedAt,
    finishedAt
  });
}

