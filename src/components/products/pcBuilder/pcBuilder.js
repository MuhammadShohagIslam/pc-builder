import Image from "next/image";


const PcBuilderProduct = ({ label, product, handleAddPcBuilder, param, handleRemovedPcBuilder }) => {
    return (
        <div className="flex gap-5 shadow-lg mb-6 border-2 border-gray-300 ">
            <div className="w-[30%]  border-2 border-gray-300 h-full p-8">
                <h2 className="font-bold text-gray-700 text-base">{label}</h2>
                <button
                    onClick={() => handleAddPcBuilder(param)}
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-0 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3"
                >
                    Choose {label}
                </button>
            </div>
            <div className="w-[70%]">
                {product?.category ? (
                    <div className="flex flex-col items-center bg-white border border-gray-200  shadow md:flex-row gap-6 hover:bg-gray-100 ">
                        <Image
                            className="object-cover rounded-t-lg h-[149px] w-56 md:rounded-none md:rounded-l-lg"
                            src="/"
                            alt=""
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col justify-between leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                {product?.title}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 ">
                                - USD {product?.price}{" "}
                            </p>
                            <button
                    onClick={() => handleRemovedPcBuilder(product)}
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-0 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3"
                >
                    Removed {label}
                </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full justify-center items-center">
                        <h2>
                            Please Add{" "}
                            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                                {label}
                            </span>{" "}
                            Product
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PcBuilderProduct;
