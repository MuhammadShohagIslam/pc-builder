import Feature from "./feature";

const FeaturesProduct = ({ products, title }) => {
    return (
        <section>
            <div className="w-full flex items-center justify-center pb-24">
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-500">
                   {title} 
                </h2>
            </div>
            <div className="grid grid-cols-4 gap-5 mb-12">
                {products?.slice(0, 6).map((product) => (
                    <Feature key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturesProduct;
