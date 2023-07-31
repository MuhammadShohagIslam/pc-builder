import Feature from "./feature";

const FeaturesProduct = ({ products, title, isAddToBuilder=false }) => {
    return (
        <section>
            <div className="w-full flex items-center justify-center md:pb-24 pb-20">
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-500">
                   {title} 
                </h2>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-5 md:gap-3 gap-0 mb-12">
                {products?.slice(0, 6).map((product) => (
                    <Feature  key={product._id} product={product} isAddToBuilder={isAddToBuilder}/>
                ))}
            </div>
        </section>
    );
};

export default FeaturesProduct;
