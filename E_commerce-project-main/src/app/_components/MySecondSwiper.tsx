// import Swiper core and required modules
"use client"
// Import Swiper React components
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import type { SwiperListProps } from '@/types';

export default function MySecondSwiper({ spaceBetween = 100, slidesPerView = 1, listofImages }: SwiperListProps) {

    return (
        <Swiper
            className="w-full"
            modules={[Navigation, Pagination]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            loop
            pagination={{
                clickable: true,
                 bulletActiveClass: "border-2 border-[blue]",
                renderBullet: (index, className) => {
                    // تجيب الصورة المصغرة من الـ array حسب index
                    const imgSrc = listofImages?.[index];
                    console.log("mMMMMMMMMMMMMMM",className);
                    
                    return `<div class="${className} inline-flex! justify-center! items-center! overflow-hidden! w-23! static! mt-5! opacity-100! h-[97.44999694824219px]!">
              <img src="${imgSrc}" class="opacity-100! object-cover" alt="thumb" />
            </div>`;
                },
            }}
        >
            {listofImages?.map((imge, index) => (
                <SwiperSlide key={index}>
                    <div className='relative'>
                        <img className='w-full h-96 object-cover' src={imge} alt="fruit image" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
