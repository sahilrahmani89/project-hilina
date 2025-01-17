import dbConnect from "@/app/lib/mongoose";
import Users from "@/app/model/User";
import { createApiResponse } from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'

export async function PUT(req: NextRequest) {
    const body = await req.json()
        const {email, password} = body
        if(!email) return new Response(JSON.stringify(createApiResponse(400,'Email Required')))
        if(!password) return new Response(JSON.stringify(createApiResponse(400,'Password Required')))

        try{
          await dbConnect()
            const newPassword = await bcrypt.hash(password, 10);
            const user = await Users.findOneAndUpdate(
                { email }, 
                { password: newPassword }, // Update the password field
                { new: true } // Return the updated document
            );
            if (!user) {
                return new Response(JSON.stringify(createApiResponse(404,'User not found')))
            }
            return new Response(JSON.stringify(createApiResponse(200,'Password updated successfully')))
         }catch(err){
            console.log('err',err)
            return new Response(JSON.stringify(createApiResponse(500,'Internal server error')))
        }  
}