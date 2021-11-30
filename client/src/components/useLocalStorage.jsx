// @ts-ignore

import { createLocalStorageStateHook } from 'use-local-storage-state';

export default function useToken() {
  const useStore = createLocalStorageStateHook('user', null);
  return useStore();
}
