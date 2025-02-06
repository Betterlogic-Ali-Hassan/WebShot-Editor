import React, { useRef } from 'react';
import { useStore } from '@/stores/storeProvider';
import { handleImageFile } from '@/utils/imageUtils';

interface ToolCardProps {
	icon: React.ReactNode;
	text: string;
	id: number;
	isActive?: boolean;
	onClick?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
	icon,
	text,
	isActive,
	onClick,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { canvasStore } = useStore();

	const handleClick = () => {
		if (text.toLowerCase() === 'image' && fileInputRef.current) {
			fileInputRef.current.click();
		}
		onClick?.();
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const isFirstImage = canvasStore.canvasState.layers.length === 0;

		await handleImageFile(
			file,
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
	};

	return (
		<div
			className={`flex items-center justify-center flex-col gap-3.5 cursor-pointer transition duration-300 h-[68px] w-[68px] rounded-[16px] ${
				isActive
					? 'bg-secondary border-2 border-dotted border-card-border'
					: ''
			}`}
			onClick={handleClick}
		>
			<span className="h-[26%]">{icon}</span>
			<h4 className="text-xs max-w-[59px] truncate h-[26%]">{text}</h4>
			{text.toLowerCase() === 'image' && (
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept="image/*"
					className="hidden"
				/>
			)}
		</div>
	);
};

export default ToolCard;
