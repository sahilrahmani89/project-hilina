import mongoose, { Schema} from "mongoose";

const refreshSchema = new Schema({
    user_id:{type:String,required:true},
    token:{type:String,required:true},
    expiry: {type: Date, default: Date.now, expires: 60 * 60 * 24 * 30}
})

const Refreshs = mongoose.models.Refreshs || mongoose.model('Refreshs',refreshSchema)
export default Refreshs