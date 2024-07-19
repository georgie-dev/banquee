import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { books, Footer, Nav } from '@/components';
import { MdLibraryAdd } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";

const Page = ({ params }: { params: { blog: string } }) => {

    const title = params

    const book = books.find((item) => item.title === params.blog.split('-').join(' '))
    // console.log(book)
    return (
        <main>
            <Nav />
            <div className='w-3/4 mx-auto py-20'>
                <div className='flex flex-col gap-4'>
                    <div className='w-2/3 mx-auto flex gap-3 flex-col items-center text-center'>
                        <div className=' flex gap-2 my-4 items-center'>
                            {book?.tags?.map((tag: string, index: number) => (
                                <small className='text-xs text-primary p-2 bg-gray-100 rounded-md' key={index}>{tag}</small>
                            ))}
                        </div>
                        <h2 className='dm-sans-normal capitalize text-6xl'>{book?.title}</h2>
                        <div className='w-1/2 font-semibold'>
                            <h4>{book?.overview}</h4>
                        </div>
                    </div>
                    <div className='w-3/4 mx-auto min-h-96 relative rounded-md'>
                        <Image
                            alt='blog'
                            src={book.image || '/blog/blog1.png'}
                            fill
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className='w-1/2 mx-auto text-justify flex dm-sans-bold flex-col gap-4'>
                        <h3 className='font-semibold text-lg'>Sit deserunt dolore.</h3>
                        <p className='font-normal'>Culpa ex velit veniam cillum consectetur duis sint irure elit id duis duis. Labore ad elit occaecat cillum dolor cupidatat incididunt ex amet nulla ad laborum. Mollit ex minim duis fugiat deserunt dolor minim veniam veniam aliqua dolor laboris enim sit. Velit elit dolore mollit velit in magna sit amet. Anim ullamco consectetur do dolore ea ea elit aliquip sunt deserunt magna fugiat. Consequat magna mollit est exercitation proident.
                            Voluptate cupidatat aliquip exercitation amet sint tempor dolore commodo. Deserunt occaecat incididunt est adipisicing ullamco consequat fugiat amet duis nulla ipsum duis. Sit mollit culpa ipsum do duis occaecat do est labore amet. Eiusmod esse exercitation magna dolore consectetur enim labore laborum ex ad consequat dolor in. Aliquip in mollit nisi Lorem nulla ipsum consectetur. Excepteur et et velit nisi mollit culpa sit.
                            In aliquip aute deserunt do qui Lorem nisi reprehenderit esse qui proident culpa. Laboris veniam non sunt ullamco excepteur est incididunt enim id pariatur tempor incididunt. Proident tempor nulla ea sunt reprehenderit elit culpa laborum nisi proident sunt laborum cupidatat. Sit anim velit occaecat sit officia tempor adipisicing velit laborum. Pariatur fugiat excepteur culpa laboris fugiat tempor labore.
                            Dolor sit minim cillum laborum do nulla ea.Consectetur aliquip sint eu non. Dolor et cillum dolor deserunt nisi enim eu pariatur excepteur non commodo dolor. Adipisicing nulla aliquip et esse id adipisicing sunt dolor sit. Elit commodo officia minim esse adipisicing nostrud irure aute occaecat sint. Qui laborum sunt veniam occaecat cupidatat voluptate ut sint. Cupidatat eiusmod nisi minim id Lorem. Ipsum sunt incididunt velit sint aute voluptate sunt fugiat eiusmod.
                            Velit sit culpa sint irure culpa cupidatat nulla magna aliqua est ut pariatur. Cupidatat et aute magna incididunt non non incididunt culpa. Dolore laborum amet laboris dolore. Fugiat ipsum esse duis ut. Duis voluptate anim laborum deserunt Lorem mollit laborum nostrud sit enim fugiat non occaecat sit. Laborum duis esse adipisicing dolore occaecat aute Lorem labore laborum duis. Non ea proident in pariatur laborum commodo eu tempor consequat labore aliquip ad ut.
                        </p>

                        <p className='font-normal'>Culpa ex velit veniam cillum consectetur duis sint irure elit id duis duis. Labore ad elit occaecat cillum dolor cupidatat incididunt ex amet nulla ad laborum. Mollit ex minim duis fugiat deserunt dolor minim veniam veniam aliqua dolor laboris enim sit. Velit elit dolore mollit velit in magna sit amet. Anim ullamco consectetur do dolore ea ea elit aliquip sunt deserunt magna fugiat. Consequat magna mollit est exercitation proident.
                            Voluptate cupidatat aliquip exercitation amet sint tempor dolore commodo. Deserunt occaecat incididunt est adipisicing ullamco consequat fugiat amet duis nulla ipsum duis. Sit mollit culpa ipsum do duis occaecat do est labore amet. Eiusmod esse exercitation magna dolore consectetur enim labore laborum ex ad consequat dolor in. Aliquip in mollit nisi Lorem nulla ipsum consectetur. Excepteur et et velit nisi mollit culpa sit.
                            In aliquip aute deserunt do qui Lorem nisi reprehenderit esse qui proident culpa. Laboris veniam non sunt ullamco excepteur est incididunt enim id pariatur tempor incididunt. Proident tempor nulla ea sunt reprehenderit elit culpa laborum nisi proident sunt laborum cupidatat. Sit anim velit occaecat sit officia tempor adipisicing velit laborum. Pariatur fugiat excepteur culpa laboris fugiat tempor labore.
                            Dolor sit minim cillum laborum do nulla ea.Consectetur aliquip sint eu non. Dolor et cillum dolor deserunt nisi enim eu pariatur excepteur non commodo dolor. Adipisicing nulla aliquip et esse id adipisicing sunt dolor sit. Elit commodo officia minim esse adipisicing nostrud irure aute occaecat sint. Qui laborum sunt veniam occaecat cupidatat voluptate ut sint. Cupidatat eiusmod nisi minim id Lorem. Ipsum sunt incididunt velit sint aute voluptate sunt fugiat eiusmod.
                            Velit sit culpa sint irure culpa cupidatat nulla magna aliqua est ut pariatur. Cupidatat et aute magna incididunt non non incididunt culpa. Dolore laborum amet laboris dolore. Fugiat ipsum esse duis ut. Duis voluptate anim laborum deserunt Lorem mollit laborum nostrud sit enim fugiat non occaecat sit. Laborum duis esse adipisicing dolore occaecat aute Lorem labore laborum duis. Non ea proident in pariatur laborum commodo eu tempor consequat labore aliquip ad ut.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Page