"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileButtonProps {
  imageUrl: string;
}

export function ProfileButton({ imageUrl }: ProfileButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/profile")}
      className='flex items-center gap-4 my-1 p-3 rounded-lg transition-colors relative hover:bg-gray-100 '
    >
      <div className='w-6 h-6 rounded-full bg-gray-200 overflow-hidden'>
        <Image
          src={imageUrl}
          alt=''
          width={24}
          height={24}
          className='w-full h-full object-cover'
        />
      </div>
      <span className='text-base'>Profile</span>
    </button>
  );
}
