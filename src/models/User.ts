import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isConnected: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model('User', UserSchema);