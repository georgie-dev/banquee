/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi';
import { CgAdd } from 'react-icons/cg';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';

const QuickActions = () => {
    const buttons= [
        {
            text:'Send Money',
            icon:<HiOutlinePaperAirplane/>,
        },
        {
            text:'Top Up',
            icon:<CgAdd/>,
        },
        {
            text:'Pay Bills',
            icon:<IoWalletOutline/>,
        },
        {
            text:'Withdraw',
            icon:<BiMoneyWithdraw/>,
        },
    ]
    return (
        <div className='flex flex-col gap-4 w-full'>
            <div className='border rounded-lg w-full p-6 flex-none'>
                <div>
                    <h2 className='text-xl font-bold'>Quick Actions</h2>
                    <small className='text-gray-400 text-sm'>Frequently used banking services</small>
                </div>
                <div className='mt-8 grid gap-4 grid-cols-1 md:grid-cols-2'>
                    {buttons.map((item, index) => (
                        <div key={index} className='w-full p-1 flex items-center justify-center gap-3 border rounded'>
                            {item.icon}
                            <small className='text-sm'>{item.text}</small>
                        </div>
                    ))}
                </div>
            </div>
            <div className='border p-6 rounded-md flex flex-col gap-4'>
                <div>
                    <h2 className='text-xl font-bold'>Bill Payments</h2>
                    <small className='text-gray-400 text-sm'>We're working hard to bring you the ability to pay your bills directly through our platform. Stay tuned for updates!</small>
                </div>
                <div className='flex flex-col gap-2 text-center mt-4'>
                    <div className='flex flex-col items-center dm-sans-bold text-4xl text-gray-400 text-center gap-2'>
                        <MdOutlineAccessTime />
                        {/* <h2>Coming Soon</h2> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickActions