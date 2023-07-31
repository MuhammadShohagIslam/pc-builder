import "@/styles/globals.css";
import store from "@/store/app/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";

let persistor = persistStore(store);

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
        <>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Toaster position="top-right" reverseOrder={false} />
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            </SessionProvider>
        </>
    );
}
