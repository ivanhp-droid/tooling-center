import { safeLocalStorage } from '@/lib/storage/localStorage';

const API_KEY_STORAGE_KEY = 'tooling-center.apiKey.v1';

export type ApiKeyStatus = { present: boolean; masked?: string };

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

