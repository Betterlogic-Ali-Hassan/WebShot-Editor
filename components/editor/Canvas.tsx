'use client';

import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useCallback } from 'react';
import {
	Layer,
	TransformHandleType,
	TRANSFORM_HANDLE_SIZE,
	SELECTION_BORDER_WIDTH,
	TRANSFORM_HANDLE_HOVER_SIZE,
	DrawingState,
} from '@/types/types';
import { handleImagePaste, handleImageDrop } from '@/utils/imageUtils';
import { drawShape } from '@/utils/shapeUtils';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const Canvas = observer(() => {
	const { canvasStore } = useStore();
	const mainCanvasRef = useRef<HTMLCanvasElement>(null);
	const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
	const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
	const hoveredHandleRef = useRef<TransformHandleType | null>(null);
	const selectedHandleRef = useRef<TransformHandleType | null>(null);
	const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const mainCanvas = mainCanvasRef.current;
		const tempCanvas = document.createElement('canvas');

		if (mainCanvas) {
			tempCanvas.width = mainCanvas.width;
			tempCanvas.height = mainCanvas.height;
			tempCanvasRef.current = tempCanvas;
		}

		return () => {
			tempCanvasRef.current = null;
		};
	}, []);
	const drawPencilLine = useCallback(
		(
			ctx: CanvasRenderingContext2D,
			points: Array<{ x: number; y: number }>
		) => {
			ctx.beginPath();
			ctx.moveTo(points[0].x, points[0].y);
			for (let i = 1; i < points.length; i++) {
				ctx.lineTo(points[i].x, points[i].y);
			}
			ctx.stroke();
		},
		[]
	);

	const drawBrushLine = useCallback(
		(
			ctx: CanvasRenderingContext2D,
			points: Array<{ x: number; y: number }>
		) => {
			ctx.beginPath();
			ctx.moveTo(points[0].x, points[0].y);
			for (let i = 1; i < points.length; i++) {
				ctx.lineTo(points[i].x, points[i].y);
			}
			ctx.stroke();
		},
		[]
	);

	const drawHighlighterLine = useCallback(
		(
			ctx: CanvasRenderingContext2D,
			points: Array<{ x: number; y: number }>
		) => {
			ctx.beginPath();
			ctx.moveTo(points[0].x, points[0].y);
			for (let i = 1; i < points.length; i++) {
				ctx.lineTo(points[i].x, points[i].y);
			}
			ctx.stroke();
		},
		[]
	);

	const drawPreview = useCallback(
		(ctx: CanvasRenderingContext2D, state: DrawingState) => {
			if (state.points.length < 2 || !state.previewBounds) return;

			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = state.color;
			ctx.lineWidth =
				state.lineWidth * (canvasStore.canvasState.zoom / 100);
			ctx.globalAlpha = state.currentTool === 'highlighter' ? 0.3 : 1;

			switch (state.currentTool) {
				case 'pencil':
					ctx.lineJoin = 'round';
					ctx.lineCap = 'round';
					break;
				case 'brush':
					ctx.lineJoin = 'round';
					ctx.lineCap = 'round';
					ctx.shadowBlur = state.lineWidth / 2;
					ctx.shadowColor = state.color;
					break;
				case 'highlighter':
					ctx.lineJoin = 'round';
					ctx.lineCap = 'square';
					break;
			}

			ctx.moveTo(state.points[0].x, state.points[0].y);
			for (let i = 1; i < state.points.length; i++) {
				ctx.lineTo(state.points[i].x, state.points[i].y);
			}
			ctx.stroke();
			ctx.restore();
		},
		[canvasStore.canvasState.zoom]
	);
	const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
		return new Promise((resolve, reject) => {
			if (imageCache.current.has(src)) {
				resolve(imageCache.current.get(src)!);
				return;
			}

			const img = new Image();
			img.onload = () => {
				imageCache.current.set(src, img);
				resolve(img);
			};
			img.onerror = reject;
			img.src = src;
		});
	}, []);

	const drawLayer = useCallback(
		async (ctx: CanvasRenderingContext2D, layer: Layer) => {
			if (!layer.visible) return;

			switch (layer.type) {
				case 'drawing': {
					ctx.save();
					if ('params' in layer && layer.params) {
						const { x, y, width, height, rotation, scale } =
							layer.transform;
						const centerX = x + width / 2;
						const centerY = y + height / 2;

						ctx.translate(centerX, centerY);
						ctx.rotate((rotation * Math.PI) / 180);
						ctx.scale(scale.x, scale.y);
						ctx.translate(-centerX, -centerY);

						ctx.strokeStyle = layer.params.color;
						ctx.lineWidth =
							layer.params.lineWidth *
							(canvasStore.canvasState.zoom / 100);
						ctx.globalAlpha = layer.params.opacity;

						switch (layer.toolType) {
							case 'pencil':
								ctx.lineJoin = 'round';
								ctx.lineCap = 'round';
								drawPencilLine(ctx, layer.points);
								break;
							case 'brush':
								ctx.lineJoin = 'round';
								ctx.lineCap = 'round';
								ctx.shadowBlur = layer.params.lineWidth / 2;
								ctx.shadowColor = layer.params.color;
								drawBrushLine(ctx, layer.points);
								break;
							case 'highlighter':
								ctx.lineJoin = 'round';
								ctx.lineCap = 'square';
								drawHighlighterLine(ctx, layer.points);
								break;
						}
					}
					ctx.restore();
					break;
				}
				case 'image': {
					try {
						const img = await loadImage(layer.src);
						ctx.save();

						const { x, y, width, height, rotation, scale } =
							layer.transform;
						const centerX = x + width / 2;
						const centerY = y + height / 2;

						ctx.translate(centerX, centerY);
						ctx.rotate((rotation * Math.PI) / 180);
						ctx.scale(scale.x, scale.y);
						ctx.globalAlpha = layer.opacity;

						ctx.drawImage(
							img,
							-width / 2,
							-height / 2,
							width,
							height
						);
						ctx.restore();
					} catch (error) {
						console.error('Error drawing image:', error);
					}
					break;
				}
				case 'shape': {
					ctx.save();
					const { x, y, width, height } = layer.transform;
					const { shapeType, strokeColor, strokeWidth } = layer;

					drawShape({
						ctx,
						x,
						y,
						width,
						height,
						strokeColor,
						strokeWidth,
						shapeType,
					});

					ctx.restore();
					break;
				}
				case 'drawing': {
					ctx.save();
					if ('params' in layer && layer.params) {
						ctx.strokeStyle = layer.params.color;
						ctx.lineWidth =
							layer.params.lineWidth *
							(canvasStore.canvasState.zoom / 100);
						ctx.globalAlpha = layer.params.opacity;

						switch (layer.toolType) {
							case 'pencil':
								drawPencilLine(ctx, layer.points);
								break;
							case 'brush':
								ctx.lineJoin = 'round';
								ctx.lineCap = 'round';
								ctx.shadowBlur = layer.params.lineWidth / 2;
								ctx.shadowColor = layer.params.color;
								drawBrushLine(ctx, layer.points);
								break;
							case 'highlighter':
								ctx.lineJoin = 'round';
								ctx.lineCap = 'square';
								drawHighlighterLine(ctx, layer.points);
								break;
						}
					}
					ctx.restore();
					break;
				}
			}
		},
		[
			loadImage,
			canvasStore.canvasState.zoom,
			drawPencilLine,
			drawBrushLine,
			drawHighlighterLine,
			canvasStore.canvasState.layers,
		]
	);

	const checkLayerTransparency = useCallback(
		async (
			x: number,
			y: number,
			layer: Layer,
			tempCanvas: HTMLCanvasElement,
			tempCtx: CanvasRenderingContext2D
		): Promise<boolean> => {
			tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

			await drawLayer(tempCtx, layer);

			for (let radius = 1; radius <= 8; radius++) {
				const checkPoints: Array<[number, number]> = [];

				let px = radius;
				let py = 0;
				let err = 0;

				while (px >= py) {
					checkPoints.push(
						[x + px, y + py],
						[x + py, y + px],
						[x - py, y + px],
						[x - px, y + py],
						[x - px, y - py],
						[x - py, y - px],
						[x + py, y - px],
						[x + px, y - py]
					);

					if (err <= 0) {
						py += 1;
						err += 2 * py + 1;
					}
					if (err > 0) {
						px -= 1;
						err -= 2 * px + 1;
					}
				}

				for (const [pointX, pointY] of checkPoints) {
					if (
						pointX < 0 ||
						pointX >= tempCanvas.width ||
						pointY < 0 ||
						pointY >= tempCanvas.height
					) {
						continue;
					}

					const pixelData = tempCtx.getImageData(
						pointX,
						pointY,
						1,
						1
					).data;
					if (pixelData[3] > 0) {
						return true;
					}
				}
			}

			return false;
		},
		[drawLayer]
	);
	const renderLayers = useCallback(async () => {
		const mainCanvas = mainCanvasRef.current;
		const ctx = mainCanvas?.getContext('2d');
		if (!mainCanvas || !ctx) return;

		ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

		for (const layer of canvasStore.canvasState.layers) {
			await drawLayer(ctx, layer);
		}
	}, [canvasStore.canvasState.layers, drawLayer]);

	const getCanvasCoordinates = useCallback((e: React.MouseEvent) => {
		const canvas = e.currentTarget as HTMLCanvasElement;
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		return {
			x: (e.clientX - rect.left) * scaleX,
			y: (e.clientY - rect.top) * scaleY,
		};
	}, []);

	const isPointInLayer = useCallback((x: number, y: number, layer: Layer) => {
		const { transform } = layer;
		const { x: layerX, y: layerY, width, height } = transform;

		if (layer.type === 'drawing') {
			return (
				x >= layerX &&
				x <= layerX + width &&
				y >= layerY &&
				y <= layerY + height
			);
		}

		return (
			x >= layerX &&
			x <= layerX + width &&
			y >= layerY &&
			y <= layerY + height
		);
	}, []);

	const drawSelection = useCallback(
		(ctx: CanvasRenderingContext2D, layer: Layer) => {
			if (canvasStore.canvasState.layers.indexOf(layer) === 0) return;

			const { x, y, width, height } = layer.transform;
			const scale = canvasStore.canvasState.zoom / 100;

			ctx.save();

			ctx.strokeStyle = '#0088ff';
			ctx.lineWidth = SELECTION_BORDER_WIDTH;
			ctx.strokeRect(x, y, width, height);

			const handlePositions = [
				{ type: 'topLeft', x, y },
				{ type: 'topCenter', x: x + width / 2, y },
				{ type: 'topRight', x: x + width, y },
				{ type: 'middleLeft', x, y: y + height / 2 },
				{ type: 'middleRight', x: x + width, y: y + height / 2 },
				{ type: 'bottomLeft', x, y: y + height },
				{ type: 'bottomCenter', x: x + width / 2, y: y + height },
				{ type: 'bottomRight', x: x + width, y: y + height },
			];

			handlePositions.forEach((handle) => {
				const isHovered = hoveredHandleRef.current === handle.type;
				const isSelected = selectedHandleRef.current === handle.type;
				const handleSize =
					(isHovered
						? TRANSFORM_HANDLE_HOVER_SIZE
						: TRANSFORM_HANDLE_SIZE) * scale;

				ctx.beginPath();
				ctx.fillStyle = isSelected ? '#ff0000' : '#fff';
				ctx.strokeStyle = '#0088ff';
				ctx.lineWidth = 1;

				const isCorner = [
					'topLeft',
					'topRight',
					'bottomLeft',
					'bottomRight',
				].includes(handle.type);
				if (isCorner) {
					ctx.arc(handle.x, handle.y, handleSize / 2, 0, Math.PI * 2);
				} else {
					ctx.rect(
						handle.x - handleSize / 2,
						handle.y - handleSize / 2,
						handleSize,
						handleSize
					);
				}

				ctx.fill();
				ctx.stroke();
			});

			ctx.restore();
		},
		[canvasStore.canvasState.zoom, canvasStore.canvasState.layers]
	);
	useOutsideClick(mainCanvasRef, () => {
		canvasStore.resetTool();
	});

	const handleMouseDown = useCallback(
		async (e: React.MouseEvent) => {
			const coords = getCanvasCoordinates(e);
			if (!coords) return;

			// Handle drawing tools
			if (canvasStore.currentTool === 'draw') {
				canvasStore.startDrawing(coords.x, coords.y);
				return;
			}

			if (canvasStore.currentTool === 'shape') {
				canvasStore.startShapeDrawing(coords.x, coords.y);
				return;
			}

			// Handle transform handles
			const clickedHandle = (() => {
				const selectedLayer = canvasStore.getSelectedLayer();
				if (!selectedLayer) return null;
				if (canvasStore.canvasState.layers.indexOf(selectedLayer) === 0)
					return null;

				const { x, y, width, height } = selectedLayer.transform;
				const handlePositions = [
					{ type: 'topLeft', x, y },
					{ type: 'topCenter', x: x + width / 2, y },
					{ type: 'topRight', x: x + width, y },
					{ type: 'middleLeft', x, y: y + height / 2 },
					{ type: 'middleRight', x: x + width, y: y + height / 2 },
					{ type: 'bottomLeft', x, y: y + height },
					{ type: 'bottomCenter', x: x + width / 2, y: y + height },
					{ type: 'bottomRight', x: x + width, y: y + height },
				];

				return handlePositions.find(
					(handle) =>
						Math.abs(coords.x - handle.x) <=
							TRANSFORM_HANDLE_SIZE / 2 &&
						Math.abs(coords.y - handle.y) <=
							TRANSFORM_HANDLE_SIZE / 2
				);
			})();

			if (clickedHandle) {
				selectedHandleRef.current =
					clickedHandle.type as TransformHandleType;
			} else {
				selectedHandleRef.current = null;

				const tempCanvas = tempCanvasRef.current;
				const tempCtx = tempCanvas?.getContext('2d');

				if (!tempCanvas || !tempCtx) return;

				const layers = [...canvasStore.canvasState.layers].reverse();

				for (let i = 0; i < layers.length; i++) {
					const layer = layers[i];

					if (i === layers.length - 1) continue;

					if (isPointInLayer(coords.x, coords.y, layer)) {
						try {
							const isNotTransparent =
								await checkLayerTransparency(
									coords.x,
									coords.y,
									layer,
									tempCanvas,
									tempCtx
								);

							if (isNotTransparent) {
								canvasStore.selectLayer(layer.id);
								canvasStore.startDragging(coords.x, coords.y);
								return;
							}
						} catch (error) {
							console.error(
								'Error checking layer transparency:',
								error
							);
						}
					}
				}

				canvasStore.clearSelection();
				canvasStore.stopDragging();
			}
		},
		[
			canvasStore,
			getCanvasCoordinates,
			isPointInLayer,
			checkLayerTransparency,
		]
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			const coords = getCanvasCoordinates(e);
			if (!coords) return;

			if (canvasStore.drawingState.isDrawing) {
				canvasStore.updateDrawing(coords.x, coords.y);

				const overlayCanvas = overlayCanvasRef.current;
				const ctx = overlayCanvas?.getContext('2d');
				if (overlayCanvas && ctx) {
					if (canvasStore.drawingState.previewBounds) {
						const bounds = canvasStore.drawingState.previewBounds;
						const padding =
							canvasStore.drawingState.currentTool ===
							'highlighter'
								? 10
								: 5;
						ctx.clearRect(
							bounds.x - padding,
							bounds.y - padding,
							bounds.width + padding * 2,
							bounds.height + padding * 2
						);
					}
					drawPreview(ctx, canvasStore.drawingState);
				}
				return;
			}

			const selectedLayer = canvasStore.getSelectedLayer();
			if (
				selectedLayer &&
				canvasStore.canvasState.layers.indexOf(selectedLayer) === 0
			)
				return;

			if (
				canvasStore.currentTool === 'shape' &&
				canvasStore.shapeDrawingState.isDrawing
			) {
				canvasStore.updateShapeDrawing(coords.x, coords.y);

				const overlayCanvas = overlayCanvasRef.current;
				const ctx = overlayCanvas?.getContext('2d');
				if (overlayCanvas && ctx) {
					ctx.clearRect(
						0,
						0,
						overlayCanvas.width,
						overlayCanvas.height
					);

					const startPoint = canvasStore.shapeDrawingState.startPoint;
					if (startPoint) {
						const x = Math.min(startPoint.x, coords.x);
						const y = Math.min(startPoint.y, coords.y);
						const width = Math.abs(coords.x - startPoint.x);
						const height = Math.abs(coords.y - startPoint.y);

						drawShape({
							ctx,
							x,
							y,
							width,
							height,
							strokeColor:
								canvasStore.shapeDrawingState.strokeColor,
							strokeWidth:
								canvasStore.shapeDrawingState.strokeWidth,
							shapeType: canvasStore.shapeDrawingState.shapeType,
						});
					}
				}
				return;
			}

			if (
				canvasStore.dragState.isDragging &&
				!selectedHandleRef.current
			) {
				canvasStore.updateDragPosition(coords.x, coords.y);
				const overlayCanvas = overlayCanvasRef.current;
				const ctx = overlayCanvas?.getContext('2d');
				if (overlayCanvas && ctx) {
					ctx.clearRect(
						0,
						0,
						overlayCanvas.width,
						overlayCanvas.height
					);
					const selectedLayer = canvasStore.getSelectedLayer();
					if (selectedLayer) {
						drawSelection(ctx, selectedLayer);
					}
				}
			} else if (selectedHandleRef.current) {
				const selectedLayer = canvasStore.getSelectedLayer();
				if (!selectedLayer) return;

				const { x, y, width, height } = selectedLayer.transform;

				switch (selectedHandleRef.current) {
					case 'topLeft':
					case 'topRight':
					case 'bottomLeft':
					case 'bottomRight': {
						let newWidth = width;
						let newHeight = height;
						const aspectRatio = width / height;

						if (selectedHandleRef.current === 'topLeft') {
							newWidth = Math.abs(coords.x - (x + width));
							newHeight = newWidth / aspectRatio;
							selectedLayer.transform.x = x + width - newWidth;
							selectedLayer.transform.y = y + height - newHeight;
						} else if (selectedHandleRef.current === 'topRight') {
							newWidth = Math.abs(coords.x - x);
							newHeight = newWidth / aspectRatio;
							selectedLayer.transform.y = y + height - newHeight;
						} else if (selectedHandleRef.current === 'bottomLeft') {
							newWidth = Math.abs(coords.x - (x + width));
							newHeight = newWidth / aspectRatio;
							selectedLayer.transform.x = x + width - newWidth;
						} else if (
							selectedHandleRef.current === 'bottomRight'
						) {
							newWidth = Math.abs(coords.x - x);
							newHeight = newWidth / aspectRatio;
						}

						selectedLayer.transform.width = newWidth;
						selectedLayer.transform.height = newHeight;
						break;
					}
					case 'middleLeft': {
						const newWidth = Math.abs(coords.x - (x + width));
						selectedLayer.transform.x = x + width - newWidth;
						selectedLayer.transform.width = newWidth;
						break;
					}
					case 'middleRight': {
						selectedLayer.transform.width = Math.abs(coords.x - x);
						break;
					}
					case 'topCenter': {
						const newHeight = Math.abs(coords.y - (y + height));
						selectedLayer.transform.y = y + height - newHeight;
						selectedLayer.transform.height = newHeight;
						break;
					}
					case 'bottomCenter': {
						selectedLayer.transform.height = Math.abs(coords.y - y);
						break;
					}
				}

				const overlayCanvas = overlayCanvasRef.current;
				const ctx = overlayCanvas?.getContext('2d');
				if (ctx) {
					ctx.clearRect(
						0,
						0,
						overlayCanvas?.width || 0,
						overlayCanvas?.height || 0
					);
					drawSelection(ctx, selectedLayer);
				}
				renderLayers();
			}
		},
		[
			canvasStore,
			getCanvasCoordinates,
			drawPreview,
			drawSelection,
			renderLayers,
		]
	);
	const handleMouseUp = useCallback(() => {
		if (canvasStore.drawingState.isDrawing) {
			canvasStore.finishDrawing();

			const overlayCanvas = overlayCanvasRef.current;
			const ctx = overlayCanvas?.getContext('2d');
			if (
				overlayCanvas &&
				ctx &&
				canvasStore.drawingState.previewBounds
			) {
				const bounds = canvasStore.drawingState.previewBounds;
				const padding =
					canvasStore.drawingState.currentTool === 'highlighter'
						? 10
						: 5;
				ctx.clearRect(
					bounds.x - padding,
					bounds.y - padding,
					bounds.width + padding * 2,
					bounds.height + padding * 2
				);
			}
			return;
		}

		if (
			canvasStore.currentTool === 'shape' &&
			canvasStore.shapeDrawingState.isDrawing
		) {
			canvasStore.finishShapeDrawing();

			const overlayCanvas = overlayCanvasRef.current;
			const ctx = overlayCanvas?.getContext('2d');
			if (overlayCanvas && ctx) {
				ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
			}
			return;
		}

		if (canvasStore.dragState.isDragging) {
			canvasStore.endDragging();
		}

		selectedHandleRef.current = null;
	}, [canvasStore]);

	useEffect(() => {
		const mainCanvas = mainCanvasRef.current;
		const overlayCanvas = overlayCanvasRef.current;
		if (!mainCanvas || !overlayCanvas) return;

		const updateCanvasSize = () => {
			const { width, height } = canvasStore.canvasState.dimensions;
			mainCanvas.width = width;
			mainCanvas.height = height;
			overlayCanvas.width = width;
			overlayCanvas.height = height;

			if (!bufferCanvasRef.current) {
				bufferCanvasRef.current = document.createElement('canvas');
				bufferCanvasRef.current.width = width;
				bufferCanvasRef.current.height = height;
			}

			if (tempCanvasRef.current) {
				tempCanvasRef.current.width = width;
				tempCanvasRef.current.height = height;
			}
		};

		updateCanvasSize();
		renderLayers();
	}, [canvasStore.canvasState.dimensions, renderLayers]);

	useEffect(() => {
		renderLayers();
	}, [canvasStore.canvasState.layers, renderLayers]);

	useEffect(() => {
		const overlayCanvas = overlayCanvasRef.current;
		const ctx = overlayCanvas?.getContext('2d');
		if (!overlayCanvas || !ctx) return;

		ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

		const selectedLayer = canvasStore.getSelectedLayer();
		if (
			selectedLayer &&
			canvasStore.canvasState.layers.indexOf(selectedLayer) !== 0
		) {
			drawSelection(ctx, selectedLayer);
		}
	}, [canvasStore, canvasStore.canvasState.selectedLayerIds, drawSelection]);
	const containerStyle: React.CSSProperties = {
		width: '100%',
		height: '100vh',
		overflow: 'hidden',
		backgroundColor: '#f3f4f6',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	};

	const canvasStyle: React.CSSProperties = {
		position: 'absolute',
		maxWidth: '100%',
		maxHeight: '100%',
		transformOrigin: 'center center',
		transform: `scale(${canvasStore.canvasState.zoom / 100})`,
		willChange: 'transform',
		imageRendering: 'pixelated' as const,
	};

	return (
		<div
			style={containerStyle}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				e.preventDefault();
				const isFirstImage =
					canvasStore.canvasState.layers.length === 0;
				handleImageDrop(
					e.nativeEvent,
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
			}}
			onPaste={(e) => {
				const isFirstImage =
					canvasStore.canvasState.layers.length === 0;
				handleImagePaste(
					e.nativeEvent,
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
			}}
		>
			<canvas
				ref={mainCanvasRef}
				style={canvasStyle}
				onMouseDown={(e) => {
					e.preventDefault();
					handleMouseDown(e).catch(console.error);
				}}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			/>
			<canvas
				ref={overlayCanvasRef}
				style={{
					...canvasStyle,
					pointerEvents: 'none',
				}}
			/>
		</div>
	);
});

export default Canvas;
