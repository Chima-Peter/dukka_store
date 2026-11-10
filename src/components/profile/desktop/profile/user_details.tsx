"use client";

import { BiEdit } from "react-icons/bi";
import { useGetMeQuery } from "@/redux/services/customer_api";

const UserDetails = ({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { data: me, isLoading } = useGetMeQuery();

    return (
        <section className="md:w-[68%] lg:w-[74%] h-fit flex flex-col pb-4 border border-[#ADB1B1] rounded-xl font-urbanist">
            <div className="flex justify-between py-6 border-b border-[#ADB1B1] items-center w-[100%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
                <h1 className="font-[500] min-lg:text-[22px] xl:text-[24px] 2xl:text-[26px] tracking-wide capitalize">
                    User profile
                </h1>
            </div>
            <section className="w-[100%] flex px-2 py-6 justify-between">
                <div className="w-[49%] border border-[#ADB1B1] rounded-xl flex flex-col h-fit">
                    <h2 className="py-5 border-b border-b-[#ADB1B1] px-6 text-[18px] xl:text-[20px] font-[400] tracking-wide">
                        Account details
                    </h2>
                    <div className="pt-5 pb-8 px-6 flex flex-col gap-0">
                        <h3 className=" text-[18px] xl:text-[20px] font-[400] tracking-wide">
                            {isLoading ? "Loading..." : me?.name || "Customer"}
                        </h3>
                        <p className="text-[16px] xl:text-[18px] text-[#164D46] font-[300] tracking-wide w-[100%]">
                            {me?.email || ""}
                        </p>
                    </div>
                </div>
                <section className="flex flex-col w-[49%] gap-4">
                    <div className="w-[100%] border border-[#ADB1B1] rounded-xl flex flex-col">
                        <div className="w-[100%] flex justify-between py-5 pl-6 pr-12 border-b border-b-[#ADB1B1]">
                            <h2 className="text-[18px] xl:text-[20px] font-[400] tracking-wide">
                                Delivery details
                            </h2>
                            <button className="" onClick={() => setStep(5)}>
                                <BiEdit className="text-[#164D46] w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 cursor-pointer" />
                            </button>
                        </div>
                        <div className="pt-5 pb-8 px-6 flex flex-col gap-1">
                            <h3 className=" text-[18px] xl:text-[20px] font-[400] tracking-wide">
                                Default shipping address
                            </h3>
                            <p className="text-[16px] xl:text-[18px] text-[#164D46] font-[300] tracking-wide w-[100%]">
                                Manage addresses from checkout for now.
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    );
};

export default UserDetails;
