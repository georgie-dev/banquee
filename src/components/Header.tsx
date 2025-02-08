'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaPowerOff, FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from '@/lib/authProvider';
import { UserData } from '@/lib/authProvider';

const Header = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const { user, logout } = useAuth()

    useEffect(() => {
        const userJson = sessionStorage.getItem('userData');
        const parsedUserData: UserData | null = userJson ? JSON.parse(userJson) : null;
        setUserData(parsedUserData);
    }, [user]);


    return (
        <div className='sticky top-0 z-50 m-0 bg-white'>
            <div className='w-full px-4 py-2 border-b bg-white box-border flex items-center justify-between'>
                <div>
                    <Link href='/' className='text-2xl text-primary font-bold dm-sans-bold'>banquee.</Link>
                </div>
                <div className='flex items-center relative dm-sans-normal justify-end gap-4'>
                    <div className='flex items-center gap-0'>
                        <div className='w-12 h-12 flex items-center justify-center'><FaRegCircleUser /></div>
                        <div className='font-semibold text-black text-sm'>{userData?.firstName}</div>
                    </div>
                        <button onClick={logout} className='w-10 h-10 flex items-center text-sm justify-center'><FaPowerOff /></button>
                </div>
            </div>
        </div>
    )
}

export default Header