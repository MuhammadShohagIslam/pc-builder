/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useReducer,
} from "react";
import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    updatePassword,
    User,
    GoogleAuthProvider,
} from "firebase/auth";
import { ActionConfigType, StoreContextType } from "./StoreContext.type";
import {
    storeReducer,
    initialState,
} from "../states/storeReducer/storeReducer";
import firebaseApp from "../config/firebase/firebase.config";
import { StoreActionType } from "../states/storeReducer/storeReducer.type";
import { currentUser } from "@/api/auth";

const StoreContext = createContext<StoreContextType | null>(null);
const auth = getAuth(firebaseApp);

export const useStoreContext = () => {
    return useContext(StoreContext) as StoreContextType;
};

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    const [loading, setLoading] = useState<boolean>(true);
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setFirebaseUser(user);
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: StoreActionType.LOGGED_IN_USER,
                            payload: {
                                email: res.data.email,
                                fullName: res.data.fullName,
                                role: res.data.role,
                                image: res.data.image.url,
                                token: idTokenResult.token,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setFirebaseUser(null);
                dispatch({
                    type: StoreActionType.LOGOUT_USER,
                    payload: null,
                });
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const sendForSignInLinkToEmail = (
        email: string,
        actionCodeSettings: ActionConfigType
    ) => {
        setLoading(true);
        return sendSignInLinkToEmail(auth, email, actionCodeSettings);
    };

    const createUser = (email: string, location: string) => {
        setLoading(true);
        return signInWithEmailLink(auth, email, location);
    };

    const userProfileUpdate = (profile: any) => {
        setLoading(true);
        return updateProfile(auth.currentUser as User, profile);
    };
    const loginWithEmailAndPassword = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const registerAndLoginWithProvider = (provider: GoogleAuthProvider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const forgotPassword = (
        email: string,
        actionCodeSettings: ActionConfigType
    ) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email, actionCodeSettings);
    };

    const updateThePassword = (newPassword: string) => {
        setLoading(true);
        if (auth.currentUser !== null) {
            return updatePassword(auth.currentUser, newPassword);
        }
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const values = {
        state,
        dispatch,
        firebaseUser,
        auth,
        setLoading,
        loading,
        sendForSignInLinkToEmail,
        userProfileUpdate,
        createUser,
        logOut,
        loginWithEmailAndPassword,
        registerAndLoginWithProvider,
        forgotPassword,
        updateThePassword,
    };
    return (
        <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
    );
};

export default StoreContextProvider;
