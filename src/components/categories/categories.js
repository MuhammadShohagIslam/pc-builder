import Category from "./category";

const Categories = ({ categoriesData }) => {
    const uniqueValue = categoriesData.reduce((acc, cur) => {
        if (!acc.includes(cur.category)) {
            acc.push(cur.category);
        }
        return acc;
    }, []);

    return (
        <section className="container lg:py-24 md:py-20 py-10">
            <div className="w-full flex items-center justify-center md:pb-16 pb-8">
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-500">
                    Product Category
                </h2>
            </div>

            <div className="mt-10 sm:mt-5">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-5 gap-0 ">
                    {categoriesData?.length > 0 ? (
                        <>
                            {uniqueValue?.map((category, idx) => (
                                <Category key={idx} category={category} />
                            ))}
                        </>
                    ) : (
                        <h2 className="text-center text-xl text-primary">
                            There is no category
                        </h2>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Categories;
