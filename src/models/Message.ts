import * as mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    sendTo: {
        type: String,
        required: true
    },
    sendBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isReading: {
        type: Boolean,
        default: false
    },
    isHistored: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        required: true
    }
});
export default mongoose.model('Message', MessageSchema);