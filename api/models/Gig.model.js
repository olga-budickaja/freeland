import mongoose from 'mongoose';
const { Schema } = mongoose;

const GigSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    totalStarts: {
        type: Number,
        default: 0
    },
    starsNumber: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    cat: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    shortTitle: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    delivery: {
        type: Number,
        required: true
    },
    revision: {
        type: Number,
        required: false
    },
    features: {
        type: [String],
        required: false
    },
    sales: {
        type: Number,
        default: 0
    },
    },{
        timestamps: true
    }
);

export default mongoose.model("Gig", GigSchema);