import mongoose from "mongoose";

const varientSchema = new mongoose.Schema({
    product_id: {
        type: String,
        ref: 'Product',
        required: true,
    },
    unit: {
        type: String,  // To store image URL or path
        required: true,  // If you want to make it mandatory
    },
    pack_size: {
        type: String,  // To store image URL or path
        required: true,  // If you want to make it mandatory
    },
    hsnCode: {
        type: String,
        required: true,
    },
    stock: {
        type: String,  // To store image URL or path
        required: true,  // If you want to make it mandatory
    },
    sku: {
        type: String,  // To store image URL or path
        required: true,  // If you want to make it mandatory
    },
    sell_price: {
        type: String,  // To store image URL or path
        required: true,  // If you want to make it mandatory
    },
    mrp: {
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
varientSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

export const Varient = mongoose.model('Varient', varientSchema);
