/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { FormEvent, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from 'firebase/database';
import { FaRegCircleUser, FaPhone } from "react-icons/fa6";
import { RiLockPasswordLine, RiSecurePaymentFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { InputField, Toast } from '@/components';
import PulseLoader from 'react-spinners/PulseLoader'


const SignUp = () => {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInput((values) => ({ ...values, [name]: value }))
    }

    const generateAccountNumber = () => {
        const accountNumber = '02' + Math.floor(Math.random() * Math.pow(10, 10)).toString().padStart(10, '0');
        return accountNumber;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, input.email, input.password);
            const user = userCredential.user;
            const userRef = ref(db, 'users/' + user.uid);
            const snapshot = await get(userRef);
            Toast.fire({
                icon: "success",
                title: 'Sign up Successful',
                background: "#5BB5A2",
            });
            router.push('/dashboard')
            if (!snapshot.exists()) {
                await set(userRef, {
                    email: user.email,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    phone: input.phone,
                    balance: 0,
                    accountNumber: generateAccountNumber(),
                    firstTimeUser: true
                });
                console.log('User data set in the database');
            }
        } catch (error: any) {
            console.error('Error signing in:', error);
            Toast.fire({
                icon: "error",
                title: error.message,
                background: "#008000",
            });
        } finally {
            setLoading(false);
        }
    };

    const inputFields = [
        {
            label: 'First Name',
            type: 'text',
            placeholder: 'John',
            name: 'firstName',
            icon: <FaRegCircleUser />
        },
        {
            label: 'Last Name',
            type: 'text',
            placeholder: 'Doe',
            name: 'lastName',
            icon: <FaRegCircleUser />
        },
        {
            label: 'Email',
            type: 'email',
            placeholder: 'johndoe@example.com',
            name: 'email',
            icon: <MdEmail />
        },
        {
            label: 'Phone',
            type: 'tel',
            placeholder: '1(123) 456 789',
            name: 'phone',
            icon: <FaPhone />
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter Password',
            name: 'password',
            icon: <RiLockPasswordLine />
        },
        {
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm Password',
            name: 'cpassword',
            icon: <RiLockPasswordLine />
        },
    ]
    return (
        <main className='min-h-screen flex gap-0 flex-wrap px-4 lg:px-0 py-20 '>
            <div className='w-full lg:w-1/2 hidden h-full bg-primary min-h-screen lg:flex items-center p-14'>
                <div className='*:dm-sans-normal *:font-semibold *:text-white flex flex-col gap-6'>
                    <h1 className=' text-8xl font-medium'>Welcome to Banquee!</h1>
                    <h4 className='text-lg'>Join our community and take control of your finances with ease. Signing up is quick and simple. Let's get started!</h4>
                </div>
            </div>
            <div className='w-full lg:w-1/2 hidden lg:flex items-center'>
                <div className='bg-primary rounded-xl shadow-md h-fit w-full md:w-3/4 mx-auto flex flex-col'>
                    <div className='border-b py-3 text-center'>
                        <small className='font-semibold text-base dm-sans-bold text-white'>Create an Account</small>
                    </div>
                    <form className='p-4 flex flex-col gap-8' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-y-10 gap-x-8'>
                            {inputFields.map((field, index) => (
                                <InputField key={index} data={field} change={handleChange} input={input} />
                            ))}
                        </div>
                        <div className='flex flex-col *:dm-sans-normal  gap-3'>
                            <button type='submit'
                                disabled={loading}
                                className='bg-white text-primary text-base font-semibold rounded-md py-3 disabled:opacity-50 disabled:pointer-events-none'
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
                                    "Sign up"
                                )}
                            </button>
                            <Link href='/' className='text-white text-center font-semibold text-sm'>Already have an account? <span className='font-bold underline underline-offset-4'>Login</span> </Link>
                        </div>
                        <div className='flex items-center justify-center text-primary dm-sans-normal text-xs gap-2'>
                            <span><RiSecurePaymentFill /></span>
                            <span> 100% Safe and Secure</span>
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-full min-h-fit my-8 rounded-md p-6 bg-primary flex flex-wrap lg:hidden justify-between items-center'>
                <div className='w-full lg:w-1/2 flex flex-col gap-14'>
                    <div className='flex flex-col gap-8'>
                        <div className='*:dm-sans-normal *:font-semibold *:text-white flex flex-col gap-6'>
                            <h1 className=' text-5xl font-medium'>Welcome to Banquee!</h1>
                            <h4 className='text-lg'>Join our community and take control of your finances with ease. Signing up is quick and simple. Let's get started!</h4>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 py-10 px-0 lg:p-6'>
                    <div className='bg-white lg:bg-primary rounded-xl shadow-md h-fit w-full md:w-3/4 mx-auto flex flex-col'>
                        <div className='border-b py-3 text-center'>
                            <small className='font-semibold text-base dm-sans-bold text-primary lg:text-white'>Create an Account</small>
                        </div>
                        <form className='p-4 flex flex-col gap-8' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-8'>
                                {inputFields.map((field, index) => (
                                    <InputField key={index} data={field} change={handleChange} input={input} />
                                ))}
                            </div>
                            <div className='flex flex-col *:dm-sans-normal  gap-3'>
                                <button type='submit'
                                    disabled={loading}
                                    className='bg-primary lg:bg-white text-white lg:text-primary text-base font-semibold rounded-md py-3 disabled:opacity-50 disabled:pointer-events-none'
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
                                        "Sign up"
                                    )}
                                </button>
                                <Link href='/' className='text-primary lg:text-white text-center font-semibold text-sm'>Already have an account? <span className='font-bold underline underline-offset-4'>Login</span> </Link>
                            </div>
                            <div className='flex items-center justify-center text-primary lg:text-white dm-sans-normal text-xs gap-2'>
                                <span><RiSecurePaymentFill /></span>
                                <span> 100% Safe and Secure</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUp