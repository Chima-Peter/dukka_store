import Link from "next/link";

const NotFoundPage = () => {
    return (
        <main className="flex flex-col gap-8 w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] min-lg:w-[93%] self-center flex justify-center items-center bg-white h-[600px] xl:h-[700px] 2xl:h-[800px]">
                <div className="flex flex-col gap-4 py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 border border-gray-100 items-center w-[90%] sm:w-[400px] min-lg:w-[500px] drop-shadow-md xl:w-[600px]">
                    <h1 className="text-2xl sm:text-3xl min-lg:text-4xl xl:text-5xl 2xl:text-6xl text-[#FEB100] tracking-wide font-semibold">
                        404
                    </h1>
                    <h2 className="text-lg min-lg:text-xl xl:text-2xl font-medium">
                        Page not found
                    </h2>
                    <p className="text-[14px] min-lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-relaxed tracking-wide font-[400] w-[100%] sm:w-[80%] text-center">
                        The page you&apos;re trying to view does not exist or has been removed
                    </p>
                    <Link
                        href="/"
                        className="text-[14px] xs:text-[16px] xl:text-[24px] 2xl:text-[36px] text-black bg-[#FEB100] rounded-md py-3 pl-12 pr-2 w-fit font-urbanist"
                    >
                        Go to homepage
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default NotFoundPage;
