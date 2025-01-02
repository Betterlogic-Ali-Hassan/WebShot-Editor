import InputWithBtn from "@/components/editor/InputWithBtn";
import CaptureSelect from "@/components/optionsPage/capture/CaptureSelect";
import SwitchToggle from "@/components/SwitchToogle";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
interface Props {
  setVideoQualityPage: (videoQualityPage: boolean) => void;
  setRecord: (record: boolean) => void;
}
const resolutions = [
  {
    label: "Auto",
    value: "Default resolution",
  },
  {
    label: "420p",
    value: "Standard resolution",
  },
  {
    label: "720p",
    value: "High Definition",
  },
  {
    label: "1080p",
    value: "Full High Definition",
  },
  {
    label: "1440p",
    value: "Quad High Definition",
  },
  {
    label: "2160p",
    value: "Ultra High Definition (4K)",
  },
];

const VideoQuality = ({ setVideoQualityPage, setRecord }: Props) => {
  return (
    <div>
      <h2 className='font-semibold py-1 flex items-center gap-2'>
        <span
          onClick={() => {
            setVideoQualityPage(false);
            setRecord(true);
          }}
          className='cursor-pointer opacity-50 hover:opacity-100'
        >
          <GoArrowLeft size={22} />
        </span>
        Video Setting
      </h2>
      <CaptureSelect
        options={resolutions}
        title='Video and Audio Quality'
        defaultValue='Auto'
        custom
      />
      <div className='flex items-center justify-between '>
        <label className='text-sm'>Countdown</label>
        <InputWithBtn val={0} className='max-w-[75px]' />
      </div>
      <SwitchToggle title='Click animation' custom checked />
    </div>
  );
};

export default VideoQuality;
