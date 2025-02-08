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
                    income:0,
                    expenses:0,
                    savings:0,
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
                background: "#D84646",
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
        <main className='w-full md:w-5/6 min-h-fit mx-auto md:my-14 md:rounded-md p-7 md:p-10 bg-primary flex flex-wrap gap-10 md:gap-0 justify-between items-center'>
            <div className='w-full md:w-1/2 h-full lg:flex items-center'>
                <div className='*:dm-sans-normal *:font-semibold *:text-white flex flex-col gap-6'>
                    <h1 className='text-5xl md:text-7xl font-medium'>Welcome to Banquee!</h1>
                    <h4 className='text-lg'>Join our community and take control of your finances with ease. Signing up is quick and simple. Let's get started!</h4>
                </div>
            </div>
            <div className='w-full md:w-1/2 lg:flex items-center'>
                <div className='bg-white rounded-xl shadow-md h-fit w-full lg:w-4/5 mx-auto flex flex-col'>
                    <div className='border-b py-3 text-center'>
                        <small className='font-semibold text-base dm-sans-bold text-zinc-500'>Create an Account</small>
                    </div>
                    <form className='p-4 flex flex-col gap-8' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {inputFields.map((field, index) => (
                                <InputField key={index} data={field} change={handleChange} input={input} />
                            ))}
                        </div>
                        <div className='flex flex-col *:dm-sans-normal  gap-3'>
                            <button type='submit'
                                disabled={loading}
                                className='bg-primary hover:bg-secondary text-white text-base font-semibold rounded-md py-3 disabled:opacity-50 disabled:pointer-events-none'
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
                            <Link href='/' className='text-primary text-center font-semibold text-sm'>Already have an account? <span className='font-bold underline underline-offset-4'>Login</span> </Link>
                        </div>
                        <div className='flex items-center justify-center text-primary dm-sans-normal text-xs gap-2'>
                            <span><RiSecurePaymentFill /></span>
                            <span> 100% Safe and Secure</span>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default SignUp