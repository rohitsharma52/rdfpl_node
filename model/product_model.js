import mongoose from 'mongoose';

// Custom Validator for images array
function arrayLimit(val) {
    return val.length <= 4; // Validation for limiting images to a max of 4
}

const productSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  // Refers to the Category model
        required: true,
    },
    category_name: {
        type: String,
        required: true,
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',  // Refers to the SubCategory model
        required: true,
    },
    subcategory_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellPrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hsnCode: {
        type: String,
        required: true,
    },
    featureImg: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // Array of image URLs
        validate: [arrayLimit, '{PATH} exceeds the limit of 4 images'], // Validation for 4 images
    },
    bestSeller: {
        type: Boolean,
        default: false, // Default false
    },
    weeklyDeals: {
        type: Boolean,
        default: false, // Default false
    },
    featuredProduct: {
        type: Boolean,
        default: false, // Default false
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the Product model
export const Product = mongoose.model('Product', productSchema);
