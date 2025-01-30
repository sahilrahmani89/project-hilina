import Users from "@/app/model/User";
import { createApiResponse } from "@/app/utils/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import dbConnect from "@/app/lib/mongoose";
import { generateAccessToken, generateRefreshToken } from "@/app/service/auth.service";
import Refreshs from "@/app/model/refreshToken.model";


const JWT_SECRET = process.env.JWT_SECRET


export async function POST(req:NextRequest,res:NextResponse){
    const body = await req.json()
    const {email, password}= body
    if(!email || !password) return new Response(
        JSON.stringify(createApiResponse(400,'All fields Required'))
    )
    if(!JWT_SECRET) return new Response(JSON.stringify(createApiResponse(400,'JWT undefined')))
    await dbConnect()
    const isExist = await Users.findOne({email})
    if(!isExist) return new Response(
        JSON.stringify(createApiResponse(400,'This email Id does not exist! Please signup.'))
    )
    try{
        const matchPassword = await bcrypt.compare(password,isExist.password!)
        if(matchPassword){
            const  refreshToken = generateRefreshToken(isExist.user_id,isExist.email)
            const accessToken = generateAccessToken(refreshToken)
            const tokens = {
                accessToken
            }
            // console.log('token while getting token',tokens)
            // const isToken = await Refreshs.findOne({user_id:isExist.user_id})
            // const expiryDate = new Date(); 
            // expiryDate.setDate(expiryDate.getDate() + 30);
            // if(!isToken){
            //     try{
            //         await Refreshs.create({
            //             user_id:isExist.user_id,
            //             token:refreshToken,
            //             expiry:expiryDate
            //         })
            //     }catch(err){
            //         return new Response(JSON.stringify(createApiResponse(400,'Error while creating refresh')))
            //     }
            // }else{
            //     try{
            //         await Refreshs.findOneAndUpdate(
            //             { user_id:isExist.user_id }, 
            //             { token: refreshToken, expiry: expiryDate }, 
            //             { new: true, upsert: true } 
            //           );
            //     }catch(err){
            //         return new Response(JSON.stringify(createApiResponse(400,'Error while updating refresh')))
            //     }
            // }
            
            const response = NextResponse.json(createApiResponse(200,"Yippe",tokens));
            response.cookies.set('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env?.NODE_ENV == 'production', 
                maxAge: 30 * 24 * 60 * 60, 
            });
            return response;
        }else{
            return new Response(JSON.stringify(createApiResponse(400,"Password does not match")))
        }
    }catch(err){
        return new Response(JSON.stringify(createApiResponse(500,'Something went wrong while login.')))
    }
}