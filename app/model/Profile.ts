import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema({
    user_id: { 
        type: String, 
        required: true,
    },
    phone: { 
        type: String, 
        default: null // Default to null if not provided
    },
    age: { 
        type: Number, 
        default: null 
    },
    profilePicture: { 
        type: String, 
        default: 'defaultProfilePic.jpg'  
    },
    address: { 
        type: String, 
        trim: true 
    },
    bio: { 
        type: String, 
        trim: true,  
        default: 'This user has no bio yet.'  
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);


export default Profile;
