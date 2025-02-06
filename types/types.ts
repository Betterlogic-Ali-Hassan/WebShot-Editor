export interface Transform {
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	scale: {
		x: number;
		y: number;
	};
	center?: {
		x: number;
		y: number;
	};
}

export type LayerType = 'image' | 'text' | 'shape' | 'drawing';

export interface BaseLayerData {
	id: string;
	type: LayerType;
	name: string;
	visible: boolean;
	locked: boolean;
	opacity: number;
	transform: Transform;
}

export interface ImageLayerData extends BaseLayerData {
	type: 'image';
	src: string;
	originalSize: {
		width: number;
		height: number;
	};
	filters: Filter[];
}

export interface TextLayerData extends BaseLayerData {
	type: 'text';
	content: string;
	fontSize: number;
	fontFamily: string;
	color: string;
	alignment: 'left' | 'center' | 'right';
	bold: boolean;
	italic: boolean;
}

export type Layer =
	| ImageLayerData
	| TextLayerData
	| ShapeLayerData
	| DrawingLayerData;
export interface Filter {
	type: 'brightness' | 'contrast' | 'saturation' | 'blur' | 'grayscale';
	value: number;
}

export interface CanvasState {
	id: string;
	name: string;
	dimensions: {
		width: number;
		height: number;
	};
	backgroundColor: string;
	layers: Layer[];
	selectedLayerIds: string[];
	zoom: number;
}

export interface HistoryState {
	timestamp: number;
	canvasState: CanvasState;
	actionType: string;
	description: string;
}

export type ToolType =
	| 'select'
	| 'move'
	| 'resize'
	| 'rotate'
	| 'text'
	| 'shape'
	| 'crop'
	| 'hand'
	| 'pen'
	| 'blur'
	| 'sticker'
	| 'textArrow'
	| 'number'
	| 'draw';
export interface EditorState {
	currentTool: ToolType;
	isDrawing: boolean;
	isDragging: boolean;
	isResizing: boolean;
	isRotating: boolean;
	startPosition: { x: number; y: number } | null;
}

export type TransformHandleType =
	| 'topLeft'
	| 'topCenter'
	| 'topRight'
	| 'middleLeft'
	| 'middleRight'
	| 'bottomLeft'
	| 'bottomCenter'
	| 'bottomRight';

export interface TransformHandle {
	type: TransformHandleType;
	x: number;
	y: number;
}

export interface SelectionState {
	isSelected: boolean;
	isHovered: boolean;
	isDragging: boolean;
	isTransforming: boolean;
	activeHandle: TransformHandleType | null;
	transformOrigin: { x: number; y: number } | null;
}

export interface EditorState {
	currentTool: ToolType;
	isDrawing: boolean;
	isDragging: boolean;
	isResizing: boolean;
	isRotating: boolean;
	startPosition: { x: number; y: number } | null;
	selection: SelectionState;
}

export interface Bounds {
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
}
export type ShapeType = 'square' | 'roundedSquare' | 'circle' | 'star';

export interface ShapeLayerData extends BaseLayerData {
	type: 'shape';
	shapeType: ShapeType;
	strokeColor: string;
	strokeWidth: number;
	borderRadius?: number;
	points?: { x: number; y: number }[];
}

export interface ShapeDrawingState {
	isDrawing: boolean;
	startPoint: { x: number; y: number } | null;
	currentPoint: { x: number; y: number } | null;
	shapeType: ShapeType;
	strokeColor: string;
	strokeWidth: number;
}

export const TRANSFORM_HANDLE_SIZE = 20;
export const TRANSFORM_HANDLE_HOVER_SIZE = 22;
export const SELECTION_BORDER_WIDTH = 3;
export const HOVER_BORDER_WIDTH = 1;

export type DrawingToolType = 'pencil' | 'brush' | 'highlighter';

export interface DrawingState {
	isDrawing: boolean;
	currentTool: DrawingToolType | null;
	color: string;
	lineWidth: number;
	points: { x: number; y: number }[];
	lastDrawTime: number;
	bounds?: {
		minX: number;
		maxX: number;
		minY: number;
		maxY: number;
	};
	previewBounds?: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
}

export interface DrawingToolParams {
	color: string;
	lineWidth: number;
	opacity: number;
	smoothing: boolean;
}

export interface DrawingLayerData extends BaseLayerData {
	type: 'drawing';
	toolType: DrawingToolType | null;
	points: { x: number; y: number }[];
	params: DrawingToolParams;
}
