/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import FormGroup from "@/components/form/FormGroup";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/features/user/userSlice";
import axios from "axios";

const Register = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // useEffect(() => {
    //     if (user) {
    //         router.push("/");
    //     }
    // }, [user]);

    const submitHandler = async (data) => {
        const { email, password } = data;
        setLoading(true);
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/register", {
                email,
                password,
            });
            dispatch(addUser({ email: data?.user }));
            toast.success("Successfully Register!");
            setLoading(false);
            reset();
            router.push("/");
        } catch (error) {
            setLoading(false);
            dispatch(addUser({}));
        }
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
            <FormGroup
                register={register}
                inputName={"password"}
                labelName={"Password"}
                isRequirePattern={true}
                requirePattern={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password should be 6 characters or longer",
                    },
                }}
                errorField={errors.password}
                inputType={"password"}
                placeholder={"Please Enter Your Password"}
                required="Password is required"
            />
            <button
                disabled={loading}
                type="submit"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300  focus:ring-4 focus:outline-none focus:ring-lime-200 "
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    {loading ? "Loading..." : "Register"}
                </span>
            </button>
        </form>
    );
    return (
        <>
            <HeadSeo title="Register" content="Register Page" />
            <div className="container mx-auto my-20 md:px-0 px-4">
                <div className="lg:w-[560px] w-full m-auto p-8  bg-gray-400 rounded-lg">
                    <h2 className="text-center font-medium text-white text-3xl">
                        Register Now!
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
                    {registerForm()}
                    <hr className="my-4"></hr>
                    <p className="text-primary lg:text-left text-center">
                        If You Have Account?{" "}
                        <label
                            className="mr-2 ml-2 text-white cursor-pointer"
                            onClick={() => router.push("/auth/login")}
                        >
                            Login Now
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

export default Register;
