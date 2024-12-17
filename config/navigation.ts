import { Home, Search, Compass, Clapperboard, MessageCircle, Heart, PlusSquare } from 'lucide-react'
import {  LucideIcon } from 'lucide-react'

export interface NavItem {
  icon: LucideIcon
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/option-2' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: Clapperboard, label: 'Reels', href: '/reels' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
  { icon: Heart, label: 'Notifications', href: '/notifications' },
  { icon: PlusSquare, label: 'Create', href: '/create' },
]

