import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
 function middleware(request: NextRequest){
  // Get a cookie from the request (e.g., "user_token")
  // const token = request.cookies.get('user_token');
 
  // If token is valid, allow the request to proceed
  return NextResponse.next();
 },
 {
 callbacks:{
  authorized:(params:any) =>{
    let {token} = params
    return !!token;
  },
 },
}
)
export const config = {
    matcher: ['/about','/profile'],
}
