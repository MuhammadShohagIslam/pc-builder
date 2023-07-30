import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
    const [openCategory, setOpenCategory] = useState(false);
    return (
        <section className="relative">
            <nav className="flex justify-between bg-white shadow-md text-gray-900">
                <div className="px-5 relative xl:px-12 py-6 justify-between flex w-full items-center">
                    {/* Logo */}
                    <Link className="text-3xl font-bold font-heading" href="/">
                        Shohag PCBuilder
                    </Link>
                    {/* Category and Login */}
                    <div className="flex space-x-5">
                        <div>
                            <button
                                onClick={() => setOpenCategory(!openCategory)}
                                className="text-gray-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center "
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
                        <div className="hidden xl:flex pr-2">
                            <Link
                                className="flex items-center text-gray-600 font-bold hover:text-gray-600"
                                href="/PCBuilder"
                            >
                               PC Builder 
                            </Link>
                        </div>
                        <div className="hidden xl:flex items-center ">
                            <Link
                                className="flex items-center hover:text-gray-600"
                                href="#"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 hover:text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </Link>
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
