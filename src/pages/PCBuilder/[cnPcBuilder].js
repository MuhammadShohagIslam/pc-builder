import FeaturesProduct from "@/components/products/featured/features";
import RootLayout from "@/layout/RootLayout";
import db from "@/lib/db/db";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import Product from "@/models/Product";

const CategoryProductForPcBuilder = ({ productsByCategory, title }) => {
    return (
        <>
            <HeadSeo title="Pc Builder Products" content="Pc Builder Products Page" />
            <RootLayout>
                <section className="py-20">
                    <div className="container mx-auto md:px-12 px-4">
                        <FeaturesProduct
                            title={`Products by ${title} For Pc Builder`}
                            products={productsByCategory}
                            isAddToBuilder
                        />
                    </div>
                </section>
            </RootLayout>
        </>
    );
};

export default CategoryProductForPcBuilder;

export const getServerSideProps = async (context) => {
    const { params } = context;
    db.connectDb();
    let products = await Product.find({ category: params.cnPcBuilder })
        .sort({ createdAt: -1 })
        .lean();
    return {
        props: {
            productsByCategory: JSON.parse(JSON.stringify(products)),
            title: params.cnPcBuilder,
        },
    };
};
