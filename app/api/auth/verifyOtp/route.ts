import dbConnect from "@/app/lib/mongoose";
import Otp from "@/app/model/Otp";
import { createApiResponse } from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
        const {email,otp} = body
        if(!email) return new Response(JSON.stringify(createApiResponse(400,'Email Required')))
        try{
          await dbConnect()
          const isOTP = await Otp.findOne({email:email}) 
          if(!isOTP){
             return new Response(JSON.stringify(createApiResponse(400,'Otp expired or not sent')))
          }
          if(isOTP.otp === otp){
            return new Response(JSON.stringify(createApiResponse(200,'Otp verified successfully')))
          }else{
            return new Response(JSON.stringify(createApiResponse(400,'Invalid Otp')))
          }
         }catch(err){
            console.log('err',err)
            return new Response(JSON.stringify(createApiResponse(500,'Internal server error')))
        }  
}