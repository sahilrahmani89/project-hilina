import Profile from "@/app/model/Profile";
import { createApiResponse } from "@/app/utils/apiResponse";
import { validateToken } from "@/app/utils/token";
import { NextRequest } from "next/server";

export default async function GET(request:NextRequest){
    try{
  
      const authorizationHeader = request.headers.get('Authorization'); // Use `.get()` for accessing headers
      if (!authorizationHeader) {
        throw new Error('Authorization header is missing');
      }
  
      // Split to get the token
      const token = authorizationHeader.split(' ')[1];
    // Validate the token
    const decoded = validateToken(token);
    const userId = decoded?.id; 
    if(!userId){
       throw new Error('Eww')
    }
    const userProfile = await getProfile(userId);

    if (!userProfile) {
      throw new Error("Profile not found for the given userId");
    }
    return new Response(JSON.stringify(createApiResponse(200,'User create Successfully',userProfile)))
    }
    catch(err){
        console.log('err',err)
    }
}

const getProfile = async(id:string) =>{
  try{
    const profile = await Profile.findOne({ user: id}).exec();
    if (!profile) {
      return null;
    }
    return profile.toObject(); 
  }catch(err){
      return null
  }
}