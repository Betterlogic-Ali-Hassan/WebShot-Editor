import { ArrowType, Point } from '@/types/types';

const ARROW_HEAD_SIZE = 15;

export const drawArrow = (
	ctx: CanvasRenderingContext2D,
	startPoint: Point,
	endPoint: Point,
	controlPoints: Point[],
	arrowType: ArrowType,
	strokeColor: string,
	strokeWidth: number
) => {
	ctx.save();
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = strokeWidth;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';

	switch (arrowType) {
		case 'straight':
			drawStraightArrow(ctx, startPoint, endPoint);
			break;
		case 'curved':
			drawCurvedArrow(ctx, startPoint, endPoint, controlPoints);
			break;
		case 'double':
			drawDoubleArrow(ctx, startPoint, endPoint);
			break;
		case 'line':
			drawLine(ctx, startPoint, endPoint);
			break;
		case 'curvedLine':
			drawCurvedLine(ctx, startPoint, endPoint, controlPoints);
			break;
		case 'dashed':
			drawDashedLine(ctx, startPoint, endPoint);
			break;
	}

	ctx.restore();
};

const drawStraightArrow = (
	ctx: CanvasRenderingContext2D,
	start: Point,
	end: Point
) => {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.stroke();

	drawArrowHead(ctx, start, end);
};

const drawCurvedArrow = (
	ctx: CanvasRenderingContext2D,
	start: Point,
	end: Point,
	controlPoints: Point[]
) => {
	if (controlPoints.length < 2) return;

	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.bezierCurveTo(
		controlPoints[0].x,
		controlPoints[0].y,
		controlPoints[1].x,
		controlPoints[1].y,
		end.x,
		end.y
	);
	ctx.stroke();

	const lastControlPoint = controlPoints[1];
	drawArrowHead(ctx, lastControlPoint, end);
};

const drawDoubleArrow = (
	ctx: CanvasRenderingContext2D,
	start: Point,
	end: Point
) => {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.stroke();
	drawArrowHead(ctx, start, end);
	drawArrowHead(ctx, end, start);
};

const drawLine = (ctx: CanvasRenderingContext2D, start: Point, end: Point) => {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.stroke();
};

const drawCurvedLine = (
	ctx: CanvasRenderingContext2D,
	start: Point,
	end: Point,
	controlPoints: Point[]
) => {
	if (controlPoints.length < 2) return;

	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.bezierCurveTo(
		controlPoints[0].x,
		controlPoints[0].y,
		controlPoints[1].x,
		controlPoints[1].y,
		end.x,
		end.y
	);
	ctx.stroke();
};

const drawDashedLine = (
	ctx: CanvasRenderingContext2D,
	start: Point,
	end: Point
) => {
	const circleRadius = ctx.lineWidth / 2;
	const spacing = ctx.lineWidth * 2;

	const dx = end.x - start.x;
	const dy = end.y - start.y;
	const length = Math.sqrt(dx * dx + dy * dy);

	const dotCount = Math.floor(length / spacing) + 1;

	const unitX = dx / length;
	const unitY = dy / length;

	ctx.save();

	ctx.fillStyle = ctx.strokeStyle;

	for (let i = 0; i < dotCount; i++) {
		const x = start.x + i * spacing * unitX;
		const y = start.y + i * spacing * unitY;

		ctx.beginPath();
		ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
		ctx.fill();
	}

	ctx.restore();
};

const drawArrowHead = (
	ctx: CanvasRenderingContext2D,
	from: Point,
	to: Point
) => {
	const angle = Math.atan2(to.y - from.y, to.x - from.x);
	const angleOffset = Math.PI / 6;

	ctx.beginPath();
	ctx.moveTo(to.x, to.y);
	ctx.lineTo(
		to.x - ARROW_HEAD_SIZE * Math.cos(angle - angleOffset),
		to.y - ARROW_HEAD_SIZE * Math.sin(angle - angleOffset)
	);
	ctx.moveTo(to.x, to.y);
	ctx.lineTo(
		to.x - ARROW_HEAD_SIZE * Math.cos(angle + angleOffset),
		to.y - ARROW_HEAD_SIZE * Math.sin(angle + angleOffset)
	);
	ctx.stroke();
};
