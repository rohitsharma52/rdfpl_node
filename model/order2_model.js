import mongoose from "mongoose";

const order2Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
        required: true,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,  // To store image URL or path
        required: true,
        ref: 'Order1',  // If you want to make it mandatory
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
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
order2Schema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

export const Order2 = mongoose.model('Order2', order2Schema);
