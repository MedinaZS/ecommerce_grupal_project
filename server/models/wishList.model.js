const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

        }
    ],
},
    { timestamps: true }
)

const WishList = mongoose.model('WishList', WishListSchema);

module.exports = WishList;