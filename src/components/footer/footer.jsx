import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white shadow">
            <div className="w-full max-w-screen-xl mx-auto lg:p-4 md:py-8 py-12">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link
                        href=""
                        className="flex items-center md:justify-start justify-center lg:mb-4 mb-6"
                    >
                        <span className="self-center italic text-2xl font-semibold whitespace-nowrap ">
                           Shohag PCHunt
                        </span>
                    </Link>
                    <ul className="flex flex-wrap items-center md:justify-normal justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="mr-4 hover:underline md:mr-6">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                                Licensing
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <span className="block text-sm text-gray-500 text-center ">
                    © 2023 {" "}
                    <Link href="/" className="hover:underline">
                    Shohag PC Hunt
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
