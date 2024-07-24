'use client'
import React, { FormEvent, useState } from 'react'
import { useAuth } from '@/lib/authProvider';
import { ref, update } from "firebase/database";
import { db } from '@/lib/firebase';
import { PulseLoader } from 'react-spinners';

interface CreatePinProps {
    refetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePin: React.FC<CreatePinProps> = ({ refetch }) => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Move to the next input if a digit is entered
            if (value && index < 3) {
                const nextInput = document.getElementById(`pin-${index + 1}`);
                if (nextInput) nextInput.focus();
            }

            // Move to the previous input if backspace is pressed and input is empty
            if (!value && index > 0) {
                const prevInput = document.getElementById(`pin-${index - 1}`);
                if (prevInput) prevInput.focus();
            }
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            pin: pin.join(''),
            firstTimeUser: false
        };

        if (user?.uid) {
            update(ref(db, 'users/' + user.uid), data)
                .then(() => {
                    refetch((prev) => !prev);  // Correct usage of refetch
                })
                .catch((error) => {
                    console.error('Error writing user data to the database:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.error('User is not authenticated');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto mx-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-sm p-4 mx-auto bg-white dark:bg-secondary-dark-bg rounded-md shadow-lg">
                    <div className="flex flex-col w-full gap-1">
                        <header className="font-semibold text-xl">Create Transaction Pin</header>
                        <small className='text-gray-400 text-sm'>Create your 4-digit pin to carry out transactions</small>
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
                            <button type='submit' className='bg-primary text-white w-full rounded-md px-4 py-2 font-semibold text-sm'>
                                {loading ? <PulseLoader size={10} color={"#fff"} /> : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePin;
