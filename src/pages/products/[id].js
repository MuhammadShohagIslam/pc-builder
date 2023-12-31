import { useState } from "react";
import { useSelector } from "react-redux";
import ReviewLists from "@/components/reviewLists/reviewLists";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import db from "@/lib/db/db";
import Product from "@/models/Product";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import { AvgRating } from "@/lib/utils/avgRating";
import axios from "axios";
import { toast } from "react-hot-toast";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const ProductDetails = ({ product, keyFeatureValue }) => {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [star, setStar] = useState(0);
    const user = useSelector((state) => state?.user?.user);
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const handleClickRating = (newRating) => {
        setStar(newRating);
    };
    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (!user?.email) {
                setLoading(false);
                router.push("/auth/login");
            } else {
                const reviewObject = {
                    comment: comment,
                    star: star,
                    user: user?.email,
                };
                if (reviewObject.comment || reviewObject.star) {
                    await axios.put(
                        `/api/product/${product._id}/review`,
                        reviewObject
                    );
                    toast.success("Review added successfully!");
                    setComment("");
                    setStar(0);
                    refreshData();
                    setLoading(false);
                } else {
                    toast.error("Invalid Value!");
                    setLoading(false);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <>
            <HeadSeo title="Product Details" content="Product Details Page" />
            <RootLayout>
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container lg:px-12 px-5 lg:py-24 md:py-20 py-16 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <Image
                                alt="ecommerce"
                                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                src={product?.image}
                                width={400}
                                height={200}
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-3 inline-block">
                                    {product?.category}{" "}
                                </span>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">
                                    {product?.title}
                                </h1>
                                <div className="flex mb-4">
                                    <span className="title-font font-medium text-xl text-rose-400">
                                        USD {product?.price}{" "}
                                    </span>
                                    <span className="flex ml-3 pl-3 border-l-2 border-gray-200">
                                        <AvgRating product={product} />
                                    </span>
                                </div>
                                <p className="leading-relaxed mt-9">
                                    {product?.description}
                                </p>

                                <div className="mt-4">
                                    <ul className="">
                                        {keyFeatureValue?.map(
                                            (keyFeature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="border-b-2 border-primary mb-3 text-lg"
                                                >
                                                    <span className="font-bold text-gray-700 text-base">
                                                        {keyFeature?.key}
                                                    </span>
                                                    : {keyFeature?.value}
                                                </li>
                                            )
                                        )}
                                        <li className="border-b-2 border-primary mb-3 text-lg">
                                            <span className="font-bold text-gray-700 text-base">
                                                Status
                                            </span>
                                            : {product?.status}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col lg:w-[70%] md:w-full w-full mx-auto md:mt-16 mt-5">
                            <div className="lg:flex-1 flex-1">
                                <ReviewLists product={product} />
                            </div>
                            <div className="lg:flex-2 flex-1">
                                <h3 className="text-lg font-bold text-success text-center mb-3">
                                    Review The {product?.title}
                                </h3>
                                <form onSubmit={handleReviewSubmit}>
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-primary"
                                    >
                                        Your Comment
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-primary bg-gray-50 rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-600"
                                        name="comment"
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        placeholder="Leave a review here"
                                    ></textarea>
                                    <h6 className="mt-5 mb-2 text-primary">
                                        Rating
                                    </h6>
                                    <StarRatings
                                        rating={star}
                                        starRatedColor="red"
                                        changeRating={handleClickRating}
                                        numberOfStars={5}
                                        starDimension="30px"
                                        name={product?.title}
                                    />
                                    <div className="mt-5">
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-0 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                        >
                                            {loading
                                                ? "Loading..."
                                                : " Review Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </RootLayout>
        </>
    );
};

export default ProductDetails;

export async function getStaticPaths() {
    db.connectDb();
    let products = await Product.find().lean();
    const paths = products.map((product) => ({
        params: { id: product._id.toString() },
    }));

    return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
    db.connectDb();
    let product = await Product.findById({ _id: params.id })
        .sort({ createdAt: -1 })
        .lean();

    const keyFeaturesData = product?.keyFeatures?.split(",");
    const keyFeatureValue = keyFeaturesData.map((kf) => ({
        key: kf.split("-")[0],
        value: kf.split("-")[1],
    }));

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            keyFeatureValue: JSON.parse(JSON.stringify(keyFeatureValue)),
        },
        revalidate: 5,
    };
};
