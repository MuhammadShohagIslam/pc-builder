import Category from "./category";


const Categories = ({ categoriesData }) => {

    const uniqueValue = categoriesData.reduce((acc, cur) => {
        if(!acc.includes(cur.category)){
            acc.push(cur.category)
        }
        return acc
    }, []);
    
    return (
        <section className="container py-24 md:py-20 sm:py-12 ">
            <div className="w-full flex items-center justify-center pb-16">
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-500">
                   Product Category
                </h2>
            </div>

            <div className="mt-10 sm:mt-5">
                <div className="grid grid-cols-3 gap-7">
                {categoriesData?.length > 0 ? (
                        <>
                            {uniqueValue?.map((category, idx) => (
                                    <Category
                                    key={idx}
                                        category={category}
                                    />
                               
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
