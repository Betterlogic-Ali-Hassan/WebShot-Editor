import { Layer } from '@/types/types';
import { ReactElement, SVGProps } from 'react';
import { renderToString } from 'react-dom/server';

type SVGComponent = ReactElement<SVGProps<SVGSVGElement>>;

interface ImageLayerCreateResult {
	layer: Layer;
	initialZoom?: number;
	canvasDimensions?: { width: number; height: number };
}

export const calculateImageScale = (
	imageWidth: number,
	imageHeight: number
): number => {
	const viewportWidth = window.innerWidth - 40;
	const headerHeight = 80;
	const viewportHeight = window.innerHeight - headerHeight - 40;

	const widthScale = viewportWidth / imageWidth;
	const heightScale = viewportHeight / imageHeight;

	return Math.min(widthScale, heightScale);
};

export const createImageLayer = (
	file: File | null,
	src: string,
	width: number,
	height: number,
	scale: number,
	isFirst: boolean = false
): ImageLayerCreateResult => {
	const zoomPercent = scale * 100;
	const isSticker = !file;

	const layerWidth = isSticker ? width * 2 : width;
	const layerHeight = isSticker ? height * 2 : height;

	return {
		layer: {
			id: crypto.randomUUID(),
			type: 'image' as const,
			name: file?.name || 'Image Layer',
			visible: true,
			locked: false,
			opacity: 1,
			src,
			originalSize: { width, height },
			filters: [],
			transform: {
				x: 0,
				y: 0,
				width: layerWidth,
				height: layerHeight,
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
		},
		...(isFirst
			? {
					initialZoom: zoomPercent,
					canvasDimensions: { width, height },
			  }
			: {}),
	};
};

export const handleImageFile = (
	input: File | SVGComponent,
	onLayerCreate: (result: ImageLayerCreateResult) => void,
	isFirst: boolean = false
): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (input instanceof File) {
			handleFileImage(input, onLayerCreate, isFirst, resolve, reject);
			return;
		}

		handleSvgComponent(input, onLayerCreate, isFirst, resolve, reject);
	});
};

const handleFileImage = (
	file: File,
	onLayerCreate: (result: ImageLayerCreateResult) => void,
	isFirst: boolean,
	resolve: () => void,
	reject: (reason: Error) => void
) => {
	const reader = new FileReader();
	reader.onload = (e) => {
		const src = e.target?.result as string;
		loadImage(src, file, onLayerCreate, isFirst, resolve, reject);
	};
	// reader.onerror = (event) => reject(new Error('Failed to read file'));
	reader.readAsDataURL(file);
};

const handleSvgComponent = (
	svg: SVGComponent,
	onLayerCreate: (result: ImageLayerCreateResult) => void,
	isFirst: boolean,
	resolve: () => void,
	reject: (reason: Error) => void
) => {
	try {
		const svgString = renderToString(svg);
		const blob = new Blob([svgString], { type: 'image/svg+xml' });
		const src = URL.createObjectURL(blob);
		loadImage(src, null, onLayerCreate, isFirst, resolve, reject);
	} catch (error) {
		reject(
			error instanceof Error ? error : new Error('Failed to process SVG')
		);
	}
};

const loadImage = (
	src: string,
	file: File | null,
	onLayerCreate: (result: ImageLayerCreateResult) => void,
	isFirst: boolean,
	resolve: () => void,
	reject: (reason: Error) => void
) => {
	const img = new Image();
	img.onload = () => {
		const scale = calculateImageScale(img.width, img.height);
		const result = createImageLayer(
			file,
			src,
			img.width,
			img.height,
			scale,
			isFirst
		);
		onLayerCreate(result);
		resolve();
	};
	img.onerror = () => {
		reject(new Error('Failed to load image'));
	};
	img.src = src;
};

export const handleImagePaste = (
	event: React.ClipboardEvent<HTMLDivElement>,
	onLayerCreate: (result: ImageLayerCreateResult) => void,
	isFirst: boolean = false
): void => {
	const items = event.clipboardData?.items;
	if (!items) return;

	for (const item of Array.from(items)) {
		if (item.type.indexOf('image') !== -1) {
			const file = item.getAsFile();
			if (!file) continue;

			handleImageFile(file, onLayerCreate, isFirst).catch(console.error);
		}
	}
};

export const handleImageDrop = (
	event: React.DragEvent<HTMLDivElement>,
	onLayerCreate: (result: ImageLayerCreateResult) => void,
	isFirst: boolean = false
): void => {
	const items = event.dataTransfer?.items;
	if (!items) return;

	for (const item of Array.from(items)) {
		if (item.type.indexOf('image') !== -1) {
			const file = item.getAsFile();
			if (!file) continue;

			handleImageFile(file, onLayerCreate, isFirst).catch(console.error);
		}
	}
};
