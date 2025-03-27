import Link from "next/link"
import Image from "next/image"

const ReturnPolicyDropdown = () => {
    return (
        <div className="w-[100%] bg-white flex gap-6 h-[120px] px-10 items-center min-lg:justify-between rounded-md drop-shadow-md absolute top-14 z-20 left-0 font-Poppins">
            <Image width={64} height={64} src="/images/category/return_policy.svg" alt="Our return policy" className="min-lg:w-[30px] lg:w-[40px] xl:w-[50px] 2xl:w-[70px]" />
            <div className="flex flex-col justify-between">
                <h4 className="font-[600] text-[16px] sm:text-[18px] xl:text-[20px] font-urbanist">
                    7 days return policy
                </h4>
                <p className="font-[500] text-[14px] sm:text-[16px] xl:text-[18px] font-urbanist text-[#79747E]">
                    For more information on our return policy. <Link className="font-[600] text-blue-950" href={'/'}>LEARN MORE</Link>
                </p>
            </div>
        </div>
    )
}

export default ReturnPolicyDropdown