'use client'
import React, { useState } from 'react'
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";



const FAQ = ({ data }: { data: any }) => {
    const [dropdown, setDropdown] = useState('')
    return (
        <div className='w-full p-2 bg-white flex flex-col gap-28'>
            {data?.map((item: any, index: number) => (
                <div className='flex flex-col gap-7' key={index} id={item.id}>
                    <div className='flex items-center gap-3 text-xl dm-sans-normal'>
                        <div className='w-10 h-10 bg-primary/10 flex justify-center items-center rounded-full text-primary'><RiSecurePaymentFill /></div>
                        <h2 className='font-semibold'>{item?.title}</h2>
                    </div>
                    <div className='w-full flex flex-col gap-0'>
                        {item.faq.map((faqItem: { heading: string, text: string }, faqIndex: number) => (
                            <div className='flex flex-col gap-2 border-b-2 py-4' key={faqIndex}>
                                <div className='flex w-full items-center justify-between dm-sans-normal '>
                                    <h3 className='font-semibold'>{faqItem.heading}</h3>
                                    <button
                                        className='text-sm text-primary cursor-pointer'
                                    >
                                        {dropdown === `${item.id}-${faqIndex}` ?
                                            <RxCross2 onClick={() => setDropdown('')} />
                                            :
                                            <FaPlus onClick={() => setDropdown(`${item.id}-${faqIndex}`)} />
                                        }
                                    </button>
                                </div>
                                <div className={`w-full text-gray-400 text-sm ${dropdown === `${item.id}-${faqIndex}` ? 'block' : 'hidden'}`}>{faqItem.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FAQ