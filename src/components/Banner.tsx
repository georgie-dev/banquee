'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { IoIosCheckmark } from "react-icons/io";
import { FaRegCircleUser, FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { RiLockPasswordLine, RiSecurePaymentFill } from "react-icons/ri";

const Banner = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='w-[85%] min-h-fit my-8 rounded-md p-8 bg-primary flex justify-between items-center'>
            <div className='w-1/2 flex flex-col gap-14'>
                <div className='flex flex-col gap-8'>
                    <div className='*:dm-sans-normal *:font-semibold *:text-white flex flex-col gap-6'>
                        <h1 className=' text-8xl font-medium'>Banking starts here.</h1>
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
                    <Link href='/login' className=' px-4 py-2 rounded-md text-sm font-semibold text-primary bg-white'>Open Account</Link>
                </div>
            </div>
            <div className='w-1/2 p-6'>
                <div className='bg-white rounded-xl shadow-md h-full w-2/3 mx-auto flex flex-col'>
                    <div className='border-b py-3 text-center'>
                        <small className='font-semibold text-base dm-sans-bold text-primary'>Internet Banking Login</small>
                    </div>
                    <form className='py-4 px-7 flex flex-col gap-8'>
                        <div className=' flex flex-col gap-1'>
                            <label className=' dm-sans-bold text-sm text-gray-400'>Username</label>
                            <div className='flex items-center gap-0 border-2 border-gray-400 rounded-md'>
                                <span className='p-3 border-r-2 border-gray-400 rounded-s-md bg-gray-100 text-gray-400'><FaRegCircleUser /></span>
                                <input
                                    name='username'
                                    type='text'
                                    className='w-full h-full text-sm px-2 py-1 rounded-e-md placeholder:text-sm focus-visible:outline-none'
                                    placeholder='Enter Username'
                                />
                            </div>
                        </div>
                        <div className=' flex flex-col gap-1'>
                            <label className=' dm-sans-bold text-sm text-gray-400'>Password</label>
                            <div className='flex items-center gap-0 border-2 border-gray-400 relative rounded-md'>
                                <span className='p-3 border-r-2 border-gray-400 rounded-s-md bg-gray-100 text-gray-400'><RiLockPasswordLine /></span>
                                <input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className='w-full h-full text-sm px-2 py-1 rounded-e-md placeholder:text-sm focus-visible:outline-none'
                                    placeholder='Enter Password'
                                />
                                <div onClick={() => setShowPassword(!showPassword)} className='absolute cursor-pointer right-1 top-3 text-gray-400'>
                                    {showPassword ?
                                        <FaRegEyeSlash />
                                        :
                                        <FaRegEye />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col *:dm-sans-normal  gap-3'>
                        <button type='submit' className='bg-primary text-white text-base font-semibold rounded-md py-3'>Login</button>
                        <Link href='/' className='text-primary text-center font-semibold text-sm'>Forgot Password?</Link>
                        </div>
                        <div className='flex items-center justify-center text-primary dm-sans-normal text-xs gap-2'>
                            <span><RiSecurePaymentFill/></span>
                            <span> 100% Safe and Secure</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Banner