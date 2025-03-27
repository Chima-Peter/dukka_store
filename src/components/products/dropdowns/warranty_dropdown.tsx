import Image from "next/image"


const WarrantyDropdown = () => {
    return (
        <div className="w-[100%] bg-white flex gap-6 h-[120px] px-6 sm:px-10 items-center min-lg:justify-between rounded-md drop-shadow-md absolute top-14 z-20 left-0 font-Poppins">
            <Image src="/images/category/warranty.svg" alt="Warranty" width={58} height={64} />
            <div className="flex flex-col justify-between text-left">
                <h4 className="font-[600] text-[16px] sm:text-[18px] xl:text-[20px] font-urbanist">
                    Warranty terms
                </h4>
                <p  className="font-[500] text-[14px] sm:text-[16px] xl:text-[18px] font-urbanist text-[#79747E]">
                    4 months
                </p>
            </div>
            <div className="flex flex-col justify-between text-left">
                <h4 className="font-[600] text-[16px] sm:text-[18px] xl:text-[20px] font-urbanist">
                    Warranty details
                </h4>
                <p  className="font-[500] text-[14px] sm:text-[16px] xl:text-[18px] font-urbanist text-[#79747E]">
                    Check container for exp date
                </p>
            </div>
        </div>
    )
}

export default WarrantyDropdown