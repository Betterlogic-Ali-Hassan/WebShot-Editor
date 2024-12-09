import React from "react";
import {
  Select as SelectBase,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Select = () => {
  return (
    <>
      <h2 className='font-medium mb-2 text-[15px]'>Action after the capture</h2>
      <SelectBase>
        <SelectTrigger className='w-full h-[50px] border-border'>
          <SelectValue placeholder='Select Action' />
        </SelectTrigger>
        <SelectContent className='bg-white ' side='top'>
          <SelectItem value='light'>Edit</SelectItem>
          <SelectItem value='dark'>Open uploading window</SelectItem>
          <SelectItem value='system'>Download</SelectItem>
        </SelectContent>
      </SelectBase>
    </>
  );
};

export default Select;
