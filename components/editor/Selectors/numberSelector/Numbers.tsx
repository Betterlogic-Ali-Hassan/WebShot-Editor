'use client';

import { cn } from '@/lib/utils';
import { useRef } from 'react';
import ColorPicker from '../borderSelector/ColorPicker2';
import Cursor from '../../Cursor';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import { NumberStyle } from '@/types/types';

const Numbers = observer(() => {
	const { canvasStore } = useStore();
	const containerRef = useRef<HTMLDivElement>(null);

	const handleStyleClick = (style: NumberStyle) => {
		canvasStore.setNumberStyle(style);
	};

	const handleColorChange = (color: string) => {
		canvasStore.setNumberColor(color);
	};

	const getDisplayValue = (style: NumberStyle) => {
		return canvasStore.numberState.counters[style];
	};

	const getButtonStyle = (style: NumberStyle) => {
		return canvasStore.numberState.currentStyle === style;
	};

	const getColor = (style: NumberStyle) => {
		return canvasStore.numberState.colors[style];
	};

	return (
		<div ref={containerRef}>
			<div className="flex items-center max-sm:flex-col gap-2 w-full px-4">
				<div
					onClick={() => handleStyleClick('circle')}
					className={cn(
						'flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer border-2 border-transparent text-sm',
						getButtonStyle('circle') &&
							'border-dotted border-card-border bg-secondary'
					)}
				>
					<span
						className="border-[2.4px] rounded-full p-[10px] h-4 w-4 font-bold flex justify-center items-center"
						style={{
							borderColor: getColor('circle'),
							color: getColor('circle'),
						}}
					>
						{getDisplayValue('circle')}
					</span>
					Circled
				</div>

				<div
					onClick={() => handleStyleClick('square')}
					className={cn(
						'flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer border-2 border-transparent text-sm',
						getButtonStyle('square') &&
							'border-dotted border-card-border bg-secondary'
					)}
				>
					<span
						className="border-[2.4px] rounded p-[10px] h-4 w-4 font-bold flex justify-center items-center"
						style={{
							borderColor: getColor('square'),
							color: getColor('square'),
						}}
					>
						{getDisplayValue('square')}
					</span>
					Squared
				</div>

				<div
					onClick={() => handleStyleClick('plain')}
					className={cn(
						'flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer border-2 border-transparent text-sm',
						getButtonStyle('plain') &&
							'border-dotted border-card-border bg-secondary'
					)}
				>
					<span
						className="border-0 w-auto text-lg leading-0 font-semibold mb-1"
						style={{ color: getColor('plain') }}
					>
						{getDisplayValue('plain')}
					</span>
					Plain
				</div>

				<div>
					<ColorPicker
						select
						onColorChange={handleColorChange}
						initialColor={getColor(
							canvasStore.numberState.currentStyle
						)}
					/>
				</div>
			</div>

			<Cursor
				positionX={26}
				positionY={16}
				ref={containerRef}
				selectedColor={getColor(canvasStore.numberState.currentStyle)}
				selectedIcon={
					<span
						className={cn(
							'flex items-center text-base justify-center font-bold h-[22px] p-[9px] w-[22px]',
							canvasStore.numberState.currentStyle === 'circle' &&
								'border-[2.4px] rounded-full',
							canvasStore.numberState.currentStyle === 'square' &&
								'border-[2.4px] rounded-[4px]',
							canvasStore.numberState.currentStyle === 'plain' &&
								'border-0'
						)}
						style={{
							borderColor: getColor(
								canvasStore.numberState.currentStyle
							),
							color: getColor(
								canvasStore.numberState.currentStyle
							),
						}}
					>
						{getDisplayValue(canvasStore.numberState.currentStyle)}
					</span>
				}
			/>
		</div>
	);
});

export default Numbers;
