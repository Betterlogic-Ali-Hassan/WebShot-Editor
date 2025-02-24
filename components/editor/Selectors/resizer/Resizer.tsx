'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import InputWithBtn from '../../InputWithBtn';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

interface Props {
	handleId: () => void;
}

const Resizer = observer(({ handleId }: Props) => {
	const { canvasStore } = useStore();
	const currentWidth = canvasStore.canvasState.dimensions.width;
	const currentHeight = canvasStore.canvasState.dimensions.height;

	const [width, setWidth] = useState<number>(currentWidth);
	const [height, setHeight] = useState<number>(currentHeight);
	const [aspectRatio, setAspectRatio] = useState(
		currentWidth / currentHeight
	);
	const [isLocked, setIsLocked] = useState(true);

	useEffect(() => {
		setWidth(currentWidth);
		setHeight(currentHeight);
		setAspectRatio(currentWidth / currentHeight);
	}, [currentWidth, currentHeight]);

	const adjustDimension = (
		dimension: 'width' | 'height',
		increment: boolean
	) => {
		const change = increment ? 1 : -1;
		if (dimension === 'width') {
			const newWidth = Math.max(1, width + change);
			setWidth(newWidth);
			if (isLocked) {
				setHeight(Math.round(newWidth / aspectRatio));
			}
		} else {
			const newHeight = Math.max(1, height + change);
			setHeight(newHeight);
			if (isLocked) {
				setWidth(Math.round(newHeight * aspectRatio));
			}
		}
	};

	const handleInputChange = (
		dimension: 'width' | 'height',
		value: number
	) => {
		if (value <= 0) return;

		if (dimension === 'width') {
			setWidth(value);
			if (isLocked) {
				setHeight(Math.round(value / aspectRatio));
			}
		} else {
			setHeight(value);
			if (isLocked) {
				setWidth(Math.round(value * aspectRatio));
			}
		}
	};

	const toggleLock = () => {
		setIsLocked(!isLocked);
		if (!isLocked) {
			setAspectRatio(currentWidth / currentHeight);
			setWidth(currentWidth);
			setHeight(currentHeight);
		}
	};

	const handleResize = () => {
		canvasStore.resizeCanvas(width, height);
		handleId();
	};

	return (
		<div className="flex flex-col gap-3 px-4 py-2">
			<div className="flex gap-4 items-center max-sm:flex-col">
				<div className="space-y-1 flex flex-col">
					<Label className="text-sm font-medium text-foreground">
						Width
					</Label>
					<InputWithBtn
						val={width}
						unit="px"
						decrement={() => adjustDimension('width', false)}
						increment={() => adjustDimension('width', true)}
						onChange={(value: number) =>
							handleInputChange('width', value)
						}
					/>
				</div>
				<div className="space-y-1 flex flex-col">
					<Label className="text-sm font-medium text-foreground">
						Height
					</Label>
					<InputWithBtn
						val={height}
						unit="px"
						decrement={() => adjustDimension('height', false)}
						increment={() => adjustDimension('height', true)}
						onChange={(value: number) =>
							handleInputChange('height', value)
						}
					/>
				</div>
				<div
					className="flex items-center gap-2 mt-2 sm:mt-[28px]"
					onClick={toggleLock}
				>
					<Checkbox id="checkbox" checked={isLocked} />
					<Label htmlFor="checkbox" className="cursor-pointer">
						Proportional
					</Label>
				</div>
				<Button
					onClick={handleResize}
					className="bg-dark text-bg hover:bg-dark/80 mt-4 sm:mt-7 max-sm:w-full"
				>
					Change
				</Button>
			</div>
		</div>
	);
});

export default Resizer;
