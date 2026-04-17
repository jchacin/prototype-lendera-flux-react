import { useSyncExternalStore } from 'react';
import { lenderaStore } from '../flux/lenderaStore';

export function useLenderaStore() {
  return useSyncExternalStore(
    (listener) => lenderaStore.subscribe(listener),
    () => lenderaStore.getState(),
    () => lenderaStore.getState()
  );
}
