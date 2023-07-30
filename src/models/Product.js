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
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
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
        stock: {
            type: String,
            enum: ["Yes", "No"],
        },
        ratings: [
            {
                star: Number,
                comment: String,
                reviewedAt: Date,
                postedBy: {
                    type: ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);


const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
