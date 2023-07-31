import { createRouter } from "next-connect";
// import auth from "@/middleware/auth";
import db from "@/lib/db/db";
import Product from "@/models/Product";


const router = createRouter();

router.put(async (req, res) => {
    try {
        await db.connectDb();
        const { star, comment, user } = req.body;
        const product = await Product.findById({
            _id: req.query.id,
        }).exec();

        const existingRatingObject = product.ratings.find((elem) => {
            return elem.postedBy === user;
        });
        if (existingRatingObject === undefined) {
            await Product.findByIdAndUpdate(
                { _id: product._id },
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedBy: user,
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

// this will run if none of the above matches
router.all((req, res) => {
    res.status(405).json({
        error: "Method not allowed",
    });
});

export default router.handler({
    onError(err, req, res) {
        res.status(400).json({
            error: err.message,
        });
    },
});
