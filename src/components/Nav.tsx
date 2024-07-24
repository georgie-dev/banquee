'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Nav = () => {
  const pathName = usePathname()

  return (
    <div className='sticky top-0 z-50 m-0'>
      <div className='w-full px-24 py-4 border-b bg-white box-border md:grid md:grid-cols-3 flex justify-between items-center gap-3'>
        <div>
          <Link href='/' className='text-3xl text-primary dm-sans-bold'>banquee.</Link>
        </div>
        <div className='flex items-center justify-center gap-5 *:text-sm *:font-medium hover:*:underline *:underline-offset-8'>
          <Link href='/blog' className={pathName.includes('/blog') ? 'text-primary underline' : 'text-black'}>Blog</Link>
          <Link href='/support' className={pathName.includes('/support') ? 'text-primary underline' : 'text-black'}>Support</Link>
        </div>
        <div className='md:flex items-center dm-sans-normal hidden text-sm justify-end gap-7'>
          <Link href='/sign-up' className=' px-4 py-2 rounded-md text-white bg-primary'>Open Account</Link>
        </div>
      </div>
    </div>
  )
}

export default Nav