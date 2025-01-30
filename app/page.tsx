'use client';
import Editor from '@/components/editor/Editor';
import ImageUploader from '@/components/imageUploader/ImageUploader';
import RevisionCard from '@/components/RevisionCard';
import { PopoverProvider } from '@/context/PopOverContext';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const Page = observer(() => {
	const { canvasStore } = useStore();
	const [isLoading, setIsLoading] = useState(false);

	const handleImageUpload = async (
		src: string,
		width: number,
		height: number
	) => {
		setIsLoading(true);

		try {
			const newLayer = {
				id: crypto.randomUUID(),
				type: 'image' as const,
				name: 'Uploaded Image',
				visible: true,
				locked: false,
				opacity: 1,
				src,
				originalSize: { width, height },
				filters: [],
				transform: {
					x: width / 2,
					y: height / 2,
					width,
					height,
					rotation: 0,
					scale: { x: 1, y: 1 },
				},
			};

			await new Promise((resolve) => setTimeout(resolve, 2000));

			canvasStore.addLayer(newLayer);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<PopoverProvider>
				<Editor />
			</PopoverProvider>
			<ImageUploader
				isLoading={isLoading}
				onImageUpload={handleImageUpload}
			/>
			<RevisionCard />
		</>
	);
});

export default Page;
