import React from 'react'
import { Nav, Footer, Article, books } from '@/components'

const Blog = () => {

    return (
        <main>
            <Nav />
            <div className='w-2/3 relative mx-auto block'>
                <div className='p-12 text-center text-6xl dm-sans-bold'>Blog</div>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2 dm-sans-normal'>
                        <small className='text-xs font-semibold'>Categories:</small>
                        <div className='flex items-center gap-3 text-xs *:rounded-md *:p-2 *:font-semibold *:w-fit *:bg-gray-100 *:text-[10px]'>
                            <button>All</button>
                            <button>Product</button>
                            <button>Technology</button>
                            <button>App</button>
                        </div>
                    </div>
                    <div className='mt-3 grid grid-cols-3 gap-7'>
                        {books.map((book, index) => (
                            <Article key={index} data={book} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Blog