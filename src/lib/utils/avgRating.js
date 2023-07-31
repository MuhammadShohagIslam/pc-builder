import { BsFillStarFill } from "react-icons/bs";

export const AvgRating = ({
    product,
}) => {
    let avgRating;
    let length;
    if (product && product.ratings.length) {
        let total = [];
        product.ratings.forEach((rating) => total.push(rating.star));
        const highest = product.ratings.length * 5;
        const totalReducer = total.reduce((acc, cur) => acc + cur, 0);
        avgRating = (totalReducer * 5) / highest;
        length = product.ratings.length;
    } else {
        avgRating = 0;
        length = 0;
    }

    return (
   
                <div>
                    <div className="flex items-center flex-col">
                        <div className="flex items-center relative">
                            {avgRating ? (
                                [0, 1, 2, 3, 4].map((rating) => (
                                    <BsFillStarFill
                                        key={rating}
                                        className={`h-3.5 w-3.5 ${
                                            avgRating > rating
                                                ? "text-orange-400"
                                                : "text-gray-200"
                                        }
         h-4 w-4 flex-shrink-0`}
                                    />
                                ))
                            ) : (
                                <span className="text-rose-600 text-sm font-semibold">
                                    No Review Yet
                                </span>
                            )}
                            <span className=" text-red-700 text-[15px] font-medium ml-1 -mt-[5px]">
                                ({length})
                            </span>
                        </div>
                    </div>
                </div>
            
       
    );
};
