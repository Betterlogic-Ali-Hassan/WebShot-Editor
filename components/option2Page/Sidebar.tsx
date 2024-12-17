"use client";
import { SidebarItem } from "./SidebarItem";
import { navItems } from "@/config/navigation";
import { ProfileButton } from "./ProfileBtn";
import { InstaLogo } from "../svgs";

export function Sidebar() {
  return (
    <aside className='w-[335px] max-[1400px]:w-[244px] h-screen px-3 pt-2 pb-3 flex flex-col  border-r sticky top-0 bg-white'>
      <div className='pt-8 px-3 pb-4 mb-4 w-full'>
        <InstaLogo />
      </div>

      <nav className='flex flex-col '>
        {navItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>

      <ProfileButton imageUrl='/lap.png' />
    </aside>
  );
}
