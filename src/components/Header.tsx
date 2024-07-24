'use client'
import React, {useState, useEffect} from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useAuth } from '@/lib/authProvider';
import { UserData } from './data';

const Header = () => {
    const pathName = usePathname()
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const userJson = sessionStorage.getItem('userData');
        const parsedUserData: UserData | null = userJson ? JSON.parse(userJson) : null;
        setUser(parsedUserData);
    }, []);
    
    const { logout } = useAuth()

    return (
        <div className='sticky top-0 z-50 m-0 bg-red-400'>
            <div className='w-full px-4 lg:px-24 py-4 border-b bg-white box-border lg:grid flex items-center justify-between lg:grid-cols-3 lg:gap-3'>
                <div>
                    <Link href='/' className='text-3xl text-primary dm-sans-bold'>banquee.</Link>
                </div>
                <div className='lg:flex items-center hidden justify-center gap-5 *:text-sm *:font-medium hover:*:underline *:underline-offset-8'>
                    <Link href='/dashboard' className={pathName === '/dashboard' ? 'text-primary underline' : 'text-black'}>Dashboard</Link>
                    <Link href='/dashboard/transfers' className={pathName.includes('/transfers') ? 'text-primary underline' : 'text-black'}>Transfers</Link>
                    <Link href='/dashboard/bills' className={pathName.includes('/bills') ? 'text-primary underline' : 'text-black'}>Bills</Link>
                    <Link href='/dashboard/settings' className={pathName.includes('/setting') ? 'text-primary underline' : 'text-black'}>Settings</Link>
                </div>
                <div className='flex items-center relative dm-sans-normal justify-end gap-4'>
                    <div className='dropdown'>
                        <div className='w-fit p-2 flex dropbtn text-black items-center gap-1 hover:bg-gray-100'>
                            <div className='w-12 h-12 p-2 flex items-center justify-center'><FaRegCircleUser /></div>
                            <div className='font-semibold text-black text-sm'>{user?.firstName}</div>
                        </div>
                        <div className='dropdown-content'>
                            <button onClick={logout} className='rounded-md bottom-0 p-1 flex items-center text-sm'>
                                <AiOutlinePoweroff />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header