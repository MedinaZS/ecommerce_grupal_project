const axios = require("axios");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        minLength: [3, "The name must be at least 3"],
        trim: true,
    },
    barcode: {
        type: String,
        required: [true, "The barcode is required"],
        minLength: [5, "The barcode must be at least 5"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "The description is required"],
        maxLength: [100, "The name must be less than 100"],
        trim: true
    },
    categories: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    ],
    stock: {
        type: Number,
        min: 1,
    },
    price: {
        type: Number,
        min: 50,
    },
    images: {
        type: Array,
    },
},
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;



