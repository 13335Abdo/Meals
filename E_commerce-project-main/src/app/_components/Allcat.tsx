import Link from 'next/link'
import React from 'react'
import { FaBoxOpen, FaTags } from 'react-icons/fa6'
import { IoLayers } from 'react-icons/io5'

export default function Allcat({ isallorder = false }: { isallorder?: boolean }) {
    return (
        <>

            {isallorder ?
                <div className='w-full flex justify-center my-5 px-10 flex-col gap-5'>
                    <div className='flex  gap-1'>
                        <Link className=' opacity-50 hover:opacity-100 text-[14px] font-medium' href={"/home"}>Home </Link>
                        <p className='font-medium text-[14px]'> / My Orders</p>
                    </div>
                    <div className='flex justify-between items-center'>

                        <div className='flex items-center gap-3'>
                            <div className='text-white w-14 h-14 flex items-center justify-center rounded-xl bg-[#16A34A]'>

                                <FaBoxOpen className='w-[31.52783203125px] h-[24.84450912475586px]' />

                            </div>
                            <div>
                                <p className='text-[30px] font-bold text-[#101828]'>My Orders</p>
                                <p className='text-[14px] font-medium text-[#6A7282]'>Track and manage your 4 orders</p>

                            </div>
                        </div>

                        <Link className='text-[#16A34A] text-[14px] font-medium' href={"/home"}>Continue Shopping </Link>
                    </div>
                </div>
                :
                <div className='bg-linear-to-r from-[#16A34A] to-[#4ADE80] w-full h-60 flex justify-center px-10 flex-col gap-5'>
                    <div className='flex  gap-1'>
                        <Link className='text-white opacity-50 hover:opacity-100 text-[14px] font-medium' href={"/home"}>Home </Link>
                        <p className='text-white font-medium text-[14px]'> / Categories</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='text-white w-16 h-16 flex items-center justify-center rounded-xl bg-[#4ADE80]'>

                            <IoLayers className='w-[31.52783203125px] h-[24.84450912475586px]' />

                        </div>
                        <div>
                            <p className='text-[16px] font-medium text-white'>All Categories</p>
                            <p className='text-[16px] font-medium opacity-80 text-white'>Browse our wide range of product categories</p>

                        </div>
                    </div>
                </div>}


        </>
    )
}
