'use client'
import React, { FormEvent, useState } from 'react'
import { useAuth } from '@/lib/authProvider';
import { ref, push } from "firebase/database";
import { db } from '@/lib/firebase';
import { PulseLoader } from 'react-spinners';
import { FaCheck } from "react-icons/fa6";
import { Toast } from '@/components';

const ValidatePin = ({ data, close }) => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { user } = useAuth()
    const userData = JSON.parse(sessionStorage.getItem('userData'))

    const handleChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Move to the next input if a digit is entered
            if (value && index < 3) {
                document.getElementById(`pin-${index + 1}`).focus();
            }

            // Move to the previous input if backspace is pressed and input is empty
            if (!value && index > 0) {
                document.getElementById(`pin-${index - 1}`).focus();
            }
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formattedPin = pin.join('')

        if (formattedPin != userData.pin) {
            Toast.fire({
                icon: "error",
                title: 'Invalid Pin',
                background: "#008000",
            });
            setLoading(false)
            return
        }

        // if (userData.balance < data.amount) {
        //     Toast.fire({
        //         icon: "error",
        //         title: 'Insufficient funds',
        //         background: "#008000",
        //     });
        //     setLoading(false)
        //     return
        // }

        push(ref(db, 'users/' + user.uid + '/transactions'), data)
            .then(() => {
                setSuccess(true)
                setTimeout(() => {
                    close((prev: boolean) => !prev)
                }, 3000)
            })
            .catch((error) => {
                console.error('Error writing user data to the database:', error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto mx-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-sm p-4 mx-auto bg-white dark:bg-secondary-dark-bg rounded-md shadow-lg">
                    <div className="flex flex-col w-full gap-1">
                        <header className="font-semibold text-lg dm-sans-normal"> {`You are about to transfer $${data.amount} to ${data.to}`}</header>
                        <small className='text-gray-400 text-sm'>Enter Pin to complete transaction</small>
                    </div>
                    {success ?
                        <div className='flex flex-col gap-2 py-8 mx-auto items-center text-center'>
                            <div className='w-14 h-14 flex items-center justify-center p-1 rounded-full bg-primary/10 text-primary'>
                                <FaCheck />
                            </div>
                            <small className='text-lg text-primary dm-sans-normal font-semibold'>Transaction Successful</small>
                        </div>
                        :
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
                    }
                </div>
            </div>
        </div>
    )
}

export default ValidatePin
