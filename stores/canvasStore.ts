import { makeAutoObservable } from 'mobx';

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
} from '@/types/types';

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
	currentTool: ToolType = 'select';

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
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
			id: crypto.randomUUID(),
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
		this.logCanvasState();
	}

	removeLayer(layerId: string) {
		this.canvasState.layers = this.canvasState.layers.filter(
			(layer) => layer.id !== layerId
		);
		if (this.canvasState.selectedLayerIds.includes(layerId)) {
			this.clearSelection();
		}
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
		this.logCanvasState();
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
		this.logCanvasState();
	}

	logCanvasState() {
		// console.log("Canvas state:", JSON.parse(JSON.stringify(this.canvasState)));
		// console.log(
		//   "Selection state:",
		//   JSON.parse(JSON.stringify(this.selectionState))
		// );
	}

	dragState = {
		isDragging: false,
		startPosition: { x: 0, y: 0 },
		currentPosition: { x: 0, y: 0 },
	};

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

		this.updateLayer(selectedLayer.id, {
			x: selectedLayer.transform.x + dx,
			y: selectedLayer.transform.y + dy,
		});

		this.dragState.currentPosition = { x, y };

		this.canvasState.layers = [...this.canvasState.layers];
	}

	endDragging() {
		this.dragState.isDragging = false;
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

		const shapeLayer: ShapeLayerData = {
			id: crypto.randomUUID(),
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
		this.logCanvasState();
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
		}
		this.logCanvasState();
	}

	setShapeStrokeWidth(width: number) {
		this.shapeDrawingState.strokeWidth = width;

		const selectedLayer = this.getSelectedLayer();
		if (selectedLayer && selectedLayer.type === 'shape') {
			selectedLayer.strokeWidth = width;
		}
		this.logCanvasState();
	}

	resetTool() {
		if (this.currentTool === 'select' || this.shapeDrawingState.isDrawing) {
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
			id: crypto.randomUUID(),
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

		return numberLayer;
	}
}
