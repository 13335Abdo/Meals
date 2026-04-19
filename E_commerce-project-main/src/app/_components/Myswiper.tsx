// import Swiper core and required modules
"use client"
// Import Swiper React components
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { SlideData, SwiperListProps } from '@/types';
import DesidnMatBeOneUse from './DesidnMatBeOneUse';

const slides: SlideData[] = [
    {
        title: "Fresh Products Delivered to your Door",
        offer: "Get 20% off your first order",
        primaryButton: "shop now",
        secondaryButton: "View deals",
    },
    {
        title: "Premium Quality Guaranteed",
        offer: "Fresh from farm to your table",
        primaryButton: "shop now",
        secondaryButton: "Learm More",
    },
    {
        title: "Fast & Free Delivery",
        offer: "Same day delivery availabe",
        primaryButton: "shop now",
        secondaryButton: "Delivery Info",
    },
];

export default function Myswiper({ spaceBetween = 100, slidesPerView = 1, listofImages }: SwiperListProps) {
    
    return (
        <Swiper
            className="w-full"
            modules={[Navigation, Pagination]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            loop
            navigation
            pagination={{ clickable: true, bulletActiveClass: "bg-green-500! opacity-100! rounded-2xl! w-5!" }}
        >
            {listofImages?.map((imge, index) => (
                <SwiperSlide key={index}>
                    <div className='relative'>
                        <img className='w-full h-96 object-cover' src={imge} alt="fruit image" />
                        <div className='w-full h-96 bg-linear-to-r from-[#00C950E5] to-[#05DF7280] absolute inset-0 opacity-80 z-30'></div>
                        <div className='absolute top-[28%] inset-0 z-40'>
                            {/* تمرير عنصر المحتوى المناسب بناءً على index */}
                            <DesidnMatBeOneUse slide={slides[index % slides.length]} />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
