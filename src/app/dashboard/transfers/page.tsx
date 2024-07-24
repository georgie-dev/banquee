'use client'
import React, { useState } from 'react'
import TransactionHistory from '../TransactionHistory'
import ValidatePin from './ValidatePin'

const Transfers = () => {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    const [input, setInput] = useState({
        from: '',
        to: '',
        amount: '',
        description:''
    })
    const [error, setError] = useState('')
    const [pin, setPin] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput((values) => ({ ...values, [name]: value }))
        setError('')

        if(name==='to' && value.length < 12){
            setError('Enter valid Account number')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPin(true)
    }

    return (
        <main className='flex flex-col gap-14 p-1'>
            <div className='border p-4 rounded-md flex flex-col gap-8'>
                <div className='flex flex-col gap-0 dm-sans-normal'>
                    <h2 className='text-2xl font-semibold'>Transfer Funds</h2>
                    <small className='text-gray-400 text-sm'>Send money to your friends, family, or other accounts</small>
                </div>
                <form className=' flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6 p-4'>
                        <div className='flex flex-col gap-1 dm-sans-normal w-full'>
                            <label className='text-sm font-semibold'>From</label>
                            <select
                                className='w-full p-3 text-sm border rounded-md disabled:text-gray-400'
                                name='from'
                                value={input.from}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Select account</option>
                                <option value={user.accountNumber}>{user.accountNumber}</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1 dm-sans-normal w-full'>
                            <label className='text-sm font-semibold'>To</label>
                            <input
                                className='w-full p-3 text-sm border rounded-md'
                                name='to'
                                type='number'
                                value={input.to}
                                onChange={handleChange}
                                placeholder='Enter recipient account'
                                required
                            />
                            {error && (
                                <small className='text-xs text-red-500'>{error}</small>
                            )}
                        </div>
                        <div className='flex flex-col gap-1 dm-sans-normal w-full'>
                            <label className='text-sm font-semibold'>Amount</label>
                            <input
                                className='w-full p-3 text-sm border rounded-md'
                                name='amount'
                                value={input.amount}
                                type='number'
                                onChange={handleChange}
                                placeholder='Enter amount'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1 dm-sans-normal w-full'>
                            <label className='text-sm font-semibold'>Description (optional)</label>
                            <input
                                className='w-full p-3 text-sm border rounded-md'
                                name='description'
                                type='text'
                                value={input.description}
                                onChange={handleChange}
                                placeholder='Enter description'
                                required
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button type='submit' className='bg-black text-white rounded-md px-4 py-2 font-semibold text-sm'>Transfer</button>
                    </div>
                </form>
            </div>
            <TransactionHistory />
            {pin && <ValidatePin data={input} close={setPin}/>}
        </main>
    )
}

export default Transfers