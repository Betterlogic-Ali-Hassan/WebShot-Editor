import { ShapeType } from '@/types/types';

interface DrawShapeParams {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	width: number;
	height: number;
	strokeColor: string;
	strokeWidth: number;
}

export const drawSquare = ({
	ctx,
	x,
	y,
	width,
	height,
	strokeColor,
	strokeWidth,
}: DrawShapeParams) => {
	ctx.beginPath();
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = strokeWidth;
	ctx.rect(x, y, width, height);
	ctx.stroke();
};

export const drawRoundedSquare = ({
	ctx,
	x,
	y,
	width,
	height,
	strokeColor,
	strokeWidth,
}: DrawShapeParams) => {
	ctx.beginPath();
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = strokeWidth;

	const radius = Math.min(width, height) * 0.1;

	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.arcTo(x + width, y, x + width, y + radius, radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
	ctx.lineTo(x + radius, y + height);
	ctx.arcTo(x, y + height, x, y + height - radius, radius);
	ctx.lineTo(x, y + radius);
	ctx.arcTo(x, y, x + radius, y, radius);

	ctx.stroke();
};

export const drawCircle = ({
	ctx,
	x,
	y,
	width,
	height,
	strokeColor,
	strokeWidth,
}: DrawShapeParams) => {
	ctx.beginPath();
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = strokeWidth;

	const centerX = x + width / 2;
	const centerY = y + height / 2;
	const radius = Math.min(width, height) / 2;

	ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
	ctx.stroke();
};

export const drawStar = ({
	ctx,
	x,
	y,
	width,
	height,
	strokeColor,
	strokeWidth,
}: DrawShapeParams) => {
	ctx.beginPath();
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = strokeWidth;

	const centerX = x + width / 2;
	const centerY = y + height / 2;
	const outerRadius = Math.min(width, height) / 2;
	const innerRadius = outerRadius * 0.4;
	const points = 5;

	ctx.moveTo(centerX, y);

	for (let i = 0; i < points * 2; i++) {
		const radius = i % 2 === 0 ? outerRadius : innerRadius;
		const angle = (i * Math.PI) / points;
		const pointX = centerX + radius * Math.sin(angle);
		const pointY = centerY - radius * Math.cos(angle);
		ctx.lineTo(pointX, pointY);
	}

	ctx.closePath();
	ctx.stroke();
};

export const drawShape = (
	params: DrawShapeParams & { shapeType: ShapeType }
) => {
	const { shapeType, ...restParams } = params;

	switch (shapeType) {
		case 'square':
			drawSquare(restParams);
			break;
		case 'roundedSquare':
			drawRoundedSquare(restParams);
			break;
		case 'circle':
			drawCircle(restParams);
			break;
		case 'star':
			drawStar(restParams);
			break;
	}
};
