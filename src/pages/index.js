import RootLayout from "@/layout/RootLayout";

export default function Home() {
    return (
        <>
            <h1>Pc-Builder</h1>
        </>
    );
}

Home.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
