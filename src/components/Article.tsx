import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Book {
    title: string,
    overview: string,
    image: string,
    tags: any
}

const Article = ({ data }: { data: Book }) => {
    return (
        <Link href={`/blog/${data.title.split(' ').join('-')}`} >
            <div className=' w-full flex-none'>
                <Image
                    alt='book'
                    src={data.image}
                    width={140}
                    height={120}
                    className='w-full rounded-md'
                />
            </div>
            <div className=' flex flex-col gap-1 my-4 dm-sans-normal text-black'>
                <Link href={`/blog/${data.title}`} className=' dm-sans-normal text-xl capitalize font-medium'>{data.title}</Link>
                <small className='text-xs text-gray-400 font-medium'>{data.overview}</small>
            </div>
            <div className=' flex gap-2 my-4 items-center'>
                {data?.tags?.map((tag: string, index: number) => (
                    <small className='text-[10px] p-2 bg-gray-200 rounded-md' key={index}>{tag}</small>
                ))}
            </div>
        </Link>
    )
}

export default Article