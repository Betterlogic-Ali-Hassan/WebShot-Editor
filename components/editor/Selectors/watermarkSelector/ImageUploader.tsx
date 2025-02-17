import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
const ImageUploader = observer(() => {
	const { canvasStore } = useStore();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const dataUrl = e.target?.result as string;
				canvasStore.updateWatermarkState({ imageSrc: dataUrl });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleThumbnailClick = () => {
		fileInputRef.current?.click();
	};

	const handleRemoveImage = () => {
		canvasStore.updateWatermarkState({ imageSrc: null });
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className="space-y-4">
			{!canvasStore.watermarkState.imageSrc ? (
				<Button
					variant="outline"
					className="w-full h-24 border-dashed"
					onClick={handleThumbnailClick}
				>
					<div className="flex flex-col items-center gap-2">
						<Upload className="w-5 h-5" />
						<span>Upload Image</span>
					</div>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						className="hidden"
						accept="image/*"
						aria-label="Upload image file"
					/>
				</Button>
			) : (
				<div className="relative h-[150px] w-full flex items-center justify-center">
					<Image
						src={canvasStore.watermarkState.imageSrc}
						alt="Watermark"
						width={150}
						height={150}
						className="w-[150px] h-[150px] object-cover rounded"
					/>
					<button
						onClick={handleRemoveImage}
						className="absolute top-2 right-14 p-1 bg-white rounded-full shadow-lg hover:bg-secondary"
					>
						<X className="w-4 h-4 text-red-500" />
					</button>
				</div>
			)}
		</div>
	);
});

export default ImageUploader;
