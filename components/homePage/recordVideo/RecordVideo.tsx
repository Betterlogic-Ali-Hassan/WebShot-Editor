import OptionPageSwitch from "@/components/optionsPage/OptionPageSwitch";
import { CaptureTool } from "@/components/svgs";
import { setting } from "@/constant/RecordSetting";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
interface Props {
  setRecord: (record: boolean) => void;
}
const RecordVideo = ({ setRecord }: Props) => {
  return (
    <div>
      <span className='pb-4 flex items-center justify-center '>
        <CaptureTool />
      </span>
      <div className='border-t pt-2'>
        <h2 className='font-semibold py-1 flex items-center gap-2'>
          <span
            onClick={() => setRecord(false)}
            className='cursor-pointer opacity-50 hover:opacity-100'
          >
            <GoArrowLeft size={22} />
          </span>
          Record Video
        </h2>
        {setting.map((item, i) => (
          <OptionPageSwitch key={i} label={item.feature} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};

export default RecordVideo;
