// utils/toastUtils.ts (or .js)

import { toast } from "sonner";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { X } from "lucide-react";

export const showToast = (message: string = "Settings Saved Successfully") => {
  const toastId = toast(
    <div className='flex items-center justify-between w-full'>
      <div className='flex items-center gap-3'>
        <IoIosCheckmarkCircle size={18} />
        <span>{message}</span>
      </div>
      <span
        className='h-9 w-9 flex items-center ml-[100px] justify-center rounded-full  cursor-pointer icon'
        onClick={() => toast.dismiss(toastId)}
      >
        <X size={18} />
      </span>
    </div>
  );
  setTimeout(() => {
    toast.dismiss(toastId);
  }, 1000000000);
};
