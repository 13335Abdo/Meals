"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { FaReceipt, FaTruck } from 'react-icons/fa6'
import { finalContext } from '../_contexts/Ncontext'
import { IoBag } from 'react-icons/io5'
import { MdOutlineSecurity } from 'react-icons/md'
import { CartLineItem, cartLineProduct } from '@/types'
import PaymentComponent from '../_components/PaymentComponent'

export default function Page() {
    const { totalCartPrice, prodect, NavCartNo } = useContext(finalContext)
    return (<>
        <div className='bg-[#F9FAFB] flex flex-col gap-4'>
            <div className='mx-15 m-auto flex flex-col gap-4'>
                <div className='flex  gap-1'>
                    <Link className='text-[#6A7282] text-[14px] font-medium hover:text-[#16A34A]' href={"/home"}>Home /</Link>
                    <Link className='text-[#6A7282] text-[14px] font-medium hover:text-[#16A34A]' href={"/cart"}>cart</Link>
                    <p className='text-[#101828] font-medium text-[14px]'> / Checkout</p>
                </div>
                <div className='flex items-center gap-2'>

                    <div className='bg-[#16A34A] rounded-xl p-2'>
                        <FaReceipt className='w-[33.36680221557617] h-[30.9375] text-white' />
                    </div>

                    <p className='text-[#101828] text-[30px] font-bold'>Complete Your Order</p>
                </div>

                <div>
                    <p className='text-[#6A7282] text-[16px] font-medium'>Review your items and complete your purchase</p>
                </div>
            </div>

        </div>



        <div className='flex gap-3 my-5'>
            <div className='w-[850] flex flex-col gap-5 rounded-2xl ms-15 mb-10'>

                <PaymentComponent/>



            </div>



            <div className='w-90 sticky inset-0 h-fit'>
                <div className='bg-linear-to-r from-[#16A34A] to-[#15803D] p-3 rounded-t-2xl'>
                    <div className='text-[18px] font-bold  flex gap-2 items-center text-white'>
                        <IoBag />
                        <p>Order Summary</p>
                    </div>
                    <p className='text-[14px] font-medium text-white' >{NavCartNo} items</p>
                </div>
                <div className='bg-white flex flex-col gap-6 rounded-b-2xl'>
                    <div className='max-h-80 overflow-y-auto scrollbar-thin space-y-3 pr-1'>




                        {prodect.map((item: CartLineItem) => {
                            const product = cartLineProduct(item);
                            const productId = product?.id;
                            if (!productId) return null;
                            return (
                                <div key={productId} className='flex justify-between items-center gap-3 border-b border-gray-100 pb-3 last:border-0 my-5'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='bg-[#F9FAFB] w-12 h-12 rounded-lg overflow-hidden shrink-0'>
                                            <img src={product?.imageCover} className='w-full h-full object-cover' alt={product?.title} />
                                        </div>
                                        <div>
                                            <h3 className='text-[16px] text-[#101828] font-semibold line-clamp-1'>{product?.category?.name}</h3>
                                            <p className='text-[#6A7282] font-medium text-[12px]'>{item.count} × {item.price} EGP</p>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-[#07080c] font-medium text-[14px]'>{item.count * item.price} EGP</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-[#4A5565] font-medium text-[16px]'>Subtotal</p>
                        <p className='text-[#101828] font-medium text-[16px]'>{totalCartPrice} EGP</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-[#4A5565] font-medium text-[16px]'>Shipping</p>
                        <p className='text-[#00A63E] font-medium text-[16px]'>FREE</p>
                    </div>

                    <div className='h-px bg-gray-300'></div>

                    <div className='flex items-center justify-between'>
                        <p className='text-[#101828] font-bold text-[18px]'>Total</p>
                        <p className='text-[#16A34A] font-bold text-[18px]'>{totalCartPrice} <span className='text-[#6A7282] font-medium text-[14px]'>EGP</span></p>
                    </div>

                    <p className="text-center text-[14px] font-medium text-[#6A7282]">
                        Complete your order with <span className="text-[#16A34A]">Pay with cash</span> or <span className="text-[#16A34A]">Pay with card</span> in the checkout form.
                    </p>


                    <div className='flex gap-3 justify-center'>
                        <div className='flex gap-1'>
                            <MdOutlineSecurity className='text-[#00C950]' />

                            <p className='text-[#6A7282] text-[12px] font-medium'>Secure Payment</p>
                        </div>
                        <div className='flex gap-1 items-center' >
                            <FaTruck className='text-[#2B7FFF]' />
                            <p className='text-[#6A7282] text-[12px] font-medium'>Fast Delivery</p>
                        </div>
                    </div>

                    <div className='text-[#16A34A] text-[14px] font-medium text-center'>
                        <Link href={"/"}>← Continue Shopping</Link>
                    </div>


                </div>

            </div>
        </div>
    </>
    )
}
