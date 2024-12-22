import ShareLink from "@/components/editor/Selectors/exportSelector/ShareLink";
import { Cloud } from "@/components/svgs";
import { BsFiletypeJpg, BsFiletypePng } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa6";

export const exportData = [
  {
    name: "Save as JPG",
    icon: <BsFiletypeJpg size={24} />,
    border: false,
    toast: (
      <div className='w-full relative py-3'>
        <h2>Setting Saved Successfully</h2>
      </div>
    ),
  },
  {
    name: "Save as PNG",
    icon: <BsFiletypePng size={24} />,
    border: false,
    toast: (
      <div className='w-full relative py-3'>
        <h2>Setting Saved Successfully</h2>
      </div>
    ),
  },
  {
    name: "Save as PDF",
    icon: <FaRegFilePdf size={24} />,
    border: false,
    toast: (
      <div className='w-full relative py-3'>
        <h2>Setting Saved Successfully</h2>
      </div>
    ),
  },
  {
    name: "Copy to Clipboard",
    icon: <FaRegClipboard size={22} />,
    border: true,
    toast: (
      <div className='w-full relative py-3'>
        <h2>Setting Saved Successfully</h2>
      </div>
    ),
  },
  {
    name: "Upload to Cloud",
    icon: <Cloud />,
    border: false,
    toast: <ShareLink />,
  },
];
