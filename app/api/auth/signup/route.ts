import dbConnect from "@/app/lib/mongoose";
import Users from "@/app/model/User";
import { createApiResponse } from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req:NextRequest){
    const body = await req.json()
    const {name,email,password} = body
    if(!name || !email || !password){
        return new Response(
            JSON.stringify(createApiResponse(400,'All fields are required!'))
        )
    }
    await dbConnect()
    const isUser = await Users.findOne({email})
    if(isUser) return new Response(JSON.stringify(createApiResponse(409,'Email Id Alredy Exist')))
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const newUser = await new Users({
            email,
            name,
            password:hashedPassword,
            profile:{
                phone:null,
                age:null
            }
        })
        const response = await newUser.save()
        const {password,...result} = response.toObject()
        return new Response(JSON.stringify(createApiResponse(200,'User create Successfully')))
    }catch(err){
        return new Response(JSON.stringify(createApiResponse(500,'Something went wrong while creating User')))
    }
}