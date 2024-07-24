'use client'
import React, { ReactElement, useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

export interface Input {
    label: string,
    type: string,
    name: string,
    placeholder: string,
    icon: ReactElement
}

const InputField = ({ data, change, input }: { data: Input, change: any, input: any }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className=' flex flex-col gap-1'>
            <label className=' dm-sans-bold text-sm text-gray-500'>{data.label}</label>
            <div className='flex items-center gap-0 border-2 bg-white border-gray-400 relative rounded-md'>
                <span className='p-3 border-r-2 border-gray-400 rounded-s-md bg-gray-100 text-gray-400'>{data.icon}</span>
                <input
                    name={data.name}
                    type={data.type === 'password' ? showPassword ? 'text' : data.type : data.type}
                    value={input[data.name] || ''}
                    onChange={change}
                    className='w-full h-full text-sm px-2 py-1 rounded-e-md placeholder:text-sm focus-visible:outline-none'
                    placeholder={data.placeholder}
                />
                {data.type === 'password' &&
                    <div onClick={() => setShowPassword(!showPassword)} className='absolute cursor-pointer right-1 top-3 text-gray-400'>
                        {showPassword ?
                            <FaRegEyeSlash />
                            :
                            <FaRegEye />
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default InputField