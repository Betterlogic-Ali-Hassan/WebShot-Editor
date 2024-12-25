"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 my-1 p-3 rounded-lg transition-colors relative hover:bg-secondary",
        isActive && "font-bold bg-secondary"
      )}
    >
      <Icon className='w-6 h-6 !fill-none text-white' aria-hidden='true' />
      <span className='text-base'>{label}</span>
    </Link>
  );
}
