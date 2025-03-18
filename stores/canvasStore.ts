'use client';
import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import {
	CanvasState,
	Layer,
	ToolType,
	SelectionState,
	Bounds,
	TransformHandleType,
	Transform,
	ShapeLayerData,
	ShapeType,
	ShapeDrawingState,
	DrawingState,
	DrawingLayerData,
	DrawingToolType,
	NumberState,
	NumberStyle,
	NumberLayerData,
	TextState,
	TextLayerData,
	ArrowDrawingState,
	ArrowType,
	ArrowLayerData,
	BlurDrawingState,
	BlurLayerData,
	WatermarkState,
	Point,
	TextArrowDrawingState,
	TextArrowLayerData,
	PageTextLayerData,
	BrowserFrameState,
	BrowserStyle,
} from '@/types/types';

export interface CropState {
	isActive: boolean;
	startPoint: Point | null;
	currentPoint: Point | null;
	previewBounds?: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	visibleArea: {
		x: number;
		y: number;
		width: number;
		height: number;
	} | null;
}
export interface PageTextState {
	isActive: boolean;
	position: Point | null;
	backgroundColor: string;
	textInput: boolean;
}
interface EditorHistoryState {
	canvasState: CanvasState;
	cropState: CropState;
	paddingState: PaddingState;
	browserFrameState: BrowserFrameState;
}

export interface PaddingState {
	isEnabled: boolean;
	size: number;
	color: string;
}
export class CanvasStore {
	canvasState: CanvasState = {
		id: '',
		name: 'Untitled',
		dimensions: {
			width: 800,
			height: 600,
		},
		backgroundColor: '#ffffff',
		layers: [],
		selectedLayerIds: [],
		zoom: 100,
	};
	shapeDrawingState: ShapeDrawingState = {
		isDrawing: false,
		startPoint: null,
		currentPoint: null,
		shapeType: 'square',
		strokeColor: '#000000',
		strokeWidth: 2,
	};
	selectionState: SelectionState = {
		isSelected: false,
		isHovered: false,
		isDragging: false,
		isTransforming: false,
		activeHandle: null,
		transformOrigin: null,
	};
	drawingState: DrawingState = {
		isDrawing: false,
		currentTool: null,
		color: '#000000',
		lineWidth: 2,
		points: [],
		lastDrawTime: 0,
	};
	numberState: NumberState = {
		isActive: false,
		currentStyle: 'circle',
		counters: {
			circle: 1,
			square: 1,
			plain: 1,
		},
		colors: {
			circle: '#ff0000',
			square: '#ff0000',
			plain: '#ff0000',
		},
	};
	textState: TextState = {
		isEditing: false,
		currentText: '',
		fontSize: 16,
		fontFamily: 'Arial',
		color: '#000000',
		backgroundColor: null,
		alignment: 'left',
		bold: false,
		italic: false,
		editingLayerId: null,
		position: null,
	};
	arrowState: ArrowDrawingState = {
		isDrawing: false,
		startPoint: null,
		endPoint: null,
		controlPoints: [],
		arrowType: 'straight',
		strokeColor: '#000000',
		strokeWidth: 2,
		previewBounds: undefined,
	};
	blurState: BlurDrawingState = {
		isDrawing: false,
		startPoint: null,
		currentPoint: null,
		previewBounds: undefined,
	};
	watermarkState: WatermarkState = {
		isEnabled: false,
		imageSrc: null,
		position: 'top-left',
		size: 50,
		opacity: 50,
	};
	dragState = {
		isDragging: false,
		startPosition: { x: 0, y: 0 },
		currentPosition: { x: 0, y: 0 },
	};
	cropState: CropState = {
		isActive: false,
		startPoint: null,
		currentPoint: null,
		previewBounds: undefined,
		visibleArea: null,
	};
	textArrowState: TextArrowDrawingState = {
		isDrawing: false,
		startPoint: null,
		endPoint: null,
		controlPoints: [],
		arrowType: 'straight',
		strokeColor: '#000000',
		strokeWidth: 2,
		previewBounds: undefined,
		textInput: false,
	};
	pageTextState: PageTextState = {
		isActive: false,
		position: null,
		backgroundColor: '#FFFF00',
		textInput: false,
	};
	paddingState: PaddingState = {
		isEnabled: false,
		size: 100,
		color: '#FFFFFF',
	};
	browserFrameState: BrowserFrameState = {
		isEnabled: false,
		style: 'windows',
		urlPosition: 'top',
		showUrl: false,
		showDate: false,
		url: 'https://example.com',
	};
	currentTool: ToolType = 'select';
	private history: EditorHistoryState[] = [];
	private currentHistoryIndex: number = -1;
	private _batchOperationActive: boolean = false;
	private _lastSavedStateHash: string = '';
	constructor() {
		makeAutoObservable(
			this,
			{
				logCanvasState: false,
				dragState: false,
				selectionState: false,
				renderBrowserFramePreview: false,
			},
			{ autoBind: true }
		);
		this.loadBrowserFrameImages().catch((error) => {
			console.error('Failed to preload browser frame images:', error);
		});
	}
	startBatchOperation(): void {
		this._batchOperationActive = true;
	}

	endBatchOperation(): void {
		this._batchOperationActive = false;
		this.saveToHistory();
	}

	private createStateHash(): string {
		const layerIds = this.canvasState.layers.map((l) => l.id).join(',');
		const selectedIds = this.canvasState.selectedLayerIds.join(',');
		const dimensions = `${this.canvasState.dimensions.width}x${this.canvasState.dimensions.height}`;

		const cropHash = this.cropState.visibleArea
			? `crop:${this.cropState.visibleArea.x},${this.cropState.visibleArea.y},${this.cropState.visibleArea.width},${this.cropState.visibleArea.height}`
			: 'crop:none';

		const paddingHash = `padding:${this.paddingState.isEnabled},${this.paddingState.size},${this.paddingState.color}`;

		const browserHash = `browser:${this.browserFrameState.isEnabled},${this.browserFrameState.style}`;

		return `${layerIds}|${selectedIds}|${dimensions}|${cropHash}|${paddingHash}|${browserHash}`;
	}
	private browserFrameImages: {
		mac: {
			left?: HTMLImageElement;
			middle?: HTMLImageElement;
			right?: HTMLImageElement;
		};
		windows: {
			left?: HTMLImageElement;
			middle?: HTMLImageElement;
			right?: HTMLImageElement;
		};
	} = {
		mac: {},
		windows: {},
	};

	private async loadBrowserFrameImages(): Promise<void> {
		try {
			this.browserFrameImages.mac.left = await this.loadImage(
				'/mac1.png'
			);
			this.browserFrameImages.mac.middle = await this.loadImage(
				'/mac2.png'
			);
			this.browserFrameImages.mac.right = await this.loadImage(
				'/mac3.png'
			);

			this.browserFrameImages.windows.left = await this.loadImage(
				'/win1.png'
			);
			this.browserFrameImages.windows.middle = await this.loadImage(
				'/win2.png'
			);
			this.browserFrameImages.windows.right = await this.loadImage(
				'/win3.png'
			);
		} catch (error) {
			console.error('Failed to load browser frame images:', error);
		}
	}

