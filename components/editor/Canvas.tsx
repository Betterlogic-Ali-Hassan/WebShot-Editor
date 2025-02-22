'use client';

import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useCallback, useState } from 'react';
import {
	Layer,
	TransformHandleType,
	TRANSFORM_HANDLE_SIZE,
	SELECTION_BORDER_WIDTH,
	TRANSFORM_HANDLE_HOVER_SIZE,
	DrawingState,
	ArrowDrawingState,
	ARROW_HEAD_SIZE,
	Point,
} from '@/types/types';
import { handleImagePaste, handleImageDrop } from '@/utils/imageUtils';
import { drawShape } from '@/utils/shapeUtils';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import TextInput from '@/components/editor/TextInput/TextInput';
import { drawArrow } from '@/utils/arrowUtils';
const Canvas = observer(() => {
	const { canvasStore } = useStore();
	const mainCanvasRef = useRef<HTMLCanvasElement>(null);
	const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
	const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
	const hoveredHandleRef = useRef<TransformHandleType | null>(null);
	const selectedHandleRef = useRef<TransformHandleType | null>(null);
	const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const [textInputPosition, setTextInputPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
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
		(
			ctx: CanvasRenderingContext2D,
			state: DrawingState | ArrowDrawingState
		) => {
			if ('points' in state) {
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
			} else {
				const arrowState = state as ArrowDrawingState;
				if (
					!arrowState.startPoint ||
					!arrowState.endPoint ||
					!arrowState.previewBounds
				)
					return;

				const bounds = arrowState.previewBounds;
				const padding =
					Math.max(arrowState.strokeWidth, ARROW_HEAD_SIZE) + 2;
				ctx.clearRect(
					bounds.x - padding,
					bounds.y - padding,
					bounds.width + padding * 2,
					bounds.height + padding * 2
				);

				ctx.save();
				const zoom = canvasStore.canvasState.zoom / 100;
				const scaledStrokeWidth = arrowState.strokeWidth * zoom;

				drawArrow(
					ctx,
					arrowState.startPoint,
					arrowState.endPoint,
					arrowState.controlPoints,
					arrowState.arrowType,
					arrowState.strokeColor,
					scaledStrokeWidth
				);
				ctx.restore();
			}
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
				case 'number': {
					ctx.save();
					const { x, y, width, height, scale } = layer.transform;
					const centerX = x + width / 2;
					const centerY = y + height / 2;

					ctx.translate(centerX, centerY);
					ctx.scale(scale.x, scale.y);
					ctx.translate(-centerX, -centerY);

					ctx.fillStyle = layer.color;
					ctx.strokeStyle = layer.color;
					ctx.lineWidth = 2;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.font = `${layer.fontSize}px Arial`;

					switch (layer.style) {
						case 'circle': {
							ctx.beginPath();
							ctx.arc(
								centerX,
								centerY,
								width / 2 - 2,
								0,
								Math.PI * 2
							);
							ctx.stroke();
							break;
						}
						case 'square': {
							ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);
							break;
						}
						case 'plain': {
							break;
						}
					}

					ctx.fillText(layer.value.toString(), centerX, centerY);

					ctx.restore();
					break;
				}
				case 'text': {
					ctx.save();
					const { x, y, width, height, rotation, scale } =
						layer.transform;
					const centerX = x + width / 2;
					const centerY = y + height / 2;

					// Устанавливаем трансформации
					ctx.translate(centerX, centerY);
					ctx.rotate((rotation * Math.PI) / 180);
					ctx.scale(scale.x, scale.y);
					ctx.translate(-centerX, -centerY);

					// Отрисовка фона
					if (layer.backgroundColor) {
						console.log(
							'Drawing background with color:',
							layer.backgroundColor
						); // debug
						ctx.fillStyle = layer.backgroundColor;
						ctx.fillRect(x, y, width, height);
					}

					// Установка стилей текста
					ctx.font = `${layer.bold ? 'bold ' : ''}${
						layer.italic ? 'italic ' : ''
					}${layer.fontSize}px ${layer.fontFamily}`;
					ctx.fillStyle = layer.color;
					ctx.textAlign = layer.alignment;
					ctx.textBaseline = 'top';

					const metrics = ctx.measureText(layer.content);
					const textWidth = metrics.width;
					const textHeight = layer.fontSize * 1.2;

					if (width < textWidth) {
						layer.transform.width = textWidth;
					}
					if (height < textHeight) {
						layer.transform.height = textHeight;
					}

					ctx.fillStyle = layer.color;
					ctx.fillText(layer.content, x, y);

					ctx.restore();
					break;
				}
				case 'arrow': {
					ctx.save();
					const zoom = canvasStore.canvasState.zoom / 100;

					const { x: layerX, y: layerY } = layer.transform;

					const startPoint = {
						x: layerX + layer.startPoint.x,
						y: layerY + layer.startPoint.y,
					};

					const endPoint = {
						x: layerX + layer.endPoint.x,
						y: layerY + layer.endPoint.y,
					};

					const controlPoints = layer.controlPoints.map((point) => ({
						x: layerX + point.x,
						y: layerY + point.y,
					}));

					if (
						layer.transform.rotation !== 0 ||
						layer.transform.scale.x !== 1 ||
						layer.transform.scale.y !== 1
					) {
						const centerX = layerX + layer.transform.width / 2;
						const centerY = layerY + layer.transform.height / 2;

						ctx.translate(centerX, centerY);
						ctx.rotate((layer.transform.rotation * Math.PI) / 180);
						ctx.scale(
							layer.transform.scale.x,
							layer.transform.scale.y
						);
						ctx.translate(-centerX, -centerY);
					}

					const scaledStrokeWidth = layer.strokeWidth * zoom;

					drawArrow(
						ctx,
						startPoint,
						endPoint,
						controlPoints,
						layer.arrowType,
						layer.strokeColor,
						scaledStrokeWidth
					);

					ctx.restore();
					break;
				}
				case 'blur': {
					ctx.save();
					const { x, y, width, height } = layer.transform;

					if (width <= 0 || height <= 0) {
						ctx.restore();
						break;
					}

					const tempCanvas = document.createElement('canvas');
					tempCanvas.width = width;
					tempCanvas.height = height;
					const tempCtx = tempCanvas.getContext('2d');

					if (tempCtx) {
						tempCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
						tempCtx.fillRect(0, 0, width, height);

						tempCtx.drawImage(
							ctx.canvas,
							x,
							y,
							width,
							height,
							0,
							0,
							width,
							height
						);

						const blurCanvas = document.createElement('canvas');
						blurCanvas.width = width;
						blurCanvas.height = height;
						const blurCtx = blurCanvas.getContext('2d');

						if (blurCtx) {
							blurCtx.drawImage(tempCanvas, 0, 0);

							blurCtx.filter = `blur(${layer.blurRadius}px)`;
							blurCtx.drawImage(blurCanvas, 0, 0);

							ctx.drawImage(blurCanvas, x, y);
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
		]
	);
	const handleTextFinish = useCallback(() => {
		canvasStore.finishTextEditing();
		setTextInputPosition(null);
	}, [canvasStore]);
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

		await canvasStore.renderWatermark(ctx);
	}, [drawLayer, canvasStore]);

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

			const scale = canvasStore.canvasState.zoom / 100;
			const handleSize = TRANSFORM_HANDLE_SIZE * scale;

			ctx.save();
			ctx.strokeStyle = '#0088ff';
			ctx.lineWidth = SELECTION_BORDER_WIDTH;

			if (layer.type === 'arrow') {
				const bounds = layer.transform;
				ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);

				const transformHandlePoints: Array<{
					type: TransformHandleType;
					point: Point;
				}> = [
					{
						type: 'start',
						point: {
							x: layer.transform.x + layer.startPoint.x,
							y: layer.transform.y + layer.startPoint.y,
						},
					},
					{
						type: 'end',
						point: {
							x: layer.transform.x + layer.endPoint.x,
							y: layer.transform.y + layer.endPoint.y,
						},
					},
				];

				if (
					layer.arrowType === 'curved' ||
					layer.arrowType === 'curvedLine'
				) {
					layer.controlPoints.forEach((point, index) => {
						transformHandlePoints.push({
							type:
								index === 0
									? 'control1'
									: ('control2' as TransformHandleType),
							point: {
								x: layer.transform.x + point.x,
								y: layer.transform.y + point.y,
							},
						});
					});
				}

				transformHandlePoints.forEach(({ type, point }) => {
					const isHovered = hoveredHandleRef.current === type;
					const isSelected = selectedHandleRef.current === type;
					const handleSizeWithHover = isHovered
						? TRANSFORM_HANDLE_HOVER_SIZE * scale
						: handleSize;

					ctx.beginPath();
					ctx.fillStyle = isSelected ? '#ff0000' : '#fff';
					ctx.strokeStyle = '#0088ff';
					ctx.lineWidth = 1;

					if (type === 'start' || type === 'end') {
						ctx.arc(
							point.x,
							point.y,
							handleSizeWithHover / 2,
							0,
							Math.PI * 2
						);
					} else {
						const halfSize = handleSizeWithHover / 2;
						ctx.rect(
							point.x - halfSize,
							point.y - halfSize,
							handleSizeWithHover,
							handleSizeWithHover
						);
					}

					ctx.fill();
					ctx.stroke();
				});
			} else {
				const { x, y, width, height } = layer.transform;
				ctx.strokeRect(x, y, width, height);

				const handlePositions: Array<{
					type: TransformHandleType;
					x: number;
					y: number;
				}> = [
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
					const isSelected =
						selectedHandleRef.current === handle.type;
					const handleSizeWithHover = isHovered
						? TRANSFORM_HANDLE_HOVER_SIZE * scale
						: handleSize;

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
						ctx.arc(
							handle.x,
							handle.y,
							handleSizeWithHover / 2,
							0,
							Math.PI * 2
						);
					} else {
						ctx.rect(
							handle.x - handleSizeWithHover / 2,
							handle.y - handleSizeWithHover / 2,
							handleSizeWithHover,
							handleSizeWithHover
						);
					}

					ctx.fill();
					ctx.stroke();
				});
			}

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

			if (canvasStore.currentTool === 'arrow') {
				canvasStore.startArrowDrawing(coords.x, coords.y);
				return;
			}

			if (canvasStore.currentTool === 'text') {
				const transform = canvasStore.startTextEditing(
					coords.x,
					coords.y
				);
				if (transform) {
					const scale = canvasStore.canvasState.zoom / 100;
					const rect = (
						e.target as HTMLElement
					).getBoundingClientRect();
					setTextInputPosition({
						x: (e.clientX - rect.left) / scale,
						y: (e.clientY - rect.top) / scale,
					});
				}
				return;
			}

			if (canvasStore.currentTool === 'draw') {
				canvasStore.startDrawing(coords.x, coords.y);
				return;
			}

			if (canvasStore.currentTool === 'shape') {
				canvasStore.startShapeDrawing(coords.x, coords.y);
				return;
			}

			if (canvasStore.currentTool === 'number') {
				const numberLayer = canvasStore.createNumberLayer(
					coords.x - 20,
					coords.y - 20
				);
				canvasStore.selectLayer(numberLayer.id);
				return;
			}
			if (canvasStore.currentTool === 'blur') {
				canvasStore.startBlurDrawing(coords.x, coords.y);
				return;
			}
			const clickedHandle = (() => {
				const selectedLayer = canvasStore.getSelectedLayer();
				if (!selectedLayer) return null;
				if (canvasStore.canvasState.layers.indexOf(selectedLayer) === 0)
					return null;

				const scale = canvasStore.canvasState.zoom / 100;
				const handleSize = TRANSFORM_HANDLE_SIZE * scale;

				if (selectedLayer.type === 'arrow') {
					const startPoint = {
						x:
							selectedLayer.transform.x +
							selectedLayer.startPoint.x,
						y:
							selectedLayer.transform.y +
							selectedLayer.startPoint.y,
					};
					const endPoint = {
						x: selectedLayer.transform.x + selectedLayer.endPoint.x,
						y: selectedLayer.transform.y + selectedLayer.endPoint.y,
					};

					if (
						Math.abs(coords.x - startPoint.x) <= handleSize / 2 &&
						Math.abs(coords.y - startPoint.y) <= handleSize / 2
					) {
						return { type: 'start' } as {
							type: TransformHandleType;
						};
					}

					if (
						Math.abs(coords.x - endPoint.x) <= handleSize / 2 &&
						Math.abs(coords.y - endPoint.y) <= handleSize / 2
					) {
						return { type: 'end' } as { type: TransformHandleType };
					}

					if (
						selectedLayer.arrowType === 'curved' ||
						selectedLayer.arrowType === 'curvedLine'
					) {
						for (
							let i = 0;
							i < selectedLayer.controlPoints.length;
							i++
						) {
							const point = {
								x:
									selectedLayer.transform.x +
									selectedLayer.controlPoints[i].x,
								y:
									selectedLayer.transform.y +
									selectedLayer.controlPoints[i].y,
							};
							if (
								Math.abs(coords.x - point.x) <=
									handleSize / 2 &&
								Math.abs(coords.y - point.y) <= handleSize / 2
							) {
								return {
									type: i === 0 ? 'control1' : 'control2',
								} as { type: TransformHandleType };
							}
						}
					}
					return null;
				}

				const { x, y, width, height } = selectedLayer.transform;
				const handlePositions: Array<{
					type: TransformHandleType;
					x: number;
					y: number;
				}> = [
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
				selectedHandleRef.current = clickedHandle.type;
				canvasStore.startTransforming(clickedHandle.type);
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
			setTextInputPosition,
		]
	);
	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			const coords = getCanvasCoordinates(e);
			if (!coords) return;

			if (
				canvasStore.currentTool === 'arrow' &&
				canvasStore.arrowState.isDrawing
			) {
				const overlayCanvas = overlayCanvasRef.current;
				const ctx = overlayCanvas?.getContext('2d');
				if (!overlayCanvas || !ctx) return;

				ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

				canvasStore.updateArrowDrawing(coords.x, coords.y);

				const zoom = canvasStore.canvasState.zoom / 100;
				const scaledStrokeWidth =
					canvasStore.arrowState.strokeWidth * zoom;

				if (
					canvasStore.arrowState.startPoint &&
					canvasStore.arrowState.endPoint
				) {
					drawArrow(
						ctx,
						canvasStore.arrowState.startPoint,
						canvasStore.arrowState.endPoint,
						canvasStore.arrowState.controlPoints,
						canvasStore.arrowState.arrowType,
						canvasStore.arrowState.strokeColor,
						scaledStrokeWidth
					);
				}
				return;
			}

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
					return;
				}
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
			}
			if (
				canvasStore.currentTool === 'blur' &&
				canvasStore.blurState.isDrawing
			) {
				canvasStore.updateBlurDrawing(coords.x, coords.y);

				const overlayCanvas = overlayCanvasRef.current;
				const ctx = overlayCanvas?.getContext('2d');
				if (
					overlayCanvas &&
					ctx &&
					canvasStore.blurState.previewBounds
				) {
					const bounds = canvasStore.blurState.previewBounds;

					if (bounds.width <= 0 || bounds.height <= 0) return;

					ctx.clearRect(
						0,
						0,
						overlayCanvas.width,
						overlayCanvas.height
					);

					const tempCanvas = document.createElement('canvas');
					tempCanvas.width = bounds.width;
					tempCanvas.height = bounds.height;
					const tempCtx = tempCanvas.getContext('2d');

					if (tempCtx) {
						tempCtx.drawImage(
							mainCanvasRef.current!,
							bounds.x,
							bounds.y,
							bounds.width,
							bounds.height,
							0,
							0,
							bounds.width,
							bounds.height
						);

						const blurCanvas = document.createElement('canvas');
						blurCanvas.width = bounds.width;
						blurCanvas.height = bounds.height;
						const blurCtx = blurCanvas.getContext('2d');

						if (blurCtx) {
							blurCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
							blurCtx.fillRect(0, 0, bounds.width, bounds.height);

							blurCtx.drawImage(tempCanvas, 0, 0);

							blurCtx.filter = 'blur(5px)';
							blurCtx.drawImage(blurCanvas, 0, 0);

							ctx.drawImage(blurCanvas, bounds.x, bounds.y);
						}

						ctx.strokeStyle = '#000000';
						ctx.lineWidth = 1;
						ctx.setLineDash([5, 5]);
						ctx.strokeRect(
							bounds.x,
							bounds.y,
							bounds.width,
							bounds.height
						);
					}
				}
				return;
			} else if (selectedHandleRef.current) {
				const selectedLayer = canvasStore.getSelectedLayer();
				if (!selectedLayer) return;

				if (selectedLayer.type === 'arrow') {
					const updatedLayer = { ...selectedLayer };

					switch (selectedHandleRef.current) {
						case 'start': {
							const newX = coords.x - selectedLayer.transform.x;
							const newY = coords.y - selectedLayer.transform.y;
							updatedLayer.startPoint = { x: newX, y: newY };

							if (
								updatedLayer.arrowType === 'curved' ||
								updatedLayer.arrowType === 'curvedLine'
							) {
								const firstControl =
									updatedLayer.controlPoints[0];
								const deltaX =
									newX - selectedLayer.startPoint.x;
								const deltaY =
									newY - selectedLayer.startPoint.y;
								updatedLayer.controlPoints[0] = {
									x: firstControl.x + deltaX * 0.5,
									y: firstControl.y + deltaY * 0.5,
								};
							}
							break;
						}
						case 'end': {
							const newX = coords.x - selectedLayer.transform.x;
							const newY = coords.y - selectedLayer.transform.y;
							updatedLayer.endPoint = { x: newX, y: newY };

							if (
								updatedLayer.arrowType === 'curved' ||
								updatedLayer.arrowType === 'curvedLine'
							) {
								const lastControl =
									updatedLayer.controlPoints[1];
								const deltaX = newX - selectedLayer.endPoint.x;
								const deltaY = newY - selectedLayer.endPoint.y;
								updatedLayer.controlPoints[1] = {
									x: lastControl.x + deltaX * 0.5,
									y: lastControl.y + deltaY * 0.5,
								};
							}
							break;
						}
						case 'control1': {
							if (updatedLayer.controlPoints.length > 0) {
								updatedLayer.controlPoints[0] = {
									x: coords.x - selectedLayer.transform.x,
									y: coords.y - selectedLayer.transform.y,
								};
							}
							break;
						}
						case 'control2': {
							if (updatedLayer.controlPoints.length > 1) {
								updatedLayer.controlPoints[1] = {
									x: coords.x - selectedLayer.transform.x,
									y: coords.y - selectedLayer.transform.y,
								};
							}
							break;
						}
					}

					const points = [
						updatedLayer.startPoint,
						updatedLayer.endPoint,
						...updatedLayer.controlPoints,
					];

					const minX = Math.min(...points.map((p) => p.x));
					const minY = Math.min(...points.map((p) => p.y));
					const maxX = Math.max(...points.map((p) => p.x));
					const maxY = Math.max(...points.map((p) => p.y));

					updatedLayer.transform = {
						...updatedLayer.transform,
						width: maxX - minX,
						height: maxY - minY,
					};

					const offsetX = minX;
					const offsetY = minY;

					updatedLayer.startPoint = {
						x: updatedLayer.startPoint.x - offsetX,
						y: updatedLayer.startPoint.y - offsetY,
					};

					updatedLayer.endPoint = {
						x: updatedLayer.endPoint.x - offsetX,
						y: updatedLayer.endPoint.y - offsetY,
					};

					updatedLayer.controlPoints = updatedLayer.controlPoints.map(
						(point) => ({
							x: point.x - offsetX,
							y: point.y - offsetY,
						})
					);

					updatedLayer.transform.x += offsetX;
					updatedLayer.transform.y += offsetY;

					Object.assign(selectedLayer, updatedLayer);
				} else {
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
								selectedLayer.transform.x =
									x + width - newWidth;
								selectedLayer.transform.y =
									y + height - newHeight;
							} else if (
								selectedHandleRef.current === 'topRight'
							) {
								newWidth = Math.abs(coords.x - x);
								newHeight = newWidth / aspectRatio;
								selectedLayer.transform.y =
									y + height - newHeight;
							} else if (
								selectedHandleRef.current === 'bottomLeft'
							) {
								newWidth = Math.abs(coords.x - (x + width));
								newHeight = newWidth / aspectRatio;
								selectedLayer.transform.x =
									x + width - newWidth;
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
							selectedLayer.transform.width = Math.abs(
								coords.x - x
							);
							break;
						}
						case 'topCenter': {
							const newHeight = Math.abs(coords.y - (y + height));
							selectedLayer.transform.y = y + height - newHeight;
							selectedLayer.transform.height = newHeight;
							break;
						}
						case 'bottomCenter': {
							selectedLayer.transform.height = Math.abs(
								coords.y - y
							);
							break;
						}
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
			drawPreview,
			drawSelection,
			getCanvasCoordinates,
			renderLayers,
		]
	);
	const handleMouseUp = useCallback(() => {
		if (canvasStore.arrowState.isDrawing) {
			canvasStore.finishArrowDrawing();

			const overlayCanvas = overlayCanvasRef.current;
			const ctx = overlayCanvas?.getContext('2d');
			if (overlayCanvas && ctx && canvasStore.arrowState.previewBounds) {
				const bounds = canvasStore.arrowState.previewBounds;
				const padding =
					Math.max(
						canvasStore.arrowState.strokeWidth,
						ARROW_HEAD_SIZE
					) + 2;
				ctx.clearRect(
					bounds.x - padding,
					bounds.y - padding,
					bounds.width + padding * 2,
					bounds.height + padding * 2
				);
			}
			return;
		}

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

		if (canvasStore.blurState.isDrawing) {
			canvasStore.finishBlurDrawing();

			const overlayCanvas = overlayCanvasRef.current;
			const ctx = overlayCanvas?.getContext('2d');
			if (overlayCanvas && ctx && canvasStore.blurState.previewBounds) {
				const bounds = canvasStore.blurState.previewBounds;
				ctx.clearRect(
					bounds.x - 1,
					bounds.y - 1,
					bounds.width + 2,
					bounds.height + 2
				);
			}
			return;
		}
		selectedHandleRef.current = null;
	}, [canvasStore]);

	useEffect(() => {
		const mainCanvas = mainCanvasRef.current;
		const overlayCanvas = overlayCanvasRef.current;
		if (!mainCanvas || !overlayCanvas) return;
		canvasStore.setMainCanvas(mainCanvas);

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
	const handleDoubleClick = useCallback(
		async (e: React.MouseEvent) => {
			const coords = getCanvasCoordinates(e);
			if (!coords) return;

			const reversedLayers = [
				...canvasStore.canvasState.layers,
			].reverse();

			for (const layer of reversedLayers) {
				if (
					layer.type === 'text' &&
					isPointInLayer(coords.x, coords.y, layer)
				) {
					const rect = (
						e.target as HTMLElement
					).getBoundingClientRect();
					const scale = canvasStore.canvasState.zoom / 100;

					canvasStore.startEditingExistingText(layer.id);

					setTextInputPosition({
						x: layer.transform.x * scale + rect.left,
						y: layer.transform.y * scale + rect.top,
					});

					break;
				}
			}
		},
		[canvasStore, getCanvasCoordinates, isPointInLayer]
	);
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
				onDoubleClick={handleDoubleClick}
			/>
			<canvas
				ref={overlayCanvasRef}
				style={{
					...canvasStyle,
					pointerEvents: 'none',
				}}
			/>
			{textInputPosition && canvasStore.textState.isEditing && (
				<TextInput
					position={textInputPosition}
					onFinish={handleTextFinish}
				/>
			)}
		</div>
	);
});

export default Canvas;
