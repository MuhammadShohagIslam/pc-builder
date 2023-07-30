const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxLength: 32,
            text: true,
        },
        description: {
            type: String,
            required: true,
            maxLength: 2000,
            text: true,
        },
        keyFeatures: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxLength: 32,
        },
        category: {
           type: String,
        },
        images: {
            type: String,
        },
        status: {
            type: String,
            enum: ["In Stock", "Out Stock"],
        },
        ratings: [
            {
                star: Number,
                comment: String,
                reviewedAt: Date,
                postedBy: String,
            },
        ],
    },
    { timestamps: true }
);


const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
