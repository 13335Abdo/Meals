import React from 'react'
import Allcat from '../_components/Allcat'
import BrandsDesign from '../_components/BrandsDesign'
import { CallAllCat } from '@/CallAPIs/CallAllCat'

export default async function Page() {

    const response = await CallAllCat()



  return (
    <>

    <div>
          <Allcat isallorder={false} />
        </div>
        <div className='grid grid-cols-1 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-[90%] m-auto'>
    
    
        {response.map((items)=><BrandsDesign key={items._id} isCallAllCat={true} response={items} />)}
    
        </div>

    
    
    
    </>
  )
}
