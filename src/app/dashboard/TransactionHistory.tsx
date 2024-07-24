'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authProvider';
import { ref, child, get } from 'firebase/database';
import { db } from '../../lib/firebase';

interface Transaction {
    id: string;
    description: string;
    to: string;
    amount: number;
}

const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const { user } = useAuth();

    const fetchUserData = async () => {
        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, `users/${user?.uid}/transactions`));
            if (snapshot.exists()) {
                setTransactions(Object.entries(snapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                })) as Transaction[]);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className='border p-4 rounded-md flex flex-col gap-8'>
            <div className='flex flex-col gap-0 dm-sans-normal'>
                <h2 className='text-2xl font-semibold'>Recent Transactions</h2>
                <small className='text-gray-400 text-sm'>View your recent account activity</small>
            </div>
            <table>
                <thead>
                    <tr className='*:p-2 *:text-start hover:bg-gray-50 py-2'>
                        <th>Transaction ID</th>
                        <th>Description</th>
                        <th>Beneficiary</th>
                        <th>Amount</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className='*:px-2 *:py-4 border-t-2 odd:bg-white even:bg-gray-100 *:text-sm '>
                            <td>{transaction.id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.to}</td>
                            <td>
                                <span className='text-base px-2 py-1 text-red-400 font-semibold bg-white'>
                                    -${transaction.amount}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex flex-col gap-4'>
                <div className='rounded-md shadow-sm p-2 flex items-start justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h3></h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionHistory;
