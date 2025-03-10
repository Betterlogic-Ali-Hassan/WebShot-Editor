'use client';

import { useState, useRef, useCallback } from 'react';
import { useStore } from '@/stores/storeProvider';

export function useBrowserContent() {
	const { canvasStore } = useStore();
	const [browser, setBrowser] = useState(
		canvasStore.browserFrameState.isEnabled
	);
	const [padding, setPadding] = useState(canvasStore.paddingState.isEnabled);
	const paddingRef = useRef<HTMLDivElement>(null);

	const toggleBrowser = useCallback(() => {
		const newState = !browser;
		setBrowser(newState);

		if (newState) {
			setPadding(false);
		}
	}, [browser]);

	const togglePadding = useCallback(() => {
		const newState = !padding;
		setPadding(newState);

		if (newState) {
			setBrowser(false);
		}
		if (!padding) {
			setTimeout(() => {
				paddingRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}, 100);
		}
	}, [padding]);

	return {
		browser,
		padding,
		paddingRef,
		toggleBrowser,
		togglePadding,
	};
}
