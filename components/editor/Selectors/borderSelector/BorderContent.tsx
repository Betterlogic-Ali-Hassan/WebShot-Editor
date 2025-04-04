'use client';

import { useBrowserContent } from '@/hooks/useBrowserContent';
import { ToggleSwitch } from './ToggleSwitch';
import Browser from './Browser';
import Padding from './Padding';
import ColorPicker from './ColorPicker2';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

export const BrowserContent = observer(() => {
	const { paddingRef, toggleBrowser, togglePadding } = useBrowserContent();
	const { canvasStore } = useStore();

	const handlePaddingToggle = () => {
		canvasStore.updatePaddingState({
			isEnabled: !canvasStore.paddingState.isEnabled,
		});
		togglePadding();
	};

	const handlePaddingSizeChange = (size: number) => {
		canvasStore.updatePaddingState({ size });
	};

	const handlePaddingColorChange = (color: string) => {
		canvasStore.updatePaddingState({ color });
	};

	const handleBrowserFrameToggle = () => {
		canvasStore.updateBrowserFrameState({
			isEnabled: !canvasStore.browserFrameState.isEnabled,
		});
		toggleBrowser();
	};

	return (
		<div className="w-60 px-4 py-2 space-y-4">
			<div className="space-y-2">
				<ToggleSwitch
					id="browser"
					label="Browser"
					checked={canvasStore.browserFrameState.isEnabled}
					onToggle={handleBrowserFrameToggle}
				/>
				{canvasStore.browserFrameState.isEnabled && <Browser />}
			</div>
			<div className="space-y-2">
				<ToggleSwitch
					id="padding"
					label="Padding"
					checked={canvasStore.paddingState.isEnabled}
					onToggle={handlePaddingToggle}
				/>
				{canvasStore.paddingState.isEnabled && (
					<div ref={paddingRef}>
						<Padding
							size={canvasStore.paddingState.size}
							onSizeChange={handlePaddingSizeChange}
						/>
						<ColorPicker
							select
							icon
							initialColor={canvasStore.paddingState.color}
							onColorChange={handlePaddingColorChange}
						/>
					</div>
				)}
			</div>
		</div>
	);
});
