type RuntimeEnv = 'staging' | 'prod';

type AdapterConfig = {
  baseUrl: string;
  apiKey: string;
};

type SnorkelRequestErrorCode = 'not_found' | 'rate_limited' | 'upstream_error' | 'network_error' | 'invalid_response';

export class SnorkelRequestError extends Error {
  readonly code: SnorkelRequestErrorCode;
  readonly statusCode?: number;

  constructor(args: { code: SnorkelRequestErrorCode; message: string; statusCode?: number }) {
    super(args.message);
    this.name = 'SnorkelRequestError';
    this.code = args.code;
    this.statusCode = args.statusCode;
  }
}

export type SnorkelUserRef = { id: string; email: string };
export type SnorkelProjectRef = { id: string; name: string };

export interface SnorkelRemoveTagsAdapter {
  isConfigured(): { ok: true } | { ok: false; reason: string };
  findUserByEmail(email: string): Promise<SnorkelUserRef | null>;
  findProjectByName(projectName: string): Promise<SnorkelProjectRef | null>;
  hasUserTagInProject(args: { userId: string; projectId: string; tag: string }): Promise<boolean>;
  removeUserTagFromProject(args: { userId: string; projectId: string; tag: string }): Promise<void>;
}

function getConfig(env: RuntimeEnv): AdapterConfig | null {
  const baseUrl = env === 'prod' ? process.env.SNORKEL_API_BASE_URL_PROD : process.env.SNORKEL_API_BASE_URL_STAGING;
  const apiKey = env === 'prod' ? process.env.SNORKEL_API_KEY_PROD : process.env.SNORKEL_API_KEY_STAGING;
  if (!baseUrl || !apiKey) return null;
  return {
    baseUrl: baseUrl.trim().replace(/\/+$/, ''),
    apiKey: apiKey.trim()
  };
}

const ENDPOINTS = {
  findUserByEmail: '/v1/users:lookup-by-email',
  findProjectByName: '/v1/projects:lookup-by-name',
  checkUserProjectTag: '/v1/user-project-tags:exists',
  removeUserProjectTag: '/v1/user-project-tags:remove'
} as const;

class HttpSnorkelRemoveTagsAdapter implements SnorkelRemoveTagsAdapter {
  constructor(private readonly config: AdapterConfig) {}

  isConfigured() {
    return { ok: true } as const;
  }

  private async requestJson<TResponse>(args: {
    path: string;
    method?: 'GET' | 'POST';
    body?: Record<string, unknown>;
    timeoutMs?: number;
  }): Promise<TResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), args.timeoutMs ?? 12000);

    try {
      const response = await fetch(`${this.config.baseUrl}${args.path}`, {
        method: args.method ?? 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: args.body ? JSON.stringify(args.body) : undefined,
        signal: controller.signal
      });

      if (response.status === 404) {
        throw new SnorkelRequestError({
          code: 'not_found',
          statusCode: response.status,
          message: 'Resource not found.'
        });
      }
      if (response.status === 429) {
        throw new SnorkelRequestError({
          code: 'rate_limited',
          statusCode: response.status,
          message: 'Snorkel API rate limit reached.'
        });
      }
      if (!response.ok) {
        throw new SnorkelRequestError({
          code: 'upstream_error',
          statusCode: response.status,
          message: 'Snorkel API request failed.'
        });
      }

      try {
        return (await response.json()) as TResponse;
      } catch {
        throw new SnorkelRequestError({
          code: 'invalid_response',
          statusCode: response.status,
          message: 'Snorkel API returned invalid JSON.'
        });
      }
    } catch (error) {
      if (error instanceof SnorkelRequestError) {
        throw error;
      }
      throw new SnorkelRequestError({
        code: 'network_error',
        message: 'Network error while calling Snorkel API.'
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  async findUserByEmail(email: string): Promise<SnorkelUserRef | null> {
    const payload = await this.requestJson<{ user?: { id?: string; email?: string } | null }>({
      path: ENDPOINTS.findUserByEmail,
      body: { email }
    });
    const userId = payload.user?.id?.trim();
    if (!userId) return null;
    return {
      id: userId,
      email: payload.user?.email?.trim() || email
    };
  }

  async findProjectByName(projectName: string): Promise<SnorkelProjectRef | null> {
    const payload = await this.requestJson<{ project?: { id?: string; name?: string } | null }>({
      path: ENDPOINTS.findProjectByName,
      body: { project_name: projectName }
    });
    const projectId = payload.project?.id?.trim();
    if (!projectId) return null;
    return {
      id: projectId,
      name: payload.project?.name?.trim() || projectName
    };
  }

  async hasUserTagInProject(args: { userId: string; projectId: string; tag: string }): Promise<boolean> {
    const payload = await this.requestJson<{ exists?: boolean }>({
      path: ENDPOINTS.checkUserProjectTag,
      body: {
        user_id: args.userId,
        project_id: args.projectId,
        tag: args.tag
      }
    });
    return payload.exists === true;
  }

  async removeUserTagFromProject(args: { userId: string; projectId: string; tag: string }): Promise<void> {
    await this.requestJson<{ deleted?: boolean }>({
      path: ENDPOINTS.removeUserProjectTag,
      body: {
        user_id: args.userId,
        project_id: args.projectId,
        tag: args.tag
      }
    });
  }
}

class NotConfiguredSnorkelRemoveTagsAdapter implements SnorkelRemoveTagsAdapter {
  constructor(private readonly reason: string) {}

  isConfigured() {
    return { ok: false, reason: this.reason } as const;
  }

  async findUserByEmail(): Promise<SnorkelUserRef | null> {
    throw new Error(this.reason);
  }

  async findProjectByName(): Promise<SnorkelProjectRef | null> {
    throw new Error(this.reason);
  }

  async hasUserTagInProject(): Promise<boolean> {
    throw new Error(this.reason);
  }

  async removeUserTagFromProject(): Promise<void> {
    throw new Error(this.reason);
  }
}

export function createSnorkelRemoveTagsAdapter(env: RuntimeEnv): SnorkelRemoveTagsAdapter {
  const config = getConfig(env);
  if (!config) {
    return new NotConfiguredSnorkelRemoveTagsAdapter('Real Remove Tags API adapter is not configured yet.');
  }
  // TODO: Verify ENDPOINTS values against the live Snorkel API contract.
  return new HttpSnorkelRemoveTagsAdapter(config);
}

