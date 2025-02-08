import React from 'react'
import { FaArrowDown, FaArrowUp, FaWallet } from 'react-icons/fa6';
import { UserData } from '@/lib/authProvider';
import QuickActions from './QuickActions';
import { LuLineChart } from 'react-icons/lu';
import Chart from './Chart'

const Overview = ({ userData }: { userData: UserData | null }) => {

    const cards=[
        {
            name:'Total Balance',
            icons:<FaWallet/>,
            value: `$${(userData?.balance)?.toLocaleString()}` || 0
        },
        {
            name:'Monthly Income',
            icons:<FaArrowUp/>,
            color: 'text-green-500',
            value: `$${(userData?.income)?.toLocaleString()}` || 0
        },
        {
            name:'Monthly Expense',
            icons:<FaArrowDown/>,
            color: 'text-red-500',
            value: `$${(userData?.expenses)?.toLocaleString()}` || 0
        },
        {
            name:'Savings',
            icons:<LuLineChart/>,
            value: `${userData?.savings}%`
        },
    ]

    return (
        <div>
            <div className='my-4 flex flex-wrap items-center gap-4'>
                {cards.map((item, index) => (
                    <div key={index} className='border rounded-lg w-full lg:w-[24%] md:w-[48%] p-6 flex-none'>
                        <div className='flex items-center justify-between'>
                            <small className='text-sm font-semibold'>{item.name}</small>
                            <small className={`text-sm ${item?.color ? item.color : 'text-gray-400' }`}>{item.icons}</small>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-lg font-bold'>{item.value}</h2>
                            <small className='text-gray-400'>Acct No: <span>{userData?.accountNumber}</span></small>
                        </div>
                    </div>
                ))}
            </div>
            <div className='my-4 flex flex-wrap-reverse items-stretch gap-4'>
                <div className='border rounded-lg w-full lg:w-3/5 md:w-[48%] p-6 flex-none'>
                    <div>
                        <h2 className='text-xl font-bold'>Spending Overview</h2>
                        <small className='text-gray-400 text-sm'>Your spending patterns over the last 6 months</small>
                    </div>
                    <div className='mt-8'>
                        <Chart/>
                    </div>
                </div>
                <div className='w-full lg:w-[38%] md:w-[48%]'>
                    <QuickActions/>
                </div>
            </div>
        </div>
    )
}

export default Overview