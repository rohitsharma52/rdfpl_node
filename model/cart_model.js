import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        
        required: true,
    },
    product_id: {
        type: String,  // To store image URL or path
        required: true,
        ref: 'Product',  // If you want to make it mandatory
    },
    variant_id: {
        type: String,  // To store image URL or path
        required: true,
        ref: 'Varient',  // If you want to make it mandatory
    },
    quantity: {
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

// You can set the updatedAt field automatically whenever a category is updated
cartSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

export const Cart = mongoose.model('Cart', cartSchema);
