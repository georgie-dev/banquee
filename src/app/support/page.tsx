import React from 'react'
import { Nav, FAQ, Footer } from '@/components'
import Image from 'next/image'
import { MdLocalPhone } from "react-icons/md";
import { IoMailUnreadOutline } from "react-icons/io5";
import Link from 'next/link';

const Page = () => {
    const faqs = [
        {
            title: 'Account',
            id: 'account',
            faq: [
                {
                    heading: 'How do I verify my account?',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
                {
                    heading: 'How to upgrade my account',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
                {
                    heading: 'Can I close my account?',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
                {
                    heading: 'Can I have multiple accounts?',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
            ]
        },
        {
            title: 'Personal Details',
            id: 'personal',
            faq: [
                {
                    heading: 'How do I verify my account?',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
                {
                    heading: 'How to upgrade my account',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
                {
                    heading: 'Can I close my account?',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
                {
                    heading: 'Can I have multiple accounts?',
                    text: 'Nulla qui esse eu ea ut ea anim et deserunt aliqua. Aliqua sit duis aliqua excepteur magna qui nostrud proident esse eu eu consequat velit excepteur. Ex mollit quis voluptate amet do ex mollit labore eiusmod dolor ut. In laboris esse ut laboris qui laboris. Veniam laborum est proident cupidatat et officia. Culpa ad aute nulla ad labore. Ad fugiat ad aliquip nisi est mollit voluptate cillum laboris.'
                },
            ]
        }
    ]
    return (
        <main>
            <Nav />
            <div className='w-full bg-primary/10 pt-14'>
                <div className='flex items-center flex-wrap justify-between w-4/5 mx-auto'>
                    <div className='flex flex-col dm-sans-normal gap-4 w-2/3'>
                        <small className='text-base font-semibold'>Support</small>
                        <h1 className='text-7xl font-medium'>How can <br /> we help you?</h1>
                    </div>
                    <div className='flex items-end w-1/3'>
                        <Image
                            alt='support'
                            src='/support.png'
                            width={300}
                            height={300}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full py-20'>
                <div className='w-3/4 bg-primary rounded-lg mx-auto flex items-center px-4 py-6'>
                    <div className='flex flex-col w-1/3 text-white dm-sans-normal gap-0'>
                        <h4 className='text-2xl'>Still have questions?</h4>
                        <small className='text-xs'>We are here to help</small>
                    </div>
                    <div className='w-2/3 flex justify-evenly items-center'>
                        <div className='flex items-center text-white gap-3'>
                            <div className=' w-8 h-8 flex items-center justify-center rounded-full bg-white/30'><MdLocalPhone /></div>
                            <div className='flex flex-col dm-sans-normal gap-1'>
                                <span className='text-base'>+49 176 123 456</span>
                                <small className='text-xs font-light'>Support Hotline</small>
                            </div>
                        </div>
                        <div className='flex items-center text-white gap-3'>
                            <div className=' w-8 h-8 flex items-center justify-center rounded-full bg-white/30'><IoMailUnreadOutline /></div>
                            <div className='flex flex-col dm-sans-normal gap-1'>
                                <span className='text-base'>help@banko.com</span>
                                <small className='text-xs font-light'>Support Email</small>
                            </div>
                        </div>
                        <button type='button' className='px-4 py-2 bg-black text-white text-sm rounded-md'>
                            Chat with us
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex w-3/4 flex-wrap mx-auto relative items-start justify-between'>
                <div className='w-1/4 sticky bg-gray-100 sm-sans-normal flex flex-col gap-5 rounded-md p-4'>
                    <h3 className='font-semibold text-base'>Categories</h3>
                    <div className='p-1 flex flex-col gap-3 *:font-semibold *:text-gray-400 *:text-sm'>
                        <Link href='/support#account'>Accounts</Link>
                        <Link href='/support#personal'>Personal Details</Link>
                    </div>
                </div>
                <div className='w-2/3'>
                    <FAQ data={faqs} />
                </div>
            </div>
            <Footer/>
        </main>
    )
}

export default Page