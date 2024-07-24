/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { MdOutlineAccessTime } from "react-icons/md";

const page = () => {
    return (
        <main className=' px-2 py-8'>
            <div className='border p-4 rounded-md flex flex-col gap-20'>
                <div className='flex flex-col gap-0 dm-sans-normal'>
                    <h2 className='text-2xl font-semibold'>Coming Soon: Bill Payment</h2>
                    <small className='text-gray-400 text-sm'>We're working hard to bring you the ability to pay your bills directly through our platform. Stay tuned for updates!</small>
                </div>
                <div className='flex flex-col gap-2 text-center py-14'>
                    <div className='flex flex-col items-center dm-sans-bold text-4xl text-center gap-2'>
                        <MdOutlineAccessTime />
                        <h2>Coming Soon</h2>
                    </div>
                    <small className='text-gray-400 text-base'>Our bill payment feature is currently in development. We'll let you know as soon as it's ready to use.</small>
                </div>
            </div>
        </main>
    )
}

export default page