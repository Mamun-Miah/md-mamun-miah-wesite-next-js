'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={` ${isActive ? 'bg-yellow-400 text-black' : 'text-[#eefb39]'}`}
    >
      {children}
    </Link>
  )
}

export default NavLink 
