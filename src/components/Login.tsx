'use client'
import React, { FormEvent, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { RiLockPasswordLine, RiSecurePaymentFill } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import InputField from './InputField';
import Toast from './Toast';
import PulseLoader from 'react-spinners/PulseLoader'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput((values) => ({ ...values, [name]: value }))
    }

    const inputFields = [
        {
            label: 'Email',
            type: 'email',
            placeholder: 'johndoe@example.com',
            name: 'email',
            icon: <FaRegCircleUser />
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter Password',
            name: 'password',
            icon: <RiLockPasswordLine />
        },
    ]

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, input.email, input.password);
            const user = userCredential.user;
            Toast.fire({
                icon: "success",
                title: 'Sign up Successful',
                background: "#5BB5A2",
            });
            router.push('/dashboard')
            return user
        } catch (error: any) {
            console.log(error.message.error);
            Toast.fire({
                icon: "error",
                title: error.code,
                background: "#D84646",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='py-4 px-7 flex flex-col w-full gap-8' onSubmit={handleSubmit}>
            {inputFields.map((field, index) => (
                <InputField key={index} data={field} change={handleChange} input={input} />
            ))}
            <div className='flex flex-col *:dm-sans-normal  gap-3'>
                <button
                    type='submit'
                    className='bg-primary hover:bg-secondary text-white text-base font-semibold rounded-md py-3 disabled:opacity-50 disabled:pointer-events-none'
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
                        "Login"
                    )}
                </button>
                <Link href='/' className='text-primary text-center font-semibold text-sm'>Forgot Password?</Link>
            </div>
            <div className='flex items-center justify-center text-primary dm-sans-normal text-xs gap-2'>
                <span><RiSecurePaymentFill /></span>
                <span> 100% Safe and Secure</span>
            </div>
        </form>
    )
}

export default Login
