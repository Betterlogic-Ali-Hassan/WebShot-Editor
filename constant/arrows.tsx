import {
  Arrow,
  CruveArrow,
  DoubleArrow,
  Line,
  LineCruve,
  LineDotted,
} from "../components/svgs";
export const arrows = [
  { name: "Arrow Line", icon: <Arrow /> },
  { name: "Arrow Curve", icon: <CruveArrow height={24} width={20} /> },
  { name: "Double Arrow", icon: <DoubleArrow height={24} width={18} /> },
  { name: "Line", icon: <Line height={24} width={20} /> },
  { name: "Curve Line", icon: <LineCruve height={24} width={20} /> },
  { name: "Dotted Line", icon: <LineDotted height={24} width={20} /> },
];
