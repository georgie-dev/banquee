'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
    const pathName = usePathname()

    return (
        <div className='w-full px-24 py-4 border-b bg-white sticky grid grid-cols-3 gap-3'>
            <div>
                <Link href='/' className='text-3xl text-primary dm-sans-bold'>banquee.</Link>
            </div>
            <div className='flex items-center justify-center gap-5 *:text-sm *:font-medium hover:*:underline *:underline-offset-8'>
                <Link href='/blog' className={pathName === '/dashboard' ? 'text-primary underline' : 'text-black'}>Dashboard</Link>
                <Link href='/support' className={pathName.includes('/transfers') ? 'text-primary underline' : 'text-black'}>Transfers</Link>
                <Link href='/support' className={pathName.includes('/setting') ? 'text-primary underline' : 'text-black'}>Settings</Link>
            </div>
            <div className='flex items-center dm-sans-normal text-sm justify-end gap-7'>
                <div className='w-12 h-12 p-2 flex items-center justify-center'><FaRegCircleUser /></div>
            </div>
        </div>
    )
}

export default Header