import { Stickers } from '@/components/svgs';
import React, { useState, ReactElement, SVGProps } from 'react';
import ToolCard from '../../ToolCard';
import Sticker from './Sticker';
import ToolDropdown from '@/components/ToolDropdown';

interface StickerItem {
	type: 'image';
	src: ReactElement<SVGProps<SVGSVGElement>>;
}

const StickersSelector = () => {
	const [selectedSticker, setSelectedSticker] = useState<StickerItem>();

	const handleSelection = (sticker: StickerItem) => {
		setSelectedSticker(sticker);
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text="Stickers"
					icon={selectedSticker?.src || <Stickers />}
					id={11}
				/>
			}
			content={
				<Sticker
					onClick={handleSelection}
					selectedSticker={selectedSticker}
				/>
			}
			id="num10"
		/>
	);
};

export default StickersSelector;
