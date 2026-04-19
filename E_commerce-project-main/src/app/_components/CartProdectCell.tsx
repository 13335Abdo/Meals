"use client"
import React, { useContext } from 'react'
import { NumberField } from "@heroui/react";
import { FaTrashAlt } from 'react-icons/fa';
import { finalContext } from '../_contexts/Ncontext';
import { cartLineProduct, type CartLineItem } from '@/types';
import CallDeleteApi from '@/CallAPIs/CallDeleteApi';
import CallUpdateApi from '@/CallAPIs/CallUpdateAPI';
import { toast } from 'sonner';
export default function CartProdectCell() {


    const { prodect, setProdects, settotalCartPrice, setNavCartNo, setcartUser } = useContext(finalContext)

    async function handleDeleteCard(productId: string) {
        try {
            const res = await CallDeleteApi(productId)
            setProdects(res.data.products)
            settotalCartPrice(res.data.totalCartPrice)
            setNavCartNo(res.numOfCartItems)
            setcartUser(res.cartId)
            toast.success("Item removed from cart.", {
                richColors: true,
                position: "top-center",
            })
        } catch {
            toast.error("Unable to remove this item right now.", {
                richColors: true,
                position: "top-center",
            })
        }
    }

    async function handleUpdateAPI(id: string, count: number) {
        if (count < 1) {
            await handleDeleteCard(id)
            return
        }

        try {
            const res = await CallUpdateApi(id, count)
            setProdects(res.data.products)
            settotalCartPrice(res.data.totalCartPrice)
            setNavCartNo(res.numOfCartItems)
            setcartUser(res.cartId)
        } catch {
            toast.error("Unable to update this item right now.", {
                richColors: true,
                position: "top-center",
            })
        }
    }



    return (
        <>
            {prodect.map((item: CartLineItem, index) => <div key={cartLineProduct(item)?.id ?? `cart-${index}`} className='bg-white p-5 flex gap-4 items-center rounded-2xl shadow-md relative'>
                <div className='w-[128] h-[128] p-3 bg-[#F9FAFB] '>
                    <img src={cartLineProduct(item)?.imageCover} alt={cartLineProduct(item)?.title} />
                </div>

                <div className='flex flex-col gap-2'>
                    <h3 className='text-[18px] text-[#101828] font-semibold'>{cartLineProduct(item)?.category?.name}</h3>
                    <div className='flex items-center gap-4'>
                        <p className='text-[#15803D] bg-[#F0FDF4] rounded-xl p-1 font-medium text-[12px]'>{cartLineProduct(item)?.category.slug}</p>
                        <p className='text-[#6A7282] text-[12px] font-medium'>SKU: 5CA0AD</p>
                    </div>
                    <div>
                        <p className='text-[#16A34A] text-[18px] font-bold'>{item?.price} EGP</p>
                    </div>
                    <div>
                        <NumberField defaultValue={item.count} maxValue={100} minValue={0} name="step1" step={1}>
                            <NumberField.Group>
                                <NumberField.DecrementButton onClick={() => handleUpdateAPI(cartLineProduct(item)!.id, item.count - 1)} />
                                <NumberField.Input className="w-15 m-auto!" />
                                <NumberField.IncrementButton onClick={() => handleUpdateAPI(cartLineProduct(item)!.id, item.count + 1)} className="bg-[#16A34A] text-white opacity-100!" />
                            </NumberField.Group>
                        </NumberField>
                    </div>
                </div>


                <div className='flex items-center gap-2 bottom-5 right-5 absolute'>
                    <p className='text-[#101828] font-bold text-[20px]'>{item.count * item.price}</p>
                    <div className='text-[#99A1AF] text-[12px] font-medium'>
                        <p>Total</p>
                        <p>EGP</p>
                    </div>
                    <button onClick={() => handleDeleteCard(cartLineProduct(item)!.id)} className='text-[#FB2C36] p-3 rounded-2xl cursor-pointer bg-[#FFC9C9] hover:text-white hover:bg-[#FB2C36]'>
                        <FaTrashAlt />
                    </button>
                </div>

            </div>)}





        </>
    )
}
