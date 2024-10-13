import mongoose, { Schema } from "mongoose";
import UserIdInc from "./UserIdInc";

const User = new Schema({
    user_id:{type:String,unique:true},
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    profile: {
        phone: { type: String },
        age: { type: Number },
    }
})

User.pre('save',async function(next){
    if(this.isNew){
        const sequenceDoc = await UserIdInc.findByIdAndUpdate(
            'userId',
            {$inc:{seq:1}},
            {new:true,upsert:true}
        )
        this.user_id = sequenceDoc.seq.toString().padStart(5,'0')
    }
    next()
})

const Users=  mongoose.model('USER',User)

export default Users