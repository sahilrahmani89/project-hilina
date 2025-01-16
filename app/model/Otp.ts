import mongoose , {  Schema } from "mongoose";

const otpSchema = new Schema({
    email: {type:String, required: true},
    otp: {type:String, required: true},
    expiry: {type: Date, default: Date.now, expires: 300}
})

export default mongoose.models.Otp || mongoose.model('Otp', otpSchema);