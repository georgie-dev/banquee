'use client'
import React from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import { FaMoneyBillTransfer, FaMoneyBills } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNav = () => {
    const pathName = usePathname()
    return (
        <div className='w-fit lg:w-80  h-full py-20 px-4 lg:px-14'>
            <div className=' flex flex-col gap-8 dm-sans-normal *:flex *:items-center *:gap-4 *:text-base'>
                <Link href='/dashboard' className={pathName === '/dashboard' ? 'text-primary' : 'text-white lg:text-gray-400'}>
                    <span><MdOutlineDashboard /></span>
                    <span className='hidden lg:block'>Dashboard</span>
                </Link>
                <Link href='/dashboard/transfers' className={pathName.includes('/transfers') ? 'text-primary' : 'text-white lg:text-gray-400'}>
                    <span><FaMoneyBillTransfer /></span>
                    <span className='hidden lg:block'>Transfers</span>
                </Link>
                <Link href='/dashboard/bills' className={pathName.includes('/bills') ? 'text-primary' : 'text-white lg:text-gray-400'}>
                    <span><FaMoneyBills /></span>
                    <span className='hidden lg:block'>Bills</span>
                </Link>
                <Link href='/settings' className={pathName.includes('/settings') ? 'text-primary' : 'text-white lg:text-gray-400'}>
                    <span><CiSettings /></span>
                    <span className='hidden lg:block'>Settings</span>
                </Link>
            </div>
        </div>
    )
}

export default SideNav