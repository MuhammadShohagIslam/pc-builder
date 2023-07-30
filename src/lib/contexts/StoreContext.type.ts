import { Auth, GoogleAuthProvider, User, UserCredential } from "firebase/auth";
import { StoreDataType, StoreAction } from "../states/storeReducer/storeReducer.type";

export type ActionConfigType = {
    url: string;
    handleCodeInApp: boolean;
};


export type StoreContextType = {
    state: StoreDataType;
    dispatch: React.Dispatch<StoreAction>;
    auth: Auth;
    firebaseUser:User | null,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    sendForSignInLinkToEmail: (email: string, actionCodeSettings: ActionConfigType) => Promise<void>;
    userProfileUpdate: (profile: any) => Promise<void>;
    createUser: (email: string, location: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
    loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
    registerAndLoginWithProvider: (provider: GoogleAuthProvider) => Promise<UserCredential>;
    forgotPassword: (email: string, actionCodeSettings: any) => Promise<void>;
    updateThePassword: (newPassword: string) => Promise<void> | undefined;
};

