import FeaturesProduct from "@/components/products/featured/features";
import RootLayout from "@/layout/RootLayout";
import db from "@/lib/db/db";
import Product from "@/models/Product";

const CategoryProducts = ({ productsByCategory, title }) => {
    return (
        <section className="py-20">
            <div className="container mx-auto">
            <FeaturesProduct
                title={`Products by ${title}`}
                products={productsByCategory}
            />
            </div> 
        </section>
    );
};

export default CategoryProducts;

CategoryProducts.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};

export async function getStaticPaths() {
    db.connectDb();
    let products = await Product.find()
        .sort({ createdAt: -1 })

    const paths = products.map((product) => ({
      params: { categoryName: product.category },
    }))
   
    return { paths, fallback: false }
  }

export const getStaticProps = async ({ params }) => {
    db.connectDb();
    let products = await Product.find({ category: params.categoryName })
        .sort({ createdAt: -1 })
        .lean();
    return {
        props: {
            productsByCategory: JSON.parse(JSON.stringify(products)),
            title: params.categoryName,
        },
    };
  };

