import Image from "next/image";
import moment from "moment";
import { FaUserGraduate } from "react-icons/fa";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";

const ReviewList = ({ ratings }) => {
    const { star, postedBy, comment, reviewedAt } = ratings;
    return (
        <div className="grid grid-cols-10 mb-5 lg:gap-0 gap-16">
            <div>
                {postedBy?.image && postedBy && postedBy?.image?.url ? (
                    <Image
                        className="w-10 h-10 rounded-full"
                        src={postedBy?.image?.url}
                        alt={postedBy?.fullName}
                        width={40}
                        height={40}
                    />
                ) : (
                    <FaUserGraduate className="w-10 h-10 text-gray-900 p-1 rounded-full ring-2 ring-green-300" />
                )}
            </div>
            <div className="col-span-6 border-b-2">
                <p className="font-bold text-primary capitalize">
                    {postedBy?.name}
                </p>
                <ul className="flex mb-2">
                    {Array.from(Array(5).keys()).map((rating) => (
                        <li key={rating}>
                            <BsFillStarFill
                                className={`${
                                    star > rating
                                        ? "text-orange-400"
                                        : "text-gray-200"
                                }
                        h-3.5 w-3.5 flex-shrink-0`}
                            />
                        </li>
                    ))}
                    <span className="ml-1 text-gray-400 text-sm relative -top-1">
                        {reviewedAt && moment(reviewedAt).fromNow()}
                    </span>
                </ul>
                <p className="mb-2 font-light text-primary">{comment}</p>
            </div>
        </div>
    );
};

export default ReviewList;
