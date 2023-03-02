const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                min: 1
            },
        }
    ],
},
    { timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;