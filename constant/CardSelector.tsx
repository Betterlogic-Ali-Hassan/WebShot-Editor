import ArrowSelector from "@/components/editor/Selectors/arrowSelector/ArrowSelector";
import BlurSelector from "@/components/editor/Selectors/blurSelector/BlurSelector";
import BorderSelector from "@/components/editor/Selectors/borderSelector/BorderSelector";
import CropSelector from "@/components/editor/Selectors/cropSelector/CropSelector";
import ExportSelector from "@/components/editor/Selectors/exportSelector/ExportSelector";
import ImgSelector from "@/components/editor/Selectors/imageSelector/ImgSelector";
import NumberSelector from "@/components/editor/Selectors/numberSelector/NumberSelector";
import PenSelector from "@/components/editor/Selectors/penSelector/PenSelector";
import ResizerSelector from "@/components/editor/Selectors/resizer/ResizerSelector";
import RevisionContent from "@/components/editor/Selectors/Revision/RevisionContent";
import ShapeSelector from "@/components/editor/Selectors/shapeSelector/ShapeSelector";
import StickersSelector from "@/components/editor/Selectors/stickersSelector/StickersSelector";
import TextArrowSelector from "@/components/editor/Selectors/textArrow/TextArrowSelector";

import TextSelector from "@/components/editor/Selectors/textSelector/TextSelector";
import WaterMarkSelector from "@/components/editor/Selectors/watermarkSelector/WaterMarkSelector";
import ZoomSelector from "@/components/editor/Selectors/zoomSelector/ZoomSelector";

export const selectors = [
  { component: ImgSelector, id: 1, selection: false },
  { component: ZoomSelector, id: 2, selection: false },
  { component: ResizerSelector, id: 3, selection: false },
  { component: CropSelector, id: 4, selection: true },
  { component: PenSelector, id: 5, selection: true },
  { component: ShapeSelector, id: 6, selection: true },
  { component: ArrowSelector, id: 7, selection: true },
  { component: TextArrowSelector, id: 16, selection: true },
  { component: TextSelector, id: 8, selection: true },
  { component: NumberSelector, id: 9, selection: true },
  { component: StickersSelector, id: 10, selection: true },
  { component: BlurSelector, id: 11, selection: true },
  { component: BorderSelector, id: 12, selection: false },
  { component: WaterMarkSelector, id: 13, selection: false },
  { component: RevisionContent, id: 14, selection: false },
  { component: ExportSelector, id: 15, selection: false },
];
