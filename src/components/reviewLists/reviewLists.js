import ReviewList from "./reviewList";

const ReviewLists = ({ product }) => {
    return (
        <div className="lg:p-10 p-3">
            <div className="flex">
                <div className="flex-initial w-2/5 sm:w-1/2">
                    <h2 className="text-3xl sm:text-xl font-bold text-gray-900 ">
                        Reviews
                    </h2>
                </div>
            </div>
            <div className="mt-10">
                {product?.ratings?.length ? (
                    product.ratings?.map((rating) => (
                        <ReviewList key={rating._id} ratings={rating} />
                    ))
                ) : (
                    <span className="text-gray-500 ml-4">No Review Found</span>
                )}
            </div>
        </div>
    );
};

export default ReviewLists;
