import Link from "next/link";
import { BsArrowRepeat } from "react-icons/bs";
import { CiHeart, CiStar } from "react-icons/ci";
import { FaPlus, FaRegEye } from "react-icons/fa";
import { PiStarFill, PiStarHalfDuotone } from "react-icons/pi";
import type { CardDesignProps } from "@/types";
import AddProductTocardButton from "./AddProductTocardButton";
import WishListButton from "./WishListButton";

export type { CardDesignProps };

export default function CardDesign({ prodect }: CardDesignProps) {

    const words = prodect.title?.split(' ') || [];
    const truncatedTitle = words.length > 4
        ? words.slice(0, 4).join(' ') + '...'
        : prodect.title;
    return (<div className="border p-3 rounded-lg border-[#E5E7EB] hover:shadow-xl hover:-translate-y-2 transition-all duration-500">

        <div className="relative">
            <img className="w-full" src={prodect.imageCover} alt={prodect.title} />
            <div className="absolute top-0 grid gap-3 text-xl right-0">


                <WishListButton id={prodect.id} />


                <Link href={`/prodectDetails/${prodect.id}`} className="bg-white p-1 rounded-full hover:text-green-600 font-semibold">

                    <FaRegEye className="cursor-pointer" />
                </Link>
                <div className="bg-white p-1 rounded-full hover:text-green-600 font-semibold">
                    <BsArrowRepeat className="cursor-pointer" />

                </div>
            </div>

        </div>
        <div>
            <p className="text-[#364153] text-[16px] mt-1 cursor-pointer">
                {truncatedTitle}
            </p>
            <div className="flex items-center gap-2">
                {(() => {
                    const rating = prodect.ratingsAverage; // مثال: 4.2
                    const fullStars = Math.floor(rating); // عدد النجوم الممتلئة
                    const hasHalfStar = rating % 1 >= 0.5; // هل يوجد نصف نجمة؟
                    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                    return (
                        <>
                            {/* النجوم الممتلئة */}
                            {Array(fullStars)
                                .fill(0)
                                .map((_, i) => (
                                    <PiStarFill key={`full-${i}`} className="w-5 h-[16] text-yellow-500" />
                                ))}

                            {/* نصف نجمة (إذا وجدت) */}
                            {hasHalfStar && <PiStarHalfDuotone className="w-5 h-[16] text-yellow-500" />}

                            {/* النجوم الفارغة */}
                            {Array(emptyStars)
                                .fill(0)
                                .map((_, i) => (
                                    <CiStar key={`empty-${i}`} className="w-5 h-[16] text-yellow-500" />
                                ))}
                        </>
                    );
                })()}
                <p className="text-[#6A7282] font-medium text-[12px]">{prodect.ratingsAverage}</p>
                <p className="text-[#6A7282] font-medium text-[12px]">({prodect.ratingsQuantity})</p>
            </div>



            {prodect.priceAfterDiscount ?
                <div className="flex justify-between items-center mt-1">
                    <p className="text-[#16A34A] text-[18px] font-bold">{prodect.priceAfterDiscount} EGP</p>
                    <p className="line-through text-[#6A7282] text-[14px] font-semibold">{prodect.price}</p>
                    <AddProductTocardButton id={prodect.id}  />


                </div> :
                <div className="flex justify-between items-center mt-1">
                    <p className="text-[18px] font-bold">{prodect.price} EGP</p>

                    <AddProductTocardButton id={prodect.id}  />


                </div>}

        </div>





    </div>)
}