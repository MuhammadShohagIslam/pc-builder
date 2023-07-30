import Categories from "@/components/categories/categories";
import FeaturesProduct from "@/components/products/featured/features";
import RootLayout from "@/layout/RootLayout";
import db from "@/lib/db/db";
import Product from "@/models/Product";


export default function Home({ allProducts }) {
    return (
        <section className="py-20">
            <FeaturesProduct title={"Featured Products"} products={allProducts}/>
            <Categories categoriesData={allProducts}/>
        </section>
    );
}

Home.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
    db.connectDb();
    let products = await Product.find().sort({ createdAt: -1 }).lean();
    return {
        props: {
            allProducts: JSON.parse(JSON.stringify(products))
        },
        revalidate: 10,
    };
  };

