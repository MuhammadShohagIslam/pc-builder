import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { FaShoppingCart } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { AvgRating } from "@/lib/utils/avgRating";

const Feature = ({ product, isAddToBuilder = false }) => {
    const isAddToCart = [];

    return (
        <div className="rounded-lg shadow-xl group cursor-pointer">
            <div className="h-72 relative">
                <ul className="transition duration-300 ease-in-out invisible flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:visible">
                    {isAddToBuilder ? (
                        <li
                            className={`py-3 flex bg-gray-700 items-center px-3 rounded-lg ml-2 border-2 border-success hover:bg-gray-900 hover:border-gray-900 hover:text-white  text-white ${
                                isAddToCart?.length > 0
                                    ? "bg-primary"
                                    : "bg-success"
                            } bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                            data-tip={
                                isAddToCart?.length > 0
                                    ? "Already To Cart"
                                    : "Add To Cart"
                            }
                            onClick={() => handleAddCart()}
                        >
                            <FaShoppingCart />
                        </li>
                    ) : (
                        <label htmlFor="my-modal-3">
                            <Link href={`/products/${product._id}`}>
                                <li
                                    className={`py-3 flex bg-gray-700 items-center px-3 rounded-lg ml-2 border-2 border-gray-700 hover:bg-gray-900 hover:border-gray-900 hover:text-white  text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                                    data-tip={"Details Product"}
                                >
                                    <MdPageview fill="#fff" />
                                </li>
                            </Link>
                        </label>
                    )}
                </ul>
                <Image
                    className="h-full w-full"
                    // src={`${images && images.length && images[0].url}`}
                    src={`/`}
                    alt={product?.title}
                    width={100}
                    height={100}
                />
            </div>
            <div className="p-5">
                <AvgRating product={product} isHomeReviewShow />
                <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-800">
                    {product?.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 ">
                    {product?.description.length > 40
                        ? `${product?.description.slice(0, 60)} ...`
                        : product?.description}
                </p>
                <div className="flex items-center justify-evenly gap-2 top-2 mb-1">
                    <span className="font-bold text-sm text-gray-600">
                        - USD {product?.price}{" "}
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        {product?.category}{" "}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Feature;
