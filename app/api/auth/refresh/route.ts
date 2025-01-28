import { generateAccessToken } from '@/app/service/auth.service';
import { createApiResponse } from '@/app/utils/apiResponse';
import { NextRequest } from 'next/server';
import { generateRefreshToken } from '@/app/service/auth.service';
import { validateToken } from '@/app/utils/token';
// import { storeRefreshTokenInSession } from '@/app/service/session.service'; // Hypothetical session service

export async function POST(req: NextRequest) {
  console.log('hey there Ileelduu post')
  debugger
  const refreshToken = (req.cookies as any).refreshToken;
  console.log('refreshToken', refreshToken);
  if (!refreshToken) return new Response(JSON.stringify(createApiResponse(400, 'Refresh token not found!')));
  try {
    const decode: any = validateToken(refreshToken);
    const { id, email } = decode || {};
    const newRefreshToken = generateRefreshToken(id, email);
    const accessToken = generateAccessToken(newRefreshToken);
    return new Response(JSON.stringify(createApiResponse(201, 'Tokens generated', { accessToken, refreshToken: newRefreshToken })));
  } catch (error) {
    return new Response(JSON.stringify(createApiResponse(500, 'Something went wrong while creating tokens')));
  }
}