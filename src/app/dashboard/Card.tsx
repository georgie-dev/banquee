'use client'
import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { UserData } from '@/components/data';

const Card = () => {
    const [showValue, setShowValue] = useState(false)
    const userJson = sessionStorage.getItem('userData');
    const user: UserData | null = userJson ? JSON.parse(userJson) : null;

    return (

        <div className='w-full rounded-md shadow-md px-5 py-4 bg-primary text-white dm-sans-normal flex flex-col gap-10'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl dm-sans-bold'>Acct. No</h2>
                <h3 className='text-lg'>{user?.accountNumber}</h3>
            </div>
            <div className='flex-col flex gap-2'>
                <h2 className='text-xl font-semibold'>Total Balance</h2>
                <div className='flex items-center gap-10'>
                    <h3 className=' text-gray-200 font-semibold text-xl w-1/2'>{showValue ? `$${user?.balance}` : '****'}</h3>
                    <button onClick={() => setShowValue(!showValue)} className='text-xl'>{showValue ? <FaRegEyeSlash /> : <FaRegEye />}</button>
                </div>
            </div>
        </div>
    )
}

export default Card