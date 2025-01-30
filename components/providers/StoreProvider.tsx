'use client';

import { StoreProvider as MobxStoreProvider } from '@/stores/storeProvider';

export function ClientProvider({ children }: { children: React.ReactNode }) {
	return <MobxStoreProvider>{children}</MobxStoreProvider>;
}
