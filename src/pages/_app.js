import store from "@/store/app/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
