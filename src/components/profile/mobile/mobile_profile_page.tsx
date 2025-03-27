import { BiEdit, BiMessageSquareDetail } from "react-icons/bi"
import { BsArrowLeft } from "react-icons/bs"
import { FaChevronRight } from "react-icons/fa6"
import { GoHeart, GoPerson } from "react-icons/go"
import { LuHeadset } from "react-icons/lu"
import { CgProfile } from "react-icons/cg";
import Link from "next/link"
import Image from "next/image"


const MobileProfilePage = () => {
    const profileOptionsList = [
        {
            name: "Profile",
            icon: <CgProfile className="w-6 h-6 md:w-7 md:h-7 text-[#164D46]" />
        },
        {
            name: "Favorite",
            icon: <GoHeart className="w-6 h-6 md:w-7 md:h-7 text-[#164D46]" />
        },
        {
            name: "Order",
            icon: <Image width={24} height={24} src="/images/profile/order.svg" alt="return policy" className="w-6 h-6 md:w-7 md:h-7" />
        },
        {
            name: "Messages",
            icon: <BiMessageSquareDetail className="w-6 h-6 md:w-7 md:h-7 text-[#164D46]" />
        },
        {
            name: "Customer care",
            icon: <LuHeadset className="w-6 h-6 md:w-7 md:h-7 text-[#164D46]" />
        },
        {
            name: "Return policy",
            icon: <Image width={24} height={24} src="/images/profile/return_policy_profile.svg" alt="return policy" className="w-6 h-6 md:w-7 md:h-7" />
        }

    ]


    return (
        <main className="flex flex-col w-[100%] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist">
            <section className="bg-white px-4 sm:px-6 md:px-8 py-4 flex justify-center relative w-[100%] items-center">
                <Link href={'/'} className="absolute left-[5px] sm:left-[14px] md:left-[21px] h-fit w-fit">
                    <BsArrowLeft className="cursor-pointer w-[38px] h-[25px] md:w-[50px] md:h-[30px]" />
                </Link>
                <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                    Profile
                </h1>
            </section>
            
            <section className="w-[100%]flex flex-col bg-white">
                <div className={`flex w-[100%] gap-6 p-6 border-b bg-[#FFEDE3] items-center`}>
                    <div className={`w-20 h-20 bg-white flex items-center justify-center border border-white rounded-full relative`} >
                        <GoPerson className="w-8 h-8 text-black" />
                        <Link href={`/profile/user`} className="absolute -bottom-1 -right-1 bg-[#FBAE30] flex justify-center items-center w-8 h-8 rounded-full">
                            <BiEdit className="text-[#164D46] w-5 h-5"/>
                        </Link >
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 items-center">
                            <h1 className="text-[18px] md:text-[20px] font-[500]">
                                Esther Jones
                            </h1>
                        </div>
                        <p className="text-[14px] md:[16px] font-[300] tracking-wide font-mobile-nav">
                            esther@gmail.com
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-[100%] border-t border-t-[#ADB1B1] pb-10">
                    {
                        profileOptionsList.map((option) => (
                            <Link href={option.name === "Profile" ? `/profile/user` : `/profile/${option.name.toLocaleLowerCase()}`} className={`flex w-[100%] justify-between px-6 py-3 md:py-4 items-center cursor-pointer hover:bg-[#FEB100] bg-white border-b border-b-[#ADB1B1] font-[400] hover:font-[500]`} key={option.name}>
                                <div className="flex items-center gap-8">
                                    {option.icon}
                                    <p className="text-[14px] xs:text-[16px] md:text-[18px] font-[500] tracking-wide">
                                        {option.name}
                                    </p>
                                </div>
                                <button className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#E2E8E8] flex items-center justify-center">
                                    <FaChevronRight className="w-3 h-3 md:w-5 md:h-5 text-[#888B8B]" />
                                </button>
                            </Link>
                        ))
                    }
                </div>
            </section>
        </main>
    )
}

export default MobileProfilePage