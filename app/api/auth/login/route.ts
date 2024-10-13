import Users from "@/app/model/User";
import { createApiResponse } from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET


export async function POST(req:NextRequest){
    const body = await req.json()
    const {email, password}= body
    if(!email || !password) return new Response(
        JSON.stringify(createApiResponse(400,'All fields Required'))
    )
    if(!JWT_SECRET) return new Response(JSON.stringify(createApiResponse(400,'JWT undefined')))
    const isExist = await Users.findOne({email})
    if(!isExist) return new Response(
        JSON.stringify(createApiResponse(400,'This email Id does not exist! Please signup.'))
    )
    try{
        const matchPassword = await bcrypt.compare(password,isExist.password!)
        if(matchPassword){
            const token = jwt.sign({ id: isExist.user_id, email: isExist.email }, JWT_SECRET, {
                expiresIn: '1h', // Token expiration time
            });
            const tokens = {
                "key":token
            }
            return new Response(JSON.stringify(createApiResponse(200,"Yippe",tokens)))
        }else{
            return new Response(JSON.stringify(createApiResponse(400,"Password does not match")))
        }
    }catch(err){
        return new Response(JSON.stringify(createApiResponse(500,'Something went wrong while login.')))
    }
}