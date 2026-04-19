import React from 'react'
import type { DesidnMatBeOneUseProps } from '@/types';

export default function DesidnMatBeOneUse({ slide }: DesidnMatBeOneUseProps) {
    return (
        <div className='w-[28%] ms-10'>
            <h4 className='text-3xl font-bold my-3 text-white'>{slide.title}</h4>
            <p className='text-[16px] font-medium text-white'>
                {slide.offer}
            </p>
            <button className='w-[45%] p-2 mt-3 rounded-lg bg-white text-green-500 border-2 border-white font-semibold text-[16px]'>
                {slide.primaryButton}
            </button>
            <button className='text-white mt-3 w-[45%] p-2 rounded-lg ms-3 border-2 border-gray-400 font-semibold text-[16px]'>
                {slide.secondaryButton}
            </button>
        </div>
    )
}