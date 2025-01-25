import dbConnect from "@/app/lib/mongoose";
import Users from "@/app/model/User";
import { createApiResponse } from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import Profile from "@/app/model/Profile";

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
    //Create the User and associate the Profile
    let role = email.toLowercase()==='mountreev@gmail.com'? 'admin': 'user'
    const newUser = new Users({
        email,
        name,
        password: hashedPassword,
        role,
      // Associate the created Profile with the User
    });
    // Save the user
    const response = await newUser.save();
    //Create a Profile for the user
        const newProfile = await Profile.create({
          user_id: response.user_id,
          phone: null,
          age: null,
          address: null,
          name: name,
          email: response.email,
          role,
        });
    // Remove the password field before sending the response
    const { password, ...result } = response.toObject();
        return new Response(JSON.stringify(createApiResponse(200,'User create Successfully',result)))
    }catch(err){
        console.log('err',err)
        return new Response(JSON.stringify(createApiResponse(500,'Something went wrong while creating User',err)))
    }
}