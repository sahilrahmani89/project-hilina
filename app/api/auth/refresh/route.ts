import { generateAccessToken } from '@/app/service/auth.service';
import { createApiResponse } from '@/app/utils/apiResponse';
import { NextRequest, NextResponse } from 'next/server';
import { generateRefreshToken } from '@/app/service/auth.service';
import { validateToken } from '@/app/utils/token';
// import { storeRefreshTokenInSession } from '@/app/service/session.service'; // Hypothetical session service

export async function POST(req: NextRequest) {
  // const body = await req.json()
  // const {user_id} = body
  // if(!user_id) return new Response(JSON.stringify(createApiResponse(400,'user_id not found')))
  // // const 
  
    // const body = await req.json()
    // const {user_id} = body
    // if(!user_id) return new Response(JSON.stringify(createApiResponse(400,'user_id not found')))
    // // const 
    // console.dir(req,{depth:null})
    const refreshToken:any = req.cookies.get('refreshToken');
  // const refreshToken = (req.cookies as any).refreshToken;

  if (!refreshToken) return new Response(JSON.stringify(createApiResponse(400, 'Refresh token not found!')));
  try {
    const decode: any = validateToken(refreshToken?.value);
    const { id, email } = decode || {};
    const newRefreshToken = generateRefreshToken(id, email);
    const accessToken = generateAccessToken(newRefreshToken);
    const tokens ={
      accessToken
    }
    const response = NextResponse.json(createApiResponse(200,"Yippe refresh token",tokens));
    response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env?.NODE_ENV == 'production', 
        maxAge: 30 * 24 * 60 * 60, 
    });
    return response;
    // return new Response(JSON.stringify(createApiResponse(201, 'Tokens generated', { accessToken })));
  } catch (error) {
    return new Response(JSON.stringify(createApiResponse(500, 'Something went wrong while creating tokens')));
  }
}