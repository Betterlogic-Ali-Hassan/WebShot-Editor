import { Cloud } from "@/components/svgs";
import { BsFiletypeJpg, BsFiletypePng } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";

export const exportData = [
  { name: "Upload to Cloud", icon: <Cloud /> },
  { name: "Save as JPG", icon: <BsFiletypeJpg size={24} /> },
  { name: "Save as PNG", icon: <BsFiletypePng size={24} /> },
  { name: "Save as PDF", icon: <FaRegFilePdf size={24} /> },
];
