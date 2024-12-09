import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    Paragraph: {
        type: String,
        required: true,
    },
    image: {
        type: String,  // To store image URL or path
        required: true,  // If you want to make it mandatory
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the date when the category is created
    },
    updatedAt: {
        type: Date,
        default: Date.now,  // Automatically set the date when the category is created
    },
});

// You can set the updatedAt field automatically whenever a category is updated
bannerSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

export const Banner = mongoose.model('Banner', bannerSchema);
