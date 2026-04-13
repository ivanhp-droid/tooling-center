import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * True on the client, false during SSR — avoids hydration mismatches for browser-only reads.
 */
export function useClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
