import mongoose from "mongoose";

const order1Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
        required: true,
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,  // To store image URL or path
        required: true,
        ref: 'Address',  // If you want to make it mandatory
    },
    total_amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
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
order1Schema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

export const Order1 = mongoose.model('Order1', order1Schema);
