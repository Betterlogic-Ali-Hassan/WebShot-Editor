'use client';

import React, { useCallback, useState, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores/storeProvider';
import Canvas from '@/components/editor/Canvas';
import { observer } from 'mobx-react-lite';
import {
	handleImageFile,
	handleImagePaste,
	handleImageDrop,
} from '@/utils/imageUtils';

interface ImageUploaderProps {
	isLoading: boolean;
	onImageUpload: (
		src: string,
		width: number,
		height: number
	) => Promise<void>;
}

const ImageUploader = observer(({ isLoading }: ImageUploaderProps) => {
	const { canvasStore } = useStore();
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [btnLoading, setBtnLoading] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
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
		},
		[canvasStore]
	);

	const urlRegex =
		/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setInputValue(value);

			if (value === '' || urlRegex.test(value)) {
				setError('');
			} else {
				setError('Invalid URL');
			}
		},
		[]
	);

	const handleBtn = () => {
		setBtnLoading(true);
		setTimeout(() => {
			setBtnLoading(false);
			// TODO: Implement URL screenshot capture
		}, 2000);
	};

	return (
		<>
			{canvasStore.canvasState.layers.length > 0 ? (
				<div className="img px-4 sm:px-[70px] flex items-center justify-center">
					<Canvas />
				</div>
			) : (
				<div className="min-h-screen flex items-center">
					<div
						ref={containerRef}
						className="pt-[80px] max-w-[900px] mx-auto w-full px-4"
					>
						<div
							className="p-4 rounded-[16px] border-dashed flex items-center border-2 justify-center flex-col min-h-[420px] w-full"
							onPaste={(
								e: React.ClipboardEvent<HTMLDivElement>
							) => {
								const isFirstImage =
									canvasStore.canvasState.layers.length === 0;
								handleImagePaste(
									e,
									(result) => {
										if (isFirstImage) {
											if (result.initialZoom) {
												canvasStore.setZoom(
													result.initialZoom
												);
											}
											if (result.canvasDimensions) {
												canvasStore.setCanvasDimensions(
													result.canvasDimensions
														.width,
													result.canvasDimensions
														.height
												);
											}
										}
										canvasStore.addLayer(result.layer);
									},
									isFirstImage
								);
							}}
							onDrop={(e: React.DragEvent<HTMLDivElement>) => {
								e.preventDefault();
								const isFirstImage =
									canvasStore.canvasState.layers.length === 0;
								handleImageDrop(
									e,
									(result) => {
										if (isFirstImage) {
											if (result.initialZoom) {
												canvasStore.setZoom(
													result.initialZoom
												);
											}
											if (result.canvasDimensions) {
												canvasStore.setCanvasDimensions(
													result.canvasDimensions
														.width,
													result.canvasDimensions
														.height
												);
											}
										}
										canvasStore.addLayer(result.layer);
									},
									isFirstImage
								);
							}}
							onDragOver={(e) => e.preventDefault()}
						>
							{isLoading ? (
								<Loader2 size={40} className="animate-spin" />
							) : (
								<>
									<h1 className="mb-6 font-semibold text-[30px]">
										Capture Screenshot from URL
									</h1>
									<div className="w-full border rounded-full h-[54px] flex items-center overflow-hidden max-w-[700px]">
										<Input
											placeholder="Enter Website URL e.g., https://example.com"
											className="bg-transparent shadow-none border-none px-4"
											value={inputValue}
											onChange={handleChange}
										/>
										<Button
											className="bg-dark hover:bg-black/90 text-white dark:text-black h-full rounded-l-none font-medium dark:hover:bg-white/90"
											onClick={handleBtn}
										>
											{btnLoading && (
												<Loader2
													size={20}
													className="animate-spin"
												/>
											)}
											Capture Screenshot
										</Button>
									</div>

									<span
										className={cn(
											'text-red-500 mt-1 text-sm opacity-0',
											error && 'opacity-100'
										)}
									>
										{error ? error : 'hy'}
									</span>
									<div className="my-10 mt-8 flex items-center">
										<Separator className="mr-4 w-[200px] bg-border" />
										<span>OR</span>
										<Separator className="ml-4 w-[200px] bg-border" />
									</div>
									<Button
										className="px-10 h-12 rounded-full font-semibold hover:bg-black hover:text-white"
										variant="outline"
										onClick={() =>
											document
												.getElementById('imageUpload')
												?.click()
										}
									>
										Upload Image
									</Button>
									<Input
										type="file"
										id="imageUpload"
										className="hidden"
										accept="image/*"
										onChange={handleFileChange}
									/>
									<p className="text-[13px] mt-2 text-[#888]">
										Or press Ctrl + V to paste an image
										directly.
									</p>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
});

export default ImageUploader;
