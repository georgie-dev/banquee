'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authProvider';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { format, subMonths } from 'date-fns';
import { Transaction } from '@/lib/authProvider';

const Chart: React.FC = () => {
    const { user, userData } = useAuth();
    const [data, setData] = useState<{ date: string; spending: number }[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchTransactions = async () => {
            const snapshot = await get(ref(db, `users/${user.uid}/transactions`));
            if (!snapshot.exists()) return;

            const transactions: Transaction[] = 
                        Object.entries(userData?.transactions ?? {}).map(([id, data]) => ({
                            id,
                            ...data as Omit<Transaction, 'id'>,
                        }))

            const lastSixMonths = [...Array(6)].map((_, i) => format(subMonths(new Date(), i), 'MMM yyyy')).reverse();

            const groupedData = lastSixMonths.map((month) => ({
                date: month,
                spending: transactions
                    .filter((txn) => txn.type === 'expense' && format(new Date(Number(txn.id)), 'MMM yyyy') === month)
                    .reduce((sum, txn) => sum + parseInt(txn.amount), 0),
            }));

            setData(groupedData);
        };

        fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="spending" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
