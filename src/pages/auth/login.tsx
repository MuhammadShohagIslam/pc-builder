/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import FormGroup from "@/components/Form/FormGroup";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";



const Login = () => {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const {
        state,
        loginWithEmailAndPassword,
        registerAndLoginWithProvider,
        setLoading,
        dispatch,
    } = useStoreContext();
    const { user } = state;
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormValues>();
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogin: SubmitHandler= (data) => {
        const { email, password } = data;
        setLoadingLogin(true);
        loginWithEmailAndPassword(email, password)
            .then(async (result) => {
                const user = result?.user;
                const currentUser = {
                    fullName: user?.displayName!,
                    email: user?.email!,
                    image: {
                        url: user?.photoURL!,
                        public_id: `${Date.now()}`!,
                    },
                };
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token, currentUser!)
                    .then((res) => {
                        const userObject = {
                            fullName: res.data.fullName,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            image: res.data.image?.url,
                            _id: res.data._id,
                        };
                        dispatch({
                            type: StoreActionType.LOGGED_IN_USER,
                            payload: userObject,
                        });
                        window.localStorage.setItem(
                            "accountInfo",
                            JSON.stringify(userObject)
                        );
                        reset();
                        setLoadingLogin(false);
                        if (typeof redirect === "string") {
                            router.push(`/${redirect}`);
                        } else {
                            router.push("/");
                        }
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Login Successfully",
                            showConfirmButton: false,
                            timer: 2500,
                        });
                    })
                    .catch((error) => {
                        console.log(error.message);
                        setLoadingLogin(false);
                    });
            })
            .catch((error) => {
                toast.error(error.message.split("Firebase: ").join(""));
                setLoadingLogin(false);
            })
            .finally(() => {
                setLoading(false);
                setLoadingLogin(false);
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
                createOrUpdateUser(idTokenResult.token, currentUser!)
                    .then((res) => {
                        dispatch({
                            type: StoreActionType.LOGGED_IN_USER,
                            payload: {
                                fullName: res.data.fullName,
                                email: res.data.email,
                                token: idTokenResult.token,
                                image: res.data.image?.url,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                        if (typeof redirect === "string") {
                            router.push(redirect);
                        } else {
                            router.push("/");
                        }
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
    return (
        <>
            <HeadSeo
                title="login"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <div className="container my-14 sm:my-8">
                <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl">
                        Login Now!
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
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FormGroup
                            register={register}
                            inputName={"email"}
                            labelName={"Email"}
                            errorField={errors.email}
                            inputType={"email"}
                            placeholder={"Enter Your Email"}
                            required="Please Enter Your Email"
                        />

                        <FormGroup
                            register={register}
                            inputName={"password"}
                            labelName={"Password"}
                            isRequirePattern={true}
                            requirePattern={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password should be 6 characters or longer",
                                },
                            }}
                            errorField={errors.password}
                            inputType={"password"}
                            placeholder={"Please Enter Your Password"}
                            required="Password is required"
                        />
                        <label className="label cursor-pointer -mt-3">
                            <span
                                className="cursor-pointer text-primary font-medium text-sm sm:text-sm hover:text-success transition-all"
                                onClick={() =>
                                    router.push("/auth/forgot-password")
                                }
                            >
                                Forget Password?
                            </span>
                        </label>
                        <button
                            disabled={loadingLogin}
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                        >
                            {loadingLogin ? "Loading" : "Login"}
                        </button>
                    </form>
                    <hr className="my-4"></hr>
                    <p className="text-primary">
                        If You Do Not Have Account?{" "}
                        <label
                            className="mr-2 text-success cursor-pointer"
                            onClick={() => router.push("/auth/register")}
                        >
                            Register Now
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

export default Login;