	private loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () =>
				reject(new Error(`Failed to load image: ${src}`));
			img.src = src;
		});
	}

	private readonly MIN_WIDTH_MAC = 329;
	private readonly MIN_WIDTH_WINDOWS = 314;
	private checkMinimumWidthForBrowserFrame(): boolean {
		if (
			this.browserFrameState.style === 'url-top' ||
			this.browserFrameState.style === 'url-bottom'
		) {
			return true;
		}
		const contentWidth = this.cropState.visibleArea
			? this.cropState.visibleArea.width
			: this.canvasState.dimensions.width;

		const minWidth =
			this.browserFrameState.style === 'mac'
				? this.MIN_WIDTH_MAC
				: this.MIN_WIDTH_WINDOWS;

		if (contentWidth < minWidth) {
			alert(
				`The image width (${contentWidth}px) is too small for browser frame. Minimum required width: ${minWidth}px.`
			);
			this.browserFrameState.isEnabled = false;
			return false;
		}

		return true;
	}
	startDrawing(x: number, y: number) {
		if (this.drawingState.isDrawing) return;

		this.drawingState = {
			...this.drawingState,
			isDrawing: true,
			points: [{ x, y }],
			lastDrawTime: Date.now(),
			bounds: {
				minX: x,
				maxX: x,
				minY: y,
				maxY: y,
			},
			previewBounds: {
				x: x,
				y: y,
				width: 0,
				height: 0,
			},
		};
	}

	updateDrawing(x: number, y: number) {
		if (!this.drawingState.isDrawing || !this.drawingState.bounds) return;

		const currentTime = Date.now();
		if (currentTime - this.drawingState.lastDrawTime >= 16) {
			const bounds = this.drawingState.bounds;
			bounds.minX = Math.min(bounds.minX, x);
			bounds.maxX = Math.max(bounds.maxX, x);
			bounds.minY = Math.min(bounds.minY, y);
			bounds.maxY = Math.max(bounds.maxY, y);

			this.drawingState.points.push({
				x: x,
				y: y,
			});

			this.drawingState.lastDrawTime = currentTime;

			this.drawingState.previewBounds = {
				x: bounds.minX,
				y: bounds.minY,
				width: bounds.maxX - bounds.minX,
				height: bounds.maxY - bounds.minY,
			};
		}
	}

	finishDrawing() {
		if (!this.drawingState.isDrawing || this.drawingState.points.length < 2)
			return;

		const drawingLayer: DrawingLayerData = {
			id: uuidv4(),
			type: 'drawing',
			name: `Drawing ${this.canvasState.layers.length + 1}`,
			visible: true,
			locked: false,
			opacity: 1,
			transform: {
				x: 0,
				y: 0,
				width: this.canvasState.dimensions.width,
				height: this.canvasState.dimensions.height,
				rotation: 0,
				scale: { x: 1, y: 1 },
				center: {
					x: this.canvasState.dimensions.width / 2,
					y: this.canvasState.dimensions.height / 2,
				},
			},
			toolType: this.drawingState.currentTool || 'pencil',
			points: [...this.drawingState.points],
			params: {
				color: this.drawingState.color,
				lineWidth: this.drawingState.lineWidth,
				opacity: this.getToolOpacity(),
				smoothing: this.shouldSmooth(),
			},
		};

		this.addLayer(drawingLayer);

		this.drawingState.isDrawing = false;
		this.drawingState.points = [];

		this.saveToHistory();
	}

	setDrawingTool(tool: DrawingToolType) {
		this.drawingState.currentTool = tool;
	}

	setDrawingColor(color: string) {
		this.drawingState.color = color;
	}

	setLineWidth(width: number) {
		this.drawingState.lineWidth = width;
	}

	private getToolOpacity(): number {
		switch (this.drawingState.currentTool) {
			case 'pencil':
				return 1;
			case 'brush':
				return 0.7;
			case 'highlighter':
				return 0.3;
			default:
				return 1;
		}
	}

	private shouldSmooth(): boolean {
		return this.drawingState.currentTool !== 'pencil';
	}

	addLayer(layer: Layer) {
		layer.transform.center = {
			x: layer.transform.x + layer.transform.width / 2,
			y: layer.transform.y + layer.transform.height / 2,
		};

		this.canvasState.layers = [...this.canvasState.layers, layer];

		if (this.canvasState.layers.length === 1) {
			this.initHistory();
		} else {
			this.saveToHistory();
		}

		this.logCanvasState();
	}

	removeLayer(layerId: string) {
		this.canvasState.layers = this.canvasState.layers.filter(
			(layer) => layer.id !== layerId
		);

		if (this.canvasState.selectedLayerIds.includes(layerId)) {
			this.clearSelection();
		}

		this.saveToHistory();

		this.logCanvasState();
	}

	selectLayer(layerId: string) {
		this.canvasState.selectedLayerIds = [layerId];
		this.selectionState.isSelected = true;
		this.selectionState.isHovered = false;
		this.selectionState.isDragging = false;
		this.selectionState.isTransforming = false;
		this.selectionState.activeHandle = null;
		this.selectionState.transformOrigin = null;
	}

	clearSelection() {
		this.canvasState.selectedLayerIds = [];
		this.selectionState.isSelected = false;
		this.selectionState.isHovered = false;
		this.selectionState.isDragging = false;
		this.selectionState.isTransforming = false;
		this.selectionState.activeHandle = null;
		this.selectionState.transformOrigin = null;
		this.logCanvasState();
	}

	setHoveredLayer(layerId: string | null) {
		this.selectionState.isHovered = layerId !== null;
		this.logCanvasState();
	}

	stopDragging() {
		this.selectionState.isDragging = false;
		this.logCanvasState();
	}

	startTransforming(handle: TransformHandleType) {
		const selectedLayer = this.getSelectedLayer();
		if (!selectedLayer) return;

		this.selectionState.isTransforming = true;
		this.selectionState.isDragging = false;
		this.selectionState.activeHandle = handle;
		this.selectionState.transformOrigin = {
			x: selectedLayer.transform.x + selectedLayer.transform.width / 2,
			y: selectedLayer.transform.y + selectedLayer.transform.height / 2,
		};
		this.logCanvasState();
	}

	stopTransforming() {
		this.selectionState.isTransforming = false;
		this.selectionState.activeHandle = null;
		this.selectionState.transformOrigin = null;
		this.saveToHistory();

		this.logCanvasState();
	}

	updateLayer(layerId: string, updates: Partial<Transform>) {
		const layerIndex = this.canvasState.layers.findIndex(
			(layer) => layer.id === layerId
		);

		if (layerIndex !== -1) {
			const currentLayer = this.canvasState.layers[layerIndex];
			const updatedTransform = {
				...currentLayer.transform,
				...updates,
				center: {
					x:
						(updates.x ?? currentLayer.transform.x) +
						(updates.width ?? currentLayer.transform.width) / 2,
					y:
						(updates.y ?? currentLayer.transform.y) +
						(updates.height ?? currentLayer.transform.height) / 2,
				},
			};

			this.canvasState.layers[layerIndex] = {
				...currentLayer,
				transform: updatedTransform,
			} as Layer;

			if (!this.dragState.isDragging) {
				this.saveToHistory();
			}

			this.logCanvasState();
		}
	}

	getSelectedLayer(): Layer | null {
		if (this.canvasState.selectedLayerIds.length === 0) return null;
		return (
			this.canvasState.layers.find(
				(layer) => layer.id === this.canvasState.selectedLayerIds[0]
			) || null
		);
	}

	getLayerBounds(layerId: string): Bounds | null {
		const layer = this.canvasState.layers.find(
			(layer) => layer.id === layerId
		);
		if (!layer) return null;

		return {
			x: layer.transform.x,
			y: layer.transform.y,
			width: layer.transform.width,
			height: layer.transform.height,
			rotation: layer.transform.rotation,
		};
	}

	setZoom(zoom: number) {
		this.canvasState.zoom = zoom;
		this.logCanvasState();
	}

	setCanvasDimensions(width: number, height: number) {
		this.canvasState.dimensions = { width, height };
		this.saveToHistory();

		this.logCanvasState();
	}

	logCanvasState() {
		// console.log("Canvas state:", JSON.parse(JSON.stringify(this.canvasState)));
		// console.log(
		//   "Selection state:",
		//   JSON.parse(JSON.stringify(this.selectionState))
		// );
	}

	startDragging(x: number, y: number) {
		this.dragState.isDragging = true;
		this.dragState.startPosition = { x, y };
		this.dragState.currentPosition = { x, y };
	}
	updateDragPosition(x: number, y: number) {
		if (!this.dragState.isDragging) return;

		const selectedLayer = this.getSelectedLayer();
		if (!selectedLayer) return;

		const dx = x - this.dragState.currentPosition.x;
		const dy = y - this.dragState.currentPosition.y;

		if (selectedLayer.type === 'drawing') {
			selectedLayer.transform = {
				...selectedLayer.transform,
				x: selectedLayer.transform.x + dx,
				y: selectedLayer.transform.y + dy,
			};

			if (selectedLayer.transform.center) {
				selectedLayer.transform.center = {
					x:
						selectedLayer.transform.x +
						selectedLayer.transform.width / 2,
					y:
						selectedLayer.transform.y +
						selectedLayer.transform.height / 2,
				};
			}
		} else if (
			selectedLayer.type === 'arrow' ||
			selectedLayer.type === 'textArrow'
		) {
			selectedLayer.transform = {
				...selectedLayer.transform,
				x: selectedLayer.transform.x + dx,
				y: selectedLayer.transform.y + dy,
			};

			if (selectedLayer.transform.center) {
				selectedLayer.transform.center = {
					x:
						selectedLayer.transform.x +
						selectedLayer.transform.width / 2,
					y:
						selectedLayer.transform.y +
						selectedLayer.transform.height / 2,
				};
			}
		} else {
			selectedLayer.transform = {
				...selectedLayer.transform,
				x: selectedLayer.transform.x + dx,
				y: selectedLayer.transform.y + dy,
			};

			if (selectedLayer.transform.center) {
				selectedLayer.transform.center = {
					x:
						selectedLayer.transform.x +
						selectedLayer.transform.width / 2,
					y:
						selectedLayer.transform.y +
						selectedLayer.transform.height / 2,
				};
			}
		}

		this.dragState.currentPosition = { x, y };

		this.canvasState.layers = [...this.canvasState.layers];
	}

	endDragging() {
		this.dragState.isDragging = false;
		this.saveToHistory();
	}
	startShapeDrawing(x: number, y: number) {
		this.shapeDrawingState.isDrawing = true;
		this.shapeDrawingState.startPoint = { x, y };
		this.shapeDrawingState.currentPoint = { x, y };
		this.logCanvasState();
	}

	updateShapeDrawing(x: number, y: number) {
		if (!this.shapeDrawingState.isDrawing) return;
		this.shapeDrawingState.currentPoint = { x, y };
		this.logCanvasState();
	}

	finishShapeDrawing() {
		if (
			!this.shapeDrawingState.isDrawing ||
			!this.shapeDrawingState.startPoint ||
			!this.shapeDrawingState.currentPoint
		)
			return;

		this.startBatchOperation();

		const shapeLayer: ShapeLayerData = {
			id: uuidv4(),
			type: 'shape',
			name: `Shape ${this.canvasState.layers.length + 1}`,
			visible: true,
			locked: false,
			opacity: 1,
			transform: {
				x: Math.min(
					this.shapeDrawingState.startPoint.x,
					this.shapeDrawingState.currentPoint.x
				),
				y: Math.min(
					this.shapeDrawingState.startPoint.y,
					this.shapeDrawingState.currentPoint.y
				),
				width: Math.abs(
					this.shapeDrawingState.currentPoint.x -
						this.shapeDrawingState.startPoint.x
				),
				height: Math.abs(
					this.shapeDrawingState.currentPoint.y -
						this.shapeDrawingState.startPoint.y
				),
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
			shapeType: this.shapeDrawingState.shapeType,
			strokeColor: this.shapeDrawingState.strokeColor,
			strokeWidth: this.shapeDrawingState.strokeWidth,
		};

		this.addLayer(shapeLayer);
		this.shapeDrawingState.isDrawing = false;
		this.shapeDrawingState.startPoint = null;
		this.shapeDrawingState.currentPoint = null;

		this.endBatchOperation();
	}

	setShapeType(shapeType: ShapeType) {
		this.shapeDrawingState.shapeType = shapeType;
		this.logCanvasState();
	}

	setShapeStrokeColor(color: string) {
		this.shapeDrawingState.strokeColor = color;

		const selectedLayer = this.getSelectedLayer();
		if (selectedLayer && selectedLayer.type === 'shape') {
			selectedLayer.strokeColor = color;
			this.saveToHistory();
		}
		this.logCanvasState();
	}

	setShapeStrokeWidth(width: number) {
		this.shapeDrawingState.strokeWidth = width;

		const selectedLayer = this.getSelectedLayer();
		if (selectedLayer && selectedLayer.type === 'shape') {
			selectedLayer.strokeWidth = width;
			this.saveToHistory();
		}
		this.logCanvasState();
	}

	resetTool() {
		if (
			this.currentTool === 'select' ||
			this.shapeDrawingState.isDrawing ||
			(this.currentTool === 'draw' && !this.drawingState.isDrawing)
		) {
			return;
		}

		this.currentTool = 'select';

		this.shapeDrawingState.isDrawing = false;
		this.shapeDrawingState.startPoint = null;
		this.shapeDrawingState.currentPoint = null;

		this.logCanvasState();
	}
	setNumberStyle(style: NumberStyle) {
		this.numberState.currentStyle = style;
		this.logCanvasState();
	}

	setNumberColor(color: string) {
		this.numberState.colors[this.numberState.currentStyle] = color;
		this.logCanvasState();
	}

	incrementNumberCounter() {
		this.numberState.counters[this.numberState.currentStyle]++;
		this.logCanvasState();
	}

	getCurrentNumberValue(): number {
		return this.numberState.counters[this.numberState.currentStyle];
	}

	getCurrentNumberColor(): string {
		return this.numberState.colors[this.numberState.currentStyle];
	}

	createNumberLayer(x: number, y: number): NumberLayerData {
		const currentStyle = this.numberState.currentStyle;
		const currentValue = this.getCurrentNumberValue();
		const currentColor = this.getCurrentNumberColor();

		const numberLayer: NumberLayerData = {
			id: uuidv4(),
			type: 'number',
			name: `Number ${currentValue}`,
			visible: true,
			locked: false,
			opacity: 1,
			value: currentValue,
			style: currentStyle,
			color: currentColor,
			fontSize: 24,
			transform: {
				x,
				y,
				width: 40,
				height: 40,
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
		};

		this.addLayer(numberLayer);
		this.incrementNumberCounter();
		this.saveToHistory();
		return numberLayer;
	}

	startTextEditing(x: number, y: number) {
		if (this.textState.isEditing) return;

		this.textState.isEditing = true;
		this.textState.currentText = '';
		this.textState.editingLayerId = null;
		this.textState.position = { x, y };

		const tempWidth = this.textState.fontSize * 2;
		const tempHeight = this.textState.fontSize * 1.2;

		const transform = {
			x,
			y,
			width: tempWidth,
			height: tempHeight,
			rotation: 0,
			scale: { x: 1, y: 1 },
		};

		return transform;
	}

	finishTextEditing() {
		if (!this.textState.isEditing) return;

		if (this.textState.currentText.trim()) {
			if (this.textState.editingLayerId) {
				this.updateTextLayer(this.textState.editingLayerId);
			} else if (this.textState.position) {
				this.createTextLayer(this.textState.position);
			}
			this.saveToHistory();
		} else if (this.textState.editingLayerId) {
			this.removeLayer(this.textState.editingLayerId);
			this.saveToHistory();
		}

		this.resetTextState();
		this.currentTool = 'select';
	}

	private createTextLayer(transform: { x: number; y: number }) {
		this.startBatchOperation();

		const textLayer: TextLayerData = {
			id: uuidv4(),
			type: 'text',
			name: 'Text Layer',
			visible: true,
			locked: false,
			opacity: 1,
			transform: {
				x: transform.x,
				y: transform.y,
				width: this.textState.fontSize * 2,
				height: this.textState.fontSize * 1.2,
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
			content: this.textState.currentText,
			fontSize: this.textState.fontSize,
			fontFamily: this.textState.fontFamily,
			color: this.textState.color,
			backgroundColor: this.textState.backgroundColor,
			alignment: this.textState.alignment,
			bold: this.textState.bold,
			italic: this.textState.italic,
		};

		this.addLayer(textLayer);

		this.endBatchOperation();
	}

	private updateTextLayer(layerId: string) {
		const layerIndex = this.canvasState.layers.findIndex(
			(layer) => layer.id === layerId
		);

		if (layerIndex !== -1) {
			const layer = this.canvasState.layers[layerIndex];
			if (layer.type === 'text') {
				layer.content = this.textState.currentText;
				layer.fontSize = this.textState.fontSize;
				layer.fontFamily = this.textState.fontFamily;
				layer.color = this.textState.color;
				layer.alignment = this.textState.alignment;
				layer.bold = this.textState.bold;
				layer.italic = this.textState.italic;
			}
		}
	}

	private resetTextState() {
		this.textState.isEditing = false;
		this.textState.currentText = '';
		this.textState.editingLayerId = null;
		this.textState.position = null;
	}

	startEditingExistingText(layerId: string) {
		const layer = this.canvasState.layers.find(
			(layer) => layer.id === layerId
		);

		if (layer?.type === 'text') {
			this.textState.isEditing = true;
			this.textState.editingLayerId = layer.id;
			this.textState.currentText = layer.content;
			this.textState.fontSize = layer.fontSize;
			this.textState.fontFamily = layer.fontFamily;
			this.textState.color = layer.color;
			this.textState.alignment = layer.alignment;
			this.textState.bold = layer.bold;
			this.textState.italic = layer.italic;
		}
	}

	updateTextContent(text: string) {
		if (this.textState.isEditing) {
			this.textState.currentText = text;
		}
	}

	setTextStyle(updates: Partial<TextState>) {
		Object.assign(this.textState, updates);
		if (!this.textState.isEditing) {
			this.saveToHistory();
		}
	}

	initHistory() {
		this.history = [
			{
				canvasState: { ...this.canvasState },
				cropState: { ...this.cropState },
				paddingState: { ...this.paddingState },
				browserFrameState: { ...this.browserFrameState },
			},
		];
		this.currentHistoryIndex = 0;
	}

	saveToHistory() {
		if (this._batchOperationActive) {
			return;
		}
		const currentStateHash = this.createStateHash();
		if (currentStateHash === this._lastSavedStateHash) {
			return;
		}

		this.history = this.history.slice(0, this.currentHistoryIndex + 1);

		this.history.push({
			canvasState: JSON.parse(JSON.stringify(this.canvasState)),
			cropState: JSON.parse(JSON.stringify(this.cropState)),
			paddingState: JSON.parse(JSON.stringify(this.paddingState)),
			browserFrameState: JSON.parse(
				JSON.stringify(this.browserFrameState)
			),
		});

		this.currentHistoryIndex++;
		this._lastSavedStateHash = currentStateHash;
	}

	canUndo(): boolean {
		return this.currentHistoryIndex > 0;
	}

	canRedo(): boolean {
		return this.currentHistoryIndex < this.history.length - 1;
	}

	undo() {
		if (!this.canUndo()) return;

		this.currentHistoryIndex--;
		const previousState = this.history[this.currentHistoryIndex];

		this.canvasState = JSON.parse(
			JSON.stringify(previousState.canvasState)
		);
		this.cropState = JSON.parse(JSON.stringify(previousState.cropState));
		this.paddingState = JSON.parse(
			JSON.stringify(previousState.paddingState)
		);
		this.browserFrameState = JSON.parse(
			JSON.stringify(previousState.browserFrameState)
		);

		this._lastSavedStateHash = this.createStateHash();

		this.clearSelection();
	}

	redo() {
		if (!this.canRedo()) return;

		this.currentHistoryIndex++;
		const nextState = this.history[this.currentHistoryIndex];

		this.canvasState = JSON.parse(JSON.stringify(nextState.canvasState));
		this.cropState = JSON.parse(JSON.stringify(nextState.cropState));
		this.paddingState = JSON.parse(JSON.stringify(nextState.paddingState));
		this.browserFrameState = JSON.parse(
			JSON.stringify(nextState.browserFrameState)
		);

		this._lastSavedStateHash = this.createStateHash();

		this.clearSelection();
	}

	undoAll() {
		if (!this.canUndo()) return;

		this.currentHistoryIndex = 0;
		const initialState = this.history[0];

		this.canvasState = JSON.parse(JSON.stringify(initialState.canvasState));
		this.cropState = JSON.parse(JSON.stringify(initialState.cropState));
		this.paddingState = JSON.parse(
			JSON.stringify(initialState.paddingState)
		);
		this.browserFrameState = JSON.parse(
			JSON.stringify(initialState.browserFrameState)
		);

		this._lastSavedStateHash = this.createStateHash();

		this.clearSelection();
	}

	startArrowDrawing(x: number, y: number) {
		if (this.arrowState.isDrawing) return;

		this.arrowState = {
			...this.arrowState,
			isDrawing: true,
			startPoint: { x, y },
			endPoint: { x, y },
			controlPoints: [],
			previewBounds: {
				x,
				y,
				width: 0,
				height: 0,
			},
		};
	}

	updateArrowDrawing(x: number, y: number) {
		if (!this.arrowState.isDrawing || !this.arrowState.startPoint) return;

		this.arrowState.endPoint = { x, y };

		const startX = Math.min(this.arrowState.startPoint.x, x);
		const startY = Math.min(this.arrowState.startPoint.y, y);
		const width = Math.abs(x - this.arrowState.startPoint.x);
		const height = Math.abs(y - this.arrowState.startPoint.y);

		this.arrowState.previewBounds = {
			x: startX,
			y: startY,
			width,
			height,
		};

		if (
			this.arrowState.arrowType === 'curved' ||
			this.arrowState.arrowType === 'curvedLine'
		) {
			const startPoint = this.arrowState.startPoint;

			this.arrowState.controlPoints = [
				{
					x: startPoint.x + (x - startPoint.x) * 0.25,
					y: startPoint.y + (y - startPoint.y) * 0.25,
				},
				{
					x: startPoint.x + (x - startPoint.x) * 0.75,
					y: startPoint.y + (y - startPoint.y) * 0.75,
				},
			];
		}
	}

	finishArrowDrawing() {
		if (
			!this.arrowState.isDrawing ||
			!this.arrowState.startPoint ||
			!this.arrowState.endPoint ||
			!this.arrowState.previewBounds
		)
			return;

		this.startBatchOperation();

		const bounds = this.arrowState.previewBounds;

		const relativeStartPoint = {
			x: this.arrowState.startPoint.x - bounds.x,
			y: this.arrowState.startPoint.y - bounds.y,
		};

		const relativeEndPoint = {
			x: this.arrowState.endPoint.x - bounds.x,
			y: this.arrowState.endPoint.y - bounds.y,
		};

		const relativeControlPoints = this.arrowState.controlPoints.map(
			(point) => ({
				x: point.x - bounds.x,
				y: point.y - bounds.y,
			})
		);

		const arrowLayer: ArrowLayerData = {
			id: uuidv4(),
			type: 'arrow',
			name: `Arrow ${this.canvasState.layers.length + 1}`,
			visible: true,
			locked: false,
			opacity: 1,
			transform: {
				x: bounds.x,
				y: bounds.y,
				width: bounds.width,
				height: bounds.height,
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
			arrowType: this.arrowState.arrowType,
			startPoint: relativeStartPoint,
			endPoint: relativeEndPoint,
			controlPoints: relativeControlPoints,
			strokeColor: this.arrowState.strokeColor,
			strokeWidth: this.arrowState.strokeWidth,
		};

		this.addLayer(arrowLayer);
		this.resetArrowState();
		this.currentTool = 'select';
		this.selectLayer(arrowLayer.id);

		this.endBatchOperation();
	}

	setArrowType(arrowType: ArrowType) {
		this.arrowState.arrowType = arrowType;
	}

	setArrowStyle(color: string, width: number) {
		this.arrowState.strokeColor = color;
		this.arrowState.strokeWidth = width;
	}

	private resetArrowState() {
		this.arrowState = {
			...this.arrowState,
			isDrawing: false,
			startPoint: null,
			endPoint: null,
			controlPoints: [],
			previewBounds: undefined,
		};
	}

	startBlurDrawing(x: number, y: number) {
		this.blurState.isDrawing = true;
		this.blurState.startPoint = { x, y };
		this.blurState.currentPoint = { x, y };
		this.blurState.previewBounds = {
			x,
			y,
			width: 0,
			height: 0,
		};
	}

	updateBlurDrawing(x: number, y: number) {
		if (!this.blurState.isDrawing || !this.blurState.startPoint) return;

		const boundedX = Math.max(
			0,
			Math.min(x, this.canvasState.dimensions.width)
		);
		const boundedY = Math.max(
			0,
			Math.min(y, this.canvasState.dimensions.height)
		);

		this.blurState.currentPoint = { x: boundedX, y: boundedY };

		const startX = Math.min(this.blurState.startPoint.x, boundedX);
		const startY = Math.min(this.blurState.startPoint.y, boundedY);
		const width = Math.abs(boundedX - this.blurState.startPoint.x);
		const height = Math.abs(boundedY - this.blurState.startPoint.y);

		this.blurState.previewBounds = {
			x: startX,
			y: startY,
			width,
			height,
		};
	}

	finishBlurDrawing() {
		if (
			!this.blurState.isDrawing ||
			!this.blurState.startPoint ||
			!this.blurState.currentPoint ||
			!this.blurState.previewBounds
		)
			return;

		this.startBatchOperation();

		const blurLayer: BlurLayerData = {
			id: uuidv4(),
			type: 'blur',
			name: `Blur ${this.canvasState.layers.length + 1}`,
			visible: true,
			locked: false,
			opacity: 1,
			blurRadius: 5,
			transform: {
				x: this.blurState.previewBounds.x,
				y: this.blurState.previewBounds.y,
				width: this.blurState.previewBounds.width,
				height: this.blurState.previewBounds.height,
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
		};

		this.addLayer(blurLayer);
		this.selectLayer(blurLayer.id);

		this.blurState = {
			isDrawing: false,
			startPoint: null,
			currentPoint: null,
			previewBounds: undefined,
		};

		this.currentTool = 'select';

		this.endBatchOperation();
	}

	setWatermarkImage(file: File): void {
		if (this.watermarkState.imageSrc) {
			URL.revokeObjectURL(this.watermarkState.imageSrc);
		}

		const imageUrl = URL.createObjectURL(file);

		this.watermarkState.imageSrc = imageUrl;

		this.saveToHistory();
	}

	updateWatermarkState(updates: Partial<WatermarkState>): void {
		if (updates.size !== undefined) {
			updates.size = Math.max(1, Math.min(100, updates.size));
		}
		if (updates.opacity !== undefined) {
			updates.opacity = Math.max(1, Math.min(100, updates.opacity));
		}

		Object.assign(this.watermarkState, updates);

		if (updates.isEnabled === undefined) {
			this.saveToHistory();
		}

		this.forceCanvasUpdate();
	}

	private forceCanvasUpdate(): void {
		const tempLayer = { ...this.canvasState.layers[0] };
		this.canvasState.layers = [
			tempLayer,
			...this.canvasState.layers.slice(1),
		];
	}

	async renderWatermark(ctx: CanvasRenderingContext2D): Promise<void> {
		if (!this.watermarkState.isEnabled || !this.watermarkState.imageSrc) {
			return;
		}

		try {
			const img = new Image();
			img.src = this.watermarkState.imageSrc;
			await new Promise((resolve, reject) => {
				img.onload = resolve;
				img.onerror = reject;
			});

			ctx.save();

			ctx.globalAlpha = this.watermarkState.opacity / 100;

			const scale = this.watermarkState.size / 100;
			const watermarkWidth = img.width * scale;
			const watermarkHeight = img.height * scale;

			let x = 1;
			let y = 1;

			switch (this.watermarkState.position) {
				case 'top-right':
					x = this.canvasState.dimensions.width - watermarkWidth - 1;
					break;
				case 'bottom-left':
					y =
						this.canvasState.dimensions.height -
						watermarkHeight -
						1;
					break;
				case 'bottom-right':
					x = this.canvasState.dimensions.width - watermarkWidth - 1;
					y =
						this.canvasState.dimensions.height -
						watermarkHeight -
						1;
					break;
				case 'center':
					x =
						(this.canvasState.dimensions.width - watermarkWidth) /
						2;
					y =
						(this.canvasState.dimensions.height - watermarkHeight) /
						2;
					break;
			}
			ctx.drawImage(img, x, y, watermarkWidth, watermarkHeight);

			ctx.restore();
		} catch (error) {
			console.error('Error rendering watermark:', error);
		}
	}
	async exportToImage(
		format: 'image/png' | 'image/jpeg' = 'image/png'
	): Promise<void> {
		if (!this.mainCanvasRef.current) {
			return;
		}

		try {
			let sourceX = 0;
			let sourceY = 0;
			let sourceWidth = this.canvasState.dimensions.width;
			let sourceHeight = this.canvasState.dimensions.height;

			if (this.cropState.visibleArea) {
				const { x, y, width, height } = this.cropState.visibleArea;
				sourceX = x;
				sourceY = y;
				sourceWidth = width;
				sourceHeight = height;
			}
			let finalWidth = sourceWidth;
			let finalHeight = sourceHeight;
			if (this.browserFrameState.isEnabled) {
				if (
					(this.browserFrameState.style === 'mac' ||
						this.browserFrameState.style === 'windows') &&
					!this.checkMinimumWidthForBrowserFrame()
				) {
					return;
				}

				let frameHeight = 0;

				if (this.browserFrameState.style === 'mac') {
					frameHeight = 69;
				} else if (this.browserFrameState.style === 'windows') {
					frameHeight = 77;
				} else if (
					this.browserFrameState.style === 'url-top' ||
					this.browserFrameState.style === 'url-bottom'
				) {
					frameHeight = 30;
				}

				finalHeight += frameHeight;
			} else if (this.paddingState.isEnabled) {
				const paddingSize = this.paddingState.size;
				finalWidth += paddingSize * 2;
				finalHeight += paddingSize * 2;
			}
			const finalCanvas = document.createElement('canvas');
			finalCanvas.width = finalWidth;
			finalCanvas.height = finalHeight;
			const finalCtx = finalCanvas.getContext('2d');

			if (!finalCtx) {
				throw new Error('Failed to get context for final canvas');
			}

			if (this.paddingState.isEnabled) {
				finalCtx.fillStyle = this.paddingState.color;
				finalCtx.fillRect(0, 0, finalWidth, finalHeight);
				finalCtx.drawImage(
					this.mainCanvasRef.current,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight,
					this.paddingState.size,
					this.paddingState.size,
					sourceWidth,
					sourceHeight
				);
			} else if (this.browserFrameState.isEnabled) {
				let frameHeight = 0;
				let contentY = 0;
				if (this.browserFrameState.style === 'mac') {
					frameHeight = 69;
					contentY = frameHeight;
				} else if (this.browserFrameState.style === 'windows') {
					frameHeight = 77;
					contentY = frameHeight;
				} else if (this.browserFrameState.style === 'url-top') {
					frameHeight = 30;
					contentY = frameHeight;
				} else if (this.browserFrameState.style === 'url-bottom') {
					frameHeight = 30;
					contentY = 0;
				}

				finalCtx.drawImage(
					this.mainCanvasRef.current,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight,
					0,
					contentY,
					sourceWidth,
					sourceHeight
				);

				await this.renderBrowserFrame(finalCtx);
			} else {
				finalCtx.drawImage(
					this.mainCanvasRef.current,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight,
					0,
					0,
					sourceWidth,
					sourceHeight
				);
			}

			const blob = await new Promise<Blob | null>((resolve) => {
				finalCanvas.toBlob(
					(resultBlob) => {
						resolve(resultBlob);
					},
					format,
					format === 'image/jpeg' ? 0.9 : undefined
				);
			});

			if (!blob) {
				throw new Error('Failed to create blob');
			}

			const url = URL.createObjectURL(blob);

			const timestamp = Math.floor(Date.now() / 1000);
			const extension = format === 'image/png' ? 'png' : 'jpg';
			const filename = `screenshot_${timestamp}.${extension}`;

			const link = document.createElement('a');
			link.href = url;
			link.download = filename;

			link.click();

			setTimeout(() => URL.revokeObjectURL(url), 100);
		} catch (error) {
			console.error('[Export] Error during export:', error);
		}
	}

	async copyToClipboard(): Promise<void> {
		if (!this.mainCanvasRef.current) {
			console.error('Canvas reference not set');
			return;
		}

		try {
			let sourceX = 0;
			let sourceY = 0;
			let sourceWidth = this.canvasState.dimensions.width;
			let sourceHeight = this.canvasState.dimensions.height;

			if (this.cropState.visibleArea) {
				const { x, y, width, height } = this.cropState.visibleArea;
				sourceX = x;
				sourceY = y;
				sourceWidth = width;
				sourceHeight = height;
			}

			let finalWidth = sourceWidth;
			let finalHeight = sourceHeight;

			if (this.browserFrameState.isEnabled) {
				if (
					(this.browserFrameState.style === 'mac' ||
						this.browserFrameState.style === 'windows') &&
					!this.checkMinimumWidthForBrowserFrame()
				) {
					return;
				}

				let frameHeight = 0;

				if (this.browserFrameState.style === 'mac') {
					frameHeight = 69;
				} else if (this.browserFrameState.style === 'windows') {
					frameHeight = 77;
				} else if (
					this.browserFrameState.style === 'url-top' ||
					this.browserFrameState.style === 'url-bottom'
				) {
					frameHeight = 30;
				}

				finalHeight += frameHeight;
			} else if (this.paddingState.isEnabled) {
				const paddingSize = this.paddingState.size;
				finalWidth += paddingSize * 2;
				finalHeight += paddingSize * 2;
			}

			const finalCanvas = document.createElement('canvas');
			finalCanvas.width = finalWidth;
			finalCanvas.height = finalHeight;
			const finalCtx = finalCanvas.getContext('2d');

			if (!finalCtx) {
				throw new Error('Failed to get context for final canvas');
			}

			if (this.paddingState.isEnabled) {
				finalCtx.fillStyle = this.paddingState.color;
				finalCtx.fillRect(0, 0, finalWidth, finalHeight);

				finalCtx.drawImage(
					this.mainCanvasRef.current,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight,
					this.paddingState.size,
					this.paddingState.size,
					sourceWidth,
					sourceHeight
				);
			} else if (this.browserFrameState.isEnabled) {
				let frameHeight = 0;
				let contentY = 0;

				if (this.browserFrameState.style === 'mac') {
					frameHeight = 69;
					contentY = frameHeight;
				} else if (this.browserFrameState.style === 'windows') {
					frameHeight = 77;
					contentY = frameHeight;
				} else if (this.browserFrameState.style === 'url-top') {
					frameHeight = 30;
					contentY = frameHeight;
				} else if (this.browserFrameState.style === 'url-bottom') {
					frameHeight = 30;
					contentY = 0;
				}

				finalCtx.drawImage(
					this.mainCanvasRef.current,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight,
					0,
					contentY,
					sourceWidth,
					sourceHeight
				);

				await this.renderBrowserFrame(finalCtx);
			} else {
				finalCtx.drawImage(
					this.mainCanvasRef.current,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight,
					0,
					0,
					sourceWidth,
					sourceHeight
				);
			}

			const blob = await new Promise<Blob | null>((resolve) => {
				finalCanvas.toBlob((blob) => {
					resolve(blob);
				}, 'image/png');
			});

			if (!blob) {
				throw new Error('Failed to create blob');
			}

			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': blob,
				}),
			]);
		} catch (error) {
			console.error('Copy to clipboard failed:', error);
		}
	}

	mainCanvasRef: React.RefObject<HTMLCanvasElement | null> = {
		current: null,
	};

	setMainCanvas(canvas: HTMLCanvasElement) {
		this.mainCanvasRef.current = canvas;
	}
	resizeCanvas(newWidth: number, newHeight: number) {
		newWidth = Math.max(1, Math.round(newWidth));
		newHeight = Math.max(1, Math.round(newHeight));

		const { width: oldWidth, height: oldHeight } =
			this.canvasState.dimensions;

		const scaleX = newWidth / oldWidth;
		const scaleY = newHeight / oldHeight;

		this.canvasState.dimensions = { width: newWidth, height: newHeight };

		this.canvasState.layers = this.canvasState.layers.map((layer) => {
			return this.scaleLayer(layer, scaleX, scaleY);
		});

		if (this.mainCanvasRef.current) {
			this.mainCanvasRef.current.width = newWidth;
			this.mainCanvasRef.current.height = newHeight;
		}

		if (this.browserFrameState.isEnabled) {
			this.checkMinimumWidthForBrowserFrame();
		}

		this.saveToHistory();
		this.logCanvasState();
	}
	private scaleLayer(layer: Layer, scaleX: number, scaleY: number): Layer {
		const scaledLayer = { ...layer };

		scaledLayer.transform = {
			...scaledLayer.transform,
			x: Math.round(scaledLayer.transform.x * scaleX),
			y: Math.round(scaledLayer.transform.y * scaleY),
			width: Math.round(scaledLayer.transform.width * scaleX),
			height: Math.round(scaledLayer.transform.height * scaleY),
		};

		if (scaledLayer.transform.center) {
			scaledLayer.transform.center = {
				x: Math.round(scaledLayer.transform.center.x * scaleX),
				y: Math.round(scaledLayer.transform.center.y * scaleY),
			};
		}

		switch (scaledLayer.type) {
			case 'arrow': {
				const arrowLayer = scaledLayer as ArrowLayerData;
				arrowLayer.startPoint = {
					x: Math.round(arrowLayer.startPoint.x * scaleX),
					y: Math.round(arrowLayer.startPoint.y * scaleY),
				};
				arrowLayer.endPoint = {
					x: Math.round(arrowLayer.endPoint.x * scaleX),
					y: Math.round(arrowLayer.endPoint.y * scaleY),
				};
				arrowLayer.controlPoints = arrowLayer.controlPoints.map(
					(point) => ({
						x: Math.round(point.x * scaleX),
						y: Math.round(point.y * scaleY),
					})
				);
				break;
			}
			case 'drawing': {
				const drawingLayer = scaledLayer as DrawingLayerData;
				drawingLayer.points = drawingLayer.points.map((point) => ({
					x: Math.round(point.x * scaleX),
					y: Math.round(point.y * scaleY),
				}));
				break;
			}
			case 'text': {
				break;
			}
			case 'number': {
				break;
			}
			case 'shape': {
				break;
			}
			case 'blur': {
				break;
			}
			case 'image': {
				break;
			}
		}

		return scaledLayer;
	}

	startCropping(x: number, y: number) {
		if (this.cropState.isActive) return;

		if (this.cropState.visibleArea) {
			const relativeX = x;
			const relativeY = y;

			this.cropState = {
				...this.cropState,
				isActive: true,
				startPoint: { x: relativeX, y: relativeY },
				currentPoint: { x: relativeX, y: relativeY },
				previewBounds: {
					x: relativeX,
					y: relativeY,
					width: 0,
					height: 0,
				},
			};
		} else {
			this.cropState = {
				...this.cropState,
				isActive: true,
				startPoint: { x, y },
				currentPoint: { x, y },
				previewBounds: {
					x,
					y,
					width: 0,
					height: 0,
				},
			};
		}
	}

	updateCropping(x: number, y: number) {
		if (!this.cropState.isActive || !this.cropState.startPoint) return;

		this.cropState.currentPoint = { x, y };

		const startX = Math.min(this.cropState.startPoint.x, x);
		const startY = Math.min(this.cropState.startPoint.y, y);
		const width = Math.abs(x - this.cropState.startPoint.x);
		const height = Math.abs(y - this.cropState.startPoint.y);

		this.cropState.previewBounds = {
			x: startX,
			y: startY,
			width,
			height,
		};
	}

	applyCrop() {
		if (!this.cropState.previewBounds) return;

		const { x, y, width, height } = this.cropState.previewBounds;
		if (width <= 0 || height <= 0) {
			this.cancelCrop();
			return;
		}

		if (this.cropState.visibleArea) {
			const prevArea = this.cropState.visibleArea;

			this.cropState.visibleArea = {
				x: prevArea.x + x,
				y: prevArea.y + y,
				width: width,
				height: height,
			};
		} else {
			this.cropState.visibleArea = {
				x,
				y,
				width,
				height,
			};
		}
		this.cropState.isActive = false;
		this.cropState.startPoint = null;
		this.cropState.currentPoint = null;
		this.cropState.previewBounds = undefined;

		if (this.mainCanvasRef.current) {
			const overlayCanvas = document.querySelector(
				'canvas[style*="pointerEvents: none"]'
			) as HTMLCanvasElement;
			if (overlayCanvas) {
				const ctx = overlayCanvas.getContext('2d');
				if (ctx) {
					ctx.clearRect(
						0,
						0,
						overlayCanvas.width,
						overlayCanvas.height
					);
				}
			}
		}

		this.currentTool = 'select';
		this.saveToHistory();
	}
	cancelCrop() {
		this.cropState.isActive = false;
		this.cropState.startPoint = null;
		this.cropState.currentPoint = null;
		this.cropState.previewBounds = undefined;

		if (this.mainCanvasRef.current) {
			const overlayCanvas = document.querySelector(
				'canvas[style*="pointerEvents: none"]'
			) as HTMLCanvasElement;
			if (overlayCanvas) {
				const ctx = overlayCanvas.getContext('2d');
				if (ctx) {
					ctx.clearRect(
						0,
						0,
						overlayCanvas.width,
						overlayCanvas.height
					);
				}
			}
		}

		this.currentTool = 'select';
	}
	resetVisibleArea() {
		if (this.cropState.visibleArea) {
			this.cropState.visibleArea = null;
			this.saveToHistory();
		}
	}

	initCropFromVisibleArea() {
		if (this.cropState.visibleArea) {
			const { x, y, width, height } = this.cropState.visibleArea;

			this.cropState.isActive = true;
			this.cropState.startPoint = { x, y };
			this.cropState.currentPoint = { x: x + width, y: y + height };
			this.cropState.previewBounds = {
				x,
				y,
				width,
				height,
			};
		} else {
			this.cropState.isActive = true;
			this.cropState.startPoint = { x: 0, y: 0 };
			this.cropState.currentPoint = {
				x: this.canvasState.dimensions.width,
				y: this.canvasState.dimensions.height,
			};
			this.cropState.previewBounds = {
				x: 0,
				y: 0,
				width: this.canvasState.dimensions.width,
				height: this.canvasState.dimensions.height,
			};
		}
	}

	startTextArrowDrawing(x: number, y: number) {
		if (this.textArrowState.isDrawing) return;

		this.textArrowState = {
			...this.textArrowState,
			isDrawing: true,
			startPoint: { x, y },
			endPoint: { x, y },
			controlPoints: [],
			previewBounds: {
				x,
				y,
				width: 0,
				height: 0,
			},
			textInput: false,
		};
	}

	updateTextArrowDrawing(x: number, y: number) {
		if (!this.textArrowState.isDrawing || !this.textArrowState.startPoint)
			return;

		this.textArrowState.endPoint = { x, y };

		const startX = Math.min(this.textArrowState.startPoint.x, x);
		const startY = Math.min(this.textArrowState.startPoint.y, y);
		const width = Math.abs(x - this.textArrowState.startPoint.x);
		const height = Math.abs(y - this.textArrowState.startPoint.y);

		this.textArrowState.previewBounds = {
			x: startX,
			y: startY,
			width,
			height,
		};

		if (
			this.textArrowState.arrowType === 'curved' ||
			this.textArrowState.arrowType === 'curvedLine'
		) {
			const startPoint = this.textArrowState.startPoint;

			this.textArrowState.controlPoints = [
				{
					x: startPoint.x + (x - startPoint.x) * 0.25,
					y: startPoint.y + (y - startPoint.y) * 0.25,
				},
				{
					x: startPoint.x + (x - startPoint.x) * 0.75,
					y: startPoint.y + (y - startPoint.y) * 0.75,
				},
			];
		}
	}

	finishTextArrowDrawing() {
		if (
			!this.textArrowState.isDrawing ||
			!this.textArrowState.startPoint ||
			!this.textArrowState.endPoint ||
			!this.textArrowState.previewBounds
		)
			return;

		this.startBatchOperation();

		const bounds = this.textArrowState.previewBounds;

		const relativeStartPoint = {
			x: this.textArrowState.startPoint.x - bounds.x,
			y: this.textArrowState.startPoint.y - bounds.y,
		};

		const relativeEndPoint = {
			x: this.textArrowState.endPoint.x - bounds.x,
			y: this.textArrowState.endPoint.y - bounds.y,
		};

		const relativeControlPoints = this.textArrowState.controlPoints.map(
			(point) => ({
				x: point.x - bounds.x,
				y: point.y - bounds.y,
			})
		);

		const textArrowLayer: TextArrowLayerData = {
			id: uuidv4(),
			type: 'textArrow',
			name: `Text Arrow ${this.canvasState.layers.length + 1}`,
			visible: true,
			locked: false,
			opacity: 1,
			transform: {
				x: bounds.x,
				y: bounds.y,
				width: bounds.width,
				height: bounds.height,
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
			arrowType: this.textArrowState.arrowType,
			startPoint: relativeStartPoint,
			endPoint: relativeEndPoint,
			controlPoints: relativeControlPoints,
			strokeColor: this.textArrowState.strokeColor,
			strokeWidth: this.textArrowState.strokeWidth,
			text: '',
			fontSize: this.textState.fontSize,
			fontFamily: this.textState.fontFamily,
			color: this.textState.color,
		};

		this.addLayer(textArrowLayer);
		this.selectLayer(textArrowLayer.id);
		this.textArrowState.textInput = true;
		this.textState.editingLayerId = textArrowLayer.id;
		this.textState.isEditing = true;
		this.textState.currentText = '';
		this.textState.position = {
			x: this.textArrowState.startPoint.x,
			y: this.textArrowState.startPoint.y,
		};

		const textInput = this.textArrowState.textInput;
		this.textArrowState = {
			...this.textArrowState,
			isDrawing: false,
			startPoint: null,
			endPoint: null,
			controlPoints: [],
			previewBounds: undefined,
			textInput,
		};

		this.endBatchOperation();
	}
	finishTextArrowTextInput() {
		if (!this.textArrowState.textInput || !this.textState.editingLayerId)
			return;

		const layerIndex = this.canvasState.layers.findIndex(
			(layer) => layer.id === this.textState.editingLayerId
		);

		if (layerIndex !== -1) {
			const layer = this.canvasState.layers[layerIndex];
			if (layer.type === 'textArrow') {
				(layer as TextArrowLayerData).text = this.textState.currentText;
				if (this.textState.currentText.trim() === '') {
					this.removeLayer(layer.id);
				}
			}
		}

		this.textState.isEditing = false;
		this.textState.currentText = '';
		this.textState.editingLayerId = null;
		this.textState.position = null;

		this.textArrowState.textInput = false;

		this.currentTool = 'select';

		this.saveToHistory();
	}

	startPageText(x: number, y: number) {
		if (this.pageTextState.isActive) return;

		this.pageTextState = {
			...this.pageTextState,
			isActive: true,
			textInput: true,
		};

		const pageTextLayer: PageTextLayerData = {
			id: uuidv4(),
			type: 'pageText',
			name: `PageText ${this.canvasState.layers.length + 1}`,
			visible: true,
			locked: false,
			opacity: 1,
			transform: {
				x: x - 50,
				y: y - 80,
				width: 100,
				height: 50,
				rotation: 0,
				scale: { x: 1, y: 1 },
			},
			text: '',
			fontSize: this.textState.fontSize,
			fontFamily: this.textState.fontFamily,
			color: '#000000',
			backgroundColor: this.pageTextState.backgroundColor,
		};

		this.addLayer(pageTextLayer);
		this.selectLayer(pageTextLayer.id);

		this.textState.isEditing = true;
		this.textState.currentText = '';
		this.textState.editingLayerId = pageTextLayer.id;
		this.textState.position = { x, y: y - 30 };

		this.textState.color = '#000000';

		return pageTextLayer;
	}

	finishPageTextInput() {
		if (!this.pageTextState.textInput) return;

		if (!this.textState.editingLayerId) {
			const pageTextLayers = this.canvasState.layers.filter(
				(layer) => layer.type === 'pageText'
			);
			if (pageTextLayers.length > 0) {
				const lastPageTextLayer =
					pageTextLayers[pageTextLayers.length - 1];
				this.textState.editingLayerId = lastPageTextLayer.id;
			}
		}

		if (this.textState.editingLayerId) {
			const layerIndex = this.canvasState.layers.findIndex(
				(layer) => layer.id === this.textState.editingLayerId
			);

			if (layerIndex !== -1) {
				const layer = this.canvasState.layers[layerIndex];
				if (layer.type === 'pageText') {
					(layer as PageTextLayerData).text =
						this.textState.currentText;

					if (this.textState.currentText.trim() === '') {
						this.removeLayer(layer.id);
					} else {
						this.canvasState.layers = [...this.canvasState.layers];
					}
				}
			}
		}

		this.textState.isEditing = false;
		this.textState.currentText = '';
		this.textState.editingLayerId = null;
		this.textState.position = null;

		this.pageTextState.textInput = false;
		this.pageTextState.isActive = false;

		this.currentTool = 'select';

		this.saveToHistory();
	}
	updatePaddingState(updates: Partial<PaddingState>): void {
		if (updates.size !== undefined) {
			updates.size = Math.max(0, Math.min(200, updates.size));
		}
		if (updates.isEnabled === true) {
			this.browserFrameState.isEnabled = false;
		}

		Object.assign(this.paddingState, updates);

		if (updates.isEnabled === undefined) {
			this.saveToHistory();
		}

		this.forceCanvasUpdate();
	}
	updateBrowserFrameState(updates: Partial<BrowserFrameState>): void {
		if (updates.isEnabled === true) {
			this.paddingState.isEnabled = false;
			if (!this.browserFrameImages.mac.left) {
				this.loadBrowserFrameImages().then(() => {
					if (this.checkMinimumWidthForBrowserFrame()) {
						Object.assign(this.browserFrameState, updates);
						this.forceCanvasUpdate();
					}
				});
				return;
			}

			if (!this.checkMinimumWidthForBrowserFrame()) {
				return;
			}
		}

		Object.assign(this.browserFrameState, updates);

		if (updates.isEnabled === undefined) {
			this.saveToHistory();
		}

		this.forceCanvasUpdate();
	}

	async renderBrowserFrame(ctx: CanvasRenderingContext2D): Promise<void> {
		if (!this.browserFrameState.isEnabled) {
			return;
		}

		try {
			const { style, showUrl, showDate, url } = this.browserFrameState;
			const contentWidth = ctx.canvas.width;

			if (style === 'url-top' || style === 'url-bottom') {
				this.renderUrlBar(ctx, style, url, showDate, contentWidth);
				return;
			}

			if (
				!this.browserFrameImages.mac.left ||
				!this.browserFrameImages.windows.left
			) {
				await this.loadBrowserFrameImages();
			}

			if (!this.checkMinimumWidthForBrowserFrame()) {
				return;
			}

			const images =
				style === 'mac'
					? this.browserFrameImages.mac
					: this.browserFrameImages.windows;
			if (!images.left || !images.middle || !images.right) {
				console.error('Browser frame images are not loaded properly');
				return;
			}

			const leftImage = images.left;
			const middleImage = images.middle;
			const rightImage = images.right;

			const frameHeight = style === 'mac' ? 69 : 77;
			const yPosition = 0;

			ctx.save();

			ctx.drawImage(leftImage, 0, yPosition);

			const leftWidth = leftImage.width;
			const rightWidth = rightImage.width;
			const middleWidth = contentWidth - leftWidth - rightWidth;

			for (let x = leftWidth; x < leftWidth + middleWidth; x++) {
				ctx.drawImage(middleImage, x, yPosition, 1, frameHeight);
			}

			ctx.drawImage(rightImage, leftWidth + middleWidth, yPosition);

			if (showUrl) {
				this.renderURL(ctx, style, url, contentWidth);
			}

			if (showDate) {
				this.renderDate(ctx, style, contentWidth);
			}

			ctx.restore();
		} catch (error) {
			console.error('Error rendering browser frame:', error);
		}
	}

	private renderUrlBar(
		ctx: CanvasRenderingContext2D,
		style: BrowserStyle,
		url: string,
		showDate: boolean,
		contentWidth: number
	): void {
		ctx.save();

		const barHeight = 30;

		const isTop = style === 'url-top';
		const yPosition = isTop ? 0 : ctx.canvas.height - barHeight;

		ctx.fillStyle = '#000000';
		ctx.fillRect(0, yPosition, contentWidth, barHeight);

		ctx.fillStyle = '#FFFFFF';
		ctx.font = '14px Arial, sans-serif';
		ctx.textBaseline = 'middle';

		let displayText = url;
		if (showDate) {
			const today = new Date();
			const day = String(today.getDate()).padStart(2, '0');
			const month = String(today.getMonth() + 1).padStart(2, '0');
			const year = today.getFullYear();
			const dateText = `${day}/${month}/${year} - `;
			displayText = dateText + url;
		}

		const padding = 10; // Отступ от краев
		const maxWidth = contentWidth - padding * 2;
		const truncatedText = this.truncateText(ctx, displayText, maxWidth);

		ctx.textAlign = 'left';
		ctx.fillText(truncatedText, padding, yPosition + barHeight / 2);

		ctx.restore();
	}
	private renderURL(
		ctx: CanvasRenderingContext2D,
		style: BrowserStyle,
		url: string,
		contentWidth: number
	): void {
		ctx.save();

		let leftOffset: number;
		let bottomOffset: number;
		let rightOffset: number;
		let fontFamily: string;

		if (style === 'mac') {
			leftOffset = 110;
			bottomOffset = 11;
			rightOffset = 90;
			fontFamily =
				"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
			ctx.fillStyle = '#333333';
			ctx.font = `13px ${fontFamily}`;
		} else {
			leftOffset = 125;
			bottomOffset = 9;
			rightOffset = 111;
			fontFamily = "'Segoe UI', Tahoma, sans-serif";
			ctx.fillStyle = '#000000';
			ctx.font = `14px ${fontFamily}`;
		}

		const frameHeight = style === 'mac' ? 69 : 77;
		const maxWidth = contentWidth - leftOffset - rightOffset;

		const truncatedUrl = this.truncateText(ctx, url, maxWidth);

		ctx.textBaseline = 'bottom';
		ctx.fillText(truncatedUrl, leftOffset, frameHeight - bottomOffset);

		ctx.restore();
	}

	private truncateText(
		ctx: CanvasRenderingContext2D,
		text: string,
		maxWidth: number
	): string {
		const ellipsis = '...';
		const ellipsisWidth = ctx.measureText(ellipsis).width;

		if (ctx.measureText(text).width <= maxWidth) {
			return text;
		}

		let truncatedText = text;
		while (truncatedText.length > 0) {
			truncatedText = truncatedText.substring(
				0,
				truncatedText.length - 1
			);
			if (
				ctx.measureText(truncatedText).width + ellipsisWidth <=
				maxWidth
			) {
				return truncatedText + ellipsis;
			}
		}

		return ellipsis;
	}

	private renderDate(
		ctx: CanvasRenderingContext2D,
		style: BrowserStyle,
		contentWidth: number
	): void {
		ctx.save();

		const today = new Date();
		const day = String(today.getDate()).padStart(2, '0');
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const year = today.getFullYear();
		const dateText = `${day}/${month}/${year}`;

		let fontFamily: string;

		if (style === 'mac') {
			fontFamily =
				"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
			ctx.fillStyle = '#666666';
			ctx.font = `12px ${fontFamily}`;
		} else {
			fontFamily = "'Segoe UI', Tahoma, sans-serif";
			ctx.fillStyle = '#555555';
			ctx.font = `12px ${fontFamily}`;
		}

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(dateText, contentWidth / 2, 28);

		ctx.restore();
	}

	browserFrameCanvasRef: React.RefObject<HTMLCanvasElement | null> = {
		current: null,
	};

	renderBrowserFramePreview = useCallback(() => {
		const browserFrameCanvas = this.browserFrameCanvasRef.current;
		const ctx = browserFrameCanvas?.getContext('2d');
		if (!browserFrameCanvas || !ctx) {
			return;
		}

		const { browserFrameState, cropState, canvasState } = this;

		browserFrameCanvas.width = 0;
		browserFrameCanvas.height = 0;

		if (!browserFrameState.isEnabled) {
			return;
		}

		const contentWidth = cropState.visibleArea
			? cropState.visibleArea.width
			: canvasState.dimensions.width;

		const contentHeight = cropState.visibleArea
			? cropState.visibleArea.height
			: canvasState.dimensions.height;

		let frameHeight = 0;
		let contentY = 0;

		if (browserFrameState.style === 'mac') {
			frameHeight = 69;
			contentY = frameHeight;
		} else if (browserFrameState.style === 'windows') {
			frameHeight = 77;
			contentY = frameHeight;
		} else if (browserFrameState.style === 'url-top') {
			frameHeight = 30;
			contentY = frameHeight;
		} else if (browserFrameState.style === 'url-bottom') {
			frameHeight = 30;
			contentY = 0;
		}

		if (
			(browserFrameState.style === 'mac' ||
				browserFrameState.style === 'windows') &&
			(!this.browserFrameImages.mac.left ||
				!this.browserFrameImages.windows.left)
		) {
			this.loadBrowserFrameImages().then(() => {
				this.renderBrowserFramePreview();
			});
			return;
		}

		if (
			(browserFrameState.style === 'mac' ||
				browserFrameState.style === 'windows') &&
			!this.checkMinimumWidthForBrowserFrame()
		) {
			return;
		}

		const totalWidth = contentWidth;
		const totalHeight = contentHeight + frameHeight;

		browserFrameCanvas.width = totalWidth;
		browserFrameCanvas.height = totalHeight;

		if (cropState.visibleArea) {
			const { x, y, width, height } = cropState.visibleArea;

			ctx.drawImage(
				this.mainCanvasRef.current!,
				x,
				y,
				width,
				height,
				0,
				contentY,
				width,
				height
			);
		} else {
			ctx.drawImage(
				this.mainCanvasRef.current!,
				0,
				0,
				canvasState.dimensions.width,
				canvasState.dimensions.height,
				0,
				contentY,
				canvasState.dimensions.width,
				canvasState.dimensions.height
			);
		}

		this.renderBrowserFrame(ctx);
	}, []);
}
