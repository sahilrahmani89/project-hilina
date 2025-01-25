import dbConnect from "@/app/lib/mongoose";
import Otp from "@/app/model/Otp";
import Users from "@/app/model/User";
import { createApiResponse } from "@/app/utils/apiResponse";
import { generateSecureInteger } from "@/app/utils/common";
import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';


export async function POST(req:NextRequest){
    try{
        const body = await req.json()
        const {email} = body
        await dbConnect()
        if(!email) return new Response(JSON.stringify(createApiResponse(400,'Email Required')))
        const isExist = await Users.findOne({email:email})
        if(!isExist){
            return new Response(JSON.stringify(createApiResponse(400,'This email Id does not exist!')))
        }
       const otp = generateSecureInteger()
        const otpData = {
              email,
              otp
        }
        const isOtpExist =  await Otp.findOne({email:email})
        if(isOtpExist){
            return new Response(JSON.stringify(createApiResponse(400,'Otp already sent')))
        }else{
            const nodeMail = process.env.MAIL
            const password = process.env.MAIL_PASSWORD
            if(!email || !password){
                return new Response(JSON.stringify(createApiResponse(500,'Email and password not found')))
            }
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: nodeMail, 
                    pass: password 
                }
            });
            //
            const mailOptions = {
                from: nodeMail, 
                to: email, 
                subject: 'Otp for reset password', 
                text: 'This is your otp for reset password: ' + otp, // plain text body
                html: `<p>Hello, this is your OTP for resetting your password: <strong>${otp}</strong></p>` 
            };
            // transporter.sendMail(mailOptions, async(error, info) => {
            //     if (!info) {
            //         console.log('Error in sending email:', error);
            //         return new Response(JSON.stringify(createApiResponse(500,'Error in sending email')))
            //     }
            //     const createOTP = await Otp.create(otpData)
            //     await createOTP.save()
            //    return new Response(JSON.stringify(createApiResponse(200,'Otp sent successfully to your email')))
            // });
            try {
                const info = await transporter.sendMail(mailOptions); 
                const createOTP = await Otp.create(otpData);
                await createOTP.save();
                return new Response(JSON.stringify(createApiResponse(200, 'OTP sent successfully to your email')));
            } catch (error) {
                return new Response(JSON.stringify(createApiResponse(500, 'Error in sending email')));
            }
        }
    }catch(err){
        console.log('err',err)
        return new Response(JSON.stringify(createApiResponse(500,'Interval Server Error Otp')))
    }
}
