const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        minLength: [3, "The name must be at least 3"],
        trim: true,
        validate: {
            validator: async (name) => {
                const findName = await Category.findOne({ name })
                if (findName) {
                    if (this.id === findName.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: "The name is taken"
        }

    },
    description: {
        type: String,
        required: [true, "The description is required"],
        maxLength: [100, "The name must be less than 100"],
        trim: true
    },
},
    { timestamps: true }
)

const Category = mongoose.model('Category', CategorySchema);


module.exports = Category;