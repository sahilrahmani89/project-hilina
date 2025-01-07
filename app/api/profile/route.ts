import { NextRequest } from "next/server";

export default async function GET(request:NextRequest){
    try{
      const body = await request.json()
    //   const {token}
    // const token = req.headers.authorization?.split(' ')[1]; // Assuming token is passed as 'Bearer <token>'

    // Validate the token
    // const decoded = validateToken(token);

    // If token is valid, you can access the user data from decoded
    // const userId = decoded.id; // This is the user_id that was encoded in the token

    // Now you can fetch the user's profile data from your database
    // For example, you could do:
    // const userProfile = await getUserProfileFromDb(userId);

    }
    catch(err){
        console.log('err',err)
    }
}