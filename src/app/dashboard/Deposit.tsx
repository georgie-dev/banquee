'use client'
import React, { ChangeEvent, FormEvent, useState} from 'react'
import { useAuth } from '@/lib/authProvider'
import { ref, update } from "firebase/database";
import { db } from '@/lib/firebase';
import { Toast } from '@/components';
import { IoMdClose } from 'react-icons/io';
import { PulseLoader } from 'react-spinners';

const Deposit = ({ close }: { close: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [input, setInput] = useState({
        to: '',
        amount: '',
        description: '',
        type: 'Withdrawal'
    })
    const [loading, setLoading] = useState(false)
    const { user, userData, fetchUserData } = useAuth()

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setInput((values) => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        if (!userData) return;

        const newTransaction = {
            id: `${Date.now()}`,
            to: input.to,
            amount: parseFloat(input.amount),
            description: input.description,
            type: 'Deposit',
        };

        const updatedBalance = (userData?.balance || 0) + parseFloat(input.amount);
        const updatedIncome = (userData?.income || 0) + parseFloat(input.amount);
        const userRef = ref(db, `users/${user?.uid}`);

        const updates = {
            [`transactions/${newTransaction.id}`]: newTransaction,
            balance: updatedBalance,
            income: updatedIncome,
        };

        try {
            await update(userRef, updates);
            Toast.fire({
                icon: "success",
                title: "Deposit successful!",
                background: "#5BB5A2",
            });
            fetchUserData()
        } catch (error) {
            console.error("Error updating database:", error);
            Toast.fire({
                icon: "error",
                title: "Transaction failed. Please try again.",
                background: "#D84646",
            });
        } finally {
            close((prev: boolean) => !prev)
            setLoading(false)
        }
    };


    return (
        <div className="fixed inset-0 z-50 overflow-y-auto mx-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white dark:bg-secondary-dark-bg rounded-md shadow-lg">
                    <div className='flex justify-between items-center'>
                        <div className="flex flex-col w-full gap-1">
                            <header className="font-semibold text-lg dm-sans-normal">Deposit</header>
                            <small className='text-gray-400 text-sm'>Add money to your account</small>
                        </div>
                        <IoMdClose onClick={() => { close((prev: boolean) => !prev) }} />
                    </div>
                    <form className=' flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6 p-4'>
                            <div className='flex flex-col gap-1 dm-sans-normal w-full'>
                                <label className='text-sm font-semibold'>Account</label>
                                <select
                                    className='w-full p-3 text-sm border rounded-md disabled:text-gray-400'
                                    name='to'
                                    value={input.to}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value='' disabled>Select account</option>
                                    <option value={userData?.accountNumber}>Account 1 - {userData?.accountNumber}</option>
                                </select>
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
                        <div className='w-full flex justify-end'> <button
                            type='submit'
                            className='bg-primary text-white w-full rounded-md px-4 py-2 font-semibold text-sm disabled:opacity-50 disabled:pointer-events-none'
                            disabled={loading}
                        >
                            {loading ? (
                                <PulseLoader
                                    color="#FFFFFF"
                                    loading={loading}
                                    size={5}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : (
                                "Complete"
                            )}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Deposit