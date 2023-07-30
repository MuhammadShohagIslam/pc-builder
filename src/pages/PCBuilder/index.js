import PcBuilderProduct from "@/components/products/pcBuilder/pcBuilder";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux'
import RootLayout from "@/layout/RootLayout";
import { deleteProductForPCBuilder } from "@/store/features/product/productSlice";

const PCBuilder = () => {
    const product = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const router = useRouter();

    const handleAddPcBuilder = (param) => {
        router.push(`/PCBuilder/${param}`);
    };

    const handleRemovedPcBuilder = (data) => {
         dispatch(deleteProductForPCBuilder(data))
    };

    const handleCompletePcBuilder = () => {
        toast.success("You Successfully Build Your Pc!", {
            position: "top-center"
        })
    };

    const isDisable = !product.CPU.title || !product.motherboard.title || !product.powerSupplyUnit.title || !product.RAM.title || !product.storageDevice.title || !product.monitor.title

    return (
        <section className="w-[60%] mx-auto py-24 md:py-20 sm:py-12">
            <div className="w-full flex items-center justify-center pb-16">
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-500">
                    Build Your Computer
                </h2>
            </div>
            <div>
                <PcBuilderProduct
                    param={"CPU"}
                    label={"CPU"}
                    product={product?.CPU}
                    handleAddPcBuilder={handleAddPcBuilder}
                    handleRemovedPcBuilder={handleRemovedPcBuilder}
                />
                <PcBuilderProduct
                    param={"Motherboard"}
                    label={"Motherboard"}
                    product={product?.motherboard}
                    handleAddPcBuilder={handleAddPcBuilder}
                    handleRemovedPcBuilder={handleRemovedPcBuilder}
                />
                <PcBuilderProduct
                    param={"Power Supply Unit"}
                    label={"Power Supply Unit"}
                    handleRemovedPcBuilder={handleRemovedPcBuilder}
                    product={product?.powerSupplyUnit}
                    handleAddPcBuilder={handleAddPcBuilder}
                />
                <PcBuilderProduct
                    param={"RAM"}
                    handleRemovedPcBuilder={handleRemovedPcBuilder}
                    label={"RAM"}
                    product={product?.RAM}
                    handleAddPcBuilder={handleAddPcBuilder}
                />
                <PcBuilderProduct
                    param={"Monitor"}
                    handleRemovedPcBuilder={handleRemovedPcBuilder}
                    label={"Monitor"}
                    product={product?.monitor}
                    handleAddPcBuilder={handleAddPcBuilder}
                />
                <PcBuilderProduct
                    param={"Storage Device"}
                    handleRemovedPcBuilder={handleRemovedPcBuilder}
                    label={"Storage Device"}
                    product={product?.storageDevice}
                    handleAddPcBuilder={handleAddPcBuilder}
                />
            </div>
            <div className={"flex justify-center items-center"}>
                <button
                disabled={isDisable}
                    onClick={handleCompletePcBuilder}
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-0 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3 cursor-pointer disabled:cursor-not-allowed"
                >
                    Complete Your Process of Building Computer
                </button>
            </div>
        </section>
    );
};

export default PCBuilder;

PCBuilder.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
