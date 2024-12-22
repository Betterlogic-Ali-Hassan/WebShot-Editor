import { toast } from "sonner";
import { X } from "lucide-react";

export const showToast = (message: React.ReactNode) => {
  const toastId = toast(
    <>
      {message}
      <button
        className='h-9 w-9 flex items-center justify-center rounded-full cursor-pointer icon absolute top-2 right-2'
        onClick={() => toast.dismiss(toastId)}
      >
        <X size={18} />
      </button>
    </>
  );

  setTimeout(() => {
    toast.dismiss(toastId);
  }, 2000);
};
