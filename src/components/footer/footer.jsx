import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer class="bg-white rounded-lg shadow  m-4">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <Link
                        href=""
                        class="flex items-center mb-4 sm:mb-0"
                    >
                        <Image
                            src="/"
                            class="h-8 mr-3"
                            alt="Pc-Builder"
                            width={100}
                            height={100}
                        />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Pc-Builder
                        </span>
                    </Link>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" class="mr-4 hover:underline md:mr-6">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" class="mr-4 hover:underline md:mr-6 ">
                                Licensing
                            </Link>
                        </li>
                        <li>
                            <Link href="#" class="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center ">
                    © 2023
                    <Link href="/" class="hover:underline">
                        Pc-Builder
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
