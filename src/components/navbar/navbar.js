import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {  signOut } from "next-auth/react"
import { FiLogOut } from "react-icons/fi";
import { addUser } from "@/store/features/user/userSlice";

const Navbar = () => {
    const [openCategory, setOpenCategory] = useState(false);
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(addUser({}));
        signOut() 
    };

    return (
        <section className="relative">
            <nav className="flex justify-between bg-white shadow-md text-gray-900">
                <div className="px-5 relative xl:px-12 py-6 justify-between flex w-full items-center">
                    {/* Logo */}
                    <Link className="text-3xl italic font-bold font-heading" href="/">
                        Shohag PCHunt
                    </Link>
                    {/* Category and Login */}
                    <div className="flex space-x-5">
                        <div>
                            <button
                                onClick={() => setOpenCategory(!openCategory)}
                                className="text-gray-800  focus:outline-none focus:ring-blue-300  rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center "
                                type="button"
                            >
                                Category
                                <svg
                                    className="w-2.5 h-2.5 ml-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {openCategory && (
                                <div className="flex absolute space-x-5">
                                    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li
                                                onClick={() =>
                                                    setOpenCategory(
                                                        !openCategory
                                                    )
                                                }
                                            >
                                                <Link
                                                    className="block px-4 py-2 hover:bg-gray-100 "
                                                    href={`/category/CPU`}
                                                >
                                                    CPU
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setOpenCategory(
                                                        !openCategory
                                                    )
                                                }
                                            >
                                                <Link
                                                    href={`/category/Motherboard`}
                                                    className="block px-4 py-2 hover:bg-gray-100 "
                                                >
                                                    Motherboard
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setOpenCategory(
                                                        !openCategory
                                                    )
                                                }
                                            >
                                                <Link
                                                    href={`/category/RAM`}
                                                    className="block px-4 py-2 hover:bg-gray-100 "
                                                >
                                                    RAM
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setOpenCategory(
                                                        !openCategory
                                                    )
                                                }
                                            >
                                                <Link
                                                    href={`/category/Power Supply Unit`}
                                                    className="block px-4 py-2 hover:bg-gray-100 "
                                                >
                                                    Power Supply Unit
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setOpenCategory(
                                                        !openCategory
                                                    )
                                                }
                                            >
                                                <Link
                                                    href={`/category/Storage Device`}
                                                    className="block px-4 py-2 hover:bg-gray-100 "
                                                >
                                                    Storage Device
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setOpenCategory(
                                                        !openCategory
                                                    )
                                                }
                                            >
                                                <Link
                                                    href={`/category/Monitor`}
                                                    className="block px-4 py-2 hover:bg-gray-100 "
                                                >
                                                    Monitor
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {user.email && (
                            <>
                                <div className="hidden xl:flex pr-2">
                                    {" "}
                                    <Link
                                        className="flex items-center text-gray-600 hover:font-medium transition-all  hover:text-gray-800"
                                        href="/PCBuilder"
                                    >
                                        PC Builder
                                    </Link>
                                </div>
                                <div className="hidden xl:flex pr-2">
                                    <li
                                        onClick={handleLogOut}
                                        className="py-2 pl-3 pr-4
                                    text-gray-700 rounded hover:bg-gray-100
                                    md:hover:bg-transparent md:border-0
                                    md:hover:text-blue-700 md:p-0 cursor-pointer flex items-center justify-center"
                                    >
                                        <FiLogOut className="text-base" />
                                    </li>
                                </div>
                            </>
                        )}

                        <div className="hidden xl:flex items-center space-x-4">
                            {!user.email && (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-gray-800 md:p-0 hover:font-medium transition-all "
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/auth/register"
                                        className="block py-2 pl-3 pr-4 text-gray-800 hover:font-medium rounded hover:text-gray-800 md:p-0 transition-all "
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <Link
                    className="navbar-burger self-center mr-12 xl:hidden"
                    href="#"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 hover:text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </Link>
            </nav>
        </section>
    );
};

export default Navbar;
