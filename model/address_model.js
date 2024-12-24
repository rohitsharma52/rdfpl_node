import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    street_address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    Pincode: {
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
addressSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

export const Address = mongoose.model('Address', addressSchema);
