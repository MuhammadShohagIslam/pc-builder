import db from "@/lib/db/db";
import Product from "@/models/Product";
import nextHandler from "next-connect";


const handler = nextHandler();

handler.put(async (req, res) => {
    try {
        await db.connectDb();
        console.log(req.query.id)
        const { star, comment } = req.body;
        const product = await Product.findById({
            _id: req.query.id,
        }).exec();

        const existingRatingObject = product.ratings.find((elem) => {
            return elem.postedBy === req.user?.email;
        });
        if (existingRatingObject === undefined) {
            await Product.findByIdAndUpdate(
                { _id: product._id },
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedBy: "req.user?.email",
                            reviewedAt: new Date(),
                        },
                    },
                },
                { new: true }
            ).exec();
            res.json(product);
        } else {
            // if user have already left rating, update it
           await Product.updateOne(
                {
                    ratings: { $elemMatch: existingRatingObject },
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment,
                    },
                },
                { new: true }
            ).exec();

            res.json(product);
        }
    } catch (error) {
        res.send({
            err: error.message,
        });
    }
});

export default handler;