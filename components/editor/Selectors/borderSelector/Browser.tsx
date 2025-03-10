'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { BrowserStyle } from '@/types/types';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import BrowserSkeleton from './Skelton';

const Browser = observer(() => {
	const { canvasStore } = useStore();
	const [loading, setLoading] = useState(false);
	const [urlInput, setUrlInput] = useState(canvasStore.browserFrameState.url);

	useEffect(() => {
		setUrlInput(canvasStore.browserFrameState.url);
	}, [canvasStore.browserFrameState.url]);

	const handleSelectedStyle = (style: BrowserStyle) => {
		canvasStore.updateBrowserFrameState({ style });
	};

	const handleShowUrlToggle = () => {
		canvasStore.updateBrowserFrameState({
			showUrl: !canvasStore.browserFrameState.showUrl,
		});
	};

	const handleShowDateToggle = () => {
		canvasStore.updateBrowserFrameState({
			showDate: !canvasStore.browserFrameState.showDate,
		});
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrlInput(e.target.value);
	};

	const handleUrlBlur = () => {
		canvasStore.updateBrowserFrameState({ url: urlInput });
	};

	const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			canvasStore.updateBrowserFrameState({ url: urlInput });
		}
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			{loading ? (
				<BrowserSkeleton />
			) : (
				<>
					<div className="space-y-2">
						<div
							className="flex items-center cursor-pointer"
							onClick={() => handleSelectedStyle('mac')}
						>
							<Image
								src="/mac1.png"
								alt="Mac browser"
								height={69}
								width={200}
								className={cn(
									'rounded-md object-cover border-2 border-[#f1f1f1] max-h-[69px] ',
									canvasStore.browserFrameState.style ===
										'mac' &&
										'border-border border-2 border-dotted'
								)}
								priority
							/>
						</div>

						<div
							className="flex items-center cursor-pointer"
							onClick={() => handleSelectedStyle('windows')}
						>
							<Image
								src="/win1.png"
								alt="Windows browser"
								height={77}
								width={200}
								className={cn(
									'rounded-md object-cover border-2 border-[#f1f1f1] max-h-[77px]',
									canvasStore.browserFrameState.style ===
										'windows' &&
										'border-border border-2 border-dotted'
								)}
								priority
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Button
							className={cn(
								'text-sm text-black bg-light text-dark hover:bg-black hover:text-white border w-full border-border rounded ',
								canvasStore.browserFrameState.style ===
									'url-top' &&
									'border-border border-2 border-dotted'
							)}
							size="sm"
							onClick={() => handleSelectedStyle('url-top')}
						>
							URL on top
						</Button>
						<Button
							className={cn(
								'text-sm text-black  hover:bg-black hover:text-white text-dark bg-light border border-border w-full rounded',
								canvasStore.browserFrameState.style ===
									'url-bottom' &&
									'border-border border-2 border-dotted'
							)}
							size="sm"
							onClick={() => handleSelectedStyle('url-bottom')}
						>
							URL on bottom
						</Button>

						<div className="mt-2">
							<Input
								placeholder="Enter website URL"
								value={urlInput}
								onChange={handleUrlChange}
								onBlur={handleUrlBlur}
								onKeyDown={handleUrlKeyDown}
								className="w-full text-sm"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex items-center justify-between py-1">
							<Label
								htmlFor="include-url"
								className="text-sm cursor-pointer"
							>
								Include URL
							</Label>
							<Checkbox
								id="include-url"
								checked={canvasStore.browserFrameState.showUrl}
								onClick={handleShowUrlToggle}
							/>
						</div>
						<div className="flex items-center justify-between pb-1.5">
							<Label
								htmlFor="include-date"
								className="text-sm cursor-pointer"
							>
								Include Date
							</Label>
							<Checkbox
								id="include-date"
								checked={canvasStore.browserFrameState.showDate}
								onClick={handleShowDateToggle}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
});

export default Browser;
