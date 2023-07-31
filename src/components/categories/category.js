import Link from "next/link";

const Category = ({category}) => {
    return (
        <Link href={`/category/${category}`} className="mb-6">
            <div
                className="h-80 md:h-56 sm:h-52 px-5 w-full flex justify-center items-center shadow-md hover:shadow-xl transition ease-in-out delay-30 cursor-pointer"
                // style={{
                //     backgroundImage: `url(${images[0]?.url && images[0]?.url})`,
                // }}
            >
                <h3 className="text-gray-600 bottom-8 md:bottom-0 sm:bottom-0 text-3xl z-30 relative text-center font-bold">
                    {category}
                </h3>
            </div>
        </Link>
    );
};

export default Category;
