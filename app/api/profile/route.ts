import Profile from "@/app/model/Profile";
import { createApiResponse } from "@/app/utils/apiResponse";
import { validateToken } from "@/app/utils/token";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get('Authorization'); // Use `.get()` for accessing headers
    if (!authorizationHeader) {
      return new Response(JSON.stringify(createApiResponse(401, 'uthorization header is missing')))
    }
    // Split to get the token
    const token = authorizationHeader.split(' ')[1];
    // Validate the token
    const decoded = validateToken(token);
    const userId = decoded?.id;
    if (!userId) {
      return new Response(JSON.stringify(createApiResponse(401, 'Unauthorized')))
      //  throw new Error('Eww')
    }
    const userProfile = await getProfile(userId);
    if (!userProfile) {
      return new Response(JSON.stringify(createApiResponse(404, 'Profile not found for the given userId')))
    }
    return new Response(JSON.stringify(createApiResponse(200, 'User create Successfully', userProfile)))
  }
  catch (err) {
    console.log('err', err)
    return new Response(JSON.stringify(createApiResponse(500, 'Server Error profile')))

  }
}

const getProfile = async (id: string) => {
  try {
    const profile = await Profile.findOne({ user_id: id })
      .exec();
    if (!profile) {
      console.log('Profile not found');
      return null;
    }
    return profile; 
  } catch (err) {
    console.log('err getProfile', err)
    return null
  }
}