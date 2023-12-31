import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";


const RootLayout = ({ children }) => {

    return (
        <>
            <Navbar />
            <main className="min-h-screen ">{children}</main>
            <Footer />
        </>
    );
};

export default RootLayout;
