import Categories from "@/components/categories/categories";
import Banner from "@/components/banner/banner";
import FeaturesProduct from "@/components/products/featured/features";
import RootLayout from "@/layout/RootLayout";
import db from "@/lib/db/db";
import { useSession } from "next-auth/react";
import Product from "@/models/Product";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/features/user/userSlice";
import { useEffect } from "react";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

export default function Home({ allProducts }) {
    const { data: session } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (session?.user?.email) {
            dispatch(addUser({ email: session?.user?.email }));
        }
    }, [session, dispatch]);

    return (
        <>
            <HeadSeo
                title="Shohag Pc Hunt"
                content="Pc Builder Products Showroom"
            />
            <RootLayout>
                <Banner name="Shohag Pc Showroom" />
                <section className="lg:py-28 md:py-14 py-16 container mx-auto md:px-12 px-4">
                    <FeaturesProduct
                        title={"Featured Products"}
                        products={allProducts}
                    />
                    <Categories categoriesData={allProducts} />
                </section>
            </RootLayout>
        </>
    );
}

export const getStaticProps = async () => {
    db.connectDb();
    let products = await Product.find().sort({ createdAt: -1 }).lean();
    return {
        props: {
            allProducts: JSON.parse(JSON.stringify(products)),
        },
        revalidate: 5,
    };
};
