import React from 'react'
import CardDesign from '../_components/CardDesign';
import TitleSections from '../_components/TitleSections';
import Myswiper from '../_components/Myswiper';

import image from "@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png"
import DesidnMatBeOneUse from '../_components/DesidnMatBeOneUse';
import Design from '../_components/Design';
import { getAllCategories } from '@/CallAPIs/GetAllCategories';
import type { ProductListItem } from '@/types';

const imgs = [image.src, image.src, image.src]

export default async function page() {

  async function getAllProdects(): Promise<ProductListItem[]> {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products")
    const data = await response.json()

    return data.data
  }
  const finalData = await getAllProdects()




  const Featured = "Featured"
  const Products = "Products"
  const ShopBy = "Shop By"
  const Category = "Category"


  const categories = await getAllCategories()






  return (
    <>

      <Myswiper listofImages={imgs} slidesPerView={1} />
      <Design isHomePage={true} />
      <TitleSections featured={ShopBy} products={Category} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
          {categories.map((item) => (
            <div
              key={item._id} // استخدم id فريد لو موجود، غير كده استخدم item.name مع إضافة index
              className="group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="flex justify-center mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-transparent group-hover:border-green-500 transition-all"
                />
              </div>
              <div className="rounded-lg py-2 px-3 shadow-sm group-hover:shadow-md transition-all">
                <p className="text-gray-800 font-medium text-sm sm:text-base truncate">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>




      <TitleSections featured={Featured} products={Products} />



      <div className="mx-4 my-10 grid grid-cols-1 gap-6 sm:mx-6 sm:grid-cols-2 md:mx-10 md:grid-cols-3 lg:mx-16 lg:grid-cols-4 xl:mx-20 xl:grid-cols-5">
        {finalData.map((prodect) => (
          <CardDesign key={prodect.id} prodect={prodect} />
        ))}
      </div>




    </>
  )
}
