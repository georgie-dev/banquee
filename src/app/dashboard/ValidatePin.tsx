'use client'
import React, { FormEvent, useState } from 'react'
import { useAuth } from '@/lib/authProvider';
import { ref, update } from "firebase/database";
import { db } from '@/lib/firebase';
import { PulseLoader } from 'react-spinners';
import { Toast } from '@/components';

interface ValidatePinProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    data: any
}

const ValidatePin: React.FC<ValidatePinProps> = ({ data, close }) => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false)
    const { user, fetchUserData, userData } = useAuth()

    const handleChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            if (value && index < 3) {
                const nextInput = document.getElementById(`pin-${index + 1}`);
                if (nextInput) nextInput.focus();
            }

            if (!value && index > 0) {
                const prevInput = document.getElementById(`pin-${index - 1}`);
                if (prevInput) prevInput.focus();
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formattedPin = parseInt(pin.join(""));
        console.log(formattedPin, userData?.pin)

        if (formattedPin != userData?.pin) {
            Toast.fire({
                icon: "error",
                title: "Invalid Pin",
                background: "#D84646",
            });
            setLoading(false);
            return;
        }

        const amount = parseFloat(data.amount);

        if (userData?.balance < amount) {
            Toast.fire({
                icon: "error",
                title: "Insufficient funds",
                background: "#D84646",
            });
            setLoading(false);
            return;
        }

        const newTransaction = {
            id: `${Date.now()}`,
            description: data.description || "Fund Transfer",
            to: data.to,
            amount: data.amount,
            type: "expense",
        };

        const updatedBalance = userData.balance - amount;
        const updatedExpenses = userData.expenses + amount;
        const userRef = ref(db, `users/${user?.uid}`);

        const updates = {
            [`transactions/${newTransaction.id}`]: newTransaction,
            balance: updatedBalance,
            expenses: updatedExpenses,
        };

        try {
            await update(userRef, updates);
            Toast.fire({
                icon: "success",
                title: "Transfer successful!",
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
                <div className="relative w-full max-w-sm p-4 mx-auto bg-white dark:bg-secondary-dark-bg rounded-md shadow-lg">
                    <div className="flex flex-col w-full gap-1">
                        <header className="font-semibold text-base dm-sans-normal">You are about to transfer <span className='font-bold'>${data.amount}</span> to <span className='font-bold'>${data.to}</span></header>
                        <small className='text-gray-400 text-sm'>Enter Pin to complete transaction</small>
                    </div>
                    <form className='p-3 flex flex-col gap-8' onSubmit={handleSubmit}>
                        <div className='flex w-1/2 my-2 mx-auto justify-center items-center gap-3'>
                            {pin.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`pin-${index}`}
                                    type='password'
                                    value={digit}
                                    maxLength={1}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    className='border-b-2 p-3 w-14 text-center font-bold focus-visible:outline-none border-black text-lg'
                                />
                            ))}
                        </div>
                        <div className='w-full flex justify-end'>
                            <button
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

export default ValidatePin
