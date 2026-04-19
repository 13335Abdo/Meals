import CountComponent from "@/app/_components/CountComponent";
import Design from "@/app/_components/Design";
import MySecondSwiper from "@/app/_components/MySecondSwiper";
import { TapsProjectDetails } from "@/app/_components/TapsProjectDetails";
import type { ProductDetail } from "@/types";
import { CiStar } from "react-icons/ci";
import { PiStarFill, PiStarHalfDuotone } from "react-icons/pi";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: PageProps) {

  const promiseParams = await params
  console.log(promiseParams);



  async function getSpacificProdect(id: string): Promise<ProductDetail | undefined> {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      const data = await res.json()
      console.log("________________________________________", data);
      return data.data as ProductDetail | undefined;

    } catch (error) {
      console.log(error);

    }

  }

  const prodect = await getSpacificProdect(promiseParams.id)

  const AllImages = prodect?.images ?? []
  return (
    <>
      <div className="flex gap-5 my-10 mx-10">
        <div className="w-1/4 sticky inset-0 h-fit">
          <MySecondSwiper listofImages={AllImages} />
        </div>
        <div className="w-3/4 p-5">
          <span className="font-medium text-[12px] text-[#15803D] bg-[#F0FDF4] p-2 rounded-2xl">{prodect?.category.name}</span>
          <span className="ms-5 font-medium text-[12px] text-[#364153] bg-[#F3F4F6] p-2 rounded-2xl">{prodect?.brand.name}</span>
          <h3 className="mt-5 font-bold text-3xl text-[#101828]">{prodect?.title}</h3>
          <div className="flex items-center gap-2 mt-5">

            {prodect && (() => {
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
            <p className="text-[#4A5565] font-medium text-[14px]">{prodect?.ratingsAverage}</p>
            <p className="text-[#4A5565] font-medium text-[14px]">({prodect?.ratingsQuantity} reviews)</p>
          </div>


          <p className="mt-5 font-bold text-3xl text-[#101828]">{prodect?.price} EGP</p>
          <span className="flex items-center gap-1.5 bg-[#F0FDF4] rounded-3xl px-2 w-fit mt-5">
            <div className="w-2 h-2 bg-green-500 rounded-full "></div>
            <p>in Stock</p>
          </span>
          <div className="h-0.5 w-full bg-[#F3F4F6] mt-5"></div>

          <p className="mt-5 font-medium text-[16px] text-[#4A5565]">{prodect?.description}</p>
          <p className="text-[#364153] font-medium text-[14px] mt-5">Quantity</p>
          
          
          
          
          <CountComponent prodect={prodect?.quantity ?? 0} prodectQount={prodect?.quantity ?? 0} price={prodect?.price ?? 0} />
          
          <div className="h-0.5 w-full bg-[#F3F4F6] mt-5"></div>

          <Design isProjectdetailsPage={false}/>






        </div>

      </div>
        <div className="mx-10">
          <TapsProjectDetails />
        </div>




    </>
  )
}
// {prodect?.images?.map((img)=><img src={img}/>)}