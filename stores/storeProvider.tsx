import { createContext, useContext } from 'react';
import { RootStore } from './rootStore';

let store: RootStore;

export function initializeStore() {
	const _store = store ?? new RootStore();

	if (typeof window === 'undefined') return _store;

	if (!store) store = _store;

	return store;
}

export const StoreContext = createContext<RootStore | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const store = initializeStore();

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}

export function useStore() {
	const context = useContext(StoreContext);
	if (context === undefined) {
		throw new Error('useStore must be used within StoreProvider');
	}
	return context;
}
