import OptionPageSwitch from "@/components/optionsPage/OptionPageSwitch";
import { setting } from "@/constant/RecordSetting";
import React from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
interface Props {
  setRecord: (record: boolean) => void;
  webCam: boolean;
}
const RecordVideo = ({ setRecord, webCam }: Props) => {
  return (
    <div>
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
        {webCam ? (
          <OptionPageSwitch
            label='Record Mic Sound'
            icon={<AiOutlineAudio size={22} />}
          />
        ) : (
          setting.map((item, i) => (
            <OptionPageSwitch key={i} label={item.feature} icon={item.icon} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecordVideo;
