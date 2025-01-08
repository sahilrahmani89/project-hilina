// models/Profile.js
import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    phone: { type: String },
    age: { type: Number },
    profilePicture: { type: String },
    address: { type: String },
    bio: { type: String },
}, {
    timestamps: true,  
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;
