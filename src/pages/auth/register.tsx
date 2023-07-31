/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import { createOrUpdateUser } from "@/api/auth";
import FormGroup from "@/components/Form/FormGroup";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

type FormValues = {
    email: string;
};

const Register = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        state,
        dispatch,
        registerAndLoginWithProvider,
        sendForSignInLinkToEmail,
    } = useStoreContext();
    const { user } = state;
    const googleProvider = new GoogleAuthProvider();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    const submitHandler: SubmitHandler<FormValues> = async (data) => {
        const { email } = data;
        const actionCodeSettings = {
            url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL!,
            handleCodeInApp: true,
        };
        setLoading(true);
        sendForSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                toast.success(
                    `Email is sent to the ${email}.Click the link to complete your registration`
                );
                // save the user email for local storage
                window.localStorage.setItem("emailForSignIn", email);
                // set loading false
                setLoading(false);
                //clear state
                reset();
                console.log(email, "down");
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for registration like ${error.message}`
                );
                setLoading(false);
            });
    };

    const handleSignUpWithProvider = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        providerName: string
    ) => {
        event.preventDefault();
        if (providerName === "google") {
            popupForSignInProvider(googleProvider);
        }
    };

    const popupForSignInProvider = async (provider: GoogleAuthProvider) => {
        registerAndLoginWithProvider(provider)
            .then(async (result) => {
                const user = result.user;
                const currentUser = {
                    fullName: user?.displayName!,
                    email: user?.email!,
                    image: {
                        url: user?.photoURL!,
                        public_id: `${Date.now()}`!,
                    },
                };
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token, currentUser)
                    .then((res) => {
                        dispatch({
                            type: StoreActionType.LOGGED_IN_USER,
                            payload: {
                                fullName: res.data.fullName,
                                email: res.data.fullName.email,
                                token: idTokenResult.token,
                                image: res.data.image?.url,
                                _id: res.data._id,
                            },
                        });
                        router.push("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                toast.error(error?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit(submitHandler)}>
            <FormGroup
                register={register}
                inputName={"email"}
                labelName={"Email"}
                isRequirePattern={true}
                requirePattern={{
                    required: "Email is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                    },
                }}
                errorField={errors.email}
                inputType={"email"}
                placeholder={"Please Enter Your Email"}
                required="Email is required"
            />
            <button
                type="submit"
                className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                disabled={loading}
            >
                {loading ? "Loading..." : "Register"}
            </button>
        </form>
    );
    return (
        <>
            <HeadSeo
                title="Register"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <div className="container my-14 sm:my-8">
                <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl">
                        Register Now!
                    </h2>
                    <div className="space-y-2 mt-4">
                        <button
                            onClick={(e) =>
                                handleSignUpWithProvider(e, "google")
                            }
                            className="btn btn-success bg-success text-primary hover:bg-transparent hover:text-primary border-2 btn-block"
                        >
                            <FaGoogle className="text-lg mr-1" />
                            Connection With Google
                        </button>
                    </div>
                    <h2 className="text-center font-medium text-primary text-xl mt-3">
                        Or
                    </h2>
                    {registerForm()}
                    <hr className="my-4"></hr>
                    <p className="text-primary">
                        If You Have Account?{" "}
                        <label
                            className="mr-2 text-success cursor-pointer"
                            onClick={() => router.push("/auth/login")}
                        >
                            Login Now
                        </label>
                        Or
                        <label
                            className="ml-2 text-success cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            Back Home
                        </label>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
