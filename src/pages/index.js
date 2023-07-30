import RootLayout from "@/layout/RootLayout";
import Image from "next/image";

export default function Home() {
    return (
        <section className="py-20">
            <div className="w-full flex items-center justify-center pb-16">
                <h2 className="text-3xl font-bold text-gray-800 ">
                    Computer Accessories
                </h2>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {[...Array(4)].map((d) => (
                    <div key={d} className="card w-96 bg-white shadow-xl mb-5">
                        <figure>
                            <Image
                                src="https://5.imimg.com/data5/CY/FF/MY-12308096/computer-ram.jpg"
                                alt="Shoes"
                                width={350}
                                height={100}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-gray-800">
                               Computer
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p className="text-gray-600">
                                If a dog chews shoes whose shoes does he choose?
                            </p>
                            <div className="card-actions justify-end cursor-pointer">
                                <div className="badge badge-outline text-gray-900">
                                    Mouse
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

Home.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
