import Image from "next/image";
import { Tooltip } from 'react-tooltip'
import Link from "next/link";
import {  useDispatch } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { AvgRating } from "@/lib/utils/avgRating";
import { useRouter } from "next/router";
import { addProductForPCBuilder } from "@/store/features/product/productSlice";

const Feature = ({ product, isAddToBuilder = false }) => {
    const router = useRouter();
    const dispatch = useDispatch()

    const handleAddProductForPCBuilder = (data) => {
        dispatch(addProductForPCBuilder(data))
        router.push(`/PCBuilder`);
    }

    return (
        <div className="rounded-lg shadow-xl group cursor-pointer mb-8">
            <div className="h-72 relative">
                <ul className="transition duration-300 ease-in-out invisible flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:visible">
                    {isAddToBuilder ? (
                        <>
                        <li
                            className={`py-3 flex bg-green-500 items-center px-3 rounded-lg ml-2 border-2 border-green-500 hover:bg-white hover:border-white hover:text-black  text-white  bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                            id="isAddToBuilder"
                            onClick={() => handleAddProductForPCBuilder(product)}
                        >
                            <FaShoppingCart />
                        </li>
                        <Tooltip anchorSelect="#isAddToBuilder" content={`Add Product For PCBuilder`}/>
                        </>
                    ) : (
                        <>
                          <label htmlFor="my-modal-3" id="isNotAddToBuilder">
                            <Link href={`/products/${product._id}`}  >
                                <li
                                    className={`py-3 flex bg-green-500 items-center px-3 rounded-lg ml-2 border-2 border-green-500 hover:bg-white hover:border-white text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary hover:text-black`}
                                   
                                >
                                    <MdPageview  />
                                </li>
                            </Link>
                        </label>
                        <Tooltip anchorSelect="#isNotAddToBuilder" content={`Details Product`}/>
                        </>
                      
                    )}
                </ul>
                <Image
                    className="h-full w-full"
                    src={`${product?.image}`}

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
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                        {product?.status}{" "}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Feature;
