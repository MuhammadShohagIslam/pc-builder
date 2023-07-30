import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Component {...pageProps} />
        </>
    );
}
