import { CanvasStore } from './canvasStore';

export class RootStore {
	canvasStore: CanvasStore;

	constructor() {
		this.canvasStore = new CanvasStore();
	}
}
