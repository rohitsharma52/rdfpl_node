import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category_id: {
        type: String,
        required: true,
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
subcategorySchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

export const SubCategory = mongoose.model('SubCategory', subcategorySchema);
