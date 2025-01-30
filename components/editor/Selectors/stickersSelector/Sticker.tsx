import { stickers } from '@/constant/stickers';
import { cn } from '@/lib/utils';
import React, { useRef, ReactElement, SVGProps } from 'react';
import Cursor from '../../Cursor';
import { useStore } from '@/stores/storeProvider';
import { handleImageFile } from '@/utils/imageUtils';

interface StickerItem {
	type: 'image';
	src: ReactElement<SVGProps<SVGSVGElement>>;
}

interface Props {
	onClick: (sticker: StickerItem) => void;
	selectedSticker?: StickerItem;
}

const Sticker = ({ onClick, selectedSticker }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { canvasStore } = useStore();

	const handleStickerClick = async (sticker: StickerItem) => {
		onClick(sticker);
		const isFirstImage = canvasStore.canvasState.layers.length === 0;

		try {
			await handleImageFile(
				sticker.src,
				(result) => {
					if (isFirstImage) {
						if (result.initialZoom) {
							canvasStore.setZoom(result.initialZoom);
						}
						if (result.canvasDimensions) {
							canvasStore.setCanvasDimensions(
								result.canvasDimensions.width,
								result.canvasDimensions.height
							);
						}
					}
					canvasStore.addLayer(result.layer);
				},
				isFirstImage
			);
		} catch (error) {
			console.error('Failed to add sticker:', error);
		}
	};

	return (
		<div ref={containerRef}>
			<div className="grid grid-cols-6 gap-2 px-4 max-h-[180px] overflow-y-auto scrollbar">
				{stickers.map((sticker, i) => (
					<div
						key={i}
						className={cn(
							'hover:bg-light cursor-pointer p-2 rounded-md inline-flex items-center justify-center border-2 border-transparent max-sm:w-full',
							selectedSticker === sticker &&
								'border-dotted border-2 border-card-border bg-secondary'
						)}
						onClick={() => handleStickerClick(sticker)}
					>
						{sticker.src}
					</div>
				))}
			</div>

			<Cursor
				selectedIcon={selectedSticker?.src}
				ref={containerRef}
				positionX={28}
				positionY={16}
				className="[&_svg]:h-[22px] [&_svg]:w-[22px]"
			/>
		</div>
	);
};

export default Sticker;
