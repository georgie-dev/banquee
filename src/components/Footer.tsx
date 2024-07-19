import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const footer = [
        {
            title: 'About us',
            items: [
                {
                    item: 'Products',
                    link: ''
                },
                {
                    item: 'Support',
                    link: '/support'
                }
            ]
        },
        {
            title: 'Blog',
            items: [
                {
                    item: 'Products',
                    link: '/blog'
                },
                {
                    item: 'Technology',
                    link: '/blog'
                },
                {
                    item: 'Crypto',
                    link: '/blog'
                },
            ]
        },
        {
            title: 'Support',
            items: [
                {
                    item: '+40 237 123 456',
                    link: '/support'
                },
                {
                    item: 'help@banko.com',
                    link: '/support'
                },
            ]
        },
        {
            title: 'Social Media',
            items: [
                {
                    item: 'Twitter',
                    link: ''
                },
                {
                    item: 'Facebook',
                    link: ''
                },
                {
                    item: 'Instagram',
                    link: ''
                },
            ]
        },
    ]
    return (
        <div className='w-full mt-10 border flex flex-col gap-3'>
            <div className='border-b py-4 mx-auto flex items-start justify-between w-3/4 my-10'>
            <div className='w-1/3'>
                <Link href='/' className='text-3xl text-primary dm-sans-bold'>banquee.</Link>
            </div>
            <div className='flex items-start w-2/3 justify-between'>
                {footer?.map((footerItems, index) => (
                    <div className='flex flex-col gap-4' key={index}>
                        <h2 className='dm-sans-bold text-base'>{footerItems.title}</h2>
                        <ul className=' list-none flex flex-col gap-2'>
                            {footerItems.items.map((url, index) => (
                                <li key={index}><Link href={url.link} className='text-sm text-gray-400 hover:text-black'>{url.item}</Link></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <small className='text-md text-center font-semibold'> 2024 &copy; All rights reserved. Banquee.com</small>
        </div>
    )
}

export default Footer