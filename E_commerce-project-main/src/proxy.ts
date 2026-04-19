import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'


export default async function proxy(req:NextRequest) {

   const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
   

   


   if (jwt==null) {
    return NextResponse.redirect(new URL("/signin", req.url))
   }




  return NextResponse.next()
}


export const config = {
matcher : ["/shop"]
}
