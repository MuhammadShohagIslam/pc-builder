/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import FormGroup from "@/components/form/FormGroup";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { addUser } from "@/store/features/user/userSlice";
import axios from "axios";

const Login = () => {
    const [loadingLogin, setLoadingLogin] = useState(false);

    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    const router = useRouter();
    const { redirect } = router.query;

    // useEffect(() => {
    //     if (user) {
    //         router.push("/");
    //     }
    // }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = async (data) => {
        const { email, password } = data;
        setLoadingLogin(true);
        try {
            const { data } = await axios.post("/api/auth/login", {
                email,
                password,
            });
            console.log(data, "data register");
            dispatch(addUser({ email: data?.user }));
            toast.success("Successfully Login!");
            setLoadingLogin(false);
            router.push(redirect || "/");
        } catch (error) {
            dispatch(addUser({}));
            toast.success("Login Failed!");
            setLoadingLogin(false);
        }
    };

    return (
        <>
            <HeadSeo title="login" content="Login Page" />
            <div className="container mx-auto my-20 md:px-0 px-4">
                <div className="lg:w-[560px] w-full  m-auto p-8  bg-gray-400 rounded-lg">
                    <h2 className="text-center font-medium text-white text-3xl">
                        Login Now!
                    </h2>
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() =>
                                signIn("github", {
                                    callbackUrl: "http://localhost:3000/",
                                })
                            }
                            type="button"
                            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   mr-2 mb-2"
                        >
                            <FaGithub className="text-lg mr-1" />
                            Connection With GitHub
                        </button>
                    </div>

                    <h2 className="text-center font-medium text-white text-xl mt-3">
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
                        <button
                            disabled={loadingLogin}
                            type="submit"
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300  focus:ring-4 focus:outline-none focus:ring-lime-200 "
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                                {loadingLogin ? "Loading..." : "Login"}
                            </span>
                        </button>
                    </form>
                    <hr className="my-4"></hr>
                    <p className="text-primary  lg:text-left text-center">
                        If You Do Not Have Account?{" "}
                        <label
                            className="mr-2 ml-2 text-white cursor-pointer"
                            onClick={() => router.push("/auth/register")}
                        >
                            Register Now
                        </label>
                        Or
                        <label
                            className="ml-2 text-white cursor-pointer"
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
