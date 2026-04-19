

import { FaArrowRightLong } from 'react-icons/fa6'
import { responseType } from '../brands/page'
export default function BrandsDesign({response,isCallAllCat=false}:{response:responseType,isCallAllCat:boolean}) {
  


  return (
    <>

      <div className='w-50 h-72 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white shadow-md rounded-2xl p-3 flex flex-col justify-between'>
        {/* حاوية الصورة مع خلفية رمادية فاتحة وتوسيط */}
        <div className='w-full h-48 bg-[#F9FAFB] rounded-xl flex justify-center items-center overflow-hidden p-2'>
          <img
            src={response.image}
            alt="brand logo"
            className='max-w-full  rounded-2xl  max-h-full object-contain transition-transform duration-300 group-hover:scale-105'
          />
        </div>

        {/* قسم النص (اسم العلامة ورابط المنتجات) */}
        {isCallAllCat? <div className='flex flex-col items-center justify-center gap-1 text-center'>
          <p className='font-semibold text-[#101828] group-hover:text-[#16A34A] text-[14px]'>{response.name}</p>
          <p className='font-medium text-[13px] items-center gap-2 transition-colors duration-300 opacity-0 group-hover:opacity-100 flex text-[#16A34A]'>
            View Subcategories
            <FaArrowRightLong className='text-xs transition-transform duration-300 group-hover:translate-x-1' />
          </p>
        </div> :
        <div className='flex flex-col items-center justify-center gap-1 text-center'>
          <p className='font-semibold text-[#101828] group-hover:text-[#7F22FE] text-[14px]'>{response.name}</p>
          <p className='font-medium text-[13px] items-center gap-2 transition-colors duration-300 opacity-0 group-hover:opacity-100 flex text-[#7F22FE]'>
            View Products
            <FaArrowRightLong className='text-xs transition-transform duration-300 group-hover:translate-x-1' />
          </p>
        </div>
        }
      </div>



    </>
  )
}
