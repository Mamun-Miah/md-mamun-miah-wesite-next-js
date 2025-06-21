'use client'
import LoadingIndicator from '../ui/loading-indicator';
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={` ${isActive ? 'bg-stone-700 text-white' : 'text-[#ffffff]'}`}
    >
      {children}<LoadingIndicator />  
    </Link>
  )
}

export default NavLink 
