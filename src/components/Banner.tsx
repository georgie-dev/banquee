'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { IoIosCheckmark } from "react-icons/io";
import { FaRegCircleUser, FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { RiLockPasswordLine, RiSecurePaymentFill } from "react-icons/ri";
import Login from './Login';

const Banner = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='w-[85%] min-h-fit my-8 rounded-md p-8 bg-primary flex flex-wrap justify-between items-center'>
            <div className='w-full lg:w-1/2 flex flex-col gap-14'>
                <div className='flex flex-col gap-8'>
                    <div className='*:dm-sans-normal *:font-semibold *:text-white flex flex-col gap-6'>
                        <h1 className=' text-6xl lg:text-8xl font-medium'>Banking starts here.</h1>
                        <h4 className='text-lg'>Eu aliquip ea officia irure do do ad Lorem laboris. Occaecat Lorem incididunt consequat ipsum.</h4>
                    </div>
                    <div className='grid grid-cols-2 gap-4 *:flex *:text-white *:items-center *:gap-3'>
                        <div>
                            <IoIosCheckmark className='w-5 h-5 rounded-full bg-white text-primary' />
                            <small className='text-sm font-semibold'>Instant Transfer</small>
                        </div>
                        <div>
                            <IoIosCheckmark className='w-5 h-5 rounded-full bg-white text-primary' />
                            <small className='text-sm font-semibold'>Payments worldwide</small>
                        </div>
                        <div>
                            <IoIosCheckmark className='w-5 h-5 rounded-full bg-white text-primary' />
                            <small className='text-sm font-semibold'>Safe and secure</small>
                        </div>
                        <div>
                            <IoIosCheckmark className='w-5 h-5 rounded-full bg-white text-primary' />
                            <small className='text-sm font-semibold'>Savings Account</small>
                        </div>
                    </div>
                </div>
                <div>
                    <Link href='/sign-up' className=' px-4 py-2 rounded-md text-sm font-semibold text-primary bg-white'>Open Account</Link>
                </div>
            </div>
            <div className='w-full lg:w-1/2 py-10 px-0 lg:p-6'>
                <div className='bg-white rounded-xl shadow-md h-full w-full md:w-2/3 mx-auto flex flex-col'>
                    <div className='border-b py-3 text-center'>
                        <small className='font-semibold text-base dm-sans-bold text-primary'>Internet Banking Login</small>
                    </div>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default Banner