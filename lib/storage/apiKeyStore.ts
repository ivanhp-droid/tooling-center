import { safeLocalStorage } from '@/lib/storage/localStorage';

const API_KEY_STORAGE_KEY = 'tooling-center.apiKey.v1';

export type ApiKeyStatus = { present: boolean; masked?: string };

export type ApiKeyHealth = 'missing' | 'invalid' | 'expired' | 'ok';

/** Client-side hints for UX only — real validation happens on the backend. */
export function classifyApiKey(key: string | null | undefined): ApiKeyHealth {
  if (!key || key.trim().length === 0) return 'missing';
  const v = key.trim();
  if (v.length < 12) return 'invalid';
  const lower = v.toLowerCase();
  if (lower.includes('expired') || lower.includes('revoked')) return 'expired';
  if (lower.includes('invalid')) return 'invalid';
  return 'ok';
}

function maskApiKey(value: string) {
  const v = value.trim();
  if (v.length <= 8) return '••••••••';
  return `${v.slice(0, 3)}••••••${v.slice(-3)}`;
}

export const apiKeyStore = {
  get(): string | null {
    return safeLocalStorage.getItem(API_KEY_STORAGE_KEY);
  },
  set(value: string) {
    safeLocalStorage.setItem(API_KEY_STORAGE_KEY, value.trim());
  },
  clear() {
    safeLocalStorage.removeItem(API_KEY_STORAGE_KEY);
  },
  status(): ApiKeyStatus {
    const key = this.get();
    if (!key) return { present: false };
    return { present: true, masked: maskApiKey(key) };
  }
};

