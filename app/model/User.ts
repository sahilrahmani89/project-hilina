import mongoose, { Schema } from "mongoose";
import UserIdInc from "./UserIdInc";

const UserSchema = new Schema({
    user_id: { type: String, unique: true },
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
    profile: {
        phone: { type: String },
        age: { type: Number },
    }
});

// Pre-save hook to increment user_id
UserSchema.pre('save', async function(next) {
    if (this.isNew) {
        const sequenceDoc = await UserIdInc.findByIdAndUpdate(
            'user_id',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.user_id = sequenceDoc.seq.toString().padStart(5, '0');
    }
    next();
});

// Define the model with a conditional check
const Users = mongoose.models.Users || mongoose.model('Users', UserSchema);

export default Users;
