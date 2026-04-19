"use client";

import { useState } from "react";
import { FaPlus, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import type { CountComponentProps } from '@/types';

export default function CountComponent({ prodect, prodectQount, price }: CountComponentProps) {
    const [count, setCount] = useState(1);

    const increment = () => {
        if (count < prodect) setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) setCount(count - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 0;
        if (val > prodect) val = prodect;
        if (val < 1) val = 1;
        setCount(val);
    };

    return (<>
        <div className="flex gap-5 items-center">
            <div className="flex border border-gray-400 w-fit items-center mt-5">
                <button className="p-2 cursor-pointer text-[#4A5565]" onClick={decrement}>
                    <TiMinus className="text-xl" />
                </button>

                <input
                    type="number"
                    value={count}
                    onChange={handleChange}
                    className="px-2 w-16 text-center border-0 focus:outline-none"
                    min={0}
                    max={prodect}
                />

                <button className="p-2 text-[#4A5565] cursor-pointer" onClick={increment}>
                    <FaPlus className="text-xl" />
                </button>
            </div>
            <div>
                <p className="mt-4 text-[14px] text-[#6A7282] font-medium">{prodectQount} available</p>
            </div>

        </div>
        <div className="flex items-center justify-between mt-5">
            <p className="text-[#4A5565] font-medium text-[16px]">Total Price:</p>
            <p className="text-[#16A34A] font-bold text-2xl">{price * count}.00 EGP</p>
        </div>
        <div className="flex gap-2 items-center mt-10">
            <div className="w-1/2">
                <button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer py-2.5 rounded-xl font-medium text-[16px] text-white"> Add to Cart </button>
            </div>
            <div className="w-1/2 ">
                <button className="w-full bg-[#101828] hover:bg-[#1E2939] py-2.5 font-medium cursor-pointer text-[16px] rounded-xl text-white"> Buy Now</button>
            </div>
        </div>
        <div className="flex items-center gap-2 mt-5">
            <div className="rounded-xl border-[0.5px] hover:text-green-600 duration-150 transition-all  flex items-center cursor-pointer text-[#364153] text-[16px] font-medium gap-2 justify-center p-2 w-[93%]">
                <FaRegHeart />
                <p>Add to Wishlist</p>
            </div>
            <div className="rounded-xl border-[0.5px] text-[#364153] hover:text-green-600 duration-150 cursor-pointer text-[16px] font-medium w-[7%] flex items-center p-3 justify-center">
                <FaShareAlt />
            </div>
        </div>
    </>);
}