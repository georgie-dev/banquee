'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authProvider';
import { Transaction } from '@/lib/authProvider';


const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const { userData } = useAuth();

    useEffect(() => {
        setTransactions(
            Object.entries(userData?.transactions ?? {}).map(([id, data]) => ({
                id,
                ...data as Omit<Transaction, 'id'>,
            })));
    }, [userData])

    // console.log(transactions)


    return (
        <div className='border rounded-lg w-full p-6 flex-none overflow-x-auto scrollbar-hide'>
            <div>
                <h2 className='text-xl font-bold'>Recent Transactions</h2>
                <small className='text-gray-400 text-sm'>Your latest account activity</small>
            </div>
            <table className='my-4 w-full'>
                <thead>
                    <tr className='*:p-2 *:text-sm *:text-gray-400 hover:bg-gray-50'>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className='*:px-2 *:py-4 *:text-center *:capitalize border-t-2 odd:bg-white even:bg-gray-100 *:text-sm hover:bg-gray-50'>
                            <td>{new Date(Number(transaction.id)).toLocaleDateString()}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.type}</td>
                            <td>
                                <span className={`text-base px-2 py-1 font-semibold ${transaction.type === 'expense' ? 'text-red-400' : 'text-green-500'}`}>
                                    {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default TransactionHistory;
