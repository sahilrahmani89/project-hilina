import dbConnect from "@/app/lib/mongoose";
import Users from "@/app/model/User";

export  async function GET(){
    return
    try{
        console.log('hello')
        /// funcfino to update coollection
     await dbConnect()
     const result = await Users.updateMany(
        { status: { $exists: false } }, // Update all documents
        { $set: { role: 'user' } }  // Set the 'role' field to user
      );
      
    }catch(err){
        console.log('hello err',err)
    }
}